import { motion } from "framer-motion";

const LanguageCard = ({ name, flag }: { name: string; flag: string }) => (
  <motion.div
    whileHover={{ y: -3, scale: 1.02 }}
    whileTap={{ scale: 0.99 }}
    className="overflow-hidden rounded-2xl border-2 border-sky-400/30 bg-gray-700/7 p-6 backdrop-blur-lg hover:border-sky-400/55"
  >
    <div className="z-10 flex items-center gap-4">
      <div className="text-4xl">{flag}</div>
      <div>
        <h3 className="text-xl font-medium">{name}</h3>
      </div>
    </div>

    <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />
  </motion.div>
);

export default LanguageCard;
