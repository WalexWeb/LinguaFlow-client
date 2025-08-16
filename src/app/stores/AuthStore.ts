import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
  token: string | null;
  isAuthenticated: boolean;
  isOnboardingCompleted: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsOnboardingCompleted: (isOnboardingCompleted: boolean) => void;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      isOnboardingCompleted: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsOnboardingCompleted: (isOnboardingCompleted) =>
        set({ isOnboardingCompleted }),
      setToken: (token) => set({ token }),
      clearToken: () => {
        set({ token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
