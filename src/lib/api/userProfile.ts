import { api } from "@/lib/api/common";
//get은 useMe

export type UpdateProfileRequest = {
  nickname: string;
  picture: string;
};

export async function updateMyProfile(
  data: UpdateProfileRequest
): Promise<void> {
  return api.patch<void>("/user/profile", data);
}
