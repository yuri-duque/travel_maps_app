import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { UserContext } from "../context/UserContext";
import { AppStack } from "./appRoutes";
import { AuthStack } from "./authRoutes";

export function Routes() {
  const { isLoading, showLoading } = useContext(AppContext);
  const { user, getLoggedUser } = useContext(UserContext);

  async function startUser() {
    showLoading(true);
    await getLoggedUser();
    showLoading(false);
  }

  useEffect(() => {
    startUser();
  }, []);

  if (isLoading) return <></>;

  return <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>;
}
