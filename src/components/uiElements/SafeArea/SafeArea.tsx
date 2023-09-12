import React from "react";
import { View } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

type SafeAreaProps = {
  children: React.ReactNode;
};

export function SafeArea({ children }: SafeAreaProps) {
  const insets = useSafeAreaInsets();

  const plataform = Platform.OS;

  return (
    <View
      style={{
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingBottom: plataform === "ios" ? 0 : insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        zIndex: 0,
      }}
    >
      <View background="gray.100" w="full" height="full">
        {children}
      </View>
    </View>
  );
}
