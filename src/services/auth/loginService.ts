import authApi from "../../api/requests/authApi";
import { saveTokenStorage } from "../../storage/token/tokenStorage";
import { saveRefreshTokenStorage } from "../../storage/refreshToken/refreshTokenStorage";

export async function login(email: string, password: string) {
  try {
    const { token, refreshToken } = await authApi.login(email, password);

    await saveTokenStorage(token);
    await saveRefreshTokenStorage(refreshToken);

    return token;
  } catch (error) {}
}
