import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Award,
  BarChart2,
  Globe,
  Languages,
  Bookmark,
} from "lucide-react";
import { AnimatedBackground } from "../components/backgrounds/AnimatedBackground";
import { Chart } from "chart.js/auto";
import Navbar from "../components/layout/Navbar";
import { useAuthStore } from "../stores/AuthStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // Состояния
  const [activeTab, setActiveTab] = useState("progress");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Станислав",
    email: "test@test.ru",
    level: "Intermediate (B1)",
    streak: 18,
    avatar: "/default-avatar.jpg",
    dailyGoal: 30,
    xp: 2450,
  });

  const { isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  // Моковые данные
  const progressData = {
    week: [65, 90, 45, 80, 95, 30, 70],
    month: [
      70, 80, 65, 90, 55, 75, 85, 60, 95, 40, 80, 65, 90, 50, 70, 80, 65, 90,
      55, 75, 85, 60, 95, 40, 80, 65, 90, 50, 70, 80,
    ],
    year: Array(12)
      .fill(0)
      .map(() => 30 + Math.round(Math.random() * 70)),
  };

  const languages = [
    {
      name: "Английский",
      level: "B1",
      progress: 68,
      flag: "🇬🇧",
      words: 324,
      xp: 1845,
    },
    {
      name: "Французский",
      level: "A2",
      progress: 24,
      flag: "🇫🇷",
      words: 120,
      xp: 605,
    },
    {
      name: "Немецкий",
      level: "A1",
      progress: 15,
      flag: "🇩🇪",
      words: 75,
      xp: 320,
    },
  ];

  const recentLessons = [
    { id: 1, title: "Фразовые глаголы", duration: "12 мин", xp: 80 },
    { id: 2, title: "Времена в английском", duration: "20 мин", xp: 120 },
    { id: 3, title: "Словарь: путешествия", duration: "15 мин", xp: 90 },
  ];

  const goals = [
    { title: "Выучить 100 новых слов", progress: 45 },
    { title: "Заниматься 7 дней подряд", progress: 85 },
  ];

  const achievements = [
    {
      id: 1,
      name: "Первые шаги",
      icon: "👣",
      description: "Выполни первый урок",
      unlocked: true,
      date: "15.01.2023",
    },
    {
      id: 2,
      name: "Стратег повторений",
      icon: "🧠",
      description: "Повтори 50 слов",
      unlocked: true,
      date: "22.02.2023",
    },
    {
      id: 3,
      name: "7-дневный марафон",
      icon: "🔥",
      description: "Занимайся 7 дней подряд",
      unlocked: false,
    },
    {
      id: 4,
      name: "Лингвистический ниндзя",
      icon: "🥷",
      description: "Выучи 500 слов",
      unlocked: false,
    },
    {
      id: 5,
      name: "Грамматический гуру",
      icon: "📚",
      description: "Освой 20 правил грамматики",
      unlocked: false,
    },
  ];

  // Анимация переключения вкладок
  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  // Инициализация графика
  useEffect(() => {
    if (activeTab === "progress") {
      const ctx = document.getElementById("progressChart");

      // Удаляем предыдущий график, если он существует
      let chartInstance = Chart.getChart(ctx);
      if (chartInstance) {
        chartInstance.destroy();
      }

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
          ],
          datasets: [
            {
              label: "Активность по месяцам",
              data: progressData.year,
              backgroundColor: progressData.year.map((value) =>
                value > 70 ? "rgba(0, 132, 209, 0.6)" : "rgba(75, 85, 99, 0.7)",
              ),
              borderColor: progressData.year.map((value) =>
                value > 70 ? "rgba(0, 132, 209, 0.9)" : "rgba(75, 85, 99, 1)",
              ),
              borderWidth: 1,
              borderRadius: 4,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: "rgba(31, 41, 55, 0.9)",
              titleColor: "#f3f4f6",
              bodyColor: "#e5e7eb",
              borderColor: "rgba(75, 85, 99, 0.5)",
              borderWidth: 1,
              padding: 12,
              usePointStyle: true,
              callbacks: {
                label: function (context) {
                  return `Активность: ${context.raw}%`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: "rgba(55, 65, 81, 0.5)",
              },
              ticks: {
                color: "rgba(156, 163, 175)",
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "rgba(156, 163, 175)",
              },
            },
          },
        },
      });
    }
  }, [activeTab]);

  if (!isAuthenticated) {
    navigate("/");
  }

  return (
    <div className="h-screen w-screen p-4 text-white sm:p-8">
      <Navbar />
      <AnimatedBackground />

      {/* Основной контейнер */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 py-12 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {/* Левая колонка - профиль */}
        <motion.div
          className="h-fit rounded-2xl border border-gray-700/50 bg-gray-800/50 p-4 backdrop-blur-sm sm:p-6 lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative mb-4"
            >
              <img
                src={userData.avatar}
                alt="Аватар"
                className="h-24 w-24 rounded-full border-4 border-sky-500/50 object-cover shadow-lg sm:h-40 sm:w-40"
              />
              <motion.button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute right-0 bottom-0 rounded-full bg-sky-600 p-1 shadow-md sm:right-2 sm:bottom-2 sm:p-2"
                whileHover={{ rotate: 15, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Settings size={16} className="sm:hidden" />
                <Settings size={18} className="hidden sm:block" />
              </motion.button>
            </motion.div>

            {isEditing ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="w-full space-y-3"
              >
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="w-full rounded-lg bg-gray-700 px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full rounded-lg bg-sky-600 py-2 transition-colors hover:bg-sky-700"
                >
                  Сохранить
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <h1 className="mb-1 text-lg font-bold sm:text-2xl">
                  {userData.name}
                </h1>
                <p className="mb-3 text-xs text-gray-400 sm:text-lg">
                  {userData.email}
                </p>
                <div className="mb-4 flex items-center justify-center gap-2 text-sky-400">
                  <Globe size={14} className="sm:hidden" />
                  <Globe size={16} className="hidden sm:block" />
                  <span className="text-lg">{userData.level}</span>
                </div>
              </motion.div>
            )}

            <div className="mb-4 w-full rounded-full bg-gray-700/50 p-1">
              <div className="text-md flex items-center justify-between px-3 py-1">
                <span className="flex items-center gap-1 text-amber-400">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🔥
                  </motion.div>
                  {userData.streak} дн.
                </span>
                <span className="text-sky-400">{userData.xp} XP</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-gray-700/30 p-3 sm:p-4">
              <h3 className="text-md mb-2 font-medium sm:text-lg">
                Дневная цель
              </h3>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-gray-600">
                  <motion.div
                    className="h-2 rounded-full bg-sky-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(15 / userData.dailyGoal) * 100}%` }}
                    transition={{ delay: 0.4 }}
                  />
                </div>
                <span className="text-sm text-gray-400">
                  15/{userData.dailyGoal} мин
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-gray-700/30 p-2 text-center sm:p-3">
                <div className="mb-1 text-xl font-bold text-sky-400 sm:text-2xl">
                  324
                </div>
                <div className="text-sm text-gray-400">Слова</div>
              </div>
              <div className="rounded-lg bg-gray-700/30 p-2 text-center sm:p-3">
                <div className="mb-1 text-xl font-bold text-sky-400 sm:text-2xl">
                  28
                </div>
                <div className="text-sm text-gray-400">Уроков</div>
              </div>
            </div>
            <div className="rounded-xl border border-gray-700/30 bg-gray-800/50 p-4 sm:p-6">
              {/* Текущие цели */}
              <h3 className="mb-3 text-lg font-medium sm:mb-4">Текущие цели</h3>
              <div className="space-y-3 sm:space-y-4">
                {goals.map((goal, i) => (
                  <div key={i}>
                    <div className="lg:text-md mb-2 flex justify-between">
                      <span>{goal.title}</span>
                      <span className="text-sky-400">{goal.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-700">
                      <motion.div
                        className="h-2 rounded-full bg-sky-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Правая колонка - контент */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-3">
          {/* Навигация */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hide-scrollbar flex overflow-x-auto border-b border-gray-700"
          >
            {[
              {
                id: "progress",
                icon: <BarChart2 size={16} className="sm:hidden" />,
                iconDesktop: (
                  <BarChart2 size={18} className="hidden sm:block" />
                ),
                label: "Прогресс",
              },
              {
                id: "languages",
                icon: <Languages size={16} className="sm:hidden" />,
                iconDesktop: (
                  <Languages size={18} className="hidden sm:block" />
                ),
                label: "Языки",
              },
              {
                id: "achievements",
                icon: <Award size={16} className="sm:hidden" />,
                iconDesktop: <Award size={18} className="hidden sm:block" />,
                label: "Достижения",
              },
              {
                id: "saved",
                icon: <Bookmark size={16} className="sm:hidden" />,
                iconDesktop: <Bookmark size={18} className="hidden sm:block" />,
                label: "Сохраненное",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 border-b-2 px-3 py-2 whitespace-nowrap transition-colors sm:gap-2 sm:px-6 sm:py-3 ${activeTab === tab.id ? "border-sky-500 text-sky-400" : "border-transparent text-gray-400 hover:text-gray-200"}`}
              >
                {tab.icon}
                {tab.iconDesktop}
                <span className="text-lg">{tab.label}</span>
              </button>
            ))}
          </motion.nav>

          {/* Контент вкладок */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabVariants}
              transition={{ duration: 0.3 }}
              className="pt-2"
            >
              {activeTab === "progress" && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Единый график */}
                  <div className="rounded-xl border border-gray-700/30 bg-gray-800/50 p-4 sm:p-6">
                    <h3 className="mb-4 text-2xl font-medium">
                      Активность за год
                    </h3>
                    <div className="relative h-64 sm:h-80">
                      <canvas id="progressChart"></canvas>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-700/30 bg-gray-800/50 p-4 sm:p-6">
                    <h3 className="mb-4 font-medium sm:mb-6">Статистика</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                      {[
                        {
                          title: "Текущая серия",
                          value: "5 дней",
                          progress: 100,
                        },
                        {
                          title: "Среднее в день",
                          value: "18 мин",
                          progress: 60,
                        },
                        {
                          title: "Лучший день",
                          value: "62 мин",
                          progress: 100,
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 + 0.3 }}
                          className="rounded-lg bg-gray-700/30 p-3 sm:p-4"
                        >
                          <h4 className="mb-1 text-base text-gray-400 sm:mb-2">
                            {item.title}
                          </h4>
                          <div className="mb-2 text-lg font-medium sm:mb-3 sm:text-2xl">
                            {item.value}
                          </div>
                          <div className="h-1 w-full rounded-full bg-gray-600 sm:h-1.5">
                            <motion.div
                              className="h-full rounded-full bg-sky-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ delay: i * 0.1 + 0.5 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Недавние уроки */}
                  <div className="rounded-xl border border-gray-700/30 bg-gray-800/50 p-4 sm:p-6">
                    <h3 className="mb-3 text-2xl font-medium sm:mb-4">
                      Недавние уроки
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {recentLessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between rounded-md bg-gray-700/30 px-3 py-2 hover:bg-gray-700/50 sm:px-4 sm:py-3"
                        >
                          <div>
                            <div className="text-lg font-medium">
                              {lesson.title}
                            </div>
                            <div className="text-sm text-gray-400">
                              {lesson.duration} • {lesson.xp} XP
                            </div>
                          </div>
                          <button className="text-md text-sky-400 hover:underline sm:text-lg">
                            Продолжить
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Языки */}
              {activeTab === "languages" && (
                <div className="space-y-4 sm:space-y-6">
                  {languages.map((lang, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-xl border border-gray-700/30 bg-gray-800/50 p-4 sm:p-6"
                    >
                      <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-6 sm:flex-row sm:items-start">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="text-2xl sm:text-4xl">
                            {lang.flag}
                          </span>
                          <div>
                            <h3 className="text-lg font-medium sm:text-2xl">
                              {lang.name}
                            </h3>
                            <p className="text-sm text-gray-400 sm:text-lg">
                              Уровень {lang.level}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-medium text-sky-400 sm:text-lg">
                            {lang.xp} XP
                          </div>
                          <p className="text-xs text-gray-400 sm:text-sm">
                            {lang.words} слов
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between text-lg">
                          <span>Общий прогресс</span>
                          <span className="text-sky-400">{lang.progress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-700 sm:h-2.5">
                          <motion.div
                            className="h-full rounded-full bg-sky-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${lang.progress}%` }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Достижения */}
              {activeTab === "achievements" && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                  {achievements.map((ach, i) => (
                    <motion.div
                      key={ach.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`rounded-xl border p-3 sm:p-5 ${ach.unlocked ? "border-sky-500/30 bg-sky-500/10" : "border-gray-700/50 bg-gray-800/30"}`}
                    >
                      <div className="mb-2 text-3xl sm:mb-3 sm:text-4xl">
                        {ach.icon}
                      </div>
                      <h3 className="mb-1 text-xl font-medium">{ach.name}</h3>
                      <p className="text-md mb-2 text-gray-400 sm:mb-3">
                        {ach.description}
                      </p>
                      {ach.unlocked ? (
                        <div className="text-base text-sky-400">
                          Разблокировано: {ach.date}
                        </div>
                      ) : (
                        <div className="text-base text-red-800/90">
                          Заблокировано
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === "saved" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center rounded-xl border border-gray-700/30 bg-gray-800/50 py-12 text-gray-500 sm:py-16"
                >
                  <Bookmark size={36} className="mb-3 opacity-50 sm:hidden" />
                  <Bookmark
                    size={48}
                    className="mb-4 hidden opacity-50 sm:block"
                  />
                  <p className="text-sm sm:text-base">
                    Сохраненные материалы появятся здесь
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Profile;
