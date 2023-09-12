import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

export type propsAppStack = {
  home: undefined;
};

export type appNavigationStack = NativeStackNavigationProp<propsAppStack>;

const { Screen, Navigator } = createNativeStackNavigator<propsAppStack>();

export function AppStack() {
  return (
    <Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerShown: true,
      }}
      initialRouteName="home"
    >
      <Screen name="home" component={Home} options={{ headerShown: false }}></Screen>
    </Navigator>
  );
}
