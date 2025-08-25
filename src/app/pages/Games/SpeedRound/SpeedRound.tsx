import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Timer, Star } from "lucide-react";
import { AnimatedBackground } from "@/app/components/backgrounds/AnimatedBackground";
import { useGameStore } from "@/app/stores/useGameStore";
import { api } from "@/api/api";
import clsx from "clsx";
import Navbar from "@/app/components/layout/Navbar";
import EndGameModal from "@/app/components/ui/EndGameModal";

export default function SpeedRoundGame() {
  const [gameState, setGameState] = useState<"playing" | "finished">("playing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const {
    score,
    timeLeft,
    addScore,
    setTimeLeft,
    resetGame: resetGameStore,
  } = useGameStore();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Вопросы для Speed Round
  const questions = [
    {
      word: "SUSTAINABILITY",
      translation: "Устойчивость",
      options: ["Устойчивость", "Развитие", "Технология", "Коммуникация"],
    },
    {
      word: "ENVIRONMENT",
      translation: "Окружающая среда",
      options: ["Окружающая среда", "Развитие", "Устойчивость", "Технология"],
    },
    {
      word: "DEVELOPMENT",
      translation: "Развитие",
      options: ["Развитие", "Технология", "Коммуникация", "Устойчивость"],
    },
    {
      word: "COMMUNICATION",
      translation: "Коммуникация",
      options: ["Коммуникация", "Развитие", "Технология", "Окружающая среда"],
    },
    {
      word: "TECHNOLOGY",
      translation: "Технология",
      options: ["Технология", "Коммуникация", "Развитие", "Устойчивость"],
    },
  ];

  // Загружаем данные из localStorage
  const loadFromStorage = () => {
    const savedBestScore = localStorage.getItem("speedRoundBestScore");
    const bestScore = savedBestScore ? parseInt(savedBestScore, 10) : 0;
    return { bestScore };
  };

  const { bestScore: initialBestScore } = loadFromStorage();
  const [bestScore, setBestScore] = useState<number>(initialBestScore);

  // Перемешиваем варианты ответов
  const shuffleOptions = (questionOptions: string[]) => {
    return [...questionOptions].sort(() => Math.random() - 0.5);
  };

  // Начинаем новый раунд
  const startNewRound = () => {
    if (currentQuestion >= questions.length - 1) {
      endGame();
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setOptions(shuffleOptions(questions[currentQuestion + 1].options));
    setSelectedOption(null);
    setIsAnswered(false);
    setIsTimeout(false);
    setTimeLeft(10);
  };

  // Обработка выбора варианта ответа
  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = options[index] === questions[currentQuestion].translation;

    if (isCorrect) {
      addScore(timeLeft * 5);
    }

    setTimeout(() => {
      if (currentQuestion >= questions.length - 1) {
        endGame();
      } else {
        startNewRound();
      }
    }, 1500);
  };

  // Завершение игры
  const endGame = async () => {
    setGameState("finished");
    if (timerRef.current) clearInterval(timerRef.current);

    const finalScore = useGameStore.getState().score;

    // Обновляем рекорд
    if (finalScore > bestScore) {
      setBestScore(finalScore);
      localStorage.setItem("speedRoundBestScore", finalScore.toString());
    }

    try {
      const response = await api.put(`${API_URL}/user/update-score`, {
        score: finalScore,
      });

      if (response.status !== 200) {
        throw new Error("Ошибка при обновлении счета");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  // Сброс игры
  const resetGame = () => {
    resetGameStore();
    setCurrentQuestion(0);
    setOptions(shuffleOptions(questions[0].options));
    setSelectedOption(null);
    setIsAnswered(false);
    setGameState("playing");
    setTimeLeft(10);
  };

  useEffect(() => {
    // Инициализация первого вопроса
    setOptions(shuffleOptions(questions[0].options));
    setTimeLeft(10);

    // Таймер
    timerRef.current = setInterval(() => {
      const currentState = useGameStore.getState();
      const newTimeLeft = currentState.timeLeft - 1;

      if (newTimeLeft <= 0) {
        useGameStore.getState().setTimeLeft(0);
        setIsAnswered(true);
        setIsTimeout(true);
        setTimeout(startNewRound, 1500);
      } else {
        useGameStore.getState().setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (gameState === "finished") {
    return (
      <EndGameModal score={score} bestScore={bestScore} resetGame={resetGame} />
    );
  }

  return (
    <>
      <Navbar />
      <AnimatedBackground />
      <div className="relative h-screen w-screen overflow-hidden px-4 py-16 text-white sm:p-6 sm:px-6 lg:px-8 lg:py-22">
        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Заголовок и статистика */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
            >
              Скоростной{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                раунд
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto text-lg text-gray-300"
            >
              Выберите правильный перевод как можно быстрее!
            </motion.p>

            <div className="m-4 flex items-center justify-center gap-4">
              <div className="flex flex-col items-center rounded-xl px-4 py-2 backdrop-blur-sm">
                <div className="text-xl font-bold text-green-400">{score}</div>
                <div className="text-sm text-gray-400">Счет</div>
              </div>

              <div className="flex items-center gap-2 rounded-xl px-4 py-2 backdrop-blur-sm">
                <Timer className="h-5 w-5 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">
                  {timeLeft} с
                </span>
              </div>

              <div className="flex flex-col items-center rounded-xl px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <span className="text-xl font-bold">{bestScore}</span>
                </div>
                <div className="text-sm text-gray-400">Рекорд</div>
              </div>
            </div>

            <div className="mb-4 text-sm text-gray-400">
              Вопрос {currentQuestion + 1} из {questions.length}
            </div>
          </motion.div>

          {/* Текущее слово */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 flex min-h-20 items-center justify-center rounded-2xl border border-sky-800 bg-gray-800/40 p-6 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold text-white">
              {questions[currentQuestion].word}
            </h2>
          </motion.div>

          {/* Варианты ответов */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {options.map((option, index) => {
              const isCorrect =
                option === questions[currentQuestion].translation;
              const isSelected = selectedOption === index;

              let buttonClass =
                "bg-gray-800/50 hover:bg-gray-700/60 text-white";

              if (isAnswered) {
                if (isCorrect) {
                  buttonClass = "bg-green-500/90 text-white";
                } else if (isSelected && !isCorrect) {
                  buttonClass = "bg-red-500/90 text-white";
                } else {
                  buttonClass =
                    "bg-gray-700/40 text-gray-400 cursor-not-allowed";
                }
              } else if (isSelected) {
                buttonClass = "bg-sky-500/90 text-white";
              }

              return (
                <motion.button
                  key={index}
                  whileHover={!isAnswered ? { scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isAnswered}
                  className={clsx(
                    "flex items-center justify-between rounded-xl p-4 text-left text-xl font-medium transition-all",
                    buttonClass,
                  )}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && <Check className="h-5 w-5" />}
                  {isAnswered && isSelected && !isCorrect && (
                    <X className="h-5 w-5" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Прогресс-бар */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 h-2 w-full rounded-full bg-gray-700"
          >
            <motion.div
              animate={{ width: `${(timeLeft / 10) * 100}%` }}
              transition={{ duration: 0.2 }}
              className={clsx(
                "h-full rounded-full transition-all",
                timeLeft > 5
                  ? "bg-green-500"
                  : timeLeft > 2
                    ? "bg-yellow-500"
                    : "bg-red-500",
              )}
            />
          </motion.div>

          {/* Индикатор правильности ответа */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={clsx(
                  "mb-4 rounded-xl p-4 text-center text-xl font-medium",
                  isTimeout
                    ? "bg-red-500/20 text-red-400"
                    : selectedOption !== null &&
                        options[selectedOption] ===
                          questions[currentQuestion].translation
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400",
                )}
              >
                {isTimeout
                  ? `Время вышло! Правильный ответ: ${questions[currentQuestion].translation}`
                  : selectedOption !== null &&
                      options[selectedOption] ===
                        questions[currentQuestion].translation
                    ? `Правильно! +${timeLeft * 5}`
                    : `Неверно! Правильный ответ: ${questions[currentQuestion].translation}`}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
