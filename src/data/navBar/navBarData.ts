import { IconType } from 'react-icons';
import { FaHouse, FaHammer, FaBloggerB, FaMedium, FaGithub, FaStackOverflow } from 'react-icons/fa6';

type NavBarData = {
    mainLinks: NavBarLinkItem[];
    themeColors: ThemeColorItem[];
};

type NavBarLinkItem = {
    label: string;
    url: string;
    icon?: IconType;
}

type ThemeColorItem = {
    key: string
    name: string;
}

const navBarData = (): NavBarData => {
    return {
        mainLinks: [
            {
                label: "Home",
                url: "/",
                icon: FaHouse,
            },
            {
                label: "Blog",
                url: "/blog",
                icon: FaBloggerB,
            },
            {
                label: "Tools",
                url: "/tools",
                icon: FaHammer,
            },
            {
                label: "Github",
                url: "https://github.com/mzeeshanid",
                icon: FaGithub,
            },
            {
                label: "Medium",
                url: "https://medium.com/@mzeeshanid",
                icon: FaMedium,
            },
            {
                label: "Stack",
                url: "https://stackoverflow.com/users/1796092/muhammad-zeeshan",
                icon: FaStackOverflow,
            },
        ],
        themeColors: [
            {
                key: "gray",
                name: "Gray",
            },
            {
                key: "red",
                name: "Red",
            },
            {
                key: "orange",
                name: "Orange",
            }, 
            {
                key: "yellow",
                name: "Yellow",
            }, 
            {
                key: "green",
                name: "Green",
            },
            {
                key: "teal",
                name: "Teal",
            },
            {
                key: "blue",
                name: "Blue",
            },
            {
                key: "cyan",
                name: "Cyan",
            },
            {
                key: "purple",
                name: "Purple",
            },
            {
                key: "pink",
                name: "Pink",
            },
        ],
    }
}

export default navBarData;