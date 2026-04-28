import { MyAppScreenshotsDataModel } from "../myAppScreenshotsData";
import screen1 from "../../../../public/assets/mzplayerhd/MZPlayerHD_Screenshot_1.png";
import screen2 from "../../../../public/assets/mzplayerhd/MZPlayerHD_Screenshot_2.png";
import screen3 from "../../../../public/assets/mzplayerhd/MZPlayerHD_Screenshot_3.png";
import screen4 from "../../../../public/assets/mzplayerhd/MZPlayerHD_Screenshot_4.png";
import screen5 from "../../../../public/assets/mzplayerhd/MZPlayerHD_Screenshot_5.png";

export const mzPlayerHDScreenshotsData: MyAppScreenshotsDataModel = {
    header: {
        badge: "Screenshots",
        title: "How does the app look?",
        description: "Take a look at some screenshots of the app in action.",
    },
    screenshots: [
        { src: screen1, alt: "MZPlayerHD Screenshot 1", width: 300, height: 534 },
        { src: screen2, alt: "MZPlayerHD Screenshot 2", width: 300, height: 534 },
        { src: screen3, alt: "MZPlayerHD Screenshot 3", width: 300, height: 534 },
        { src: screen4, alt: "MZPlayerHD Screenshot 4", width: 300, height: 534 },
        { src: screen5, alt: "MZPlayerHD Screenshot 5", width: 300, height: 534 },
    ]
}
