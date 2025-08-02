import { motion } from "framer-motion";

interface MethodCardProps {
  method: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
  index: number;
}

function MethodCard({ method, index }: MethodCardProps) {
  return (
    <motion.div
      key={method.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl border-2 border-sky-400/20 bg-gradient-to-b from-black/30 to-sky-900/10 p-6 text-center"
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/20 text-sky-400">
        {method.icon}
      </div>
      <h4 className="mb-2 text-xl font-semibold">{method.title}</h4>
      <p className="text-opacity-60 text-white">{method.description}</p>
    </motion.div>
  );
}

export default MethodCard;
