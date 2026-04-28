import { MyAppScreenshotsDataModel } from "../myAppScreenshotsData";
import screen1 from "../../../../public/assets/mz100/MZ100_Screenshot_1.png";
import screen2 from "../../../../public/assets/mz100/MZ100_Screenshot_2.png";
import screen3 from "../../../../public/assets/mz100/MZ100_Screenshot_3.png";
import screen4 from "../../../../public/assets/mz100/MZ100_Screenshot_4.png";

export const mz100ScreenshotsData: MyAppScreenshotsDataModel = {
    header: {
        badge: "Screenshots",
        title: "How does the app look?",
        description: "Take a look at some screenshots of the app in action.",
    },
    screenshots: [
        { src: screen1, alt: "MZ100 Screenshot 1", width: 247, height: 534 },
        { src: screen2, alt: "MZ100 Screenshot 2", width: 247, height: 534 },
        { src: screen3, alt: "MZ100 Screenshot 3", width: 247, height: 534 },
        { src: screen4, alt: "MZ100 Screenshot 4", width: 247, height: 534 },
    ]
}
