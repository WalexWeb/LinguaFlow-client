import type { IGameCard } from "@/app/types/IGameCard.type";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Lock, Star, Volume2 } from "lucide-react";
import GradientButton from "../ui/GradientButton";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

function GameCard({ game, index }: { game: IGameCard; index: number }) {
  const navigate = useNavigate();

  const difficultyIcons = {
    easy: <CheckCircle className="h-4 w-4 text-emerald-400" />,
    medium: <Clock className="h-4 w-4 text-amber-400" />,
    hard: <Volume2 className="h-4 w-4 text-rose-400" />,
  };

  const difficultyLabels = {
    easy: "Легко",
    medium: "Средне",
    hard: "Сложно",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={clsx(
        "group relative overflow-hidden rounded-2xl border shadow-lg",
        game.isLocked
          ? "border-sky-800 bg-gray-800/30"
          : "border-sky-800 bg-gray-800/30 hover:border-sky-500/50",
      )}
    >
      {/* Overlay для заблокированных игр */}
      {game.isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 text-gray-400">
              <Lock className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-300">
              Требуется {game.requiredLevel} уровень
            </p>
          </div>
        </div>
      )}

      {/* Overlay и иконка для пройденных игр */}
      {game.isCompleted && (
        <>
          <div className="absolute inset-0 z-10 rounded-2xl border-2 border-green-500/50 bg-green-900/40 backdrop-blur-[.5px]" />
          <div className="absolute top-3 right-3 z-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/90 p-1 shadow-lg"
            >
              <CheckCircle className="h-5 w-5 text-white" />
            </motion.div>
          </div>
        </>
      )}

      <div className="flex h-full flex-col p-6">
        {/* Заголовок и иконка */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 text-sky-400">
              {game.icon}
            </div>
            <h3 className="text-xl font-semibold text-white">{game.title}</h3>
          </div>

          {/* Сложность */}
          <span
            className={clsx(
              "flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
              game.difficulty === "easy"
                ? "bg-emerald-500/10 text-emerald-400"
                : game.difficulty === "medium"
                  ? "bg-amber-500/10 text-amber-400"
                  : "bg-rose-500/10 text-rose-400",
            )}
          >
            {difficultyIcons[game.difficulty]}
            {difficultyLabels[game.difficulty]}
          </span>
        </div>

        {/* Описание */}
        <p className="mb-6 flex-1 text-gray-300">{game.description}</p>

        {/* Футер карточки */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-400">
              {game.rating.toFixed(1)} ({game.playsCount}+)
            </span>
          </div>

          <GradientButton
            disabled={game.isLocked}
            onClick={() => navigate(`/games${game.link}`)}
            className={clsx(
              "text-md flex h-10 items-center gap-2 rounded-lg px-4 py-2",
              game.isLocked
                ? "cursor-not-allowed opacity-60"
                : "hover:opacity-90",
            )}
          >
            {game.isLocked ? "Заблокировано" : "Играть"}
          </GradientButton>
        </div>
      </div>
    </motion.div>
  );
}

export default GameCard;
