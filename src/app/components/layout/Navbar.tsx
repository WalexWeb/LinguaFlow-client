import { useState } from "react";
import { useAuthStore } from "@/app/stores/AuthStore";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, BookOpen, Gamepad, BarChart2, User, LogOut } from "lucide-react";

interface NavbarProps {
  onOpenRegistration?: () => void;
  onOpenLogin?: () => void;
}

function Navbar({ onOpenRegistration, onOpenLogin }: NavbarProps) {
  const { isAuthenticated, clearToken } = useAuthStore();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navItems = [
    { name: "Главная", path: "/", icon: <Home className="h-5 w-5" /> },
    {
      name: "Обучение",
      path: "/learn",
      icon: <BookOpen className="h-5 w-5" />,
    },
    { name: "Игры", path: "/games", icon: <Gamepad className="h-5 w-5" /> },
    {
      name: "Прогресс",
      path: "/progress",
      icon: <BarChart2 className="h-5 w-5" />,
    },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="fixed top-0 z-50 w-full bg-black/40 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white lg:px-12">
        <Link to="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <img
              src="/logo.svg"
              alt="LinguaFlow Logo"
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-2xl font-semibold md:text-3xl">LinguaFlow</h1>
          </motion.div>
        </Link>

        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="hidden items-center gap-18 md:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group flex cursor-pointer items-center gap-2 rounded-lg py-2 text-xl transition-colors hover:text-sky-400"
              >
                <span className="group-hover:text-sky-400">{item.icon}</span>
                <span className="text-lg">{item.name}</span>
              </Link>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          {!isAuthenticated ? (
            <>
              <button
                className="cursor-pointer rounded-lg px-4 py-2 text-xl transition-colors hover:text-sky-500"
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
                className="hover:bg-opacity-5 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-xl transition-colors hover:text-sky-500"
                onClick={() => clearToken()}
              >
                <LogOut className="h-5 w-5" />
                Выход
              </button>
              <Link to={"/profile"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 px-4 py-2 text-lg"
                >
                  <User className="h-5 w-5" />
                  Профиль
                </motion.button>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
