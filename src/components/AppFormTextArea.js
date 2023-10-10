import { HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useFormikContext } from "formik";
import React, { useState } from "react";

function AppFormTextArea({
  label,
  infoLabel,
  placeholder,
  name,
  readOnly = false,
  value = undefined,
  onClick,
  resize = "none",
  textAreaHeight,
}) {
  const { errors, handleChange, setFieldTouched, touched, values } =
    useFormikContext();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <VStack w="100%" align="start">
      {(label || infoLabel) && (
        <HStack w="100%">
          {label && (
            <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
              {label.toUpperCase()}
            </Text>
          )}
          <Spacer />
          {infoLabel && <Text>{infoLabel}</Text>}
        </HStack>
      )}
      <Textarea
        h={textAreaHeight}
        placeholder={placeholder}
        fontSize={{ base: "md", md: "lg" }}
        resize={resize}
        onClick={onClick}
        value={value ? value : values[name]}
        readOnly={readOnly}
        onBlur={() => {
          setFieldTouched(name);
          setIsEditing(false);
        }}
        onChange={handleChange(name)}
        onFocus={() => setIsEditing(true)}
        isInvalid={errors[name] && touched[name]}
      />
      {errors[name] && touched[name] && <Text color="red">{errors[name]}</Text>}
    </VStack>
  );
}

export default AppFormTextArea;
