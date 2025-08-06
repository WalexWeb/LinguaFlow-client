import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Briefcase,
  Film,
  GraduationCap,
  Plane,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface GoalSelectorProps {
  selectedGoals: string[];
  setSelectedGoals: Dispatch<SetStateAction<string[]>>;
}

const GoalSelector = ({
  selectedGoals,
  setSelectedGoals,
}: GoalSelectorProps) => {
  const goals = [
    { icon: <Plane className="h-6 w-6" />, text: "Путешествия" },
    { icon: <Briefcase className="h-6 w-6" />, text: "Карьера" },
    { icon: <GraduationCap className="h-6 w-6" />, text: "Образование" },
    { icon: <Brain className="h-6 w-6" />, text: "Развитие мозга" },
    { icon: <BookOpen className="h-6 w-6" />, text: "Чтение литературы" },
    { icon: <Film className="h-6 w-6" />, text: "Популярная культура" },
  ];

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal],
    );
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {goals.map((goal) => (
        <motion.button
          key={goal.text}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => toggleGoal(goal.text)}
          className={`flex flex-col items-center gap-2 rounded-lg border p-3 ${
            selectedGoals.includes(goal.text)
              ? "border-cyan-400 bg-cyan-500/10"
              : "border-gray-700 hover:bg-gray-800/30"
          }`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          <motion.div
            animate={{
              color: selectedGoals.includes(goal.text) ? "#06b6d4" : "#9ca3af",
            }}
          >
            {goal.icon}
          </motion.div>
          <span>{goal.text}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default GoalSelector;
