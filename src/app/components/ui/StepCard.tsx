import { motion } from "framer-motion";

interface StepCardProps {
  step: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
  index: number;
}

function StepCard({ step, index }: StepCardProps) {
  return (
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
        <h4 className="text-xl font-semibold text-white">{step.title}</h4>
        <p className="mt-1 text-lg text-gray-400">{step.description}</p>
      </div>
    </motion.div>
  );
}

export default StepCard;
