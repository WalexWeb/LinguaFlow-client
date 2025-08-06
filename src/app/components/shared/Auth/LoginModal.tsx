import { m, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/app/stores/AuthStore";
import Input from "../../ui/Input";

interface LoginModalProps {
  onClose: () => void;
  onOpenRegistration: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginModal = ({ onClose, onOpenRegistration }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { setIsAuthenticated } = useAuthStore();

  const onSubmit = (data: LoginFormData) => {
    console.log("Данные входа:", data);
    setIsAuthenticated(true);
    onClose();
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-lg"
      onClick={onClose}
    >
      <m.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="rounded-2xl border border-sky-700/70 bg-gradient-to-b from-gray-900/70 p-8 shadow-2xl backdrop-blur-lg"
        >
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 cursor-pointer text-gray-400 transition-colors hover:text-white"
            aria-label="Закрыть модальное окно"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Заголовок */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-2xl font-bold text-white">
                LF
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-white">Войти</h1>
            <p className="text-gray-400">С возвращением!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence>
              {[
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  options: {
                    required: "Email обязателен",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Некорректный email",
                    },
                  },
                  placeholder: "Введите email",
                },
                {
                  name: "password",
                  label: "Пароль",
                  type: "password",
                  options: {
                    required: "Пароль обязателен",
                  },
                  placeholder: "Введите пароль",
                },
              ].map((field, index) => (
                <m.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <label
                    htmlFor={field.name}
                    className="mb-1 block text-sm font-medium text-gray-300"
                  >
                    {field.label}
                  </label>
                  <Input
                    type={field.type}
                    id={field.name}
                    className={`w-full rounded-lg border bg-gray-700/50 px-4 py-3 text-white transition-colors focus:border-sky-400 focus:outline-none ${
                      errors[field.name as keyof typeof errors]
                        ? "border-red-500"
                        : "border-gray-600"
                    }`}
                    {...register(
                      field.name as keyof LoginFormData,
                      field.options,
                    )}
                    placeholder={field.placeholder}
                  />
                  {errors[field.name as keyof typeof errors] && (
                    <m.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors[field.name as keyof typeof errors]?.message}
                    </m.p>
                  )}
                </m.div>
              ))}
            </AnimatePresence>

            <m.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-medium text-white transition-opacity hover:opacity-90"
            >
              Войти
            </m.button>
          </form>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-400">
              Нет аккаунта?{" "}
              <Link
                to="#"
                className="font-medium text-sky-400 transition-colors hover:text-sky-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  onOpenRegistration();
                }}
              >
                Зарегистрироваться
              </Link>
            </p>
          </m.div>
        </m.div>
      </m.div>
    </m.div>
  );
};

export default LoginModal;
