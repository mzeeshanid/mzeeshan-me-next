import React, { useState } from "react";
import AppForm from "../AppForm";
import AppFormField from "../AppFormField";
import { v4 as uuidv4 } from "uuid";

const ECKey = require("ec-key");

import {
  Box,
  Grid,
  GridItem,
  theme,
  VStack,
  Text,
  Heading,
  Code,
  Textarea,
  Link,
} from "@chakra-ui/react";
import * as Yup from "yup";
import AppFormTextArea from "../AppFormTextArea";
import AppFormButton from "../AppFormButton";

function PromotionalOfferForm() {
  const [signatureRaw, setSignatureRaw] = useState("");
  const [keyPem, setKeyPem] = useState("");
  const [signature, setSignature] = useState("");
  const [ready, setReady] = useState(false);

  const validationSchema = Yup.object().shape({
    bundleId: Yup.string().required(
      "Enter app's bundle identifier e.g. com.example.ios"
    ),
    kid: Yup.string().required("Enter a valid key identifier").max(16),
    productId: Yup.string().required(
      "Enter in app subscription's product identifier"
    ),
    offerId: Yup.string().required(
      "Enter offer identifier e.g. com.app.gold.offer"
    ),
    accountToken: Yup.string()
      .required("Enter app username or account token and should be lower cased")
      .lowercase(),
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
        (value) => {
          const valid = new Date(value).getTime() > 0;
          return valid;
        }
      ),
    p8Key: Yup.string().required("Enter a valid p8 key"),
  });

  return (
    <AppForm
      initialValues={{
        bundleId: "",
        kid: "",
        productId: "",
        offerId: "",
        accountToken: "",
        nonce: "",
        timeStamp: "",
        p8Key: "",
      }}
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

        const nakedKey = p8Key
          .replace("-----BEGIN PRIVATE KEY-----", "")
          .replace("-----END PRIVATE KEY-----", "")
          .trim();

        const combined = `${bundleId}${"\u2063"}${kid}${"\u2063"}${productId}${"\u2063"}${offerId}${"\u2063"}${token}${"\u2063"}${nonce}${"\u2063"}${timeStamp}`;
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
        setSignature(signature);
        setReady(true);
      }}
    >
      <Grid
        w={"100%"}
        p={4}
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        <GridItem colSpan={1}>
          <AppFormField
            label="APP BUNDLE IDENTIFIER"
            placeholder="Enter app's bundle identifier"
            name={"bundleId"}
            textColor={theme.colors.black}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <AppFormField
            label="KEY IDENTIFIER"
            placeholder="Enter key identifier"
            name={"kid"}
            textColor={theme.colors.black}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <AppFormField
            label="PRODUCT IDENTIFIER"
            placeholder="Enter product identifier"
            name={"productId"}
            textColor={theme.colors.black}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <AppFormField
            label="OFFER IDENTIFIER"
            placeholder="Enter offer identifier"
            name={"offerId"}
            textColor={theme.colors.black}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <VStack align={"start"}>
            <AppFormField
              label="USERNAME -OR- ACCOUNT TOKEN"
              placeholder="Enter app username or app account token (lower cased)"
              name={"accountToken"}
              textColor={theme.colors.black}
            />
            <VStack
              border="1px"
              borderColor={theme.colors.teal[300]}
              borderRadius={"6px"}
              w="100%"
              align={"start"}
              p={2}
              gap={2}
              bg={theme.colors.teal[50]}
            >
              <Text fontWeight={"bold"}>Note:</Text>
              <Text>
                Make sure to set the same before adding to payment queue
                otherwise use will receive{" "}
                <Link
                  isExternal
                  color={theme.colors.teal[500]}
                  href="https://developer.apple.com/documentation/storekit/skerror"
                >
                  SKErrorDomain error 12
                </Link>
              </Text>
              <Code textAlign={"start"}>
                let payment = SKMutablePayment(product: product)
                <br />
                payment.applicationUsername = "xyz"
              </Code>
            </VStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={1}>
          <VStack gap={4}>
            <AppFormField
              label="NONCE"
              placeholder="Enter UUID (lower cased)"
              name={"nonce"}
              textColor={theme.colors.black}
            />
            <AppFormButton
              title={"Auto Generate UUID"}
              colorScheme="gray"
              formButtonOnClick={(context) => {
                const { setFieldValue } = context;
                setFieldValue("nonce", uuidv4());
              }}
            />
          </VStack>
        </GridItem>
        <GridItem colSpan={1}>
          <VStack gap={4}>
            <AppFormField
              label="TIMESTAMP"
              placeholder="Enter unix time stamp"
              name={"timeStamp"}
              textColor={theme.colors.black}
            />
            <AppFormButton
              title={"Current Time Stamp"}
              colorScheme="gray"
              formButtonOnClick={(context) => {
                const { setFieldValue } = context;
                const currentDate = new Date();
                setFieldValue("timeStamp", currentDate.getTime());
              }}
            />
          </VStack>
        </GridItem>
        <GridItem colSpan={2}>
          <AppFormTextArea
            label="P8 KEY"
            placeholder={`Enter the content of p8 key file here e.g.\n-----BEGIN PRIVATE KEY----- \nxxxx \n-----END PRIVATE KEY-----`}
            name="p8Key"
            textAreaHeight="180px"
          />
        </GridItem>
        <GridItem colSpan={2}>
          <AppFormButton title="Generate signature" />
        </GridItem>
        {ready && (
          <>
            <GridItem colSpan={2}>
              <Box p={4} />
            </GridItem>
            <GridItem colSpan={2}>
              <Heading>Plain Signature String</Heading>
              <Text>{signatureRaw}</Text>
              <Heading>Signature String Components</Heading>
              {signatureRaw.split("\u2063").map((value, idx) => {
                return <Text key={idx}>{value}</Text>;
              })}
              <Heading>Key PEM</Heading>
              <Textarea
                isReadOnly
                resize={"vertical"}
                value={keyPem}
              ></Textarea>
              <Heading>Signature</Heading>
              <Text>{signature}</Text>
            </GridItem>
          </>
        )}
      </Grid>
    </AppForm>
  );
}

export default PromotionalOfferForm;
