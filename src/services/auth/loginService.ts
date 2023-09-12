import { loginApi } from "../../api/requests/auth/loginApi";
import { saveTokenStorage } from "../../storage/token/tokenStorage";
import { saveRefreshTokenStorage } from "../../storage/refreshToken/refreshTokenStorage";

export async function login(email: string, password: string) {
  try {
    const { token, refreshToken } = await loginApi(email, password);

    await saveTokenStorage(token);
    await saveRefreshTokenStorage(refreshToken);

    return token;
  } catch (error) {}
}
