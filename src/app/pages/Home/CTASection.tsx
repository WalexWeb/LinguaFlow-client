import Button from "@/app/components/ui/Button";
import { motion } from "framer-motion";

function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-12">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-4 text-4xl font-bold"
      >
        Начните своё языковое путешествие
      </motion.h3>
      <p className="text-opacity-70 mb-8 text-xl text-white">
        Позвольте течению знаний унести вас к новым горизонтам
      </p>
      <Button className="px-8 py-4">Начать сейчас</Button>
    </section>
  );
}

export default CTASection;
