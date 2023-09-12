import React from "react";
import { Input as NBInput, IInputProps, FormControl, InputGroup } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { InputTextIcon } from "./InputTextIcon";

type Props = IInputProps & {
  label: string;
  errorMessage?: string | null;
  inputWidth?: number;
  iconWidth?: number;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
};

export function InputText({
  label,
  errorMessage = null,
  inputWidth = 100,
  iconWidth,
  leftIconName,
  ...props
}: Props) {
  if (leftIconName) {
    iconWidth = iconWidth || 15;
    inputWidth -= iconWidth;
  }

  return (
    <FormControl mb={4} isInvalid={!!errorMessage}>
      <FormControl.Label>{label}</FormControl.Label>
      <InputGroup w="full">
        <InputTextIcon iconWidth={iconWidth} leftIconName={leftIconName} />
        <NBInput
          fontSize={"md"}
          w={`${inputWidth}%`}
          h="10"
          _focus={{ bg: "gray.100", borderWidth: 2, borderColor: "blue.300" }}
          {...props}
        />
      </InputGroup>

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
