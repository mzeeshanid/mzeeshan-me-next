/* Meta Data */
export type DriveDirectMetaMetaData = {
    title: string,
    desc: string,
    image: {
        alt: string,
        width: number,
        height: number,
        src: string,
        type: string
    },
    url: string
}

export const driveDirectMetaData: DriveDirectMetaMetaData = {
    title: "Google Drive Direct Download Link Generator",
    desc: "Generate direct download links from Google Drive share links instantly. No login, free to use, and no uploads required.",
    image: {
        alt: "drive direct hero image",
        width: 400,
        height: 400,
        src: `/assets/drive_direct_hero.png`,
        type: "image/png"
    },
    url: `/tools/google-drive-direct-download-link-generator`
}