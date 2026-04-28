import { IconType } from "react-icons";
import { UpworkIcon, FiverrIcon } from "@/icons/platformIcons";

export type MyClientReviewData = {
    title: string;
    statsTitle: string;
    reviews: MyClientReviewItem[];
    stats: MyClientStatsItem[]
}

export type MyClientReviewItem = {
    name: string;
    rating: number;
    countryCode: string;
    country: string;
    platform: MyClientPlatformType;
    text: string;
    icon: IconType;
    isVerified: boolean;
    date: string;
    source: string;
}

export type MyClientPlatformType = 'Fiverr' | 'Upwork' | 'Other';

type MyClientStatsItem = {
    label: string;
    value: string;
}

const myClientReviewsData = (): MyClientReviewData => {
    return {
        title: "Client Reviews",
        statsTitle: "Freelancing Journey Stats",
        stats: [
            {
                label: "Projects",
                value: "20+"
            },
            {
                label: "Clients",
                value: "15+"
            },
            {
                label: "Response Time",
                value: "24 hrs"
            },
            {
                label: "Success Rate",
                value: "100%"
            },
        ],
        reviews: [
            {
                name: "link-o-mat",
                rating: 5,
                countryCode: "US",
                country: "USA",
                platform: "Upwork" as MyClientPlatformType,
                text: "Good and fast work. Very good communication, really flexible guy! Would recommend.",
                icon: UpworkIcon,
                isVerified: true,
                date: "July 15th 2023",
                source: "https://www.upwork.com/freelancers/~016fe2b0c9f5009b00"
            },
            {
                name: "Scott Lydon",
                rating: 5,
                countryCode: "US",
                country: "USA",
                platform: "Upwork" as MyClientPlatformType,
                text: "A highly versatile dev, open to new challenges, and a skilled CS graduate and it shows.",
                icon: UpworkIcon,
                isVerified: true,
                date: "July 31th 2024",
                source: "https://www.upwork.com/freelancers/~016fe2b0c9f5009b00"
            },
            {
                name: "Ahmed Ali",
                rating: 5,
                countryCode: "IQ",
                country: "Iraq",
                platform: "Upwork" as MyClientPlatformType,
                text: "Muhammad Professional ios developer he always do the great work.",
                icon: UpworkIcon,
                isVerified: true,
                date: "Dec 27th 2024",
                source: "https://www.upwork.com/freelancers/~016fe2b0c9f5009b00"
            },
            {
                name: "Amelia Richards",
                rating: 5,
                countryCode: "GE",
                country: "Georgia",
                platform: "Upwork" as MyClientPlatformType,
                text: "It was a pleasure to work with Muhammad! He has excellent communication skills and he's very easy to work with. I highly recommend working with him!",
                icon: UpworkIcon,
                isVerified: true,
                date: "May 31st 2022",
                source: "https://www.upwork.com/freelancers/~016fe2b0c9f5009b00"
            },
            {
                name: "Nabil Ajana",
                rating: 5,
                countryCode: "MA",
                country: "Morocco",
                platform: "Fiverr" as MyClientPlatformType,
                text: "I am very pleased with the work with mzeeshanid. He has been very responsive and communicative throughout the process, and has consistently delivered high-quality work.",
                icon: FiverrIcon,
                isVerified: true,
                date: "July 31st 2024",
                source: "https://www.fiverr.com/s/jja2RdV"
            },
            {
                name: "Younes",
                rating: 5,
                countryCode: "MA",
                country: "Morocco",
                platform: "Upwork" as MyClientPlatformType,
                text: "Great job.",
                icon: UpworkIcon,
                isVerified: true,
                date: "July 17th 2022",
                source: "https://www.upwork.com/freelancers/~016fe2b0c9f5009b00"
            }
        ]
    };
}

export default myClientReviewsData;