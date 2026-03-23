import { useColorPalette } from "@/contexts/useColorPalette";
import { appleOfferSignatureMetaData } from "@/data/tools/appleOfferSignature/appleOfferSignatureMetaData";
import {
  Badge,
  Box,
  Button,
  Card,
  Field,
  Heading,
  HStack,
  Input,
  Link,
  Spacer,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import AppleOfferSignatureInfo from "../Info/AppleOfferSignatureInfo";

import ECKey from "ec-key";
import AppleOfferSignatureOutput from "../Output/AppleOfferSignatureOutput";
import { Toaster, toaster } from "@/components/ui/toaster";
import {
  buildAppleOfferSignaturePayload,
  stripPrivateKeyPem,
} from "@/utils/appleOfferSignature";
import { sign } from "crypto";

type Props = {};

const AppleOfferSignatureForm: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const meta = appleOfferSignatureMetaData;
  const initialValues: AppleOfferSignatureFormValues = {
    bundleId: "",
    kid: "",
    productId: "",
    offerId: "",
    nonce: "",
    timeStamp: 0,
    p8Key: "",
  };

  const [signatureRaw, setSignatureRaw] = useState<string>("");
  const [keyPem, setKeyPem] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [ready, setReady] = useState<boolean>(false);

  return (
    <Box as="section">
      <Card.Root w="full" bg="bg.subtle">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setReady(false);

            const bundleId = values.bundleId;
            const kid = values.kid;
            const productId = values.productId;
            const offerId = values.offerId;
            const token = values.accountToken;
            const nonce = values.nonce;
            const timeStamp = values.timeStamp;
            const p8Key = values.p8Key;

            const nakedKey = stripPrivateKeyPem(p8Key);
            const combined = buildAppleOfferSignaturePayload(values);
            setSignatureRaw(combined);

            // Create an Elliptic Curve Digital Signature Algorithm (ECDSA) object using the private key.
            const key = new ECKey(nakedKey, "pkcs8");

            setKeyPem(key.toString());

            // Set up the cryptographic format used to sign the key with the SHA-256 hashing algorithm.
            const cryptoSign = key.createSign("SHA256");

            // Add the payload string to sign.
            cryptoSign.update(combined);

            /*
          The Node.js crypto library creates a DER-formatted binary value signature,
          and then base-64 encodes it to create the string that you will use in StoreKit.
          */
            const signature = cryptoSign.sign("base64");
            setSignature(String(signature));
            setReady(true);

            toaster.success({
              title: `Signature Generated Successfully`,
              description: `For details see the section below.`,
              closable: true,
              action: {
                label: "Copy",
                onClick: () => {
                  navigator.clipboard.writeText(String(signature));
                },
              },
            });
          }}
        >
          {({
            handleChange,
            values,
            errors,
            touched,
            resetForm,
            setFieldTouched,
            setFieldValue,
            handleSubmit,
          }) => {
            return (
              <Form>
                <Toaster />
                <Card.Header>
                  <VStack align={"start"}>
                    <Heading size={"3xl"} as="h1">
                      {meta.title}
                    </Heading>
                    <Text color={"fg.muted"}>{meta.desc}</Text>
                    <Link
                      variant={"underline"}
                      href="https://developer.apple.com/documentation/storekit/generating-a-signature-for-promotional-offers"
                    >
                      {"Learn more about the field requirements here"}
                    </Link>
                  </VStack>
                </Card.Header>
                <Card.Body>
                  <Stack gap={6}>
                    <Stack gap={6} direction={{ base: "column", md: "row" }}>
                      <Field.Root
                        required
                        colorPalette={palette}
                        invalid={!!(errors.bundleId && touched.bundleId)}
                      >
                        <Field.Label>
                          {"APP BUNDLE IDENTIFIER"} <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          name="bundleId"
                          placeholder="Enter app's bundle identifier"
                          size="lg"
                          value={values.bundleId}
                          onChange={handleChange}
                          onBlur={() => {
                            setFieldTouched("bundleId", true, true);
                          }}
                        />
                        <Field.HelperText>
                          {"E.g: com.app.ios"}
                        </Field.HelperText>
                        {errors.bundleId && touched.bundleId && (
                          <Field.ErrorText>{errors.bundleId}</Field.ErrorText>
                        )}
                      </Field.Root>
                      <Field.Root
                        colorPalette={palette}
                        required
                        invalid={!!(errors.kid && touched.kid)}
                      >
                        <Field.Label>
                          {"KEY IDENTIFIER"} <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          name="kid"
                          placeholder="Enter key identifier"
                          size="lg"
                          value={values.kid}
                          onChange={handleChange}
                          onBlur={() => {
                            setFieldTouched("kid", true, true);
                          }}
                        />
                        <Field.HelperText>{"E.g: 2X9R4HAB12"}</Field.HelperText>
                        {errors.kid && touched.kid && (
                          <Field.ErrorText>{errors.kid}</Field.ErrorText>
                        )}
                      </Field.Root>
                    </Stack>
                    <Stack gap={6} direction={{ base: "column", md: "row" }}>
                      <Field.Root
                        colorPalette={palette}
                        required
                        invalid={!!(errors.productId && touched.productId)}
                      >
                        <Field.Label>
                          {"PRODUCT IDENTIFIER"} <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          name="productId"
                          placeholder="Enter product identifier"
                          size="lg"
                          value={values.productId}
                          onChange={handleChange}
                          onBlur={() => {
                            setFieldTouched("productId", true, true);
                          }}
                        />
                        <Field.HelperText>
                          {"E.g: com.app.subscription.gold"}
                        </Field.HelperText>
                        {errors.productId && touched.productId && (
                          <Field.ErrorText>{errors.productId}</Field.ErrorText>
                        )}
                      </Field.Root>
                      <Field.Root
                        colorPalette={palette}
                        required
                        invalid={!!(errors.offerId && touched.offerId)}
                      >
                        <Field.Label>
                          {"OFFER IDENTIFIER"} <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          name="offerId"
                          placeholder="Enter offer identifier"
                          size="lg"
                          value={values.offerId}
                          onChange={handleChange}
                          onBlur={() => {
                            setFieldTouched("offerId", true, true);
                          }}
                        />
                        <Field.HelperText>
                          {"E.g: com.app.subscription.gold.fiftyOff"}
                        </Field.HelperText>
                        {errors.offerId && touched.offerId && (
                          <Field.ErrorText>{errors.offerId}</Field.ErrorText>
                        )}
                      </Field.Root>
                    </Stack>
                    <Stack gap={6} direction={"column"}>
                      <Field.Root
                        colorPalette={palette}
                        required={false}
                        invalid={
                          !!(errors.accountToken && touched.accountToken)
                        }
                      >
                        <Field.Label>
                          {"USERNAME -OR- ACCOUNT TOKEN"}{" "}
                          <Field.RequiredIndicator
                            fallback={
                              <Badge size="xs" variant="surface">
                                Optional
                              </Badge>
                            }
                          />
                        </Field.Label>
                        <Input
                          name="accountToken"
                          placeholder="Enter app username or app account token (lower cased)"
                          size="lg"
                          value={values.accountToken}
                          onChange={handleChange}
                          onBlur={() => {
                            setFieldTouched("accountToken", true, true);
                          }}
                        />
                        <Field.HelperText>
                          {"User defined optional string. May be empty."}
                        </Field.HelperText>
                        {errors.accountToken && touched.accountToken && (
                          <Field.ErrorText>
                            {errors.accountToken}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                      <AppleOfferSignatureInfo />
                    </Stack>
                    <Stack gap={6} direction={{ base: "column", md: "row" }}>
                      <Field.Root
                        colorPalette={palette}
                        required
                        invalid={!!(errors.nonce && touched.nonce)}
                      >
                        <Field.Label w="full">
                          <HStack w={"full"} justify={"space-between"}>
                            <HStack>
                              {"NONCE"} <Field.RequiredIndicator />
                            </HStack>
                            <Button
                              variant={"ghost"}
                              size={"xs"}
                              onClick={() => {
                                setFieldValue("nonce", uuidv4());
                              }}
                            >
                              {"Generate"}
                            </Button>
                          </HStack>
                        </Field.Label>
                        <Input
                          name="nonce"
                          placeholder="Enter UUID (lower cased)"
                          size="lg"
                          value={values.nonce}
                          onChange={handleChange}
                          onBlur={() => {
                            setFieldTouched("nonce", true, true);
                          }}
                        />
                        <Field.HelperText>
                          {"Unique nonce (lower cased UUID) for each signature"}
                        </Field.HelperText>
                        {errors.nonce && touched.nonce && (
                          <Field.ErrorText>{errors.nonce}</Field.ErrorText>
                        )}
                      </Field.Root>
                      <Field.Root
                        colorPalette={palette}
                        required
                        invalid={!!(errors.timeStamp && touched.timeStamp)}
                      >
                        <Field.Label w={"full"}>
                          <HStack w={"full"} justify={"space-between"}>
                            <HStack>
                              {"TIMESTAMP"} <Field.RequiredIndicator />
                            </HStack>
                            <Button
                              variant={"ghost"}
                              size={"xs"}
                              onClick={() => {
                                const currentDate = new Date();
                                setFieldValue(
                                  "timeStamp",
                                  currentDate.getTime(),
                                );
                              }}
                            >
                              {"Current"}
                            </Button>
                          </HStack>
                        </Field.Label>
                        <Input
                          name="timeStamp"
                          placeholder="Enter unix time stamp"
                          size="lg"
                          value={values.timeStamp}
                          onChange={handleChange}
                          onBlur={() => {
                            setFieldTouched("timeStamp", true, true);
                          }}
                        />
                        <Field.HelperText>
                          {"Unix time stamp in milliseconds. Within 24 hrs"}
                        </Field.HelperText>
                        {errors.timeStamp && touched.timeStamp && (
                          <Field.ErrorText>{errors.timeStamp}</Field.ErrorText>
                        )}
                      </Field.Root>
                    </Stack>
                    <Stack gap={6} direction={"column"}>
                      <Field.Root
                        colorPalette={palette}
                        required
                        invalid={!!(errors.p8Key && touched.p8Key)}
                      >
                        <Field.Label>
                          {"P8 KEY"} <Field.RequiredIndicator />
                        </Field.Label>
                        <Textarea
                          name="p8Key"
                          placeholder={`Enter the content of p8 key file here e.g.\n-----BEGIN PRIVATE KEY----- \nxxxx \n-----END PRIVATE KEY-----`}
                          minH={"140px"}
                          value={values.p8Key}
                          onChange={handleChange}
                          onBlur={() => {
                            setFieldTouched("p8Key", true, true);
                          }}
                        />
                        <Field.HelperText>
                          {"The private key in .p8 format"}
                        </Field.HelperText>
                        {errors.p8Key && touched.p8Key && (
                          <Field.ErrorText>{errors.p8Key}</Field.ErrorText>
                        )}
                      </Field.Root>
                    </Stack>
                  </Stack>
                </Card.Body>
                <Card.Footer>
                  <HStack>
                    <Button
                      size="sm"
                      colorPalette={palette}
                      onClick={() => handleSubmit()}
                    >
                      {"Generate Signature"}
                    </Button>
                    <Button
                      size="sm"
                      colorPalette={palette}
                      type="reset"
                      variant={"surface"}
                      onClick={() => resetForm({ values: initialValues })}
                    >
                      {"Reset"}
                    </Button>
                  </HStack>
                </Card.Footer>
              </Form>
            );
          }}
        </Formik>
      </Card.Root>
      {ready && (
        <>
          <Spacer p={4} />
          <AppleOfferSignatureOutput
            plainSignature={signatureRaw}
            signedSignature={signature}
            pemKey={keyPem}
          />
        </>
      )}
    </Box>
  );
};

