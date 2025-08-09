import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, BookOpen, Pencil, Puzzle, Trophy } from "lucide-react";
import GameCard from "../components/shared/GameCard";
import { AnimatedBackground } from "../components/backgrounds/AnimatedBackground";
import Navbar from "../components/layout/Navbar";
import type { IGameCard } from "../types/IGameCard.type";
import clsx from "clsx";

export default function Games() {
  const gamesData: IGameCard[] = [
    {
      id: "1",
      title: "Словестная дуэль",
      description:
        "Угадайте как можно больше слов за 60 секунд. Соревнуйтесь с другими игроками!",
      icon: <BookOpen className="h-6 w-6" />,
      category: "words",
      difficulty: "easy",
      isLocked: false,
      requiredLevel: 1,
      rating: 4.8,
      playsCount: 1245,
      rewards: { xp: 50, coins: 10 },
      isCompleted: true,
    },
    {
      id: "2",
      title: "Грамматический вызов",
      description:
        "Выберите правильную грамматическую форму в предложениях разной сложности",
      icon: <Pencil className="h-6 w-6" />,
      category: "grammar",
      difficulty: "medium",
      isLocked: false,
      requiredLevel: 3,
      rating: 4.5,
      playsCount: 876,
      rewards: { xp: 75, coins: 15 },
      isCompleted: false,
    },
    {
      id: "3",
      title: "Аудирование PRO",
      description:
        "Слушайте носителей языка и выбирайте правильный вариант ответа",
      icon: <Headphones className="h-6 w-6" />,
      category: "listening",
      difficulty: "hard",
      isLocked: true,
      requiredLevel: 5,
      rating: 4.9,
      playsCount: 532,
      rewards: { xp: 100, coins: 25 },
    },
  ];

  const [activeCategory, setActiveCategory] = useState<
    "all" | "words" | "grammar" | "listening"
  >("all");

  const filteredGames = gamesData.filter(
    (game) => activeCategory === "all" || game.category === activeCategory,
  );

  const categoryNames = {
    all: { name: "Все игры", icon: <Puzzle className="h-5 w-5" /> },
    words: { name: "Словарные", icon: <BookOpen className="h-5 w-5" /> },
    grammar: { name: "Грамматика", icon: <Pencil className="h-5 w-5" /> },
    listening: {
      name: "Аудирование",
      icon: <Headphones className="h-5 w-5" />,
    },
  };

  const totalGames = gamesData.length;
  const completedGames = gamesData.filter((game) => game.isCompleted).length;
  const progressPercent =
    totalGames > 0 ? (completedGames / totalGames) * 100 : 0;

  return (
    <>
      <Navbar />
      <AnimatedBackground />
      <section className="mx-auto w-screen px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Языковые{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              мини-игры
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-gray-300"
          >
            Совершенствуйте навыки в увлекательной форме и зарабатывайте награды
          </motion.p>
        </motion.div>

        {/* Фильтры */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex rounded-xl border border-sky-400/50 text-lg bg-gray-800/40 p-1 shadow-inner">
            {Object.entries(categoryNames).map(([key, { name, icon }]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key as any)}
                className={clsx(
                  "text-md flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2 text-sky-400",
                  "text-gray-300",
                  activeCategory === key
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white shadow-md"
                    : "hover:bg-gray-700/50 hover:text-sky-300",
                )}
              >
                {icon}
                {name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Прогресс */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mb-12 max-w-md rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm"
        >
          <div className="text-md flex items-center justify-between">
            <span className="flex items-center gap-1 text-gray-300">
              <Trophy className="h-7 w-7 text-amber-400" />
              Ваш прогресс
            </span>
            <span className="font-medium text-sky-400">
              {completedGames}/{totalGames} игр
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, delay: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            />
          </div>
        </motion.div>

        {/* Список игр */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
