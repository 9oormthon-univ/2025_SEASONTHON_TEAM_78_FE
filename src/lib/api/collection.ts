import { apiGet } from "./client";
import type { IconName } from "@/components/Icon/ChallengeIcon";

export interface CompletedChallengeRaw {
  id: number;
  title: string;
  challengeIcon: IconName;
  endDate: string;
}

export const getCompletedChallenges = () =>
  apiGet<CompletedChallengeRaw[]>("/challenges/collections");
