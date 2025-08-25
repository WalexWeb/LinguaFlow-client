import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
  isAuthenticated: boolean;
  isOnboardingCompleted: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsOnboardingCompleted: (isOnboardingCompleted: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isOnboardingCompleted: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsOnboardingCompleted: (isOnboardingCompleted) =>
        set({ isOnboardingCompleted }),
      reset: () =>
        set({
          isAuthenticated: false,
          isOnboardingCompleted: false,
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
