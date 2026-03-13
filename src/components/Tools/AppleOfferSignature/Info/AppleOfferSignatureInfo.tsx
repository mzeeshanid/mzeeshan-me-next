import { Code, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {};

const AppleOfferSignatureInfo: React.FC<Props> = (props: Props) => {
  return (
    <VStack
      borderRadius={"lg"}
      w="100%"
      align={"start"}
      p={4}
      gap={2}
      fontSize={"xs"}
      bg={`bg`}
    >
      <Text>
        {"For "}
        <Link
          fontWeight={"bold"}
          variant={"underline"}
          href="https://developer.apple.com/documentation/storekit/"
        >
          {"StoreKit1"}
        </Link>
        {
          ", make sure to set the same username or account token before adding to payment queue otherwise use will receive "
        }
        <Link
          variant={"underline"}
          href="https://developer.apple.com/documentation/storekit/skerror"
        >
          {"SKErrorDomain error 12"}
        </Link>
      </Text>
      <Code textAlign={"start"} p={2}>
        {"let payment = SKMutablePayment(product: product)"}
        <br />
        {'payment.applicationUsername = "xyz"'}
      </Code>
      <Text textAlign={"start"}>
        {"For "}
        <Link
          fontWeight={"bold"}
          variant={"underline"}
          href="https://developer.apple.com/storekit/"
        >
          {"StoreKit2"}
        </Link>{" "}
        {
          "Application username or Account token is no longer required but make sure to set it empty string while generating the signature. Otherwise you will receive"
        }
        <Code>{"AMSServerErrorCode=3903"}</Code>
      </Text>
    </VStack>
  );
};

export default AppleOfferSignatureInfo;
