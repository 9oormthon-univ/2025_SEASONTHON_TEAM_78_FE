// 사용자 정보 타입
export interface User {
  id: number;
  nickname: string;
  picture?: string;
}

// API 응답 타입
export interface UserProfileResponse {
  success: string;
  data: User;
}
