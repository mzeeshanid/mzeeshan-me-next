type MyStatData = {
    title: string;
    detail: string;
    stats: MyStatItem[];
    tagline: string;
}

type MyStatItem = {
    title: string;
    value: string;
}

const myStatsData = () : MyStatData => {
    return {
        tagline: "Experience. Excellence. Trust.",
        title: "By The Numbers",
        detail: "A snapshot of my professional journey—from academic foundation to real-world impact, building trust through consistent delivery and technical excellence.",
        stats: [
            {
                title: "Experience",
                value: "10+ Years",
            },
            {
                title: "Education",
                value: "MSCS (BUKC)",
            },
            {
                title: "Apps",
                value: "25+ Published",
            },
            {
                title: "Open Source",
                value: "5+ Repos",
            },
            {
                title: "Satisfaction Rate",
                value: "100%"
            },
            {
                title: "Trust Level",
                value: "100%"
            },
        ],
        
    }
}

export default myStatsData;