import * as Yup from "yup";

const shareableLinksValidationSchema = Yup.object().shape({
  gdriveUrls: Yup.array()
    .of(Yup.string())
    .required("Enter google drive shareable links")
    .test(
      "gdriveUrls",
      // "Text contains invalid google drive shareable link",
      (value, context) => {
        if (!value) return false;

        let isValid = true;
        let index;

        const links = value;
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

export default shareableLinksValidationSchema;
