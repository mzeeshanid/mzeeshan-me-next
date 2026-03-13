import { BasicImageDataModel } from "../basicImage/basicImageDataModel";

export type MyAppScreenshotsDataModel = {
    header: {
        badge: string;
        title: string;
        description: string;
    },
    screenshots: BasicImageDataModel[]
}