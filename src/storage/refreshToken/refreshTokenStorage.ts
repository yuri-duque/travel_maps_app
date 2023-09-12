import AsyncStorage from "@react-native-async-storage/async-storage";
import deleteStorage from "../deleteStorage";

const storageName = "refreshtoken";

const getRefreshTokenStorage = async () => {
  return await AsyncStorage.getItem(storageName);
};

const saveRefreshTokenStorage = async (token: string) => {
  await AsyncStorage.setItem(storageName, token);
};

const deleteRefreshTokenStorage = async () => {
  await deleteStorage(storageName);
};

export { deleteRefreshTokenStorage, getRefreshTokenStorage, saveRefreshTokenStorage };
