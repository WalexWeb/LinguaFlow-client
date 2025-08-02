import { motion } from "framer-motion";

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
}

function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={`overflow-hidden rounded-2xl border-2 border-sky-400/20 bg-gradient-to-br p-6 backdrop-blur-md hover:border-sky-400/60`}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg text-sky-400">
        {feature.icon}
      </div>
      <h4 className="mb-3 text-xl font-medium">{feature.title}</h4>
      <p className="text-opacity-60 text-md text-white">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default FeatureCard;
