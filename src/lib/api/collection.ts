import { api } from "./common";
import type { IconName } from "@/components/Icon/ChallengeIcon";

export interface CompletedChallengeRaw {
  id: number;
  title: string;
  endDate: string;
  challengeIcon: IconName; // 백엔드가 "water" 같은 문자열 반환 → IconName으로 사용
}

/** 컬렉션 뒷면 카드 응답 타입 */
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

export async function getCompletedChallenges(): Promise<
  CompletedChallengeRaw[]
> {
  return api.get<CompletedChallengeRaw[]>("/challenges/collections");
}

export async function getCollectionDetail(
  challengeId: number
): Promise<CollectionDetail> {
  return api.get<CollectionDetail>(`/challenges/collections/${challengeId}`);
}

export function toReactionCounts(detail?: CollectionDetail) {
  const counts = { clap: 0, heart: 0, fire: 0 };
  if (!detail?.reactions) return counts;
  for (const r of detail.reactions) {
    if (r.emojiType === "CLAP") counts.clap = r.count;
    else if (r.emojiType === "HEART") counts.heart = r.count;
    else if (r.emojiType === "FIRE") counts.fire = r.count;
  }
  return counts;
}
