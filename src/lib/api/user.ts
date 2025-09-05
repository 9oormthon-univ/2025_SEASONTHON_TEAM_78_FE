import { api } from "./common";

// 사용자 정보 타입
export interface User {
  id: number;
  nickname: string;
  picture?: string;
}

// API 응답 타입
interface UserProfileResponse {
  success: string;
  data: User;
}

// 사용자 프로필 조회
export const getUserProfile = async (): Promise<User> => {
  const response = await api.get<UserProfileResponse>("/user/profile");
  return response.data;
};
