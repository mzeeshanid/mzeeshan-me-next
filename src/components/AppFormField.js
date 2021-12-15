import { Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";

function AppFormField({
  label,
  labelColor = "black",
  infoLabel,
  placeholder,
  name,
  readOnly = false,
  value = undefined,
  onClick,
  size = "lg",
  textColor = "black",
  valueChanged = undefined,
}) {
  const context = useFormikContext();
  const { errors, handleChange, setFieldTouched, touched, values } = context;
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (valueChanged) {
      valueChanged(context, isEditing, name);
    }
  }, [values[name], errors[name]]);

  return (
    <VStack width="100%" align="start">
      {(label || infoLabel) && (
        <HStack w="100%">
          {label && (
            <Text
              fontWeight="bold"
              fontSize={{ base: "md", md: "lg" }}
              color={labelColor}
            >
              {label.toUpperCase()}
            </Text>
          )}
          <Spacer />
          {infoLabel && <Text color={labelColor}>{infoLabel}</Text>}
        </HStack>
      )}
      <Input
        color={textColor}
        name={name}
        placeholder={placeholder}
        size={size}
        onClick={onClick}
        value={value ? value : values[name]}
        readOnly={readOnly}
        onBlur={() => {
          setFieldTouched(name);
          setIsEditing(false);
        }}
        onChange={handleChange}
        onFocus={() => setIsEditing(true)}
        isInvalid={errors[name] && touched[name]}
      />
      {errors[name] && touched[name] && <Text color="red">{errors[name]}</Text>}
    </VStack>
  );
}

export default AppFormField;
