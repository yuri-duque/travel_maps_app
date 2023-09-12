import React from "react";
import { BaseButton, BaseButtonProps } from "./BaseButton";

export type OutlineButtonProps = BaseButtonProps & {};

export function OutlineButton({ ...props }: OutlineButtonProps) {
  return (
    <BaseButton
      variant="outline"
      textColor={props.textColor || "blue.700"}
      borderColor={props.borderColor || "blue.700"}
      _pressed={{ bgColor: "gray.100" }}
      {...props}
    />
  );
}
