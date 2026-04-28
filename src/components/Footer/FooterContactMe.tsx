import { Box, Button, Heading, Link, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import profilePic from "../../../public/assets/profile_pic.jpeg";
import { useColorPalette } from "../../contexts/useColorPalette";

type FooterContactMeProps = {};

const FooterContactMe = ({}: FooterContactMeProps) => {
  const { palette } = useColorPalette();

  return (
    <VStack
      bg={"bg.subtle"}
      w="full"
      pt={12}
      pb={12}
      gap={4}
      rounded={"sm"}
      borderWidth={1}
      textAlign={"center"}
    >
      <Box w="80px" h="80px" flexShrink={0} borderRadius="md" rounded={"full"} overflow="hidden">
        <Image
          width={80}
          height={80}
          src={profilePic}
          alt="Logo"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          placeholder="blur"
          sizes="80px"
        />
      </Box>
      <Heading as={"h3"}>{"Have any questions?"}</Heading>
      <Text>
        {"Feel free to reach out! I am happy to answer your questions."}
      </Text>
      <Link href="/contact">
        <Button
          as={"span"}
          variant={"solid"}
          size={"lg"}
          colorPalette={palette}
        >
          {"Contact Me"}
        </Button>
      </Link>
    </VStack>
  );
};

export default FooterContactMe;
