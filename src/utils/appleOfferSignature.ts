import type { AppleOfferSignatureFormValues } from "@/components/Tools/AppleOfferSignature/Form/AppleOfferSignatureForm";

export const buildAppleOfferSignaturePayload = (
  values: AppleOfferSignatureFormValues,
): string => {
  const components = [
    values.bundleId,
    values.kid,
    values.productId,
    values.offerId,
    values.accountToken,
    values.nonce,
    values.timeStamp,
  ];

  return components.join("\u2063");
};

export const stripPrivateKeyPem = (p8Key: string): string => {
  return p8Key
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .trim();
};
