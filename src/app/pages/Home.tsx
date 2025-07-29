import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import LanguageCard from "../components/ui/LanguageCard";
import { learningLanguages, newLanguages } from "@/data/mockData";
import HowItWorksModal from "../components/ui/HowItWorksModal";
import type { LanguageWithProgress } from "../types/languageCard.type.";

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
                onClick={() => setShowHowItWorks(true)}
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
            <HowItWorksModal setShowHowItWorks={setShowHowItWorks} />
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
