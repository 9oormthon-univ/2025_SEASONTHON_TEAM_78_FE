// hooks/useMe.ts
import { useQuery } from "@tanstack/react-query";
import { fetchKakaoMe } from "@/lib/api/kakao.ts";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      // 토큰이 없으면 fetchKakaoMe 내부에서 Kakao.Auth 준비 중 에러날 수 있음
      // 필요하면 토큰 체크를 선행해도 됩니다.
      return await fetchKakaoMe();
    },
    retry: 0,
    staleTime: 60_000,
  });
}
