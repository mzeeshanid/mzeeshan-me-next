import { IconType } from "react-icons";

export type MyAppFeaturesDataModel = {
    header: {
        badge: string;
        title: string;
        detail: string;
    },
    features: MyAppFeatureItemDataModel[];
}

export type MyAppFeatureItemDataModel = {
    title: string;
    icon: IconType,
    bullets: string[];
}