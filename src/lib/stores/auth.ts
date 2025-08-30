import { create } from "zustand";

type AuthStatus = "anonymous" | "authenticated";
interface AuthState {
  status: AuthStatus;
  user: any | null; // kakao /v2/user/me 결과
  setUser: (u: any | null) => void;
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
