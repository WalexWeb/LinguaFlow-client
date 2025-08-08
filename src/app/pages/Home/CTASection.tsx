import GradientButton from "@/app/components/ui/GradientButton";
import { useHandleStart } from "@/hooks/useHandleStart";
import { motion } from "framer-motion";

interface CTASectionProps {
  onOpenRegistration: () => void;
}

function CTASection({ onOpenRegistration }: CTASectionProps) {
  const handleStart = useHandleStart();

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
      <GradientButton
        className="px-8 py-4 text-xl"
        onClick={() => handleStart(onOpenRegistration)}
      >
        Начать сейчас
      </GradientButton>
    </section>
  );
}

export default CTASection;
