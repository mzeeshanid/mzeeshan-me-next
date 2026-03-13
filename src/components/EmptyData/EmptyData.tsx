import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FiHardDrive } from "react-icons/fi";

type EmptyDataProps = {
  title: string;
  detail: string;
};

const EmptyData: React.FC<EmptyDataProps> = (props: EmptyDataProps) => {
  const { title, detail } = props;
  return (
    <Box>
      <VStack pt={12} pb={12}>
        <Icon boxSize={{ base: 10, md: 12 }}>
          <FiHardDrive />
        </Icon>
        <Text fontWeight={"semibold"} fontSize={"2xl"}>
          {title}
        </Text>
        <Text>{detail}</Text>
      </VStack>
    </Box>
  );
};

export default EmptyData;
