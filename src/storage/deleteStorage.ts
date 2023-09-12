import AsyncStorage from "@react-native-async-storage/async-storage";

const deleteStorage = async (storageName: string) => {
  await AsyncStorage.setItem(storageName, "");
};

export default deleteStorage;
