import { motion } from "framer-motion";
import {
  BarChart2,
  BrainCircuit,
  Gamepad2,
  Globe,
  Mic2,
  Repeat2,
} from "lucide-react";
import FeatureCard from "@/app/components/ui/FeatureCard";

function FeaturesSection() {
  // Особенности платформы
  const features = [
    {
      icon: <BrainCircuit size={36} />,
      title: "Интеллектуальная система",
      description:
        "Алгоритмы адаптируются под ваш стиль обучения, создавая идеальный поток знаний",
    },
    {
      icon: <Mic2 size={36} />,
      title: "Речевая практика",
      description: "Разговорные упражнения с мгновенной обратной связью",
    },
    {
      icon: <Repeat2 size={36} />,
      title: "Умные повторения",
      description:
        "Система определяет оптимальные моменты для повторения материала",
    },
    {
      icon: <Gamepad2 size={36} />,
      title: "Игровое обучение",
      description:
        "Интерактивные сценарии, превращающие обучение в приключение",
    },
    {
      icon: <Globe size={36} />,
      title: "Культурный код",
      description: "Погружение не только в язык, но и в культурный контекст",
    },
    {
      icon: <BarChart2 size={36} />,
      title: "Ясный прогресс",
      description: "Визуализация вашего продвижения в языковом потоке",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16 text-center"
      >
        <h3 className="mb-3 text-4xl font-semibold">Почему LinguaFlow</h3>
        <p className="text-opacity-60 mx-auto max-w-3xl text-xl text-white">
          Уникальные технологии для естественного языкового погружения
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard feature={feature} />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
