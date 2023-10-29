import * as Yup from "yup";

const shareableLinkValidationSchema = Yup.object().shape({
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

export default shareableLinkValidationSchema;
