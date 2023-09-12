import React from "react";
import { IButtonProps, Text } from "native-base";
import { BaseButton, BaseButtonProps } from "./BaseButton";

export type ButtonProps = BaseButtonProps & {
  isPressed?: boolean;
  pressedBgColor?: IButtonProps;
};

export function SolidButton({ isPressed, pressedBgColor, ...props }: ButtonProps) {
  let pressedColor = undefined;
  if (isPressed) {
    pressedColor = pressedBgColor || { bgColor: "blue.400" };
  }

  return (
    <BaseButton
      bgColor={props.bgColor || "blue.700"}
      _pressed={pressedColor}
      isPressed={isPressed}
      {...props}
    />
  );
}
