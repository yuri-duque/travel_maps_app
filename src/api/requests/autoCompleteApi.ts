import { showMessage } from "react-native-flash-message";
import { AxiosResponse } from "axios";
import { api } from "../config";
import { LatLng } from "react-native-maps";

async function autoComplete(text: string, radiusDistance: number = 500) {
  try {
    const url = process.env.EXPO_PUBLIC_GOOGLE_AUTO_COMPLETE_URL as string;
    const key = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

    // const stringLocation = `${location.latitude}%2C${location.longitude}`;

    const response: AxiosResponse = await api.get(url, {
      params: {
        key,
        language: "pt-BR",
        input: text,
        // location: stringLocation,
        radius: radiusDistance,
      },
    });

    console.log(response);

    const data = response.data.data;
    return data;
  } catch (error: any) {
    console.log("autoComplete error", { error });
    const response = error.response?.data;

    if (response) {
      showMessage({
        message: response.message,
        type: "danger",
      });
    }
  }
}

export default { autoComplete };
