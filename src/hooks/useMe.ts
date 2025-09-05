import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/api/user";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getUserProfile,
  });
}
