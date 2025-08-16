import { motion } from "framer-motion";
import StepCard from "../ui/StepCard";
import GradientButton from "../ui/GradientButton";
import { useHandleStart } from "@/hooks/useHandleStart";

interface HowItWorksModalProps {
  setShowHowItWorks: (show: boolean) => void;
  onOpenRegistration?: () => void;
}

function HowItWorksModal({
  setShowHowItWorks,
  onOpenRegistration,
}: HowItWorksModalProps) {
  const handleStart = useHandleStart();

  const steps = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
      description: "Доступно более 20 языков с разными уровнями сложности",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
      description: "Система адаптируется под ваш уровень и цели обучения",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
      description: "Интерактивные уроки с играми и реальными диалогами",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 12H18L15 21L9 3L6 12H2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Прогресс",
      description: "Детальная статистика и рекомендации для улучшения",
    },
  ];

  return (
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
        className="relative w-full max-w-2xl rounded-2xl border border-sky-700/70 bg-gradient-to-b from-gray-900/70 p-8 shadow-2xl backdrop-blur-xl"
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
          {steps.map((step, i) => (
            <StepCard step={step} index={i} />
          ))}
        </div>

        {/* Кнопка действия */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex justify-center"
        >
          <GradientButton
            className="w-70 text-xl"
            onClick={() => handleStart(onOpenRegistration)}
          >
            Начать обучение
          </GradientButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default HowItWorksModal;
