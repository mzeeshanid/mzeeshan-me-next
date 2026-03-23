import { describe, expect, it } from "vitest";
import {
  buildAppleOfferSignaturePayload,
  stripPrivateKeyPem,
} from "@/utils/appleOfferSignature";
import {
  validationSchema,
  type AppleOfferSignatureFormValues,
} from "@/components/Tools/AppleOfferSignature/Form/AppleOfferSignatureForm";

const validValues: AppleOfferSignatureFormValues = {
  bundleId: "com.example.ios",
  kid: "2X9R4HAB12",
  productId: "com.app.subscription.gold",
  offerId: "com.app.subscription.gold.offer",
  accountToken: "customer-123",
  nonce: "550e8400-e29b-41d4-a716-446655440000",
  timeStamp: Date.now(),
  p8Key: `-----BEGIN PRIVATE KEY-----
abc123
-----END PRIVATE KEY-----`,
};

describe("/tools/apple-inapp-promotional-offer-signature-generator-for-testing logic", () => {
  it("builds the StoreKit signature payload with invisible separators", () => {
    const payload = buildAppleOfferSignaturePayload(validValues);

    expect(payload).toContain("\u2063");
    expect(payload.split("\u2063")).toEqual([
      validValues.bundleId,
      validValues.kid,
      validValues.productId,
      validValues.offerId,
      validValues.accountToken,
      validValues.nonce,
      String(validValues.timeStamp),
    ]);
  });

  it("strips the wrapping PEM markers from the p8 key", () => {
    expect(stripPrivateKeyPem(validValues.p8Key)).toBe("abc123");
  });

  it("validates a correct signature request payload", async () => {
    await expect(validationSchema.validate(validValues)).resolves.toEqual(
      validValues,
    );
  });

  it("normalizes uppercase nonces to lowercase", async () => {
    await expect(
      validationSchema.validate({
        ...validValues,
        nonce: "550E8400-E29B-41D4-A716-446655440000",
      }),
    ).resolves.toMatchObject({
      nonce: "550e8400-e29b-41d4-a716-446655440000",
    });
  });

  it("rejects invalid key identifiers longer than 16 characters", async () => {
    await expect(
      validationSchema.validate({
        ...validValues,
        kid: "12345678901234567",
      }),
    ).rejects.toThrow("kid must be at most 16 characters");
  });

  it("rejects invalid timestamps", async () => {
    await expect(
      validationSchema.validate({
        ...validValues,
        timeStamp: -1,
      }),
    ).rejects.toThrow();
  });
});
