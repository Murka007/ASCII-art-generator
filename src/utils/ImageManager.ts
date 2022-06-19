import React from "react";
import { FilePromise, IASCII, IScale, ISettings, Quality } from "../types/types";
import { map } from "./Common";

export const density = "%#Wioc-^';:,,, ...   ";
export function readImage(image: File) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    return new Promise<FilePromise>((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
    })
}

function createImage(src: string) {
    const image = new Image();
    image.src = src;
    return new Promise<HTMLImageElement>((resolve, reject) => {
        image.onload = () => resolve(image);
        image.onerror = (err) => reject(err);
    })
}

export async function getImageData(src: string, scale: number = 1) {
    const image = await createImage(src);

    const width = image.width * scale;
    const height = image.height * scale;
    return new Promise<ImageData>(resolve => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.drawImage(image, 0, 0, width, height);
        resolve(ctx.getImageData(0, 0, width, height));
    })
}

const Resolution: { [ key in string]: number } = {
    [Quality.original]: 1,
    [Quality.high]: 0.8,
    [Quality.middle]: 0.4,
    [Quality.low]: 0.2
};

export async function getASCII(src: string, settings: ISettings) {
    const { invertASCII, characters, quality } = settings;
    const { data, width, height } = await getImageData(src, Resolution[quality]);

    const ascii: IASCII = {
        data: [],
        width: width,
        height: height
    };

    return new Promise<IASCII>((resolve) => {
        for (let j = 0; j < height; j++) {
            let row = "";
            for (let i = 0; i < width; i++) {
                const pixelIndex = (i + j * width) * 4;
                const r = data[pixelIndex + 0];
                const g = data[pixelIndex + 1];
                const b = data[pixelIndex + 2];
                const average = (r + g + b) / 3;

                const len = characters.length - 1;
                const charIndex = Math.floor(map(average, 0, 255, invertASCII ? 0 : len, invertASCII ? len : 0));
                const char = characters.charAt(charIndex);
                row += (char === " " ? "‏ ‎" : char);
            }
            ascii.data.push(row);
        }
        resolve(ascii);
    })
}

export function getScale(from: IScale, to: IScale): number {
    const { width: w1, height: h1 } = from;
    const { width: w2, height: h2 } = to;
    return Math.min(w2 / w1, h2 / h1);
}