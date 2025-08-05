import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { learningLanguages, newLanguages } from "@/data/mockData";
import type { LanguageWithProgress } from "../../types/languageCard.type.";
import LanguageCard from "../../components/shared/LanguageCard";

function LanguageSection() {
  const [activeTab, setActiveTab] = useState<"learning" | "new">("learning");

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <h3 className="mb-2 text-4xl font-semibold">Ваши языки</h3>
            <p className="text-opacity-60 max-w-xl text-xl text-white">
              Продолжайте изучение или выберите новый язык
            </p>
          </div>

          <div className="flex rounded-lg border border-sky-400/50 p-1 text-xl">
            <button
              onClick={() => setActiveTab("learning")}
              className={`cursor-pointer rounded-md px-5 py-2 text-sky-400 transition-colors hover:text-sky-500 ${activeTab === "learning" ? "bg-opacity-10" : "text-sky-400/60"}`}
            >
              В процессе
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`cursor-pointer rounded-md px-5 py-2 text-sky-400 transition-colors hover:text-sky-500 ${activeTab === "new" ? "bg-opacity-10" : "text-sky-400/60"}`}
            >
              Не изучено
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {(activeTab === "learning" ? learningLanguages : newLanguages).map(
            (lang, i) => (
              <LanguageCard
                key={i}
                name={lang.name}
                flag={lang.flag}
                progress={(lang as LanguageWithProgress).progress}
              />
            ),
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default LanguageSection;
