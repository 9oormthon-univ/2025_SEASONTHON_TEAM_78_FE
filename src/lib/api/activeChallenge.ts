import { api } from "@/lib/api/common";

export type ActiveChallenge = {
  id: number;
  challengeIcon: string;
  title: string;
  remainingDays: number;
  achievementRate: number;
};

type SuccessValue = boolean | "true" | "false";

type ApiResponseList<T> = {
  success: SuccessValue;
  data: T[];
};

type ApiResponseOne<T> = {
  success: SuccessValue;
  data: T;
};

type AxiosLikeResponse<T> = { data: T };

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isAxiosLike<T>(value: unknown): value is AxiosLikeResponse<T> {
  return isObject(value) && "data" in value;
}

function isSuccessValue(value: unknown): value is SuccessValue {
  return typeof value === "boolean" || value === "true" || value === "false";
}

function toBoolean(success: SuccessValue): boolean {
  return typeof success === "string" ? success === "true" : !!success;
}

function isActiveChallenge(value: unknown): value is ActiveChallenge {
  if (!isObject(value)) return false;
  return (
    typeof value.id === "number" &&
    typeof value.challengeIcon === "string" &&
    typeof value.title === "string" &&
    typeof value.remainingDays === "number" &&
    typeof value.achievementRate === "number"
  );
}

function isActiveChallengeArray(value: unknown): value is ActiveChallenge[] {
  return Array.isArray(value) && value.every(isActiveChallenge);
}

function isApiResponseListAC(
  value: unknown
): value is ApiResponseList<ActiveChallenge> {
  if (!isObject(value)) return false;
  const success = value.success;
  const data = value.data;
  return (
    isSuccessValue(success) &&
    Array.isArray(data) &&
    data.every(isActiveChallenge)
  );
}

function isApiResponseOneAC(
  value: unknown
): value is ApiResponseOne<ActiveChallenge> {
  if (!isObject(value)) return false;
  const success = value.success;
  const data = value.data;
  return isSuccessValue(success) && isActiveChallenge(data);
}

export async function getActiveChallenges(): Promise<ActiveChallenge[]> {
  const res = await api.get<unknown>("/challenges/active");

  const payload: unknown = isAxiosLike<unknown>(res) ? res.data : res;

  if (isActiveChallengeArray(payload)) {
    return payload;
  }

  if (isApiResponseListAC(payload)) {
    return toBoolean(payload.success) ? payload.data : [];
  }

  if (isApiResponseOneAC(payload)) {
    return toBoolean(payload.success) ? [payload.data] : [];
  }

  return [];
}
