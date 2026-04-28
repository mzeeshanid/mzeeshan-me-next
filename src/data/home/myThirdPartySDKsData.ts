import { BasicImageDataModel } from "../basicImage/basicImageDataModel";
import thirdPartySDKsIcon from "../../../public/assets/third_party_sdks_icon.png";

type MyThirdPartySDKData = {
    tagline: string;
    title: string;
    detail: string;
    heroImage: BasicImageDataModel,
    sdks: MyThirdPartySDKItem[];
}

type MyThirdPartySDKItem = {
    title: string;
    link: string;
}

const myThirdPartySDKsData = () : MyThirdPartySDKData => {
    return {
        tagline: "Focus on business logic",
        title: "Looking for a Third Party SDK Integration in your app?",
        detail: "I have extensive experience integrating various third-party SDKs into iOS applications, ensuring seamless functionality and optimal performance. You just name it.",
        heroImage: {
            src: thirdPartySDKsIcon,
            alt: "Third Party SDKs Hero Image",
            width: 300,
            height: 300,
        },
        sdks: [
            {
                title: "Firebase",
                link: "https://firebase.google.com/docs/ios/setup",
            },
            {
                title: "Stripe",
                link: "https://docs.stripe.com/sdks/ios",
            },
            {
                title: "Google Maps SDK",
                link: "https://developers.google.com/maps/documentation/ios-sdk/start",
            },
            {
                title: "Facebook SDK",
                link: "https://developers.facebook.com/docs/ios/getting-started",
            },
            {
                title: "RevenueCat",
                link: "https://www.revenuecat.com/docs/getting-started/quickstart",
            },
            {
                title: "AppsFlyer",
                link: "https://www.appsflyer.com/solutions/ios/",
            },
            {
                title: "OneSignal",
                link: "https://documentation.onesignal.com/docs/en/ios-sdk-setup",
            },
            {
                title: "Sentry",
                link: "https://docs.sentry.io/platforms/apple/guides/ios/",
            },
            {
                title: "More SDKs...",
                link: "#",
            }
        ]
    }
};

export default myThirdPartySDKsData;