export interface AppleOfferSignatureFormValues {
  bundleId: string;
  kid: string;
  productId: string;
  offerId: string;
  accountToken?: string;
  nonce: string;
  timeStamp: number;
  p8Key: string;
}

export const validationSchema: Yup.Schema<AppleOfferSignatureFormValues> =
  Yup.object({
    bundleId: Yup.string().required(
      "Enter app's bundle identifier e.g. com.example.ios",
    ),

    kid: Yup.string().required("Enter a valid key identifier").max(16),

    productId: Yup.string().required(
      "Enter in app subscription's product identifier",
    ),

    offerId: Yup.string().required(
      "Enter offer identifier e.g. com.app.gold.offer",
    ),

    accountToken: Yup.string().optional().lowercase(),

    nonce: Yup.string()
      .required("Enter a valid UUID and should be in a lowercased")
      .uuid()
      .lowercase(),

    timeStamp: Yup.number()
      .integer()
      .positive()
      .required("Enter a valid time stamp")
      .test(
        "is-unix-timestamp",
        "${path} must be a valid Unix timestamp",
        (value) => (value ? new Date(value).getTime() > 0 : false),
      ),

    p8Key: Yup.string().required("Enter a valid p8 key"),
  }).required();

export default AppleOfferSignatureForm;
