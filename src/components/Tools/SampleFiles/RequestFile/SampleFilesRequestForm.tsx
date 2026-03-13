import {
  checkSampleFileExtensionExists,
  createSampleFileRequest,
} from "@/apis/sampleFiles/sampleFileRequests";
import { SampleFilesExtensionModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Badge,
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  HStack,
  Input,
  Link,
  Portal,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Turnstile } from "next-turnstile";
import React from "react";
import * as Yup from "yup";

type Props = {};

const validationSchema = Yup.object().shape({
  extension: Yup.string()
    .required("File extension is required")
    .min(2, "Extension must be at least 2 characters")
    .max(20, "Extension must not exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Extension can only contain letters and numbers",
    ),
  email: Yup.string().email("Please enter a valid email address").optional(),
});

interface DuplicateState {
  exists: boolean;
  extension: SampleFilesExtensionModel | null;
  open: boolean;
}

const SampleFilesRequestForm: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();

  const [turnstileStatus, setTurnstileStatus] = React.useState<
    "success" | "error" | "expired" | "required"
  >("required");
  const [turnstileToken, setTurnstileToken] = React.useState<string>("");
  const [duplicateState, setDuplicateState] = React.useState<DuplicateState>({
    exists: false,
    extension: null,
    open: false,
  });
  const [submissionSuccess, setSubmissionSuccess] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      extension: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Verify Turnstile status and token
        if (turnstileStatus !== "success" || !turnstileToken) {
          formik.setStatus({
            error: "Please complete the CAPTCHA verification.",
          });
          return;
        }

        // Check if extension already exists
        const existingExtension = await checkSampleFileExtensionExists(
          values.extension,
        );

        if (existingExtension) {
          // Extension already exists in database
          setDuplicateState({
            exists: true,
            extension: existingExtension,
            open: true,
          });
          return;
        }

        // Create the request with token
        await createSampleFileRequest(
          values.extension,
          turnstileToken,
          values.email || "",
        );
        setSubmissionSuccess(true);
        formik.resetForm();
        setTurnstileStatus("required");
        setTurnstileToken("");

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmissionSuccess(false);
        }, 5000);
      } catch (error) {
        console.error("Form submission error:", error);
        formik.setStatus({
          error: "Failed to submit request. Please try again.",
        });

        setTurnstileStatus("required");
      }
    },
  });

  const handleDialogClose = () => {
    setDuplicateState((prev) => ({ ...prev, open: false }));
  };

  const extensionNameError =
    formik.touched.extension && Boolean(formik.errors.extension);
  const emailError = formik.touched.email && Boolean(formik.errors.email);

  if (submissionSuccess) {
    return (
      <Box w="full" p={6} bg="bg.muted" borderRadius="md" textAlign="center">
        <Text fontWeight="bold" mb={2}>
          {"Request Received! ✓"}
        </Text>
        <Text fontSize="sm" color="fg.muted">
          {
            "Your request has been received and will be fulfilled shortly. We'll notify you when the extension is available."
          }
        </Text>
      </Box>
    );
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <VStack gap={4} w="full">
          <Field.Root invalid={extensionNameError} w="full">
            <Field.Label>{"File Extension"}</Field.Label>
            <Input
              name="extension"
              placeholder="Enter the desired file extension (e.g., pdf, docx, mp4)"
              value={formik.values.extension}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="lg"
            />
            {extensionNameError && (
              <Field.ErrorText>{formik.errors.extension}</Field.ErrorText>
            )}
            <Field.HelperText>
              {"Enter the desired file extension"}
            </Field.HelperText>
          </Field.Root>

          <Field.Root invalid={emailError} w="full">
            <HStack>
              <Field.Label>{"Email Address"}</Field.Label>
              <Badge variant="subtle" colorPalette={palette} size="xs">
                {"Optional"}
              </Badge>
            </HStack>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="lg"
            />
            {emailError && (
              <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
            )}
            <Field.HelperText>
              {
                "We'll use this email to notify you when your requested extension is available."
              }
            </Field.HelperText>
          </Field.Root>

          <Box w="full">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onVerify={(token: string) => {
                setTurnstileStatus("success");
                setTurnstileToken(token);
              }}
              onError={() => {
                setTurnstileStatus("error");
                setTurnstileToken("");
              }}
              onExpire={() => {
                setTurnstileStatus("expired");
                setTurnstileToken("");
              }}
            />
          </Box>

          {formik.status?.error && (
            <Text color="fg.error" fontSize="sm">
              {formik.status.error}
            </Text>
          )}

          <Button
            type="submit"
            colorPalette={palette}
            w="full"
            disabled={turnstileStatus !== "success" || formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <HStack gap={2}>
                <Spinner size="sm" />
                <Text>{"Submitting..."}</Text>
              </HStack>
            ) : (
              "Request File"
            )}
          </Button>
        </VStack>
      </form>

      <Dialog.Root
        open={duplicateState.open}
        onOpenChange={(e) =>
          setDuplicateState((prev) => ({ ...prev, open: e.open }))
        }
        size="md"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header fontWeight={"bold"}>
                {"Extension Already Exists"}
              </Dialog.Header>
              <Dialog.Body>
                <Text>
                  {`The extension "${duplicateState.extension?.name}" already exists.`}
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" onClick={handleDialogClose}>
                    {"Close"}
                  </Button>
                </Dialog.ActionTrigger>
                <Link
                  href={`/tools/sample-files/extensions/${duplicateState.extension?.slug}`}
                >
                  <Button colorPalette={palette}>{"Details"}</Button>
                </Link>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default SampleFilesRequestForm;
