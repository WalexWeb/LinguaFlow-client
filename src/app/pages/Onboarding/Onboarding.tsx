import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Target,
  Languages,
  Clock,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import { AnimatedBackground } from "@/app/components/backgrounds/AnimatedBackground";
import Button from "@/app/components/ui/Button";
import GoalSelector from "./GoalSelector";
import LanguageSelector from "./LanguageSelector";
import IntensitySlider from "./IntensitySlider";
import GradientButton from "@/app/components/ui/GradientButton";
import ProgressBar from "@/app/components/ui/ProgressBar";
import { useOnboardingStore } from "@/app/stores/OnboardingStore";
import { api } from "@/api/api";
import { useAuthStore } from "@/app/stores/AuthStore";

export interface OnboardingData {
  goals: string[];
  languages: string[];
  dailyMinutes: number;
}

const stepConfig = [
  {
    title: "Ваши цели обучения",
    content: "Выберите одну или несколько целей",
    icon: <Target className="h-12 w-12" />,
  },
  {
    title: "Языки для изучения",
    content: "Отметьте родной и целевые языки",
    icon: <Languages className="h-12 w-12" />,
  },
  {
    title: "Ваш темп обучения",
    content: "Настройте ежедневную нагрузку",
    icon: <Clock className="h-12 w-12" />,
  },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const { selectedGoals, selectedLanguages, selectedDailyMinutes, reset } =
    useOnboardingStore();
  const { isOnboardingCompleted, setIsOnboardingCompleted } = useAuthStore();
  const navigate = useNavigate();

  const totalSteps = stepConfig.length;

  // Проверка валидности для последнего шага
  const isFormValid = selectedGoals.length > 0 && selectedLanguages.length > 0;

  useEffect(() => {
    if (isOnboardingCompleted) {
      navigate("/learning");
    }
  }, [isOnboardingCompleted, navigate]);

  // Сбор и отправка данных
  const saveOnboardingData = async () => {
    if (!isFormValid) {
      alert("Пожалуйста, выберите цели и языки.");
      return;
    }

    try {
      const response = await api.put("/user/onboarding", {
        goals: selectedGoals,
        languages: selectedLanguages,
        dailyMinutes: selectedDailyMinutes,
      });

      if (response.status !== 200) {
        throw new Error("Ошибка при сохранении данных");
      }

      setIsOnboardingCompleted(true);
      navigate("/learning");
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      reset();
    }
  };

  const steps = [
    {
      ...stepConfig[0],
      action: () => setStep(1),
    },
    {
      ...stepConfig[1],
      action: () => setStep(2),
    },
    {
      ...stepConfig[2],
      action: saveOnboardingData,
    },
  ];

  // Рендер компонента по шагу
  const renderComponent = () => {
    switch (step) {
      case 0:
        return <GoalSelector />;
      case 1:
        return <LanguageSelector />;
      case 2:
        return <IntensitySlider />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-gray-950 text-white">
      <AnimatedBackground />

      {/* Прогресс-бар */}
      <ProgressBar step={step + 1} steps={stepConfig} />

      {/* Основной контент */}
      <div className="relative z-10 flex flex-1 items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/70 p-8 text-center shadow-xl backdrop-blur-lg"
          >
            {/* Иконка шага */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20"
            >
              {steps[step].icon}
            </motion.div>

            {/* Заголовок и описание */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="mb-4 text-3xl font-bold">{steps[step].title}</h2>
              <p className="mb-8 text-gray-400">{steps[step].content}</p>
            </motion.div>

            {/* Динамический контент */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {renderComponent()}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Навигация */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <Button
          onClick={() => (step === 0 ? navigate("/") : setStep(step - 1))}
        >
          {step === 0 ? <Home size={20} /> : <ChevronLeft size={20} />}
          {step === 0 ? "На главную" : "Назад"}
        </Button>

        <div className="flex items-center gap-2">
          {stepConfig.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: step === i ? 24 : 8,
                backgroundColor: step === i ? "#06b6d4" : "#374151",
              }}
              className="h-2 rounded-full"
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Условный рендер кнопки */}
        {step === totalSteps - 1 ? (
          <GradientButton
            className="h-16"
            onClick={steps[step].action}
            disabled={!isFormValid}
          >
            Начать обучение!
          </GradientButton>
        ) : (
          <Button onClick={steps[step].action}>
            Далее <ChevronRight size={20} className="ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
