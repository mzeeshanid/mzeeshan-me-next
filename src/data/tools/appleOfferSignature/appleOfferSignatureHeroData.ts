import { BasicImageDataModel } from "@/data/basicImage/basicImageDataModel";

type AppleOfferSignatureHeroData = {
    tagline: string;
    title: string;
    details: string;
    
    heroImage: BasicImageDataModel;
}

const appleOfferSignatureHeroData = () : AppleOfferSignatureHeroData => {
    return {
        tagline: "TESTING TOOL",
        title: "Apple Promotional Offer Signature Generator",
        details: `This tool allows you to  [generate a promotional offer signature](https://developer.apple.com/documentation/storekit/generating-a-signature-for-promotional-offers)  for testing. A signature is required for a promotional offers during the purchase of  [In App subscription](https://developer.apple.com/app-store/subscriptions/)  via  [StoreKit.](https://developer.apple.com/documentation/storekit/).`,
        heroImage: {
        alt: "Apple Offer Signature hero image",
        width: 800,
        height: 533,
        src: `/assets/promotional_offer_hero.png`
    }
    };
}

export default appleOfferSignatureHeroData;