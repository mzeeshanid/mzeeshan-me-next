import { Text } from "@chakra-ui/layout";
import React from "react";

function AppAttributedText({ texts }) {
  return (
    <>
      {texts.map((text, idx) => {
        return (
          <Text
            color={text.attribtues.color}
            fontSize={text.attribtues.textBPValue}
            as={text.attribtues.as}
            key={idx}
          >
            {text.text}
          </Text>
        );
      })}
    </>
  );
}

export default AppAttributedText;
