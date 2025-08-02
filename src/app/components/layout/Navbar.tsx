import { motion } from "framer-motion";

function Navbar() {
  return (
    <nav className="relative z-50 px-6 py-5 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-2xl font-bold text-white"
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring" }}
          >
            LF
          </motion.div>
          <h1 className="text-4xl font-semibold">LinguaFlow</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <button className="hover:bg-opacity-5 cursor-pointer rounded-lg px-4 py-2 text-xl transition-colors hover:bg-black hover:text-sky-500">
            Вход
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 px-4 py-2 text-lg transition-opacity"
          >
            Регистрация
          </motion.button>
        </motion.div>
      </div>
    </nav>
  );
}

export default Navbar;
