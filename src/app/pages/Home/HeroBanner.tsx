import { useState } from "react";
import { motion } from "framer-motion";
import { HOME_SLOGANS } from "@/data/home";
import Button from "@/app/components/ui/Button";

interface HowItWorksModalProps {
  setShowHowItWorks: (show: boolean) => void;
}

function HeroBanner({ setShowHowItWorks }: HowItWorksModalProps) {
  const [currentSlogan, setCurrentSlogan] = useState(0);

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
          <Button>Начать обучение</Button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setShowHowItWorks(true)}
            className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-sky-400/30 px-8 py-4 text-xl font-medium text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/5"
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
  );
}

export default HeroBanner;
