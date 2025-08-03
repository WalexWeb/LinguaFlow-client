import MethodCard from "@/app/components/ui/MethodCard";
import { motion } from "framer-motion";
import { BookOpen, Clock, Languages } from "lucide-react";

function MethodsSection() {
  // Методы обучения
  const methods = [
    {
      icon: <BookOpen size={28} />,
      title: "Контекстное обучение",
      description: "Изучайте язык через реальные ситуации и сценарии",
    },
    {
      icon: <Clock size={28} />,
      title: "Микро-уроки",
      description: "Короткие интенсивные сессии для максимального погружения",
    },
    {
      icon: <Languages size={28} />,
      title: "Мультиязычность",
      description: "Возможность изучать несколько языков одновременно",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center"
      >
        <h3 className="mb-4 text-4xl font-semibold">
          Методика языкового потока
        </h3>
        <p className="text-opacity-70 mx-auto max-w-3xl text-xl text-white">
          Наш подход основан на естественном погружении, как течение реки
        </p>
      </motion.div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {methods.map((method, i) => (
          <MethodCard method={method} index={i} />
        ))}
      </div>
    </section>
  );
}

export default MethodsSection;
