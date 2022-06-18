export type FilePromise = string | ArrayBuffer | null;

export interface IASCII {
    readonly data: string[];
    readonly width: number;
    readonly height: number;
}

export interface OverflownData {
    readonly width: boolean;
    readonly height: boolean;
}

export interface IScale {
    readonly width: number;
    readonly height: number;
}

export interface IOption {
    readonly value: number;
    readonly label: string;
}

export enum Quality {
    original,
    high,
    middle,
    low
}

export enum ButtonType {
    default,
    unique
}