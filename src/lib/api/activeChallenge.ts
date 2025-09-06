import { api } from "@/lib/api/common";

export type ActiveChallenge = {
  id: number;
  challengeIcon: string;
  title: string;
  remainingDays: number;
  achievementRate: number;
};

type ApiResponse<T> = {
  success: "true" | "false";
  data: T;
};

export async function getActiveChallenge(): Promise<ActiveChallenge | null> {
  const res = await api.get<ApiResponse<ActiveChallenge>>("/challenges/active");

  const ok = (res as ApiResponse<ActiveChallenge>).success;
  const success = typeof ok === "string" ? ok === "true" : !!ok;
  if (!success) return null;

  return (res as ApiResponse<ActiveChallenge>).data;
}
