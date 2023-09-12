import { showMessage } from "react-native-flash-message";
import { api } from "../../config";
import { AxiosResponse } from "axios";

export async function loginApi(email: string, password: string) {
  try {
    const response: AxiosResponse = await api.post("auth/login", { email, password });

    return response.data;
  } catch (error: any) {
    const response = error.response?.data;
    if (response) {
      showMessage({
        message: response.message,
        type: "danger",
      });
    }
  }
}
