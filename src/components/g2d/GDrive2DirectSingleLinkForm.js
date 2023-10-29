import React, { useEffect, useState } from "react";
import AppForm from "../AppForm";
import AppFormButton from "../AppFormButton";
import AppFormField from "../AppFormField";
import * as Yup from "yup";
import {
  Box,
  Text,
  VStack,
  theme,
  useClipboard,
  useToast,
} from "@chakra-ui/react";

const validationSchema = Yup.object().shape({
  gdriveUrl: Yup.string()
    .required("Enter google drive shareable link")
    .url("Enter a valid link")
    .test(
      "gdriveUrl",
      "Enter a valid google drive shareable link",
      (value, context) => {
        try {
          const url = new URL(value);
          const urlComponents = value.split("/");
          return (
            url.hostname === "drive.google.com" &&
            urlComponents.length > 5 &&
            urlComponents[5].length > 0
          );
        } catch (err) {}

        return false;
      }
    ),
});

function GDrive2DirectSingleLinkForm() {
  const [directLink, setDirectLink] = useState();
  const { onCopy, hasCopied } = useClipboard(directLink);

  const toast = useToast();

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: "Copied to clipboard",
        status: "success",
        isClosable: true,
      });
    }
  }, [hasCopied]);

  return (
    <AppForm
      initialValues={{ gdriveUrl: "" }}
      onSubmit={(values) => {
        const fileId = values.gdriveUrl.split("/")[5];
        setDirectLink(
          `https://drive.google.com/uc?export=download&id=${fileId}`
        );
      }}
      validationSchema={validationSchema}
    >
      <VStack>
        <AppFormField
          label="SHAREABLE URL"
          placeholder="Enter google drive share url"
          name={"gdriveUrl"}
          textColor={theme.colors.black}
        />
        <Box padding="sm" />
        <AppFormButton title="Create Direct Link" />
        {directLink && (
          <VStack cursor="pointer" w="100%" pt={4} pb={4} onClick={onCopy}>
            <AppFormField
              label="DIRECT LINK"
              infoLabel="Click to copy"
              placeholder="Direct link"
              name="directLink"
              readOnly={true}
              value={directLink}
            />
            {hasCopied && <Text fontWeight="bold">Copied to clipboard</Text>}
          </VStack>
        )}
      </VStack>
    </AppForm>
  );
}

export default GDrive2DirectSingleLinkForm;
