import { api } from "./common";

// 로그아웃 API
export const logout = async (): Promise<void> => {
  return api.delete<void>("/user/logout");
};
