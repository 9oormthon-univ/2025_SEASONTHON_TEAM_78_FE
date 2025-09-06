import { api } from "./common";

// 토큰 재발급 API
export const refreshToken = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    throw new Error("토큰이 없습니다");
  }

  const response = await api.post<{
    success: string;
    data: {
      accessToken: string;
      refreshToken: string;
    };
  }>("/auth/token/refresh", {
    accessToken,
    refreshToken,
  });

  return response.data;
};

// 로그아웃 API
export const logout = async (): Promise<void> => {
  return api.delete<void>("/user/logout");
};
