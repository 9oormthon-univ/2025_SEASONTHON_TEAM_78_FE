// src/lib/api/feed.ts
import { api } from "@/lib/api/common";

export interface ReactionCount {
  emojiType: string;
  count: number;
}

export interface CertificationFeed {
  certificationId: number;
  title: string;
  content: string;
  imageUrl: string;
  authorId: number;
  authorNickname: string;
  authorPicture: string;
  totalReactions: number;
  reactionCounts: ReactionCount[];
}

export interface Page<T> {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  pageSort: string;
  pageContents: T[];
}

interface ResponseBody<T> {
  success: boolean;
  data: T;
}

/** ----- 타입 가드 2종 (any 없이 안전하게 판별) ----- */
function hasDataField<T>(v: unknown): v is { data: T } {
  return typeof v === "object" && v !== null && "data" in v;
}

function isResponseBody<T>(v: unknown): v is ResponseBody<T> {
  return typeof v === "object" && v !== null && "success" in v && "data" in v;
}

/** axios/fetch/커스텀 래퍼 모두 수용 + ESLint no-explicit-any 회피 */
export async function getFeed(
  page = 0,
  size = 10
): Promise<Page<CertificationFeed>> {
  const res = await api.get(`/certifications/feed?page=${page}&size=${size}`);

  // 1) axios면 res.data, 그 외엔 res 자체
  const level1: unknown = hasDataField<unknown>(res) ? res.data : res;

  // 2) { success, data } 래퍼가 있으면 data 꺼내고,
  //    없으면 level1 자체가 Page<CertificationFeed> 라고 가정
  const payload: ResponseBody<Page<CertificationFeed>> = isResponseBody<
    Page<CertificationFeed>
  >(level1)
    ? level1
    : { success: true, data: level1 as Page<CertificationFeed> };

  return payload.data;
}
