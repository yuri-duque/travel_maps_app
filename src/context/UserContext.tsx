import React, { useState, createContext } from "react";
import jwtDecode from "jwt-decode";

import { User } from "../entities/User";
import { getTokenStorage } from "../storage/token/tokenStorage";

type UserContextType = {
  user?: User;
  saveUser: (token: string) => void;
  getLoggedUser: () => void;
  removeUser: () => void;
};

const defaultUserContext: UserContextType = {
  user: undefined,
  saveUser: () => {},
  getLoggedUser: () => {},
  removeUser: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();

  async function getLoggedUser() {
    const token = await getTokenStorage();
    if (token) {
      await saveUser(token);
    }
  }

  async function saveUser(token: string) {
    const user = jwtDecode<User>(token);
    setUser(user);
  }

  async function removeUser() {
    setUser(undefined);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        saveUser,
        getLoggedUser,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
