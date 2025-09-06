// 인증 등록 요청 타입
export interface CreateCertificationRequest {
  title: string;
  content: string;
}

// 인증 등록 응답 타입
export interface CreateCertificationResponse {
  success: string;
  data: string;
}
