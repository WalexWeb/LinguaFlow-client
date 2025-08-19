import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, Timer, Star, Trophy, Puzzle } from "lucide-react";
import { gsap } from "gsap";
import { AnimatedBackground } from "@/app/components/backgrounds/AnimatedBackground";
import GradientButton from "@/app/components/ui/GradientButton";
import Button from "@/app/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/app/stores/useGameStore";
import { api } from "@/api/api";
import clsx from "clsx";

export default function WordScrambleGame() {
  const [gameState, setGameState] = useState<"playing" | "finished">("playing");

  const API_URL = import.meta.env.VITE_API_URL;

  const {
    score,
    timeLeft,
    currentWord,
    scrambledLetters,
    selectedLetters,
    isCorrect,
    addScore,
    setCurrentWord,
    setIsCorrect,
    setScrambledLetters,
    setSelectedLetters,
    reset,
  } = useGameStore();

  const lettersRef = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Полный список слов
  const allWords = [
    { word: "SUSTAINABILITY", translation: "Устойчивость" },
    { word: "ENVIRONMENT", translation: "Окружающая среда" },
    { word: "DEVELOPMENT", translation: "Развитие" },
    { word: "COMMUNICATION", translation: "Коммуникация" },
    { word: "TECHNOLOGY", translation: "Технология" },
  ];

  // Загружаем данные из localStorage
  const loadFromStorage = () => {
    const savedCompleted = localStorage.getItem("completedWords");
    const savedBestScore = localStorage.getItem("bestScore");

    const completedWords: string[] = savedCompleted
      ? JSON.parse(savedCompleted)
      : [];

    const bestScore = savedBestScore ? parseInt(savedBestScore, 10) : 0;

    return { completedWords, bestScore };
  };

  const { completedWords: initialCompletedWords, bestScore: initialBestScore } =
    loadFromStorage();

  // Пройденные слова и лучший счёт
  const [completedWords, setCompletedWords] = useState<string[]>(
    initialCompletedWords,
  );
  const [bestScore, setBestScore] = useState<number>(initialBestScore);

  // Оставшиеся слова
  const [availableWords, setAvailableWords] = useState(
    allWords.filter((word) => !completedWords.includes(word.word)),
  );

  const scrambleWord = (word: string): string[] => {
    const letters = word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters;
  };

  const startNewRound = () => {
    if (availableWords.length === 0) {
      endGame();
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const randomWord = availableWords[randomIndex];

    setCurrentWord(randomWord.word);
    setScrambledLetters(scrambleWord(randomWord.word));
    setSelectedLetters([]);
    setIsCorrect(null);
  };

  const handleLetterSelect = (letter: string, index: number) => {
    if (gameState !== "playing") return;

    setSelectedLetters([...selectedLetters, letter]);
    setScrambledLetters(scrambledLetters.filter((_, i) => i !== index));
  };

  const checkWord = () => {
    const attemptedWord = selectedLetters.join("");
    const correct = attemptedWord === currentWord;

    setIsCorrect(correct);

    if (correct) {
      addScore(timeLeft * 10);

      const newCompletedWords = [...completedWords, currentWord];
      setCompletedWords(newCompletedWords);
      localStorage.setItem("completedWords", JSON.stringify(newCompletedWords));

      // Сколько слов останется после удаления
      const remainingAfterRemoval = availableWords.length - 1;

      // Удаляем слово из доступных
      setAvailableWords((prev) => prev.filter((w) => w.word !== currentWord));

      // Если это было последнее слово — завершаем игру
      if (remainingAfterRemoval === 0) {
        setTimeout(endGame, 1500);
      } else {
        setTimeout(startNewRound, 1500);
      }
    }
  };

  const clearSelection = () => {
    lettersRef.current.forEach((ref) => {
      if (ref) {
        gsap.to(ref, { y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" });
      }
    });

    setScrambledLetters(scrambleWord(currentWord));
    setSelectedLetters([]);
    setIsCorrect(null);
  };

  const endGame = async () => {
    setGameState("finished");
    if (timerRef.current) clearInterval(timerRef.current);

    const finalScore = useGameStore.getState().score;

    // Обновляем рекорд
    if (finalScore > bestScore) {
      setBestScore(finalScore);
      localStorage.setItem("bestScore", finalScore.toString());
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

  useEffect(() => {
    startNewRound();

    timerRef.current = setInterval(() => {
      const currentState = useGameStore.getState();
      const newTimeLeft = currentState.timeLeft - 1;

      if (newTimeLeft <= 0) {
        useGameStore.getState().setTimeLeft(0);
        endGame();
        clearInterval(timerRef.current!);
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
      <div className="relative flex h-screen w-screen items-center justify-center text-white">
        <AnimatedBackground />
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
            <GradientButton
              onClick={() => {
                reset();
                window.location.reload();
              }}
              className="h-14 w-48 text-lg"
            >
              Играть снова
            </GradientButton>
            <Button
              onClick={() => navigate("/games")}
              className="h-14 w-48 border-gray-600 bg-gray-700/50 text-white hover:bg-gray-600/50"
            >
              Все игры
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden p-4 text-white sm:p-6">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl">
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
            Собери{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              слово
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto text-lg text-gray-300"
          >
            Совершенствуйте навыки в увлекательной форме и зарабатывайте награды
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
        </motion.div>

        {/* Выбранные буквы */}
        <motion.div
          className="mb-8 flex min-h-20 items-center justify-center gap-2 rounded-2xl border border-sky-800 bg-gray-800/40 p-4 backdrop-blur-sm"
          animate={{
            backgroundColor:
              isCorrect === true
                ? "#10b98120"
                : isCorrect === false
                  ? "#ef444420"
                  : "rgba(31, 41, 55, 0.4)",
            borderColor:
              isCorrect === true
                ? "#10b98150"
                : isCorrect === false
                  ? "#ef444450"
                  : "rgba(56, 189, 248, 0.5)",
          }}
        >
          {selectedLetters.length === 0 ? (
            <span className="text-xl text-gray-500">
              Кликайте по буквам чтобы составить слово
            </span>
          ) : (
            selectedLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold sm:px-3 sm:py-2 sm:text-3xl"
              >
                {letter}
              </motion.span>
            ))
          )}
        </motion.div>

        {/* Буквы для выбора */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 grid grid-cols-5 gap-3 sm:grid-cols-7 md:grid-cols-9"
        >
          {scrambledLetters.map((letter, index) => (
            <motion.div
              ref={(el) => {
                lettersRef.current[index] = el;
              }}
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLetterSelect(letter, index)}
              className="flex h-14 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 text-2xl font-bold text-white shadow-lg transition-all hover:from-sky-400 hover:to-blue-400"
            >
              {letter}
            </motion.div>
          ))}
        </motion.div>

        {/* Кнопки управления */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={clearSelection}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-600 bg-gray-700/50 px-6 py-3 text-xl text-gray-300 transition-all hover:bg-gray-600/50"
          >
            <RotateCcw className="h-6 w-6" />
            Сбросить
          </button>

          <button
            onClick={checkWord}
            disabled={selectedLetters.length === 0 || isCorrect === true}
            className={clsx(
              "flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-xl font-medium transition-all",
              selectedLetters.length === 0
                ? "cursor-not-allowed bg-gray-700 text-gray-500"
                : isCorrect === true
                  ? "cursor-not-allowed bg-green-500 text-white"
                  : "bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:from-sky-400 hover:to-blue-400",
            )}
          >
            <Check className="h-6 w-6" />
            Проверить
          </button>
        </motion.div>

        {/* Перевод слова */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-4 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-700/70 px-7 py-3 text-xl text-white backdrop-blur-sm">
            <Puzzle className="h-5 w-5 text-sky-400" />
            {availableWords.find((w) => w.word === currentWord)?.translation}
          </div>
        </motion.div>

        {/* Сообщение о результате */}
        <AnimatePresence>
          {isCorrect !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={clsx(
                "mt-4 text-center text-2xl font-medium",
                isCorrect ? "text-green-400" : "text-red-400",
              )}
            >
              {isCorrect
                ? `Правильно! +${timeLeft * 10}`
                : "Неверно, попробуйте еще раз"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
