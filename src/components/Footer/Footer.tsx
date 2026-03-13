import { Box, Container, Flex, Separator, VStack } from "@chakra-ui/react";

import MyIntro from "../MyIntro/MyIntro";
import FooterContactMe from "./FooterContactMe";
import FooterMainLinks from "./FooterMainLinks";
import FooterSocialLinks from "./FooterSocialLinks";
import FooterTermsRights from "./FooterTermsRights";

type FooterProps = {};

function Footer({}: FooterProps) {
  return (
    <Box as="footer">
      <VStack gap={4}>
        <Container maxW="6xl">
          <FooterContactMe />
        </Container>
        <Container maxW="8xl">
          <VStack gap={4}>
            {/* --- Main Links --- */}
            <Flex
              w="full"
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              align={{ base: "center", md: "center" }}
              pl={4}
              pr={4}
              mt={4}
              mb={4}
              gap={4}
            >
              <MyIntro />
              <FooterMainLinks />
              <FooterSocialLinks />
            </Flex>
            <Separator w="full" />
            <FooterTermsRights />
          </VStack>
        </Container>
      </VStack>
    </Box>
  );
}

export default Footer;
