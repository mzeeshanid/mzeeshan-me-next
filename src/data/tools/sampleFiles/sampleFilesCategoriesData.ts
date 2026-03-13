import { IconType } from "react-icons";
import { FiArchive, FiFileText, FiImage, FiMusic, FiVideo } from "react-icons/fi";
import { ImStack } from "react-icons/im";

export type SampleFilesCategoriesData = {
    header: {
        badge: string;
        title: string;
        subtitle: string;
    },
    categories: SampleFilesCategoryDataModel[];
}

export type SampleFilesCategoryDataModel = {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    path: string;
    details: string;
    icon: IconType;
}

export const sampleFilesCategoriesData: SampleFilesCategoriesData = {
    header: {
        badge: "Categories",
        title: "Explore Sample Files by Category",
        subtitle: "Choose from a variety of categories to find the files you need.",
    },
    categories: [   
        {
            "id": 12,
            "documentId": "hhtvx2efaken0037ot72oj1y",
            "name": "Videos",
            "slug": "videos",
            "path": "/tools/sample-files/category/videos",
            icon: FiVideo,
            details: "Collection of video files with different formats for testing purpose during development.",
        },
        {
            "id": 8,
            "documentId": "jfwc2wx7f7vhv0satug2qtez",
            "name": "Audios",
            "slug": "audios",
            "path": "/tools/sample-files/category/audios",
            icon: FiMusic,
            details: "Free Audio files in different formats and sizes for testing purpose during development.",
        },
        {
            "id": 9,
            "documentId": "qahitxr26rqxl3prq7mrk8o9",
            "name": "Documents",
            "slug": "docs",
            "path": "/tools/sample-files/category/docs",
            icon: FiFileText,
            details: "Virus free documents in different formats and sizes available for free download.",
        },
        {
            "id": 10,
            "documentId": "zihtmw9bmbtlydilspb7nslf",
            "name": "Images",
            "slug": "images",
            "path": "/tools/sample-files/category/images",
            icon: FiImage,
            details: "Free set of popular image formats in different sizes for testing during development.",
        },
        {
            "id": 7,
            "documentId": "lmlo7kp5ou3aonpavz3n2fws",
            "name": "Archives",
            "slug": "archives",
            "path": "/tools/sample-files/category/archives",
            icon: FiArchive,
            details: "Hand picked virus free compressed file formats in different sizes. Download them for free.",
        },
        {
            "id": 11,
            "documentId": "bex5y4yvdv78komlbysrmoo3",
            "name": "Others",
            "slug": "others",
            "path": "/tools/sample-files/category/others",
            icon: ImStack,
            details: "A miscellany of text, fonts and other file formats in different sizes for testing.",
        },
    ]
};


