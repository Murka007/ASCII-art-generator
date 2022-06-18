import React from "react";
import { FilePromise, IASCII, IScale } from "../types/types";
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

async function getImageData(src: string) {
    const image = await createImage(src);
    return new Promise<ImageData>(resolve => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        resolve(ctx.getImageData(0, 0, image.width, image.height));
    })
}

export async function getASCII(src: string, density: string) {
    const { data, width, height } = await getImageData(src);

    const ascii: IASCII = {
        data: [],
        width: width,
        height: height
    };

    return new Promise<IASCII>(resolve => {
        for (let j = 0; j < height; j++) {
            let row = "";
            for (let i = 0; i < width; i++) {
                const pixelIndex = (i + j * width) * 4;
                const r = data[pixelIndex + 0];
                const g = data[pixelIndex + 1];
                const b = data[pixelIndex + 2];
                const average = (r + g + b) / 3;

                const len = density.length - 1;
                const charIndex = Math.floor(map(average, 0, 255, len, 0));
                const char = density.charAt(charIndex);
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