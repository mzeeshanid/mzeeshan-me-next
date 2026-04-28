import type { StaticImageData } from "next/image";

export type BasicImageDataModel = {
    src: StaticImageData;
    alt: string;
    width: number;
    height: number;
}