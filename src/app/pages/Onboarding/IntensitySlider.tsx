import { motion } from "framer-motion";

interface IntensitySliderProps {
  intensity: number;
  setIntensity: (intensity: number) => void;
}

const IntensitySlider = ({ intensity, setIntensity }: IntensitySliderProps) => {
  return (
    <div className="px-4">
      <div className="relative mb-8 h-2 rounded-full bg-gray-700">
        <motion.div
          className="absolute h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
          initial={{ width: "0%" }}
          animate={{ width: `${(intensity / 30) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <motion.input
        type="range"
        min="5"
        max="30"
        value={intensity}
        onChange={(e) => setIntensity(parseInt(e.target.value))}
        className="mb-4 w-full accent-cyan-500"
        whileFocus={{ scale: 1.02 }}
      />

      <div className="flex justify-between text-gray-400">
        <motion.span
          animate={{
            color: intensity === 5 ? "#06b6d4" : "#9ca3af",
            scale: intensity === 5 ? 1.1 : 1,
          }}
        >
          5 мин
        </motion.span>
        <motion.span
          animate={{
            color: intensity === 30 ? "#06b6d4" : "#9ca3af",
            scale: intensity === 30 ? 1.1 : 1,
          }}
        >
          30 мин
        </motion.span>
      </div>

      <motion.div
        className="mt-6 font-medium text-cyan-400"
        animate={{
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 2 },
        }}
      >
        Выбрано: {intensity} минут в день
      </motion.div>
    </div>
  );
};

export default IntensitySlider;
