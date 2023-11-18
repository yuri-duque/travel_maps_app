import React from "react";
import { AppContextProvider } from "./AppContext";
import { UserContextProvider } from "./UserContext";
import { MarkedPlacesContextProvider } from "./MarkedPlacesContext";

export type InitContextProps = {
  children?: React.ReactNode;
};

export function InitContext({ children }: InitContextProps) {
  return (
    <AppContextProvider>
      <UserContextProvider>
        <MarkedPlacesContextProvider>{children}</MarkedPlacesContextProvider>
      </UserContextProvider>
    </AppContextProvider>
  );
}
