import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { GrSwift } from "react-icons/gr";

type MyIntroProps = {};

const MyIntro: React.FC<MyIntroProps> = (props) => {
  return (
    <HStack gap={4} justify={{ base: "center", md: "flex-start" }}>
      <Box borderRadius="md" rounded={"full"} overflow="hidden">
        <Image
          width={60}
          height={60}
          src={`/assets/profile_pic.jpeg`}
          alt="picture of Muhammad Zeeshan"
          style={{ objectFit: "cover" }}
          blurDataURL="/assets/profile_pic.jpeg"
          loading="lazy"
        />
      </Box>
      <VStack align={"flex-start"} gap={0}>
        <Text fontWeight="bold" fontSize="lg">
          {"Muhammad Zeeshan"}
        </Text>
        <HStack>
          <Text>{"Swift Enthusiast"}</Text>
          <Icon as={GrSwift} />
        </HStack>
      </VStack>
    </HStack>
  );
};

export default MyIntro;
