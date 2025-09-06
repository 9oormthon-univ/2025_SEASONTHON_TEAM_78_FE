import { api } from "./common";
import type {
  CompletedChallengeRaw,
  CollectionDetail,
} from "@/types/collection";

// 타입 re-export
export type { CompletedChallengeRaw, CollectionDetail };

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
