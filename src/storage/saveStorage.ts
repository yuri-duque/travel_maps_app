import AsyncStorage from "@react-native-async-storage/async-storage";

const saveStorage = async (storageName: string, data: any) => {
  const jsonValue = JSON.stringify(data);
  await AsyncStorage.setItem(storageName, jsonValue);
};

export default saveStorage;
