import React from "react";
import { IInputProps, InputLeftAddon, InputRightAddon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type InputTextIconProps = IInputProps & {
  iconWidth?: number;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  rightIconName?: keyof typeof MaterialIcons.glyphMap;
};

export function InputTextSideIcon({ iconWidth, leftIconName, rightIconName }: InputTextIconProps) {
  if (!leftIconName) return <></>;

  const iconColor = "#9aa0a6";
  const iconSize = 22;

  return (
    <>
      {leftIconName && (
        <InputLeftAddon width={`${iconWidth}%` ?? "15%"} py="0" px="2" bg="gray.100">
          <MaterialIcons name={leftIconName} size={iconSize} color={iconColor} />
        </InputLeftAddon>
      )}

      {rightIconName && (
        <InputRightAddon width={`${iconWidth}%` ?? "15%"} py="0" px="2" bg="gray.100">
          <MaterialIcons name={rightIconName} size={iconSize} color={iconColor} />
        </InputRightAddon>
      )}
    </>
  );
}
