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

export async function getFeed(
  page = 0,
  size = 10
): Promise<Page<CertificationFeed>> {
  const res = await api.get(`/certifications/feed?page=${page}&size=${size}`);

  const level1 = (res as any)?.data ?? res;
  const payload: ResponseBody<Page<CertificationFeed>> =
    level1?.success !== undefined && level1?.data !== undefined
      ? level1
      : { success: true, data: level1 };

  return payload.data as Page<CertificationFeed>;
}
