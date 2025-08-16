import { create } from "zustand";

interface IOnboardingStore {
  selectedGoals: string[];
  selectedLanguages: string[];
  selectedDailyMinutes: number;
  setSelectedGoals: (goals: string[]) => void;
  setSelectedLanguages: (languages: string[]) => void;
  setSelectedDailyMinutes: (minutes: number) => void;
  reset: () => void;
}

export const useOnboardingStore = create<IOnboardingStore>((set) => ({
  selectedGoals: [],
  selectedLanguages: [],
  selectedDailyMinutes: 15,
  setSelectedGoals: (goals) => set({ selectedGoals: goals }),
  setSelectedLanguages: (languages) => set({ selectedLanguages: languages }),
  setSelectedDailyMinutes: (minutes) => set({ selectedDailyMinutes: minutes }),
  reset: () =>
    set({
      selectedGoals: [],
      selectedLanguages: [],
      selectedDailyMinutes: 15,
    }),
}));
