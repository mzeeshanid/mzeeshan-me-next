import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import fileRequest from "../../apis/fileRequest";
import AppForm from "../AppForm";
import AppFormButton from "../AppFormButton";
import AppFormField from "../AppFormField";

const validationSchema = Yup.object().shape({
  requestFile: Yup.string()
    .required("Enter file extension")
    .min(3, "Min 3 Chars")
    .max(100, "Max 100 Chars"),
});

function SampleFileRequestForm() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const newFileRequest = (name, resetForm) => {
    const body = { data: { name: name } };
    setLoading(true);
    fileRequest.addFileRequest(body).then((res) => {
      setLoading(false);
      if (res.ok) {
        setResult("File request submitted successfully.");
        resetForm({ values: "" });
      } else {
        setResult("Unable to submit file request.");
      }
      setShowResult(true);
    });
  };

  useEffect(() => {
    if (showResult) {
      setTimeout(() => {
        setShowResult(false);
      }, 3000);
    }
  }, [showResult]);
  return (
    <AppForm
      initialValues={{ requestFile: "" }}
      onSubmit={(values, { resetForm }) => {
        const extension = values.requestFile;
        newFileRequest(extension, resetForm);
      }}
      validationSchema={validationSchema}
    >
      <VStack>
        <HStack spacing={4} align={loading ? "center" : "start"}>
          <AppFormField
            placeholder="Enter file extension"
            name={"requestFile"}
            size="md"
            textColor="white"
          />
          {loading ? (
            <Box height="100%" align="center" justify="center">
              <Spinner size="md" color="teal" />
            </Box>
          ) : (
            <AppFormButton title="Request" />
          )}
        </HStack>
        {result && showResult && (
          <Box p="md">
            <Text color="teal">{result}</Text>
          </Box>
        )}
      </VStack>
    </AppForm>
  );
}

export default SampleFileRequestForm;
