import { IconType } from "react-icons";
import { FaUpwork } from "react-icons/fa6";
import { TbBrandFiverr } from "react-icons/tb";

type MyHeroData = {
    tagline: string;
    title: string;
    details: string;
    
    actions: MyHeroAction[];
    
    heroImage: MyHeroImage;
    heroSkillsImages: MyHeroImage[];
}

type MyHeroImage = {
    src: string;
    alt: string;
    width: number;
    height: number;
    rotationAngle?: number;
    yOffset?: number;
}

type MyHeroAction = {
    link: string;
    buttonText: string;
    variant: "solid" | "surface" | "outline" | "subtle";
    icon: IconType;
}

const myHeroData = () : MyHeroData => {
    return {
        tagline: "LEAD iOS DEVELOPER",
        title: "MUHAMMAD ZEESHAN",
        details: "Experienced iOS developer specializing in building high-quality and scalable mobile applications using Swift, SwiftUI, and Objective-C.",
        
        actions: [
            {
                link: "https://www.upwork.com/fl/mzeeshanid",
                buttonText: "Hire me @Upwork",
                variant: "solid",
                icon: FaUpwork,
            },
            {
                link: "https://fiverr.com/s/w52zEo",
                buttonText: "Hire me @Fiverr",
                variant: "surface",
                icon: TbBrandFiverr,
            }
        ],
        
        heroImage: {
            src: "/assets/mzeeshan_me_hero.jpeg",
            alt: "Muhammad Zeeshan Hero Image",
            width: 500,
            height: 375,
        },
        
        heroSkillsImages: [
            {
                src: "/assets/xcode_app_icon.png",
                alt: "Xcode App Icon",
                width: 100,
                height: 100,    
                rotationAngle: -5,
            },
            {
                src: "/assets/ios_app_icon.png",
                alt: "iOS Logo",
                width: 100,
                height: 100,    
                rotationAngle: 0,
                yOffset: -5
            },
            {
                src: "/assets/react_app_icon.png",
                alt: "React App Icon",
                width: 100,
                height: 100,    
                rotationAngle: 5,
            }
        ],
    };
}

export default myHeroData;