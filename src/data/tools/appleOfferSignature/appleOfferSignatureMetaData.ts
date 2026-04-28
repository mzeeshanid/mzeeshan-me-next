type SeoImage = { src: string; alt: string; width: number; height: number };

/* Meta Data */
export type AppleOfferSignatureMetaData = {
    title: string,
    desc: string,
    image: SeoImage,
    url: string
}

export const appleOfferSignatureMetaData: AppleOfferSignatureMetaData = {
    title: "Apple Promotional Offer Signature",
    desc: "Generate Apple promotional offer signatures for testing purposes during development.",
    image: {
        alt: "Apple Offer Signature hero image",
        width: 800,
        height: 533,
        src: `/assets/promotional_offer_hero.png`
    },
    url: `/tools/apple-inapp-promotional-offer-signature-generator-for-testing`
}