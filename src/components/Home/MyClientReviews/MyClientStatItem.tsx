import { Text, VStack } from "@chakra-ui/react";
import React from "react";

type MyClientStatItemProps = {
  item: {
    label: string;
    value: string;
  };
  idx: number;
};

const MyClientStatItem: React.FC<MyClientStatItemProps> = (props) => {
  const { item, idx } = props;
  return (
    <VStack key={idx} gap={2} px={{ base: 0, md: 8 }} textAlign="center">
      <Text textStyle={{ base: "2xl", md: "4xl" }} fontWeight="semibold">
        {item.value}
      </Text>
      <Text whiteSpace="nowrap" color="fg.muted">
        {item.label}
      </Text>
    </VStack>
  );
};

export default MyClientStatItem;
