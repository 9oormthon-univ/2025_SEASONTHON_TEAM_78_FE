import { type IconName } from "@/components/Icon/challenge-color";

export interface ChallengeSuggestion {
  id: string;
  title: string;
  icon: IconName;
}

// API에서 받아올 챌린지 데이터 구조
export interface ChallengeApiResponse {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  duration: number; // 챌린지 기간 (일수)
  completedDays: number; // 성공한 일수
  createdAt: string;
  status: "pending" | "done";
  // API에서 계산된 진행률 (선택사항)
  progressPercentage?: number;
}

export const CHALLENGE_SUGGESTIONS: ChallengeSuggestion[] = [
  { id: "1", title: "물 8잔 마시기", icon: "water" },
  { id: "2", title: "매일 30분 운동하기", icon: "ball" },
  { id: "3", title: "책 1권 읽기", icon: "book" },
  { id: "4", title: "일기 쓰기", icon: "edit" },
  { id: "5", title: "새로운 요리 배우기", icon: "broom" },
  { id: "6", title: "매일 10분 명상하기", icon: "water" },
  { id: "7", title: "친구에게 연락하기", icon: "bus" },
  { id: "8", title: "새로운 언어 배우기", icon: "book" },
  { id: "9", title: "정리정돈하기", icon: "broom" },
  { id: "10", title: "감사 일기 쓰기", icon: "edit" },
];
