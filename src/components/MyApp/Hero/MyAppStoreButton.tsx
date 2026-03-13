import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type Props = {
  storeName: string;
  icon: IconType;
  link: string;
};

const MyAppStoreButton: React.FC<Props> = (props: Props) => {
  const { storeName, icon, link } = props;
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      <Box
        bg="bg.inverted"
        color={"fg.inverted"}
        pl={4}
        pr={4}
        pt={2}
        pb={2}
        borderRadius={"lg"}
      >
        <HStack gap={2}>
          <Icon boxSize={{ base: 10, md: 14 }} as={icon} />
          <VStack gap={0} lineHeight={"shorter"}>
            <Text fontWeight={"bold"} fontSize={{ base: 12, md: 16 }}>
              {"Download on the"}
            </Text>
            <Text fontWeight={"extrabold"} fontSize={{ base: 22, md: 28 }}>
              {storeName}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Link>
  );
};

export default MyAppStoreButton;
