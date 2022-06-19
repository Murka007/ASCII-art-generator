import { OverflownData } from "../types/types";

export function map(...args: [number, number, number, number, number]): number {
    const [value, start1, stop1, start2, stop2] = args;
    return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

function isOverflown({ clientWidth, scrollWidth, clientHeight, scrollHeight }: HTMLDivElement): OverflownData  {
    return {
        width: scrollWidth > clientWidth,
        height: scrollHeight > clientHeight
    }
}

export function resizeText(element: HTMLDivElement): void {

    const style = element.style;
    style.fontSize = "0.1px";
    style.lineHeight = "0.1px";

    for (let i = 0.1; i < 32; i += 0.02) {
        const { width, height } = isOverflown(element);
        if (!width) style.fontSize = `${i}px`;
        if (!height) style.lineHeight = `${i}px`;
        if (width && height) break;
    }
}