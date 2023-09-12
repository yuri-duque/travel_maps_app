import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

import { UserLogin } from "../../pages/Auth/UserLogin";
import { UserRegister } from "../../pages/Auth/UserRegister";
import { ForgotPassword } from "../../pages/Auth/ForgotPassword";

export type propsAuthStack = {
  userRegister: undefined;
  userLogin: undefined;
  forgotPassword: undefined;
};

export type authNavigationStack = NativeStackNavigationProp<propsAuthStack>;

const { Screen, Navigator } = createNativeStackNavigator<propsAuthStack>();

export function AuthStack() {
  return (
    <Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerShown: true,
      }}
      initialRouteName="userLogin"
    >
      <Screen name="userLogin" component={UserLogin} options={{ headerShown: false }}></Screen>
      <Screen
        name="userRegister"
        component={UserRegister}
        options={{ headerShown: false }}
      ></Screen>
      <Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      ></Screen>
    </Navigator>
  );
}
