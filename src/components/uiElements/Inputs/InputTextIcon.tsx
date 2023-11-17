import React from "react";
import { Input, IInputProps, FormControl, InputGroup, View, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { InputTextSideIcon } from "./InputTextSideIcon";

type Props = IInputProps & {
  label?: string;
  errorMessage?: string | null;
  inputWidth?: number;
  iconWidth?: number;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  rightIconName?: keyof typeof MaterialIcons.glyphMap;
};

export function InputText({
  label,
  errorMessage = null,
  inputWidth = 100,
  iconWidth,
  leftIconName,
  rightIconName,
  ...props
}: Props) {
  if (leftIconName) {
    iconWidth = iconWidth || 15;
    inputWidth -= iconWidth;
  }

  return (
    <FormControl mb={4} isInvalid={!!errorMessage}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <InputGroup w="full" style={{ backgroundColor: "white" }}>
        {leftIconName && <InputTextSideIcon iconWidth={iconWidth} leftIconName={leftIconName} />}
        {rightIconName && <InputTextSideIcon iconWidth={iconWidth} leftIconName={rightIconName} />}
        <Input
          fontSize={"md"}
          w={`${inputWidth}%`}
          _focus={{ bg: "gray.100", borderWidth: 2, borderColor: "blue.300" }}
          {...props}
        />
      </InputGroup>

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
