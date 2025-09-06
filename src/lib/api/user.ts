import type {
  User,
  UserProfileResponse,
  UpdateProfileRequest,
} from "@/types/user-profile";
import { api } from "./common";

export const getUserProfile = async (): Promise<User> => {
  const response = await api.get<UserProfileResponse>("/user/profile");
  return response.data;
};

export const updateUserProfile = async (
  data: UpdateProfileRequest
): Promise<User> => {
  const response = await api.patch<UserProfileResponse>("/user/profile", data);
  return response.data;
};
