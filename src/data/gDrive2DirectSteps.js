import React from "react";
import AppAttributedText from "../components/AppAttributedText";
import useTextBPValue from "../hooks/useTextBPValue";

import step1Image from "../../public/assets/g2d_step1.png";
import step2Image from "../../public/assets/g2d_step2.png";
import step3Image from "../../public/assets/g2d_step3.png";
import { theme } from "@chakra-ui/react";

function gDrive2DirectSteps() {
  const textColor = theme.colors.black;
  const textBPValue = useTextBPValue();
  const steps = [
    {
      text: (
        <AppAttributedText
          texts={[
            {
              text: "Step 1",
              attribtues: {
                as: "b",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
            {
              text: " Goto ",
              attribtues: {
                as: "text",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
            {
              text: "Google Drive",
              attribtues: {
                as: "b",
                color: theme.colors.teal[500],
                textBPValue: textBPValue,
                link: "https://drive.google.com",
                isExternal: true,
              },
            },
            {
              text: " and right click the file that you want to share, then click on ",
              attribtues: {
                as: "text",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
            {
              text: "'Get link'.",
              attribtues: {
                as: "b",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
          ]}
        />
      ),
      image: step1Image,
    },
    {
      text: (
        <AppAttributedText
          texts={[
            {
              text: "Step 2",
              attribtues: {
                as: "b",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
            ,
            {
              text: " From the presented pop up change the visibility to ",
              attribtues: {
                as: "text",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
            {
              text: "'Anyone with the link'.",
              attribtues: {
                as: "b",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
          ]}
        />
      ),
      image: step2Image,
    },
    {
      text: (
        <AppAttributedText
          texts={[
            {
              text: "Step 3",
              attribtues: {
                as: "b",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
            {
              text: " Click on ",
              attribtues: {
                as: "text",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
            {
              text: "'Copy link'.",
              attribtues: {
                as: "b",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
          ]}
        />
      ),
      image: step3Image,
    },
    {
      text: (
        <AppAttributedText
          texts={[
            {
              text: "Step 4",
              attribtues: {
                as: "b",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
            {
              text: " Paste the copied link in the field above and click ",
              attribtues: {
                as: "text",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
            {
              text: "'Create Link'",
              attribtues: {
                as: "b",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
            {
              text: " That's it, Enjoy!",
              attribtues: {
                as: "text",
                color: textColor,
                textBPValue: textBPValue,
              },
            },
          ]}
        />
      ),
      image: "",
    },
  ];
  return steps;
}

export default gDrive2DirectSteps;
