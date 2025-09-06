import type { User, UserProfileResponse } from "@/types/user-profile";
import { api } from "./common";

export const getUserProfile = async (): Promise<User> => {
  const response = await api.get<UserProfileResponse>("/user/profile");
  return response.data;
};
