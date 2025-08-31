import { useQuery } from "@tanstack/react-query";
import { fetchKakaoMe } from "@/lib/api/kakao.ts";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return await fetchKakaoMe();
    },
    retry: 0,
    staleTime: 60_000,
  });
}
