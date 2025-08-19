import { m, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "@/app/stores/AuthStore";
import Input from "../../ui/Input";
import GradientButton from "../../ui/GradientButton";
import { useState } from "react";

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

  const { setIsAuthenticated, setToken, setIsOnboardingCompleted } =
    useAuthStore();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
      );

      if (!response.data.token) {
        setLoginError("Ошибка сервера: токен не получен");
        return;
      }

      setIsOnboardingCompleted(response.data.user.isOnboarded);
      setToken(response.data.token);
      setIsAuthenticated(true);
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoginError("Неверный email или пароль");
      }
    }
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
              <img
                src="/logo.svg"
                alt="LinguaFlow Logo"
                className="h-14 w-14 object-contain"
              />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-white">Войти</h1>
            <p className="text-gray-400">С возвращением!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Сообщение об ошибке входа */}
            <AnimatePresence>
              {loginError && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden rounded-lg bg-red-900/50 p-3 text-center text-red-300"
                >
                  <p>{loginError}</p>
                </m.div>
              )}
            </AnimatePresence>

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

            <GradientButton
              type="submit"
              className="w-full rounded-lg text-xl font-medium text-white transition-opacity hover:opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Вход...
                </span>
              ) : (
                "Войти"
              )}
            </GradientButton>
          </form>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center text-lg"
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
