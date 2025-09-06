// 오늘의 챌린지 관련 타입 정의

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: number;
  createdAt: string;
  status: "pending" | "done";
  completedDays?: number;
  totalDays?: number;
}

export interface Certification {
  id: string;
  challengeId: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}
