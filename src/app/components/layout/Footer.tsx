import { motion } from "framer-motion";
import { Languages, BookOpen, MessageCircle, Settings } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-auto bg-gradient-to-b to-blue-950/80">
      {/* Пузырьки с символами */}
      {[...Array(12)].map((_, i) => {
        const chars = "•◦";
        const char = chars[Math.floor(Math.random())];
        return (
          <motion.div
            key={`bubble-${i}`}
            className="absolute text-sky-400/30"
            style={{
              fontSize: `${30 + Math.random() * 10}px`,
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 30}%`,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: -100,
              opacity: [0, 0.6, 0],
              rotate: Math.random() > 0.5 ? [0, 180] : [0, -180],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {char}
          </motion.div>
        );
      })}

      {/* Основное содержимое футера */}
      <div className="relative z-10 mx-auto w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Навигация */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-sky-400">
              <Languages className="h-5 w-5" />
              Навигация
            </h3>
            <ul className="space-y-2">
              {["Главная", "Курсы", "Методика"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-lg"
                >
                  <a
                    href="#"
                    className="text-white/80 transition-colors hover:text-sky-400"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Обучение */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-sky-400">
              <BookOpen className="h-5 w-5" />
              Обучение
            </h3>
            <ul className="space-y-2">
              {["Начать курс", "Мой прогресс"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-lg"
                >
                  <a
                    href="#"
                    className="text-white/80 transition-colors hover:text-sky-400"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Поддержка */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-sky-400">
              <MessageCircle className="h-5 w-5" />
              Поддержка
            </h3>
            <ul className="space-y-2">
              {["FAQ", "Контакты", "Сообщество"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-lg"
                >
                  <a
                    href="#"
                    className="text-white/80 transition-colors hover:text-sky-400"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Настройки */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-sky-400">
              <Settings className="h-5 w-5" />
              Настройки
            </h3>
            <ul className="space-y-2">
              {["Профиль", "Уведомления", "Язык"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-lg"
                >
                  <a
                    href="#"
                    className="text-white/80 transition-colors hover:text-sky-400"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Нижняя часть футера */}
        <motion.div
          className="mt-12 border-t border-sky-900/50 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 text-xl font-bold text-white">
                LF
              </div>
              <h2 className="text-2xl font-semibold">LinguaFlow</h2>
            </motion.div>

            <motion.p
              className="text-md text-white/60"
              animate={{
                opacity: [0.6, 1, 0.6],
                transition: { duration: 4, repeat: Infinity },
              }}
            >
              © {new Date().getFullYear()} LinguaFlow. Все права защищены.
            </motion.p>

            <div className="flex gap-4">
              {["Telegram", "VK", "Instagram", "WhatsApp"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-white/60 transition-colors hover:text-sky-400"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
