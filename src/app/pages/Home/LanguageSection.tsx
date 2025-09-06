import { AnimatePresence, motion } from "framer-motion";
import LanguageCard from "../../components/shared/LanguageCard";
import { languagesSelectorData } from "@/data/langs";

function LanguageSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col justify-center gap-6 md:flex-row"
        >
          <div>
            <h3 className="mb-2 text-center text-4xl font-semibold">
              Доступные для изучения языки
            </h3>
            <p className="text-opacity-60 max-w-xl text-center text-xl text-white">
              Продолжайте изучение или выберите новый язык
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-8xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {languagesSelectorData.map((lang, i) => (
            <LanguageCard key={i} name={lang.name} flag={lang.code} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default LanguageSection;
