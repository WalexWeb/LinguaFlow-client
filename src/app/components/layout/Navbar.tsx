import { useAuthStore } from "@/app/stores/AuthStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface NavbarProps {
  onOpenRegistration?: () => void;
  onOpenLogin?: () => void;
}

function Navbar({ onOpenRegistration, onOpenLogin }: NavbarProps) {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 bg-black/60 px-6 py-5 backdrop-blur-xl lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to={"/"}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-2xl font-bold text-white">
              LF
            </div>
            <h1 className="text-4xl font-semibold">LinguaFlow</h1>
          </motion.div>
        </Link>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          {!isAuthenticated ? (
            <>
              <button
                className="hover:bg-opacity-5 cursor-pointer rounded-lg px-4 py-2 text-xl transition-colors hover:bg-black hover:text-sky-500"
                onClick={onOpenLogin}
              >
                Вход
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 px-4 py-2 text-lg transition-opacity"
                onClick={onOpenRegistration}
              >
                Регистрация
              </motion.button>
            </>
          ) : (
            <>
              <button
                className="hover:bg-opacity-5 cursor-pointer rounded-lg px-4 py-2 text-xl transition-colors hover:bg-black hover:text-sky-500"
                onClick={() => setIsAuthenticated(false)}
              >
                Выход
              </button>
              <Link to={"/profile"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 px-4 py-2 text-lg transition-opacity"
                >
                  Профиль
                </motion.button>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </nav>
  );
}

export default Navbar;
