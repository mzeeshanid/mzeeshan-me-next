import { theme } from "@chakra-ui/react";
import React from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaMedium,
  FaSkype,
  FaStackOverflow,
  FaTwitter,
} from "react-icons/fa";

export default function mySocialConnect() {
  return [
    {
      title: "Twitter",
      desc: "Follow me on twitter",
      icon: <FaTwitter size={"50px"} color={theme.colors.black} />,
      url: "//twitter.com/mzeeshanid",
    },
    {
      title: "LinkedIn",
      desc: "Connect on LinkedIn",
      icon: <FaLinkedinIn size={"50px"} color={theme.colors.black} />,
      url: "//linkedin.com/in/muhammad-zeeshan-04b8585b/",
    },
    {
      title: "Medium",
      desc: "Follow me on Medium",
      icon: <FaMedium size={"50px"} color={theme.colors.black} />,
      url: "//mzeeshanid.medium.com",
    },
    {
      title: "Github",
      desc: "Checkout on Github",
      icon: <FaGithub size={"50px"} color={theme.colors.black} />,
      url: "//github.com/mzeeshanid",
    },
    {
      title: "Skype",
      desc: "Add and chat on Skype",
      icon: <FaSkype size={"50px"} color={theme.colors.black} />,
      url: "skype:mzeeshanid",
    },
    {
      title: "Stack",
      desc: "Checkout on StackOverflow",
      icon: <FaStackOverflow size={"50px"} color={theme.colors.black} />,
      url: "//stackoverflow.com/users/1796092/muhammad-zeeshan",
    },
  ];
}
