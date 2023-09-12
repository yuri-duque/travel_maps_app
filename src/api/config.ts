import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { getTokenStorage, saveTokenStorage } from "../storage/token/tokenStorage";
import { getRefreshTokenStorage } from "../storage/refreshToken/refreshTokenStorage";
import { authNavigationStack } from "../routes/authRoutes";

// const baseURL = "https://gym-server-i9wq.onrender.com/api/";
const baseURL = "http://localhost:3000/api/";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getTokenStorage();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      (originalRequest.url === `${baseURL}/auth/refresh-token` ||
        originalRequest.url === `${baseURL}/auth/login`)
    ) {
      const navigation = useNavigation<authNavigationStack>();
      navigation.navigate("userLogin");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await getRefreshTokenStorage();
      const response = await axios.post("/auth/refresh-token", {
        refresh_token: refreshToken,
      });
      if (response.status === 201) {
        const { token } = response.data;
        await saveTokenStorage(token);

        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        return axios(originalRequest);
      }
    }

    if (!error.response?.data) {
      showMessage({
        message: "Erro no servidor, tente novamente mais tarde!",
        type: "danger",
      });
    }

    return Promise.reject(error);
  }
);
