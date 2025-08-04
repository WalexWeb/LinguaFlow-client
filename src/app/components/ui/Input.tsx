import type { ComponentProps } from "react";
import { motion } from "framer-motion";

function Input(props: ComponentProps<"input">) {
  return (
    // @ts-ignore
    <motion.input
      initial="hidden"
      animate="visible"
      {...props}
      className={`"border-gray-600" w-full rounded-lg border border-sky-700 bg-gray-700/30 px-4 py-3 text-white transition-colors focus:border-sky-400 focus:outline-none`}
    />
  );
}

export default Input;
