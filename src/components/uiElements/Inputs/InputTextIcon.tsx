import React from "react";
import { IInputProps, InputLeftAddon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type InputTextIconProps = IInputProps & {
  iconWidth?: number;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
};

export function InputTextIcon({ iconWidth, leftIconName }: InputTextIconProps) {
  if (!leftIconName) return <></>;

  const iconColor = "#9aa0a6";
  const iconSize = 22;

  return (
    <InputLeftAddon width={`${iconWidth}%` ?? "15%"} py="0" px="2" bg="gray.100">
      <MaterialIcons name={leftIconName} size={iconSize} color={iconColor} />
    </InputLeftAddon>
  );
}
