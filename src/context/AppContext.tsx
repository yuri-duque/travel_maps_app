import React, { useState, createContext } from "react";
import { Loading } from "../components/uiElements/Loading/Loading";

type AppContextType = {
  isLoading?: boolean;
  showLoading: (visible: boolean) => void;
};

const defaultUserContext: AppContextType = {
  isLoading: false,
  showLoading: () => {},
};

const AppContext = createContext<AppContextType>(defaultUserContext);

const AppContextProvider = ({ children }: any) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  async function showLoading(visible: boolean) {
    setLoading(visible);
  }

  return (
    <AppContext.Provider value={{ isLoading, showLoading }}>
      <Loading visible={isLoading} />
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
