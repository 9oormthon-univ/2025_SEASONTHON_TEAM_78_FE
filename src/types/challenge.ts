// 챌린지 등록 요청 타입
export interface CreateChallengeRequest {
  title: string;
  content: string;
  durationDays: number;
  challengeIcon: string;
}

// 챌린지 등록 응답 타입
export interface CreateChallengeResponse {
  success: string;
  data: {
    id: number;
    title: string;
    content: string;
    durationDays: number;
    challengeIcon: string;
    createdAt: string;
  };
}

// 챌린지 정보 타입
export interface Challenge {
  id: number;
  title: string;
  content: string;
  durationDays: number;
  challengeIcon: string;
  createdAt: string;
}

// 활성 챌린지 타입
export interface ActiveChallenge {
  id: number;
  challengeIcon: string;
  title: string;
  remainingDays: number;
  achievementRate: number;
}

// 인증 완료 챌린지 요청 타입
export interface CertifiedChallengeRequest {
  date: string;
}

// 인증 완료 챌린지 응답 타입
export interface CertifiedChallengeResponse {
  success: string;
  data: {
    weeklyIcons: {
      MONDAY: string[];
      TUESDAY: string[];
      WEDNESDAY: string[];
      THURSDAY: string[];
      FRIDAY: string[];
      SATURDAY: string[];
      SUNDAY: string[];
    };
    challenges: {
      id: number;
      title: string;
      challengeIcon: string;
      achievementRate: number;
      remainingDays: number;
    };
  };
}

// 인증 완료 챌린지 타입
export interface CertifiedChallenge {
  id: number;
  title: string;
  challengeIcon: string;
  achievementRate: number;
  remainingDays: number;
}
