import { Button } from "@chakra-ui/button";
import { useFormikContext } from "formik";
import React from "react";

function AppFormButton({
  title,
  variant = "solid",
  colorScheme = "teal",
  size = "md",
  formButtonOnClick = undefined,
}) {
  const context = useFormikContext();
  const { handleSubmit } = context;
  return (
    <Button
      onClick={
        formButtonOnClick
          ? () => {
              formButtonOnClick(context);
            }
          : handleSubmit
      }
      colorScheme={colorScheme}
      variant={variant}
      size={size}
    >
      {title}
    </Button>
  );
}

export default AppFormButton;
