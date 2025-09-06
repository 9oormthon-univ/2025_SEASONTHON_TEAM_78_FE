import { api } from "@/lib/api/common";

export async function postCheer(
  certificationId: number,
  emojiType: "CLAP" | "HEART" | "FIRE"
) {
  return api.post(`/certifications/${certificationId}/reactions`, {
    emojiType,
  });
}
