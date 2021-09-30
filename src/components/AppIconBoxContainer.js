import {
  LinkBox,
  LinkOverlay,
  VStack,
  Wrap,
  WrapItem,
  theme,
} from "@chakra-ui/react";
import React from "react";
import isExternalLink from "../hooks/isExternalLink";
import AppHeadingText from "./AppHeadingText";
import AppIconBox from "./AppIconBox";

function AppIconBoxContainer({ title, info, data, bg = "white" }) {
  return (
    <VStack bg={bg}>
      <AppHeadingText
        headingColor={theme.colors.black}
        w="100%"
        heading={title}
        text={info}
        bg="transparent"
      />
      <Wrap maxW="1200px" justify="center">
        {data.map((item, idx) => {
          return (
            <WrapItem key={idx} minW="320px" p={8}>
              <LinkBox>
                <LinkOverlay
                  key={idx}
                  href={item.url}
                  isExternal={isExternalLink(item.url)}
                >
                  <AppIconBox
                    title={item.title}
                    detail={item.detail}
                    image={item.image}
                    alt={item.alt}
                  />
                </LinkOverlay>
              </LinkBox>
            </WrapItem>
          );
        })}
      </Wrap>
    </VStack>
  );
}

export default AppIconBoxContainer;
