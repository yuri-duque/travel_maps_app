import AsyncStorage from "@react-native-async-storage/async-storage";

export async function clearStorage() {
  await AsyncStorage.clear();
}
