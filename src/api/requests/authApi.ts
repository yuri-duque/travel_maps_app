import { showMessage } from "react-native-flash-message";
import { AxiosResponse } from "axios";
import { api } from "../config";

async function login(email: string, password: string) {
  try {
    const response: AxiosResponse = await api.post("auth/login", { email, password });
    const data = response.data.data;
    return data;
  } catch (error: any) {
    console.log("login", { error });
    const response = error.response?.data;

    if (response) {
      showMessage({
        message: response.message,
        type: "danger",
      });
    }
  }
}

export default { login };
