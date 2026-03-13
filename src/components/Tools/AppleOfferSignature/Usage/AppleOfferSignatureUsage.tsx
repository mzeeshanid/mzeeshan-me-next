import ArticleContent from "@/components/Blog/ArticleContent/ArticleContent";
import { MarkDownCodeBlock } from "@/components/Markdown/CodeBlock";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Box, Heading, Spacer, Text } from "@chakra-ui/react";
import React from "react";

type Props = {};

const AppleOfferSignatureUsage: React.FC<Props> = (props: Props) => {
  const storeKit1Code = `let discount = SKPaymentDiscount(identifier: offerIdentifier,
  keyIdentifier: keyIDentifier,
  nonce: UUID(uuidString: nonce),
  signature: signature,
  timestamp: NSNumber(value: timeStamp))
  
  payment.paymentDiscount = discount
  SKPaymentQueue.default().add(payment)`;

  const storeKit2Code = `private func getOfferDetails(offerId: String,
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
    }`;

  const storeKit2Usage = `var options: [Product.PurchaseOption] = []
if let offerId {
    let offer = try? await getOfferDetails(offerId: offerId, productId: productId)
    if let offer {
      options.append(offer)
    }
}

let result = try await product.purchase(options: Set(options))`;

  return (
    <Box as="section">
      <SectionHeader tagline={"Usage"} headline="How to use" />
      <ArticleContent
        content={`This tool is utilising the logic from the sample project provided by  [Apple Here.](https://developer.apple.com/documentation/storekit/generating-a-promotional-offer-signature-on-the-server)  For purchasing  [promotional offers](https://developer.apple.com/documentation/storekit/setting-up-promotional-offers)  developer needs some additional parameters to pass in before adding it in the  [payment queue](https://developer.apple.com/documentation/storekit/skpaymentqueue). See example below.`}
      />
      <Spacer p={4} />
      <Box w="full" bg="bg.subtle" p={4} borderRadius="md">
        <Heading>{"StoreKit 1"}</Heading>
        <MarkDownCodeBlock className="language-swift">
          {storeKit1Code}
        </MarkDownCodeBlock>
      </Box>
      <Spacer p={4} />
      <Box w="full" bg="bg.subtle" p={4} borderRadius="md">
        <Heading>{"StoreKit 2"}</Heading>
        <MarkDownCodeBlock className="language-swift">
          {storeKit2Code}
        </MarkDownCodeBlock>
        <Text>{"Here is how you purchase the product with the offer"}</Text>
        <MarkDownCodeBlock className="language-swift">
          {storeKit2Usage}
        </MarkDownCodeBlock>
      </Box>
    </Box>
  );
};

export default AppleOfferSignatureUsage;
