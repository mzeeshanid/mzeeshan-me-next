import { MyAppScreenshotsDataModel } from "../myAppScreenshotsData";
import screen1 from "../../../../public/assets/mzvisits/MZVisits_Screenshot_1.png";
import screen2 from "../../../../public/assets/mzvisits/MZVisits_Screenshot_2.png";
import screen3 from "../../../../public/assets/mzvisits/MZVisits_Screenshot_3.png";
import screen4 from "../../../../public/assets/mzvisits/MZVisits_Screenshot_4.png";
import screen5 from "../../../../public/assets/mzvisits/MZVisits_Screenshot_5.png";
import screen6 from "../../../../public/assets/mzvisits/MZVisits_Screenshot_6.png";

export const mzVisitsScreenshotsData: MyAppScreenshotsDataModel = {
    header: {
        badge: "Screenshots",
        title: "How does the app look?",
        description: "Take a look at some screenshots of the app in action.",
    },
    screenshots: [
        { src: screen1, alt: "MZVisits Screenshot 1", width: 247, height: 534 },
        { src: screen2, alt: "MZVisits Screenshot 2", width: 247, height: 534 },
        { src: screen3, alt: "MZVisits Screenshot 3", width: 247, height: 534 },
        { src: screen4, alt: "MZVisits Screenshot 4", width: 247, height: 534 },
        { src: screen5, alt: "MZVisits Screenshot 5", width: 247, height: 534 },
        { src: screen6, alt: "MZVisits Screenshot 6", width: 247, height: 534 },
    ]
}
