import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import LanguageCard from "../components/ui/LanguageCard";
import type {
  LanguageWithProgress,
} from "../types/LanguageCard.type.";
import { learningLanguages, newLanguages } from "@/data/mockData";

const Home = () => {
  const [activeTab, setActiveTab] = useState<"learning" | "new">("learning");
  const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gray-950 text-white">
      {/* Анимированный фон */}
      <motion.div
        style={{ y: yBg, opacity: opacityBg }}
        className="pointer-events-none fixed inset-0 z-0"
      >
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </motion.div>

      {/* Шапка */}
      <header className="relative z-50 px-6 py-5 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-2xl font-bold text-white">
              LF
            </div>
            <h1 className="text-4xl font-semibold">LinguaFlow</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <button className="hover:bg-opacity-5 cursor-pointer rounded-lg px-4 py-2 text-xl transition-colors hover:bg-black hover:text-sky-500">
              Вход
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 px-4 py-2 text-lg transition-opacity"
            >
              Регистрация
            </motion.button>
          </motion.div>
        </div>
      </header>

      <main ref={ref} className="relative z-10">
        {/* Главный баннер */}
        <section className="mx-auto max-w-7xl px-6 pt-24 pb-32 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl"
            >
              Изучайте языки{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                с умом
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-opacity-70 mx-auto mb-10 max-w-3xl text-2xl text-white"
            >
              Персонализированное обучение с адаптивной системой повторений
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.99 }}
                className="cursor-pointer rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 px-6 py-3 text-xl font-medium text-white"
              >
                Начать обучение
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.99 }}
                className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-sky-400/30 px-8 py-4 text-xl font-medium text-sky-400 transition-all hover:border-sky-400/50 hover:bg-sky-400/5"
              >
                <span>Как это работает</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.75 6.75L19.25 12L13.75 17.25"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 12H4.75"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Секция языков */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
            >
              <div>
                <h3 className="mb-2 text-3xl font-semibold">Ваши языки</h3>
                <p className="text-opacity-60 max-w-xl text-lg text-white">
                  Продолжайте изучение или выберите новый язык
                </p>
              </div>

              <div className="bg-opacity-5 border-opacity-5 flex rounded-lg border border-white bg-black p-1">
                <button
                  onClick={() => setActiveTab("learning")}
                  className={`cursor-pointer rounded-md px-4 py-2 text-sm transition-colors ${activeTab === "learning" ? "bg-opacity-10 bg-black" : "opacity-60 hover:opacity-100"}`}
                >
                  В процессе
                </button>
                <button
                  onClick={() => setActiveTab("new")}
                  className={`cursor-pointer rounded-md px-4 py-2 text-sm transition-colors ${activeTab === "new" ? "bg-opacity-10 bg-black" : "opacity-60 hover:opacity-100"}`}
                >
                  Новые
                </button>
              </div>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {(activeTab === "learning"
                ? learningLanguages
                : newLanguages
              ).map((lang, i) => (
                <LanguageCard
                  key={i}
                  name={lang.name}
                  flag={lang.flag}
                  progress={(lang as LanguageWithProgress).progress}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Секция возможностей */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h3 className="mb-3 text-2xl font-semibold">Почему LinguaFlow</h3>
            <p className="text-opacity-60 mx-auto max-w-2xl text-white">
              Современные методы обучения, доказавшие свою эффективность
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🧠",
                title: "Адаптивное обучение",
                description: "Система подстраивается под ваш темп обучения",
              },
              {
                icon: "🗣️",
                title: "Разговорная практика",
                description: "Тренировка произношения с обратной связью",
              },
              {
                icon: "🔄",
                title: "Интервальные повторения",
                description: "Оптимальные интервалы для запоминания",
              },
              {
                icon: "🎮",
                title: "Игровые механики",
                description: "Обучение через игры и интерактивные задания",
              },
              {
                icon: "🌍",
                title: "Культурный контекст",
                description: "Изучайте язык вместе с культурой",
              },
              {
                icon: "📊",
                title: "Отслеживание прогресса",
                description: "Наглядная статистика ваших успехов",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-opacity-3 border-opacity-5 hover:border-opacity-10 rounded-xl border border-white bg-black p-6 transition-all"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <h4 className="mb-2 text-lg font-medium">{feature.title}</h4>
                <p className="text-opacity-60 text-sm text-white">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
        <AnimatePresence>
          {showHowItWorks && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-lg"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="relative w-full max-w-2xl rounded-2xl border border-sky-700/70 bg-gradient-to-b from-gray-900/70 to-gray-800/760 p-8 shadow-2xl backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Кнопка закрытия */}
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="absolute top-6 right-6 cursor-pointer text-gray-400 transition-colors hover:text-white"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {/* Заголовок */}
                <div className="mb-8 text-center">
                  <h3 className="text-4xl font-bold text-white">
                    Как работает{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      LinguaFlow
                    </span>
                  </h3>
                  <p className="mt-2 text-xl text-gray-300">
                    Простой и эффективный процесс обучения
                  </p>
                </div>

                {/* Шаги */}
                <div className="space-y-6">
                  {[
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M8 12L11 15L16 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ),
                      title: "Выберите язык",
                      description:
                        "Доступно более 20 языков с разными уровнями сложности",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M5 20V19C5 16.7909 6.79086 15 9 15H15C17.2091 15 19 16.7909 19 19V20"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ),
                      title: "Персонализация",
                      description:
                        "Система адаптируется под ваш уровень и цели обучения",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M12 8V12L15 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ),
                      title: "Обучение",
                      description:
                        "Интерактивные уроки с играми и реальными диалогами",
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M22 12H18L15 21L9 3L6 12H2"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ),
                      title: "Прогресс",
                      description:
                        "Детальная статистика и рекомендации для улучшения",
                    },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-slate-800/40"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-600/20 text-sky-400">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">
                          {step.title}
                        </h4>
                        <p className="mt-1 text-lg text-gray-400">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Кнопка действия */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-10 flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setShowHowItWorks(false)}
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 px-6 py-3 text-lg font-medium text-white"
                  >
                    Начать обучение
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Подвал */}
      <footer className="border-opacity-10 relative z-10 border-t border-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-xl font-bold text-white">
                LF
              </div>
              <span className="text-lg font-semibold">LinguaFlow</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="text-sm transition-colors hover:text-cyan-400"
              >
                О проекте
              </a>
              <a
                href="#"
                className="text-sm transition-colors hover:text-cyan-400"
              >
                Языки
              </a>
              <a
                href="#"
                className="text-sm transition-colors hover:text-cyan-400"
              >
                Тарифы
              </a>
              <a
                href="#"
                className="text-sm transition-colors hover:text-cyan-400"
              >
                Блог
              </a>
            </div>
          </div>

          <div className="border-opacity-10 text-opacity-50 mt-12 border-t border-white pt-8 text-center text-sm text-white">
            © {new Date().getFullYear()} LinguaFlow. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
