import {
  Box,
  Center,
  Code,
  Heading,
  Link,
  Text,
  theme,
  VStack,
} from "@chakra-ui/react";
import React from "react";

function PromotionalOfferInfo() {
  return (
    <Center>
      <VStack maxW={"1200px"} p={4}>
        <Heading>Information</Heading>
        <Text>
          This tool is utilising the logic from the sample project provided by{" "}
          <Link
            color={theme.colors.teal[500]}
            isExternal
            href="https://developer.apple.com/documentation/storekit/generating-a-promotional-offer-signature-on-the-server"
          >
            Apple Here.
          </Link>{" "}
          For purchasing{" "}
          <Link
            color={theme.colors.teal[500]}
            isExternal
            href="https://developer.apple.com/documentation/storekit/setting-up-promotional-offers"
          >
            promotional offers
          </Link>{" "}
          developer needs some additional paramters to pass in for{" "}
          <Link
            color={theme.colors.teal[500]}
            isExternal
            href="https://developer.apple.com/documentation/storekit/generating-a-promotional-offer-signature-on-the-server"
          >
            SKPayment
          </Link>{" "}
          before adding it in the{" "}
          <Link
            color={theme.colors.teal[500]}
            isExternal
            href="https://developer.apple.com/documentation/storekit/skpaymentqueue"
          >
            payment queue
          </Link>
          . For example:
        </Text>
        <Code p={4}>
          let discount = SKPaymentDiscount(identifier: offerIdentifier,
          <br />
          keyIdentifier: keyIDentifier,
          <br /> nonce: UUID(uuidString: nonce),
          <br />
          signature: signature,
          <br /> timestamp: NSNumber(value: timeStamp))
          <br /> payment.paymentDiscount = discount
          <br />
          <br />
          SKPaymentQueue.default().add(payment)
        </Code>
        <Text fontWeight={"bold"}>
          NB: This tool works within a browser locally and does not sync keys.
          You can always revoke your keys from{" "}
          <Link
            color={theme.colors.teal[500]}
            isExternal
            href="https://appstoreconnect.apple.com/"
          >
            App Store Connect.
          </Link>
          Server side is required to get the additional parameters mainly
          because adding your private key inside your app's bundle isn't a good
          idea.
        </Text>
      </VStack>
    </Center>
  );
}

export default PromotionalOfferInfo;
