import { IconType } from "react-icons";

export type MyAppReviewDataModel = {
    title: string;
    reviews: MyAppReviewItemDataModel[]
}

export type MyAppReviewItemDataModel = {
    name: string;
    rating: number;
    countryCode: string;
    country: string;
    text: string;
    icon: IconType;
    isVerified: boolean;
    date: string;
    source: string;
}