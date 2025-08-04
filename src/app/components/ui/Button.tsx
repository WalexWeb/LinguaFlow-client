import clsx from "clsx";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  children,
  onClick,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={clsx(
        "cursor-pointer rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 px-6 py-3 text-xl font-medium text-white",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
