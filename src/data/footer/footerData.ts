import { IconType } from 'react-icons';
import { FaBloggerB, FaGithub, FaGraduationCap, FaLinkedin, FaMedium, FaStackOverflow, FaUpwork, FaXTwitter, FaYoutube, FaArrowUpRightFromSquare } from 'react-icons/fa6';


type FooterData = {
    socialLinks: FooterSocialLink[];
    mainLinks: FooterLinkItem[];
    bottomLinks: FooterLinkItem[];
    rightsReserved?: string;
    nextJs: FooterLinkItem;
    chakraUi: FooterLinkItem;
};

type FooterSocialLink = {
    icon: IconType;
    link: string;
};

type FooterLinkItem = {
    label: string;
    url: string;
    icon?: IconType;
}

const footerData = (): FooterData => {
    return {
        socialLinks: [
            {
                icon: FaXTwitter,
                link: 'https://x.com/mzeeshanid',
            },
            {
                icon: FaLinkedin,
                link: 'https://www.linkedin.com/in/muhammad-zeeshan-04b8585b/',
            },
            {
                icon: FaMedium,
                link: 'https://medium.com/@mzeeshanid',
            },
            {
                icon: FaGithub,
                link: 'https://github.com/mzeeshanid',
            },
            {
                icon: FaYoutube,
                link: 'https://www.youtube.com/@SwiftNest-mu4mb',
            },
            {
                icon: FaStackOverflow,
                link: 'https://stackoverflow.com/users/1796092/muhammad-zeeshan',
            },
        ],
        mainLinks: [
            {
                label: 'Blog',
                url: '/blog',
                icon: FaBloggerB
            },
            {
                label: 'MSCS Thesis',
                url: 'http://111.68.99.22:8080/xmlui/handle/123456789/8912',
                icon: FaGraduationCap
            },
            {
                label: 'Upwork',
                url: 'https://www.upwork.com/fl/mzeeshanid',
                icon: FaUpwork
            },
            {
                label: 'Fiverr',
                url: 'https://www.fiverr.com/s/w52zEo',
                icon: FaArrowUpRightFromSquare
            },
        ],
        bottomLinks: [
            {
                label: 'Privacy Policy',
                url: '/privacy',
            },
            {
                label: 'Terms of Service',
                url: '/terms',
            }
        ],
        rightsReserved: `© ${new Date().getFullYear()} All rights reserved.`,
        nextJs: {
            label: 'Next.js',
            url: 'https://nextjs.org/',
        },
        chakraUi: {
            label: 'Chakra UI',
            url: 'https://chakra-ui.com/',
        },
    }
}

export default footerData;