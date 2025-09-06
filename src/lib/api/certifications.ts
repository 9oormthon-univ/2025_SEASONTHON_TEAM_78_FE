import type {
  CreateCertificationRequest,
  CreateCertificationResponse,
} from "@/types/certification";
import { api } from "./common";

// 인증 등록 API (멀티파트 폼 데이터)
export const createCertification = async (
  challengeId: string,
  imageFile: File,
  request: CreateCertificationRequest
): Promise<CreateCertificationResponse> => {
  // FormData 생성
  const formData = new FormData();

  // 이미지 파일 추가
  formData.append("image", imageFile);

  // JSON 데이터를 Blob으로 변환하여 Content-Type 설정
  const requestBlob = new Blob([JSON.stringify(request)], {
    type: "application/json",
  });
  formData.append("request", requestBlob);

  // API 호출 (인증 토큰 자동 포함)
  const response = await api.request<CreateCertificationResponse>(
    `/certifications/challenges/${challengeId}`,
    {
      method: "POST",
      body: formData,
      // Content-Type을 설정하지 않음 (브라우저가 boundary 포함해서 자동 설정)
    }
  );

  return response;
};
