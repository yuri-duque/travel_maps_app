import { showMessage } from "react-native-flash-message";
import { AxiosResponse } from "axios";
import { api } from "../config";

async function placeById(placeid: string) {
  try {
    const url = process.env.EXPO_PUBLIC_GOOGLE_PLACE_BY_ID_URL as string;
    const key = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

    const response: AxiosResponse = await api.get(url, {
      params: {
        key,
        language: "pt-BR",
        placeid: placeid,
      },
    });

    return response.data.result as any;
  } catch (error: any) {
    console.log("placeById error", { error });
    const response = error.response?.data;

    if (response) {
      showMessage({
        message: response.message,
        type: "danger",
      });
    }
  }
}

export default { placeById };
