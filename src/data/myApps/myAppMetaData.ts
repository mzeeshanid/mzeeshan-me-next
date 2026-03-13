import { BasicImageDataModel } from "../basicImage/basicImageDataModel";

export type MyAppMetaDataModel = {
    badge: string;
    appName: string;
    tagline: string;
    description: string;

    typeWriterPre: string;
    typeWriterWords: string[];
    typeWriterPost: string;

    appStoreLink?: string;
    playStoreLink?: string;

    heroImage: BasicImageDataModel;
    appIcon: BasicImageDataModel;

    siteUrl: string;

    operatingSystems: string;
    category: string;
    permissions: string[];
    keywords: string;
}