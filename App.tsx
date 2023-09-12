import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";

import { InitContext } from "./src/context";
import { Routes } from "./src/routes";
import { NativeBaseProvider } from "native-base";

const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <FlashMessage position="top" />
        <InitContext>
          <Routes />
        </InitContext>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
