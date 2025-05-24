import axiosClient from "./axios";

const TOKEN_KEY = "token";
const TOKEN_TIMESTAMP = "accessTokenCreatedAt";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function setAccessToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_TIMESTAMP, Date.now().toString());
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function isTokenExpired(): boolean {
  const created = localStorage.getItem(TOKEN_TIMESTAMP);
  if (!created) return true;
  return Date.now() - parseInt(created) > ONE_DAY_MS;
}

export function clearAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_TIMESTAMP);
}

export async function initAccessToken(): Promise<string | null> {
  const token = getAccessToken();

  if (token && !isTokenExpired()) {
    return token;
  }

  try {
    const res = await axiosClient.post("/refresh-token", {
      withCredentials: true,
    });

    const newToken = res.data.token;
    setAccessToken(newToken);
    return newToken;
  } catch (err) {
    console.log(err);
    
    clearAccessToken();
    // window.location.href="/login"
    return null;
  }
}
