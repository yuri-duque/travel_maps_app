import React from "react";
import { Input, IInputProps, FormControl, InputGroup, View, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type Props = IInputProps & {
  label?: string;
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
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        fontSize={"md"}
        _focus={{ bg: "gray.100", borderWidth: 2, borderColor: "gray.200" }}
        style={{ backgroundColor: "white" }}
        {...props}
        variant={"rounded"}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
