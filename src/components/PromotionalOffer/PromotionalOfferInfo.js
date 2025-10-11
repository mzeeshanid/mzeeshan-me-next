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
        <Text w="100%">
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
          . <b>StoreKit1 example:</b>
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
        <Text textAlign={"start"} fontWeight={"bold"} w="100%">
          StoreKit2 example:
        </Text>
        <Code p={4} whiteSpace="pre">
          {`private func getOfferDetails(offerId: String,
                                 productId: String) async throws -> Product.PurchaseOption {
        try await withCheckedThrowingContinuation { continuation in
            IMPPackagesAPI.getOfferDetails(offerID: offerId,
                                           productId: productId) { result in
                switch result {
                case .success(let response):
                    guard let offerData = response.data,
                          let nonce = UUID(uuidString: offerData.nonce),
                          let signature = Data(base64Encoded: offerData.signature) else {
                        continuation.resume(throwing: NSError(domain: "OfferDataMissing", code: -1))
                        return false
                    }
                    
                    let offerId = offerData.offerIdentifier
                    let keyId = offerData.keyIDentifier
                    let timestamp = Int(offerData.timeStamp)
                    
                    let offer = Product.PurchaseOption.promotionalOffer(offerID: offerId,
                                                                        keyID: keyId,
                                                                        nonce: nonce,
                                                                        signature: signature,
                                                                        timestamp: timestamp)
                    continuation.resume(returning: offer)
                    return true
                case .failure(let error):
                    continuation.resume(throwing: error)
                    return false
                }
            }
        }
    }`}
        </Code>
        <Text w="100%">
          Here is how you purchase the product with the offer
        </Text>
        <Code p={4} whiteSpace="pre">
          {`var options: [Product.PurchaseOption] = []
                
                if let offerId {
                    let offer = try? await getOfferDetails(offerId: offerId,
                                                          productId: productId)
                    
                    if let offer {
                        options.append(offer)
                    }
                }
                
                let result = try await product.purchase(options: Set(options))`}
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
