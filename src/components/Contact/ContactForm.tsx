import { createContactMessage } from "@/apis/contact/contactMe";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Button,
  Center,
  Field,
  HStack,
  Input,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Turnstile } from "next-turnstile";
import React from "react";
import * as Yup from "yup";
import { SectionHeader } from "../SectionHeader/SectionHeader";

type Props = {};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters"),
});

const ContactForm: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const [turnstileStatus, setTurnstileStatus] = React.useState<
    "success" | "error" | "expired" | "required"
  >("required");
  const [turnstileToken, setTurnstileToken] = React.useState<string>("");
  const [submissionSuccess, setSubmissionSuccess] =
    React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
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

        // Submit the contact message
        await createContactMessage(
          values.name,
          values.email,
          values.message,
          turnstileToken,
        );

        setSubmissionSuccess(true);
        formik.resetForm();
        setTurnstileStatus("required");
        setTurnstileToken("");

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmissionSuccess(false);
        }, 5000);
      } catch (error: any) {
        formik.setStatus({
          error: error.message || "Failed to send message. Please try again.",
        });
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const nameError = formik.touched.name && formik.errors.name ? true : false;
  const emailError = formik.touched.email && formik.errors.email ? true : false;
  const messageError =
    formik.touched.message && formik.errors.message ? true : false;

  if (submissionSuccess) {
    return (
      <Box as="section">
        <Center>
          <VStack gap={6} maxW="2xl" w="full">
            <SectionHeader
              tagline={"Get in Touch"}
              headline={"Let's Start a Conversation"}
              description={
                "Have questions or want to work together? Fill out the form below!"
              }
              textAlign={"center"}
            />
            <Box p={6} bg="bg.muted" borderRadius="lg" w="full">
              <Text fontWeight="medium">
                {
                  "✓ Your message has been sent successfully! We'll get back to you soon."
                }
              </Text>
            </Box>
          </VStack>
        </Center>
      </Box>
    );
  }

  return (
    <Box as="section">
      <Center>
        <VStack gap={6} maxW="2xl" w="full">
          <SectionHeader
            tagline={"Get in Touch"}
            headline={"Let's Start a Conversation"}
            description={
              "Have questions or want to work together? Fill out the form below!"
            }
            textAlign={"center"}
          />
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <VStack gap={4} w="full">
              <Field.Root invalid={nameError} colorPalette={palette} w="full">
                <Field.Label>{"Name"}</Field.Label>
                <Input
                  name="name"
                  placeholder="Enter your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="lg"
                />
                {nameError && (
                  <Field.ErrorText>{formik.errors.name}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={emailError} colorPalette={palette} w="full">
                <Field.Label>{"Email"}</Field.Label>
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
              </Field.Root>

              <Field.Root
                invalid={messageError}
                colorPalette={palette}
                w="full"
              >
                <Field.Label>{"Message"}</Field.Label>
                <Textarea
                  name="message"
                  placeholder="Enter your message here..."
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  minH="150px"
                  size="lg"
                />
                {messageError && (
                  <Field.ErrorText>{formik.errors.message}</Field.ErrorText>
                )}
                <Field.HelperText>
                  {formik.values.message.length}/2000 characters
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
                size="lg"
                disabled={turnstileStatus !== "success" || formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <HStack gap={2}>
                    <Spinner size="sm" />
                    <Text>{"Sending..."}</Text>
                  </HStack>
                ) : (
                  "Send Message"
                )}
              </Button>
            </VStack>
          </form>
        </VStack>
      </Center>
    </Box>
  );
};

export default ContactForm;
