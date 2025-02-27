import {
  Box,
  Center,
  Code,
  Flex,
  Heading,
  Link,
  Text,
  theme,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import promoAppIcon from "../../../public/assets/promotional_offer_appicon.png";
import PromotionalOfferForm from "./PromotionalOfferForm";

function PromotionalOfferHero() {
  const paddingBPValue = useBreakpointValue({
    base: 2,
    md: 4,
    lg: 8,
  });

  const spacingBPValue = useBreakpointValue({
    base: 1,
    md: 2,
    lg: 4,
  });

  const appIconImageBPValue = useBreakpointValue({
    base: 75,
    md: 90,
    lg: 120,
  });

  const textBPValue = useBreakpointValue({
    base: "lg",
    lg: "xl",
  });

  const headingBPValue = useBreakpointValue({
    base: "xl",
    lg: "2xl",
  });

  const padding = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  return (
    <VStack>
      <Center w="100%" bg={theme.colors.gray[50]}>
        <Box maxW={1200} py={paddingBPValue}>
          <VStack spacing={spacingBPValue}>
            <Image
              src={promoAppIcon}
              placeholder={"blur"}
              alt="Apple Promotional Offer Signature Generator"
              width={appIconImageBPValue}
              height={appIconImageBPValue}
            />
            <VStack>
              <Text
                color={theme.colors.gray[500]}
                as={"b"}
                fontSize={textBPValue}
                textAlign="center"
              >
                PROMOTIONAL OFFER
              </Text>
              <Text
                color={theme.colors.gray[500]}
                fontSize={textBPValue}
                textAlign="center"
              >
                Signature Generator!
              </Text>
              <VStack>
                <Heading size={headingBPValue} textAlign="center">
                  Apple Promotional Offer Signature Generator
                </Heading>
                <Text as={"h2"} fontSize={textBPValue} textAlign="center">
                  This tool allows you to{" "}
                  <Link
                    color={theme.colors.teal[500]}
                    isExternal
                    href="https://developer.apple.com/documentation/storekit/generating-a-signature-for-promotional-offers"
                  >
                    generate a promotional offer signature
                  </Link>{" "}
                  for testing that developer need to send in the{" "}
                  <Code> SKPaymentDiscount </Code> during a purchase of{" "}
                  <Link
                    color={theme.colors.teal[500]}
                    isExternal
                    href="https://developer.apple.com/app-store/subscriptions/"
                  >
                    In App subscription
                  </Link>{" "}
                  via{" "}
                  <Link
                    color={theme.colors.teal[500]}
                    isExternal
                    href="https://developer.apple.com/documentation/storekit/"
                  >
                    StoreKit.
                  </Link>
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </Box>
      </Center>
      <Center width={"100%"}>
        <Box width={"100%"} align="center" bg={theme.colors.white}>
          <Flex
            w="100%"
            pl={padding}
            pt={padding}
            pr={padding}
            direction={{ base: "column", md: "row" }}
            justify="space-around"
            maxW="1200px"
          >
            <PromotionalOfferForm />
          </Flex>
        </Box>
      </Center>
    </VStack>
  );
}

export default PromotionalOfferHero;
