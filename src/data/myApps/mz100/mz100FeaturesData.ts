import { FaGamepad, FaBrain, FaUndo, FaLightbulb } from "react-icons/fa";
import { MyAppFeaturesDataModel } from "../myAppFeaturesData";

export const mz100FeaturesData: MyAppFeaturesDataModel = {
    header: {
        badge: "Features",
        title: "Master the puzzle challenge",
        detail: "Reveal all 100 boxes with smart strategy and tactical thinking"
    },
    features: [
        {
            title: "Strategic Gameplay",
            icon: FaBrain,
            bullets: [
                "First box revealed automatically and randomly.",
                "Next box must be 2 boxes away horizontally or vertically.",
                "Additionally next box must be 1 box away diagonally.",
                "Plan ahead and think strategically.",
            ]
        },
        {
            title: "100 Box Challenge",
            icon: FaGamepad,
            bullets: [
                "Reveal all 100 boxes in shortest time possible.",
                "Complete puzzles and unlock achievements.",
                "Track your best times and progress.",
                "Multiple difficulty levels.",
            ]
        },
        {
            title: "Undo & Revert",
            icon: FaUndo,
            bullets: [
                "Any move can be reverted at any time.",
                "No limit on reverting moves.",
                "Experiment without consequences.",
                "Perfect your strategy before committing.",
            ]
        },
        {
            title: "Smart Highlights",
            icon: FaLightbulb,
            bullets: [
                "Possible moves highlighted automatically.",
                "Visual guidance for next valid moves.",
                "Easy to understand game mechanics.",
                "Compete with friends and leaderboards.",
            ]
        }
    ]
};
