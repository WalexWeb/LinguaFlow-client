import type { IButton } from "@/app/types/IButton.type";
import clsx from "clsx";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  className = "",
  disabled,
  ...props
}: IButton) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.99 }}
      className={clsx(
        "flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-sky-400/30 px-8 py-4 text-xl font-medium text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/5",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
