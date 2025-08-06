import { languagesSelectorData } from "@/data/onboard";
import { motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

interface LanguageSelectorProps {
  selectedLanguages: string[];
  // Точный тип функции SetState
  setSelectedLanguages: Dispatch<SetStateAction<string[]>>;
}

const LanguageSelector = ({
  selectedLanguages,
  setSelectedLanguages,
}: LanguageSelectorProps) => {
  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {languagesSelectorData.map((lang) => (
          <motion.div
            key={lang.name}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleLanguage(lang.name)}
            className={`flex items-center gap-3 rounded-lg border p-3 ${
              selectedLanguages.includes(lang.name)
                ? "border-blue-400 bg-blue-500/10"
                : "border-gray-700 hover:bg-gray-800/30"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" }}
          >
            <span className="text-2xl">{lang.code}</span>
            <span>{lang.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedLanguages.length > 0 ? 1 : 0 }}
        className="pt-4 text-sm text-gray-400"
      >
        Выбрано: {selectedLanguages.join(", ")}
      </motion.div>
    </div>
  );
};

export default LanguageSelector;
