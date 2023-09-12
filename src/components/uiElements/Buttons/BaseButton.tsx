import React from "react";
import { Button as NBButton, IButtonProps, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";

export type BaseButtonProps = IButtonProps & {
  children?: React.ReactNode | string;
  textColor?: ColorType;
};

export function BaseButton({ children, textColor = "white", ...props }: BaseButtonProps) {
  return (
    <NBButton rounded={props.rounded || "lg"} {...props}>
      {typeof children === "string" ? (
        <Text color={textColor} fontSize={"md"} fontWeight={"semibold"} letterSpacing={"xl"}>
          {children}
        </Text>
      ) : (
        <>{children}</>
      )}
    </NBButton>
  );
}
