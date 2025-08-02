import { motion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

interface AnimatedBackgroundProps {
  targetRef?: RefObject<HTMLElement | null>;
}

export const AnimatedBackground = ({ targetRef }: AnimatedBackgroundProps) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      style={{ y: yBg, opacity: opacityBg }}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
    </motion.div>
  );
};
