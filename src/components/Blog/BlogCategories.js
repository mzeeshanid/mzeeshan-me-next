import {
  Button,
  Center,
  LinkBox,
  LinkOverlay,
  Wrap,
  WrapItem,
  theme,
} from "@chakra-ui/react";
import React from "react";

export default function BlogCategories({ categories }) {
  const menuItems = () => {
    return categories.map((category, idx) => {
      const categoryAttributes = category.attributes;
      return (
        <LinkBox key={idx}>
          <LinkOverlay
            href={`/category/${categoryAttributes.slug}`}
            color="teal"
          >
            <Button variant="outline" colorScheme="teal">
              {categoryAttributes.name}
            </Button>
          </LinkOverlay>
        </LinkBox>
      );
    });
  };

  return (
    <Center p={4} bg={theme.colors.gray[50]}>
      <Wrap spacing={4}>
        {menuItems().map((item, idx) => {
          return <WrapItem key={idx}>{item}</WrapItem>;
        })}
      </Wrap>
    </Center>
  );
}
