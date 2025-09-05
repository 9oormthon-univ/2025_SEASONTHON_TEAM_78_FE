export type IconName =
  | "ball"
  | "book"
  | "broom"
  | "bus"
  | "edit"
  | "water"
  | "music"
  | "alarm";

export const ICON_LIGHT_COLORS: Record<IconName, string> = {
  ball: "bg-lime-100",
  book: "bg-pink-100",
  broom: "bg-orange-100",
  bus: "bg-blue-100",
  edit: "bg-yellow-100",
  water: "bg-cyan-100",
  music: "bg-purple-100",
  alarm: "bg-green-100",
};

export const ICON_COLORS: Record<IconName, string> = {
  ball: "bg-lime-300",
  book: "bg-pink-300",
  broom: "bg-orange-300",
  bus: "bg-blue-300",
  edit: "bg-yellow-300",
  water: "bg-cyan-300",
  music: "bg-purple-300",
  alarm: "bg-green-300",
};

// 아이콘별 실제 색상 코드 (진행률 바용)
export const ICON_COLOR_CODES: Record<
  IconName,
  { icon: string; background: string }
> = {
  ball: { icon: "stroke-lime-300", background: "stroke-lime-100" },
  book: { icon: "stroke-pink-300", background: "stroke-pink-100" },
  broom: { icon: "stroke-orange-300", background: "stroke-orange-100" },
  bus: { icon: "stroke-blue-300", background: "stroke-blue-100" },
  edit: { icon: "stroke-yellow-300", background: "stroke-yellow-100" },
  water: { icon: "stroke-cyan-300", background: "stroke-cyan-100" },
  music: { icon: "stroke-purple-300", background: "stroke-purple-100" },
  alarm: { icon: "stroke-green-300", background: "stroke-green-100" },
};

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
