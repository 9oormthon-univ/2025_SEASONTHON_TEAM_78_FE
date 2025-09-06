// 사용자 정보 get, patch
export interface User {
  id: number;
  nickname: string;
  picture?: string;
}

export interface UserProfileResponse {
  success: string;
  data: User;
}

// 프로필 업데이트 요청 타입
export interface UpdateProfileRequest {
  picture: number;
  nickname: string;
}
