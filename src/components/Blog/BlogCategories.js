import {
  Center,
  Wrap,
  WrapItem,
  LinkBox,
  LinkOverlay,
  Button,
  theme,
} from "@chakra-ui/react";
import React from "react";

export default function BlogCategories({ categories }) {
  const menuItems = () => {
    return categories.map((item, idx) => {
      return (
        <LinkBox key={idx}>
          <LinkOverlay href={`/category/${item.slug}`} color="teal">
            <Button variant="outline" colorScheme="teal">
              {item.name}
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
