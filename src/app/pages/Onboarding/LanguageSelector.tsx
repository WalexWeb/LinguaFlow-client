import { useOnboardingStore } from "@/app/stores/OnboardingStore";
import { languagesSelectorData } from "@/data/onboard";
import { motion } from "framer-motion";

const LanguageSelector = () => {
  const { selectedLanguages, setSelectedLanguages } = useOnboardingStore();

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l: string) => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
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
