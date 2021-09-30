import { Button } from "@chakra-ui/button";
import { useFormikContext } from "formik";
import React from "react";

function AppFormButton({
  title,
  variant = "solid",
  colorScheme = "teal",
  size = "md",
}) {
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      onClick={handleSubmit}
      colorScheme={colorScheme}
      variant={variant}
      size={size}
    >
      {title}
    </Button>
  );
}

export default AppFormButton;
