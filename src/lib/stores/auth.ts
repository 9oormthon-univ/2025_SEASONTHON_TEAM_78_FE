import { create } from "zustand";

type AuthStatus = "anonymous" | "authenticated";
interface AuthState {
  status: AuthStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
