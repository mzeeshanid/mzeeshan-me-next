import { Separator, Text, VStack } from "@chakra-ui/react";
import React from "react";

type MyStatItemProps = {
  title: string;
  value: string;
};

const MyStatItem: React.FC<MyStatItemProps> = (props: MyStatItemProps) => {
  const { title, value } = props;
  return (
    <VStack align={"flex-start"} gap={4}>
      <VStack align={"flex-start"} gap={0}>
        <Text textStyle={{ base: "xl", md: "2xl" }} fontWeight="semibold">
          {value}
        </Text>
        <Text whiteSpace="nowrap" color={"fg.muted"}>
          {title}
        </Text>
      </VStack>
      <Separator w={"full"} />
    </VStack>
  );
};

export default MyStatItem;
