import AsyncStorage from "@react-native-async-storage/async-storage";

const getStorage = async <T>(storageName: string) => {
  const response = await AsyncStorage.getItem(storageName);
  const data = response ? (JSON.parse(response) as T) : null;
  return data;
};

export default getStorage;
