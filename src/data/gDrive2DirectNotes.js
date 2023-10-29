import { theme } from "@chakra-ui/react";
import React from "react";
import AppAttributedText from "../components/AppAttributedText";
import useTextBPValue from "../hooks/useTextBPValue";

function gDrive2DirectNotes() {
  const textBPValue = useTextBPValue();
  const textColor = theme.colors.black;
  const notes = [
    <AppAttributedText
      texts={[
        {
          text: "If you want to make your link ",
          attribtues: {
            as: "text",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
        {
          text: "publically downloadable",
          attribtues: {
            as: "b",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
        {
          text: " make sure your file's visibility is set to ",
          attribtues: {
            as: "text",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
        {
          text: "Anyone with the link",
          attribtues: {
            as: "b",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
        {
          text: " Otherwise only allowed people can download the file.",
          attribtues: {
            as: "text",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
      ]}
    />,
    <AppAttributedText
      texts={[
        {
          text: "The direct link only work with ",
          attribtues: {
            as: "text",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
        {
          text: "uploaded files",
          attribtues: {
            as: "b",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
        {
          text: " on Google Drive. It does not work for ",
          attribtues: {
            as: "text",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
        {
          text: "documents",
          attribtues: {
            as: "b",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
        {
          text: " created with Google Docs.",
          attribtues: {
            as: "text",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
      ]}
    />,
    <AppAttributedText
      texts={[
        {
          text: "For larger files direct link may open a ",
          attribtues: {
            as: "text",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
        {
          text: "warning page",
          attribtues: {
            as: "b",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
        {
          text: " that Google cannot scan this file for viruses because of its large size. However user can continue downloading after acknowledgement.",
          attribtues: {
            as: "text",
            color: textColor,
            textBPValue: textBPValue,
          },
        },
      ]}
    />,
  ];
  return notes;
}

export default gDrive2DirectNotes;
