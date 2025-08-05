import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Globe } from "lucide-react";
import { AnimatedBackground } from "../components/backgrounds/AnimatedBackground";
import GradientButton from "../components/ui/GradientButton";

const NotFound = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-blue-950/80 to-black text-white">
      <AnimatedBackground />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        {/* Анимированный номер ошибки */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              transition: { duration: 2, repeat: Infinity },
            }}
            className="absolute -top-8 -left-8 text-sky-400"
          >
            <Globe size={48} />
          </motion.div>
          <motion.h1
            className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-9xl font-bold text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%"],
              transition: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Заголовок */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-4xl font-bold md:text-5xl"
        >
          Эта страница растворилась в глубинах контекста
        </motion.h2>

        {/* Описание */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 max-w-2xl text-xl text-white/80"
        >
          Кажется, мы не можем найти страницу, которую вы ищете <br />
          Возможно, она была перемещена или больше не существует
        </motion.p>

        {/* Кнопка возврата */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-2"
        >
          <GradientButton>
            <Link to="/" className="flex items-center gap-2">
              Вернуться на главную
              <motion.div
                animate={{
                  x: [0, 5, 0],
                  transition: { duration: 2, repeat: Infinity },
                }}
              >
                <ChevronRight />
              </motion.div>
            </Link>
          </GradientButton>
        </motion.div>
      </div>

      {/* Анимированные пузырьки и вихри */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-0 h-1/2 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={`bubble-${i}`}
            className="absolute bottom-0 h-[6px] w-[6px] rounded-full bg-cyan-300/50 blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
            }}
            initial={{
              y: 0,
              opacity: 0,
              scale: 0.8 + Math.random(),
            }}
            animate={{
              y: -150 - Math.random() * 200,
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Волны */}
      <div className="absolute bottom-0 left-0 z-0 w-full overflow-hidden leading-none">
        <svg
          className="h-32 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {/* Глубокая волна */}
          <path
            d="M0,60 C300,110 900,10 1200,60 L1200,120 L0,120 Z"
            fill="#0ea5e9"
            fillOpacity="0.25"
          >
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
          M0,60 C300,110 900,10 1200,60 L1200,120 L0,120 Z;
          M0,60 C250,90 950,30 1200,60 L1200,120 L0,120 Z;
          M0,60 C300,110 900,10 1200,60 L1200,120 L0,120 Z
        "
            />
          </path>

          {/* Средняя волна */}
          <path
            d="M0,70 C400,100 800,40 1200,70 L1200,120 L0,120 Z"
            fill="#0284c7"
            fillOpacity="0.2"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
          M0,70 C400,100 800,40 1200,70 L1200,120 L0,120 Z;
          M0,70 C300,80 900,60 1200,70 L1200,120 L0,120 Z;
          M0,70 C400,100 800,40 1200,70 L1200,120 L0,120 Z
        "
            />
          </path>

          {/* Поверхностная волна */}
          <path
            d="M0,80 C500,120 700,20 1200,80 L1200,120 L0,120 Z"
            fill="#0369a1"
            fillOpacity="0.15"
          >
            <animate
              attributeName="d"
              dur="14s"
              repeatCount="indefinite"
              values="
          M0,80 C500,120 700,20 1200,80 L1200,120 L0,120 Z;
          M0,80 C450,100 750,40 1200,80 L1200,120 L0,120 Z;
          M0,80 C500,120 700,20 1200,80 L1200,120 L0,120 Z
        "
            />
          </path>
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
