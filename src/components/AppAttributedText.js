import { Link, Text } from "@chakra-ui/react";
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
            {text.attribtues.link ? (
              <Link
                href={text.attribtues.link}
                isExternal={text.attribtues.isExternal}
              >
                {text.text}{" "}
              </Link>
            ) : (
              text.text
            )}
          </Text>
        );
      })}
    </>
  );
}

export default AppAttributedText;
