import { motion } from "framer-motion";
import { Star, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { AnimatedBackground } from "../backgrounds/AnimatedBackground";
import GradientButton from "./GradientButton";
import Button from "./Button";

interface IEndGameModal {
  score: number;
  bestScore: number;
  resetGame: () => void;
}

function EndGameModal({ score, bestScore, resetGame }: IEndGameModal) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <AnimatedBackground />
      <div className="relative flex h-screen w-screen items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center justify-center gap-6 rounded-2xl border border-sky-700/70 bg-gray-800/40 p-8 text-center backdrop-blur-sm"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-500 p-1">
            <Trophy className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-white">Игра завершена!</h2>

          <div className="flex flex-col gap-2">
            <p className="text-xl text-gray-300">Ваш счет:</p>
            <p className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
              {score}
            </p>
          </div>

          <div className="flex items-center gap-2 text-lg text-yellow-400">
            <Star className="h-5 w-5 fill-yellow-400" />
            <span>Рекорд: {bestScore}</span>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <GradientButton onClick={resetGame} className="h-14 w-48 text-lg">
              Играть снова
            </GradientButton>
            <Button onClick={() => navigate("/games")} className="h-14 w-48">
              Все игры
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default EndGameModal;
