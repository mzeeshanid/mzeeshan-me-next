import { IconType } from "react-icons";

import { DiSwift } from "react-icons/di";
import { RiBarChart2Line, RiCodeSLine, RiListCheck3, RiRemoteControlLine, RiShoppingCart2Line, RiSignalTowerLine, RiStackLine } from "react-icons/ri";

type MyFrameWorkData = {
    tagline: string;
    detail: string;
    typeWriterPre: string;
    typeWriterWords: string[];
    typeWriterPost: string;
    frameworks: MyFrameWorkItem[];
};

type MyFrameWorkItem = {
    title: string;
    detail: string;
    link: string;
    icon: IconType;
}

const myFrameworks = (): MyFrameWorkData => {
    return {
        tagline: "iOS Frameworks",
        typeWriterPre: "Build ",
        typeWriterWords: ["amazing", "robust", "scalable"],
        typeWriterPost: " Native iOS Apps",
        detail: "I have experience working with a variety of iOS frameworks to build robust and scalable applications used by millions. Here are some of the frameworks I specialize in.",
        frameworks: [
            {
                title: "SwiftUI",
                detail: "SwiftUI is a modern framework for building user interfaces across all Apple platforms. It provides a declarative syntax that allows developers to create complex UIs with less code.",
                link: "https://developer.apple.com/swiftui/",
                icon: DiSwift,
            },
            {
                title: "Combine",
                detail: "Looking to get rid of manual observers and its action? Want to modernize your app with asynchronous events and data streams in a more manageable way? I can utilize Combine framework to help.",
                link: "https://developer.apple.com/documentation/combine",
                icon: RiSignalTowerLine,
            },
            {
                title: "Core Data",
                detail: "Need a reliable data persistence layer for your iOS app? Need to manage complex object graphs with relationships and constraints? Need someone to help you with data migration strategies?",
                link: "https://developer.apple.com/documentation/coredata",
                icon: RiStackLine,
            },
            {
                title: "Alamofire",
                detail: "Need an advanced networking layer? Need a complex tailored authentication mechanism which utilizes Request Adapter, Request Retrier and Request Interceptor? True elegant networking with Alamofire.",
                link: "https://github.com/Alamofire/Alamofire",
                icon: RiRemoteControlLine,
            },
            {
                title: "StoreKit",
                detail: "Need a fix for fradulent transactions with In app purchases or subscriptions? Need to utilize AppStore's built-in offer mechanism for increasing converstion rate? I got you covered with StoreKit.",
                link: "https://developer.apple.com/documentation/storekit/",
                icon: RiShoppingCart2Line,
            },
            {
                title: "Firebase",
                detail: "Are you looking to get a reliable analytics solution for a data driven growth? Need a crash reporting system that can help in reproducing the live Crash reports? Firebase has got you covered.",
                link: "https://firebase.google.com/",
                icon: RiBarChart2Line,
            },
            {
                title: "Swift Syntax",
                detail: "Are you looking for a proficient Swift developer that is well-versed in Swift Syntax? Someone who knows the ABC of visitor pattern along the Swift Syntax legality and illegality? Look no further.",
                link: "https://github.com/swiftlang/swift-syntax",
                icon: RiCodeSLine,
            },
            {
                title: "Swift Lint",
                detail: "Are you using SwiftLint but need a custom rule? I am ready to write a custom rule for you. I have experience writing custom rules for SwiftLint to enforce coding standards and best practices.",
                link: "https://github.com/realm/SwiftLint",
                icon: RiListCheck3,
            }
        ]
    }
}

export default myFrameworks;