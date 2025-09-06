import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Headphones,
  Edit,
  Check,
  X,
  Volume2,
  Trophy,
} from "lucide-react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { AnimatedBackground } from "@/app/components/backgrounds/AnimatedBackground";
import GradientButton from "@/app/components/ui/GradientButton";
import Button from "@/app/components/ui/Button";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Navbar from "@/app/components/layout/Navbar";

// Регистрируем плагин Flip для GSAP
gsap.registerPlugin(Flip);

export default function LearningPage() {
  const [activeMode, setActiveMode] = useState<
    "word" | "sentence" | "listening"
  >("word");
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showStats, setShowStats] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Моковые данные карточек
  const cardSets = [
    {
      id: 1,
      title: "Базовый английский",
      description: "Основные слова и фразы для начинающих",
      cards: [
        {
          id: 1,
          word: "Hello",
          translation: "Привет",
          sentence: "Hello, my name is John.",
          sentenceWithGap: "____, my name is Alex.",
          audio: "hello_audio",
        },
        {
          id: 2,
          word: "Goodbye",
          translation: "До свидания",
          sentence: "Goodbye, see you tomorrow!",
          sentenceWithGap: "Goodbye, see you ____!",
          audio: "goodbye_audio",
        },
        {
          id: 3,
          word: "Thank you",
          translation: "Спасибо",
          sentence: "Thank you for your help.",
          sentenceWithGap: "____ for your help.",
          audio: "thankyou_audio",
        },
      ],
      mastered: 8,
      total: 8,
    },
    {
      id: 2,
      title: "Деловой английский",
      description: "Профессиональная лексика для работы",
      cards: [
        {
          id: 1,
          word: "Meeting",
          translation: "Встреча",
          sentence: "We have a meeting at 3 PM.",
          sentenceWithGap: "We have a ____ at 3 PM.",
          audio: "meeting_audio",
        },
        {
          id: 2,
          word: "Deadline",
          translation: "Крайний срок",
          sentence: "The deadline is tomorrow.",
          sentenceWithGap: "The ____ is tomorrow.",
          audio: "deadline_audio",
        },
      ],
      mastered: 3,
      total: 3,
    },
  ];

  const [activeSet, setActiveSet] = useState(cardSets[0]);
  const currentCardData = activeSet.cards[currentCard];

  // Анимация переворота карточки
  const flipCard = () => {
    if (!cardRef.current) return;

    const state = Flip.getState(cardRef.current);
    setIsFlipped(!isFlipped);
    Flip.from(state, {
      duration: 0.6,
      ease: "power1.inOut",
      absolute: true,
    });
  };

  // Проверка ответа
  const checkAnswer = () => {
    let correct = false;

    if (activeMode === "word") {
      correct =
        userAnswer.toLowerCase() === currentCardData.translation.toLowerCase();
    } else if (activeMode === "sentence") {
      correct = userAnswer.toLowerCase() === currentCardData.word.toLowerCase();
    } else if (activeMode === "listening") {
      correct = true; // Пока мок
    }

    setIsCorrect(correct);

    // если правильно — увеличиваем mastered
    if (correct) {
      setActiveSet((prev) => ({
        ...prev,
        mastered: Math.min(prev.mastered + 1, prev.total),
      }));
    }

    // Переход к следующей карточке через 2 секунды
    setTimeout(() => {
      nextCard();
    }, 2000);
  };

  // Следующая карточка
  const nextCard = () => {
    if (currentCard < activeSet.cards.length - 1) {
      setCurrentCard((prev) => prev + 1);
      setIsFlipped(false);
      setUserAnswer("");
      setIsCorrect(null);
    } else {
      // Завершение набора
      setShowStats(true);
    }
  };

  // Воспроизведение аудио
  const playAudio = () => {
    // Здесь будет логика Web Speech API
    console.log("Playing audio for:", currentCardData.word);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden px-4 py-16 text-white sm:p-6 sm:px-6 lg:px-8 lg:py-22">
      <Navbar />
      <AnimatedBackground />

      <div className="relative min-h-screen px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Изучение{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                английского
              </span>
            </h1>
          </motion.div>

          {/* Выбор набора карточек */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="mb-4 text-xl font-semibold text-white">
              Выберите набор:
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {cardSets.map((set) => (
                <motion.div
                  key={set.id}
                  whileHover={{ scale: 1.02 }}
                  className={clsx(
                    "rounded-xl border p-4 backdrop-blur-sm transition-all",
                    activeSet.id === set.id
                      ? "border-cyan-500 bg-cyan-500/20"
                      : "border-gray-600 bg-gray-800/40 hover:border-cyan-400",
                  )}
                  onClick={() => setActiveSet(set)}
                >
                  <h3 className="text-lg font-semibold text-white">
                    {set.title}
                  </h3>
                  <p className="text-sm text-gray-300">{set.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-cyan-400">
                      {set.mastered}/{set.total} изучено
                    </span>
                    <div className="h-2 w-20 rounded-full bg-gray-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        style={{
                          width: `${(set.mastered / set.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Режимы обучения */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex rounded-xl border border-cyan-400/50 bg-gray-800/40 p-1 text-lg shadow-inner">
              <button
                onClick={() => setActiveMode("word")}
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-5 py-2 transition-all",
                  activeMode === "word"
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white"
                    : "text-gray-300 hover:bg-gray-700/50",
                )}
              >
                <BookOpen className="h-5 w-5" />
                Слова
              </button>
              <button
                onClick={() => setActiveMode("sentence")}
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-5 py-2 transition-all",
                  activeMode === "sentence"
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white"
                    : "text-gray-300 hover:bg-gray-700/50",
                )}
              >
                <Edit className="h-5 w-5" />
                Предложения
              </button>
              <button
                onClick={() => setActiveMode("listening")}
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-5 py-2 transition-all",
                  activeMode === "listening"
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white"
                    : "text-gray-300 hover:bg-gray-700/50",
                )}
              >
                <Headphones className="h-5 w-5" />
                Аудирование
              </button>
            </div>
          </motion.div>

          {/* Карточка для обучения */}
          {!showStats ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex flex-col items-center">
                {/* Прогресс */}
                <div className="mb-4 flex w-full max-w-md items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Карточка {currentCard + 1} из {activeSet.cards.length}
                  </span>
                  <div className="h-2 w-32 rounded-full bg-gray-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      style={{
                        width: `${((currentCard + 1) / activeSet.cards.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Карточка */}
                <div
                  ref={cardRef}
                  className="relative h-64 w-full max-w-md cursor-pointer"
                  onClick={flipCard}
                >
                  <motion.div
                    className={clsx(
                      "absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-cyan-500/50 bg-gray-800/40 p-6 backdrop-blur-sm",
                      isFlipped ? "hidden" : "flex",
                    )}
                    whileHover={{ scale: 1.02 }}
                  >
                    {activeMode === "word" && (
                      <>
                        <h3 className="mb-4 text-3xl font-bold text-white">
                          {currentCardData.word}
                        </h3>
                        <p className="text-gray-400">
                          Нажмите, чтобы увидеть перевод
                        </p>
                      </>
                    )}
                    {activeMode === "sentence" && (
                      <>
                        <h3 className="mb-4 text-center text-xl font-bold text-white">
                          {currentCardData.sentenceWithGap}
                        </h3>
                        <p className="text-gray-400">Заполните пропуск</p>
                      </>
                    )}
                    {activeMode === "listening" && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playAudio();
                          }}
                          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 transition-all hover:bg-cyan-500/30"
                        >
                          <Volume2 className="h-8 w-8 text-cyan-400" />
                        </button>
                        <p className="text-gray-400">
                          Прослушайте и переведите
                        </p>
                      </>
                    )}
                  </motion.div>

                  <motion.div
                    className={clsx(
                      "absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-cyan-500/50 bg-gray-800/60 p-6 backdrop-blur-sm",
                      isFlipped ? "flex" : "hidden",
                    )}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="mb-4 text-3xl font-bold text-white">
                      {currentCardData.translation}
                    </h3>
                    <p className="text-gray-400">Нажмите, чтобы вернуться</p>
                  </motion.div>
                </div>

                {/* Поле для ответа */}
                {(activeMode === "sentence" || activeMode === "listening") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 w-full max-w-md"
                  >
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder={
                        activeMode === "sentence"
                          ? "Введите пропущенное слово"
                          : "Введите услышанное слово"
                      }
                      className="w-full rounded-xl border border-gray-600 bg-gray-800/40 px-4 py-3 text-white backdrop-blur-sm placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none"
                    />

                    <div className="mt-4 flex justify-center">
                      <GradientButton
                        onClick={checkAnswer}
                        disabled={!userAnswer.trim()}
                        className="px-8 py-3"
                      >
                        Проверить
                      </GradientButton>
                    </div>
                  </motion.div>
                )}

                {/* Результат проверки */}
                <AnimatePresence>
                  {isCorrect !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={clsx(
                        "mt-4 rounded-xl px-6 py-3 text-lg font-medium",
                        isCorrect
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400",
                      )}
                    >
                      {isCorrect ? (
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5" />
                          Правильно!
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <X className="h-5 w-5" />
                          Попробуйте еще раз
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* Статистика после завершения */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-md rounded-2xl border border-cyan-500/50 bg-gray-800/40 p-8 text-center backdrop-blur-sm"
            >
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                Набор завершен!
              </h3>
              <p className="mb-6 text-gray-300">
                Вы успешно изучили все карточки в этом наборе
              </p>

              <div className="mb-6 justify-center gap-4">
                <div className="rounded-xl bg-gray-800/60 p-4">
                  <div className="text-2xl font-bold text-cyan-400">
                    {activeSet.mastered}
                  </div>
                  <div className="text-sm text-gray-400">Изучено слов</div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <GradientButton onClick={() => setShowStats(false)}>
                  Повторить набор
                </GradientButton>
                <Button onClick={() => navigate("/learn")}>
                  Выбрать другой набор
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
