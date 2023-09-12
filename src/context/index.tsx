import React from "react";
import { AppContextProvider } from "./AppContext";
import { UserContextProvider } from "./UserContext";

export type InitContextProps = {
  children?: React.ReactNode;
};

export function InitContext({ children }: InitContextProps) {
  return (
    <AppContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </AppContextProvider>
  );
}
