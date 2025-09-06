import type {
  CreateChallengeRequest,
  CreateChallengeResponse,
  ActiveChallenge,
  CertifiedChallengeResponse,
  CertifiedChallenge,
} from "@/types/challenge";
import { api } from "./common";

// 챌린지 등록 API
export const createChallenge = async (data: CreateChallengeRequest) => {
  const response = await api.post<CreateChallengeResponse>("/challenges", data);
  return response.data;
};

// 활성 챌린지 조회 API
export const getActiveChallenge = async (): Promise<ActiveChallenge[]> => {
  try {
    const res = await api.get<ActiveChallenge[]>("/challenges/active");

    if (res && Array.isArray(res)) {
      return res;
    }

    return [];
  } catch (error) {
    return [];
  }
};

// 챌린지 상세 조회 API
export const getChallengeDetail = async (id: string): Promise<any> => {
  const response = await api.get<any>(`/challenges/${id}`);
  return response;
};

// 인증 완료 챌린지 조회 API
export const getCertifiedChallenges = async (
  date: string
): Promise<CertifiedChallenge[]> => {
  try {
    const response = await api.get<CertifiedChallengeResponse>(
      "/challenges/certified",
      {
        params: { date },
      }
    );

    if (response && response.data && response.data.challenges) {
      const challenges = Array.isArray(response.data.challenges)
        ? response.data.challenges
        : [response.data.challenges];

      return challenges;
    }

    return [];
  } catch (error) {
    return [];
  }
};
