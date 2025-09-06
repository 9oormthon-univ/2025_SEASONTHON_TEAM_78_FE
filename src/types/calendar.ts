// 캘린더 관련 타입 정의

export type Challenge = {
  id: string;
  title: string;
  icon: string;
  status: "pending" | "done";
  completedDays?: number;
  totalDays?: number;
};

export interface WeeklyCalendarProps {
  challenges: Challenge[];
  onChallengeClick: (challenge: Challenge) => void;
}
