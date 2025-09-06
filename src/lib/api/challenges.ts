import type {
  CreateChallengeRequest,
  CreateChallengeResponse,
  // CertifiedChallengeResponse,
  // CertifiedChallengeRequest,
  ChallengeDetailResponse,
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
  return res.data;
};

// 미인증 챌린지 조회 API
// export const getNotCertifiedChallenges = async (
//   payload: CertifiedChallengeRequest
// ): Promise<CertifiedChallengeResponse["data"]> => {
//   const res = await api.get<CertifiedChallengeResponse>(
//     "/challenges/not-certified",
//     { params: payload }
//   );
//   return res.data;
// };

// // 인증 완료 챌린지 조회 API
// export const getCertifiedChallenges = async (
//   date: string
// ): Promise<CertifiedChallenge[]> => {
//   try {
//     const response = await api.get<CertifiedChallengeResponse>(
//       "/challenges/certified",
//       {
//         params: { date },
//       }
//     );

//     if (response && response.data && response.data.challenges) {
//       const challenges = Array.isArray(response.data.challenges)
//         ? response.data.challenges
//         : [response.data.challenges];

//       return challenges;
//     }

//     return [];
//   } catch (error) {
//     return [];
//   }
// };
