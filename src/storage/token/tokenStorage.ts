import AsyncStorage from "@react-native-async-storage/async-storage";
import deleteStorage from "../deleteStorage";

const storageName = "token";

const getTokenStorage = async () => {
  return await AsyncStorage.getItem(storageName);
};

const saveTokenStorage = async (token: string) => {
  await AsyncStorage.setItem(storageName, token);
};

const deleteTokenStorage = async () => {
  await deleteStorage(storageName);
};

export { deleteTokenStorage, getTokenStorage, saveTokenStorage };
