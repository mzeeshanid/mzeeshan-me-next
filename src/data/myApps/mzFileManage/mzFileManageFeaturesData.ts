import { FaCloudDownloadAlt, FaExternalLinkAlt } from "react-icons/fa";
import { FaFile, FaMusic } from "react-icons/fa6";
import { MyAppFeaturesDataModel } from "../myAppFeaturesData";

export const mzFileManageFeaturesData: MyAppFeaturesDataModel = {
    header: {
        badge: "Features",
        title: "A better way to manage files",
        detail: "Fully featured download manager, file manager and playlist manager"
    },
    features: [
        {
            title: "Download Manager",
            icon: FaCloudDownloadAlt,
            bullets: [
                "Simultaneous download of multiple files.",
                "Background downloading of large files.",
                "Resuming interrupted downloads.",
                "Show detailed statistics of download task."
            ]
        },
        {
            title: "File Manager",
            icon: FaFile,
            bullets: [
                "Easy file sharing over WiFi.",
                "Support operations e.g. Move, Copy, Paste, Delete etc.",
                "Search and sort files by Name, Kind, Date, Size.",
                "Preview supported files within the app."
            ]
        },
        {
            title: "Playlist Manager",
            icon: FaMusic,
            bullets: [
                "Create unlimited playlists.",
                "Allows background multimedia playback.",
                "One click play for playlist.",
                "Gesture driven advanced video player.",
            ]
        },
        {
            title: "More Features",
            icon: FaExternalLinkAlt,
            bullets: [
                "Import and export files with other apps using extension.",
                "Sharing files over AirDrop.",
                "Editing PDF files on the go.",
                "Quickly scannable grid / list view for saved files.",
            ]
        }
    ]
};



