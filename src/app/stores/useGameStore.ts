import { create } from "zustand";

interface GameState {
  score: number;
  timeLeft: number;
  currentWord: string;
  scrambledLetters: string[];
  selectedLetters: string[];
  isCorrect: boolean | null;
  setScore: (score: number) => void;
  addScore: (points: number) => void;
  setIsCorrect: (correct: boolean | null) => void;
  setTimeLeft: (time: number) => void;
  setCurrentWord: (word: string) => void;
  setScrambledLetters: (letters: string[]) => void;
  setSelectedLetters: (letters: string[]) => void;
  resetRound: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  timeLeft: 60,
  currentWord: "",
  scrambledLetters: [],
  selectedLetters: [],
  isCorrect: null,

  setScore: (score) => set({ score }),
  addScore: (points) => set((state) => ({ score: state.score + points })),
  setIsCorrect: (isCorrect) => set({ isCorrect }),
  setTimeLeft: (time) => set({ timeLeft: time }),
  setCurrentWord: (word) => set({ currentWord: word }),
  setScrambledLetters: (letters) => set({ scrambledLetters: letters }),
  setSelectedLetters: (letters) => set({ selectedLetters: letters }),

  resetRound: () =>
    set({
      currentWord: "",
      scrambledLetters: [],
      selectedLetters: [],
      isCorrect: null,
    }),

  resetGame: () =>
    set({
      score: 0,
      timeLeft: 60,
      currentWord: "",
      scrambledLetters: [],
      selectedLetters: [],
      isCorrect: null,
    }),
}));
