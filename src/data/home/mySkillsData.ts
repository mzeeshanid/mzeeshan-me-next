export type MySkill = {
    tagline: string;
    title: string;
    description: string;
    skills: MySkillData[];
}

export type MySkillData = {
    tag: string;
    title: string;
    description: string;
    featureIcon: string;
    featureIconAlt: string;
    features: string[];
}

const mySkillsData = (): MySkill => {
    return {
        tagline: "Technical Expertise",
        title: "Professional Skills",
        description: "Building scalable applications with cutting-edge technologies that transform ideas into measurable business results.",
        skills: [
            {
                tag: "Native iOS",
                title: "Lead iOS Developer",
                description: "Building apps for iOS using Swift, SwiftUI, and Objective-C. Creating user-friendly interfaces and ensuring optimal performance. Collaborating with cross-functional teams to deliver high-quality mobile applications.",
                featureIcon: "/assets/xcode_app_icon.png",
                featureIconAlt: "Xcode App Icon",
                features: [
                    "Expert in Swift and Objective-C",
                    "Proficient in UIKit and SwiftUI",
                    "Experience with RESTful APIs",
                    "Combine, CoreLocation, CoreData, Alamofire",
                    "Git, Memory management, debugging",
                    "AppStore and Enterprise distribution",
                    "AI tools (ChatGPT, Gemini, DeepSeek, Github Copilot)"
                ]
            },
            {
                tag: "React Native",
                title: "React Native Developer",
                description: "Building cross-platform apps using React Native. Creating user-friendly interfaces and ensuring optimal performance. Collaborating with cross-functional teams to deliver high-quality mobile applications.",
                featureIcon: "/assets/react_app_icon.png",
                featureIconAlt: "React Native Icon",
                features: [
                    "Expert in JavaScript and TypeScript",
                    "Proficient in React Native CLI & Expo",
                    "Functional components & React Hooks",
                    "Formik, Joi, APISauce, Axios",
                    "Git, Memory management, debugging",
                    "AppStore and Enterprise distribution",
                    "AI tools (ChatGPT, Gemini, DeepSeek, Github Copilot)"
                ]
            }
        ],
    };
}

export default mySkillsData;