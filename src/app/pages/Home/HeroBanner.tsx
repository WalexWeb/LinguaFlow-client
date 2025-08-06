import { useState } from "react";
import { motion } from "framer-motion";
import { HOME_SLOGANS } from "@/data/home";
import Button from "@/app/components/ui/Button";
import GradientButton from "@/app/components/ui/GradientButton";
import { useHandleStart } from "@/hooks/useHandleStart";

interface HowItWorksModalProps {
  setShowHowItWorks: (show: boolean) => void;
  onOpenRegistration: () => void;
}

function HeroBanner({
  setShowHowItWorks,
  onOpenRegistration,
}: HowItWorksModalProps) {
  const [currentSlogan, setCurrentSlogan] = useState(0);

  const handleStart = useHandleStart();

  return (
    <section className="mx-auto px-6 pt-24 pb-32 lg:px-12">
      <div className="mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl"
        >
          Изучайте языки{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            в потоке
          </span>
        </motion.h2>

        <motion.p
          className="text-opacity-70 mx-auto mb-10 text-2xl text-white"
          key={currentSlogan}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => {
            setTimeout(() => {
              setCurrentSlogan((prev) => (prev + 1) % HOME_SLOGANS.length);
            }, 3000);
          }}
        >
          {HOME_SLOGANS[currentSlogan]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <GradientButton onClick={() => handleStart(onOpenRegistration)}>
            Начать обучение
          </GradientButton>
          <Button onClick={() => setShowHowItWorks(true)}>
            Как это работает
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
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroBanner;
