import { useColorPalette } from "@/contexts/useColorPalette";
import { Card, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type MyPerformanceStatProps = {
  title: string;
  value: string;
  icon: IconType;
};

const MyPerformanceStatItem: React.FC<MyPerformanceStatProps> = (
  props: MyPerformanceStatProps
) => {
  const { palette } = useColorPalette();
  return (
    <Card.Root bg="bg.subtle" borderWidth={0}>
      <Card.Header>
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          color={`${palette}.fg`}
          fontWeight={{ base: "bold", md: "extrabold" }}
        >
          {props.value}
        </Text>
      </Card.Header>
      <Card.Body>
        <HStack justify={"space-between"}>
          <Text>{props.title}</Text>
          <Icon
            as={props.icon}
            color={`${palette}.fg`}
            boxSize={{ base: 10, md: 12 }}
          />
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default MyPerformanceStatItem;
