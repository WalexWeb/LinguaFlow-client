export interface IGameCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "words" | "grammar" | "listening";
  difficulty: "easy" | "medium" | "hard";
  isLocked: boolean;
  requiredLevel: number;
  rating: number;
  playsCount: number;
  rewards: { xp: number; coins: number };
  isCompleted?: boolean;
  link: string;
}
