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
    startDate: number;
    endDate: string;
    challengeIcon: string;
    status: string;
  };
}

// 인증/미인증 완료 챌린지 요청 타입
export interface CertifiedChallengeRequest {
  date: string;
}

// 인증/미인증 완료 챌린지 요청 타입
export type Challenge = {
  id: number;
  title: string;
  challengeIcon: string;
  achievementRate: number;
  remainingDays: number;
};

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
    challenges: Challenge[];
  };
}

// 챌린지 상세 조회 응답 타입
export interface ChallengeDetailResponse {
  success: string;
  data: {
    title: string;
    content: string;
    challengeIcon: string;
    remainingDays: number;
    certificationCount: number;
    totalChallengeDays: number;
    achievementRate: number;
    status: string;
    certifications: Array<{
      id: number;
      imageUrl: string;
      title: string;
      content: string;
      createdAt: string;
      reactions: Array<{
        emojiType: string;
        count: number;
      }>;
    }>;
  };
}
