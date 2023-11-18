import { View } from "native-base";
import React from "react";

export type HRProps = {
  px?: number;
  color?: string;
  width?: number;
};

export default function HR({ px, color = "#ccc", width = 0.7 }: HRProps) {
  return (
    <View px={px} py={0}>
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: width,
        }}
      />
    </View>
  );
}
