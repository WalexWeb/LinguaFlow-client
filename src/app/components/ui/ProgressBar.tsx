import type { IStep } from "@/app/types/IStep.type";
import { motion } from "framer-motion";

interface ProgressBarProps {
  step: number;
  steps: IStep[];
}

function ProgressBar({ step, steps }: ProgressBarProps) {
  return (
    <motion.div
      className="relative z-10 h-1 w-full bg-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        animate={{ width: `${(step / steps.length) * 100}%` }}
        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export default ProgressBar;
