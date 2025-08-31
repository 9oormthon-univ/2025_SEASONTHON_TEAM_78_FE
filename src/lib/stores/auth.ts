import { create } from "zustand";
import type { KakaoProfile } from "@/types/kakao";

type AuthStatus = "anonymous" | "authenticated";

interface AuthState {
  status: AuthStatus;
  user: KakaoProfile | null;
  setUser: (u: KakaoProfile | null) => void;
  setStatus: (s: AuthStatus) => void;
  reset: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  status: "anonymous",
  user: null,
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),
  reset: () => set({ status: "anonymous", user: null }),
}));
