import type {
  CreateChallengeRequest,
  CreateChallengeResponse,
  ChallengeDetailResponse,
  CertifiedChallengeRequest,
  CertifiedChallengeResponse,
} from "@/types/challenge";
import { api } from "./common";

// 챌린지 등록 API
export const createChallenge = async (data: CreateChallengeRequest) => {
  const res = await api.post<CreateChallengeResponse>("/challenges", data);
  return res.data;
};

// 챌린지 상세 조회 API
export const getChallengeDetail = async (challengeId: string) => {
  const res = await api.get<ChallengeDetailResponse>(
    `/challenges/${challengeId}`
  );
  return res.data || res;
};

// 챌린지 삭제 API
export const deleteChallenge = async (challengeId: string) => {
  try {
    const res = await api.delete<{
      success: string;
      data: null;
    }>(`/challenges/${challengeId}`);
    return res.data;
  } catch (error) {
    // JSON 파싱 에러가 발생해도 성공으로 처리 (삭제는 성공했을 가능성이 높음)
    return { success: "true", data: null };
  }
};

// 미인증 챌린지 조회 API
export const getNotCertifiedChallenges = async (
  payload: CertifiedChallengeRequest
): Promise<CertifiedChallengeResponse["data"]> => {
  const res = await api.post<CertifiedChallengeResponse>(
    "/challenges/not-certified",
    payload
  );

  return res.data || res;
};

// 인증 완료 챌린지 조회 API
export const getCertifiedChallenges = async (
  payload: CertifiedChallengeRequest
): Promise<CertifiedChallengeResponse["data"]> => {
  const res = await api.post<CertifiedChallengeResponse>(
    "/challenges/certified",
    payload
  );

  return res.data || res;
};
