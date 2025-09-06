// 컬렉션 관련 타입 정의
import type { IconName } from "@/components/Icon/ChallengeIcon";

export interface CompletedChallengeRaw {
  id: number;
  title: string;
  endDate: string;
  challengeIcon: IconName;
}

export interface CollectionDetail {
  title: string;
  content: string;
  challengeIcon: IconName;
  imageUrl: string | null;
  reactions: Array<{
    emojiType: "CLAP" | "HEART" | "FIRE" | string;
    count: number;
  }>;
}
