import { useClipboard } from "@chakra-ui/hooks";
import { Spacer, Text, VStack, theme, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import AppForm from "../AppForm";
import AppFormButton from "../AppFormButton";
import AppFormTextArea from "../AppFormTextArea";

const validationSchema = Yup.object().shape({
  gdriveUrls: Yup.string()
    .required("Enter google drive shareable links")
    .test(
      "gdriveUrls",
      // "Text contains invalid google drive shareable link",
      (value, context) => {
        if (!value) return false;

        let isValid = true;
        let index;

        const links = value.split("\n");
        let i;
        for (i = 0; i < links.length; i++) {
          let link = links[i];
          if (!link) continue;

          index = i;

          try {
            const url = new URL(link);
            const urlComponents = link.split("/");
            if (
              url.hostname === "drive.google.com" &&
              urlComponents.length > 5 &&
              urlComponents[5].length > 0
            ) {
              continue;
            }
            isValid = false;
            break;
          } catch (err) {
            isValid = false;
            break;
          }
        }

        if (isValid) return true;
        else
          return context.createError(
            new Yup.ValidationError(
              "Invalid google drive shareable link at index: " + (index + 1)
            )
          );
      }
    ),
});

function GDrive2DirectMultiLinkForm() {
  const [directLinks, setDirectLinks] = useState();
  const [directLinksCount, setDirectLinksCount] = useState(0);
  const { hasCopied, onCopy } = useClipboard(directLinks);

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
      initialValues={{ gdriveUrls: "" }}
      onSubmit={(values) => {
        const urls = values.gdriveUrls.split("\n");
        const directLinks = [];
        let i;
        for (i = 0; i < urls.length; i++) {
          let url = urls[i];
          if (!url) continue;

          const fileId = url.split("/")[5];
          const directLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
          directLinks.push(directLink);
        }

        setDirectLinksCount(directLinks.length);
        setDirectLinks(directLinks.join("\n"));
      }}
      validationSchema={validationSchema}
    >
      <VStack>
        <AppFormTextArea
          label="SHAREABLE URLS"
          placeholder={`Enter google drive share urls separated with new line e.g.\n\nhttps://drive.google.com/file/d/1mp6_NF3t1FsYC4oUySoGu1A0ilGA-xdw/view?usp=sharing${"\n"}https://drive.google.com/file/d/1mp6_NF3t1FsYC4oUySoGu1A0ilGA-xdw/view?usp=sharing`}
          name="gdriveUrls"
          textAreaHeight="180px"
        />
        <Spacer />
        <AppFormButton title="Create Direct Links" />
        {directLinks && (
          <VStack cursor="pointer" w="100%" pt={4} pb={4} onClick={onCopy}>
            <AppFormTextArea
              label="DIRECT LINKS"
              infoLabel={`Click to copy ${directLinksCount} links`}
              placeholder="Direct links"
              name="directLinks"
              readOnly={true}
              value={directLinks}
            />
            {hasCopied && (
              <Text color={theme.colors.black} fontWeight="bold">
                Copied to clipboard
              </Text>
            )}
          </VStack>
        )}
      </VStack>
    </AppForm>
  );
}

export default GDrive2DirectMultiLinkForm;
