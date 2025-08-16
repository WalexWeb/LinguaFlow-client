import { m, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/stores/AuthStore";
import Input from "../../ui/Input";
import GradientButton from "../../ui/GradientButton";
import axios from "axios";
import { useState } from "react";

interface RegistrationModalProps {
  onClose: () => void;
  onOpenLogin: () => void;
}

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationModal = ({
  onClose,
  onOpenLogin,
}: RegistrationModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<RegistrationFormData>();

  const { setIsAuthenticated, setToken } = useAuthStore();
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (value: string) => {
    if (value.length < 6) {
      return "Пароль должен содержать минимум 6 символов";
    }
    if (!/[A-Z]/.test(value)) {
      return "Пароль должен содержать хотя бы одну заглавную букву";
    }
    if (!/[0-9]/.test(value)) {
      return "Пароль должен содержать хотя бы одну цифру";
    }
    return true;
  };

  const validateConfirmPassword = (value: string) => {
    const password = watch("password");
    return value === password || "Пароли не совпадают";
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setRegistrationError(null);
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          username: data.name,
          email: data.email,
          password: data.password,
        },
      );

      if (response.status !== 201) {
        throw new Error("Ошибка регистрации");
      }

      // Если регистрация включает автоматический вход
      if (response.data.token) {
        setToken(response.data.token);
        setIsAuthenticated(true);
      }

      navigate("/onboarding");

      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Обработка ошибок валидации с сервера
          if (error.response.status === 400 && error.response.data.errors) {
            error.response.data.errors.forEach(
              (err: { field: string; message: string }) => {
                setError(err.field as keyof RegistrationFormData, {
                  type: "server",
                  message: err.message,
                });
              },
            );
          } else if (error.response.status === 400) {
            setRegistrationError("Пользователь с таким email уже существует");
          }
        }
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
          {/* Кнопка закрытия*/}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 cursor-pointer text-gray-400 transition-colors hover:text-white"
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
            <h1 className="mb-2 text-4xl font-bold text-white">
              Создайте аккаунт
            </h1>
            <p className="text-lg text-gray-400">
              Начните изучать языки с LinguaFlow
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Сообщение об ошибке регистрации */}
            <AnimatePresence>
              {registrationError && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden rounded-lg bg-red-900/50 p-3 text-center text-red-300"
                >
                  <p>{registrationError}</p>
                </m.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {Object.entries({
                name: {
                  label: "Имя",
                  type: "text",
                  options: {
                    required: "Обязательное поле",
                    minLength: {
                      value: 2,
                      message: "Имя должно содержать минимум 2 символа",
                    },
                  },
                  placeholder: "Ваше имя",
                },
                email: {
                  label: "Email",
                  type: "email",
                  options: {
                    required: "Обязательное поле",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Некорректный email",
                    },
                  },
                  placeholder: "Введите почту",
                },
                password: {
                  label: "Пароль",
                  type: "password",
                  options: {
                    required: "Обязательное поле",
                    validate: validatePassword,
                  },
                  placeholder: "Не менее 6 символов",
                },
                confirmPassword: {
                  label: "Подтвердите пароль",
                  type: "password",
                  options: {
                    required: "Обязательное поле",
                    validate: validateConfirmPassword,
                  },
                  placeholder: "Повторите пароль",
                },
              }).map(([name, config], index) => (
                <m.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <label
                    htmlFor={name}
                    className="text-md mb-1 block font-medium text-gray-300"
                  >
                    {config.label}
                  </label>
                  <Input
                    id={name}
                    type={config.type}
                    className={`w-full rounded-lg border bg-gray-700/50 px-4 py-3 text-white transition-colors focus:border-sky-400 focus:outline-none ${
                      errors[name as keyof typeof errors]
                        ? "border-red-500"
                        : "border-gray-600"
                    }`}
                    {...register(
                      name as keyof RegistrationFormData,
                      config.options,
                    )}
                    placeholder={config.placeholder}
                  />
                  {errors[name as keyof typeof errors] && (
                    <m.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors[name as keyof typeof errors]?.message}
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
                  Регистрация...
                </span>
              ) : (
                "Зарегистрироваться"
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
              Уже есть аккаунт?{" "}
              <Link
                to="#"
                className="font-medium text-sky-500 transition-colors hover:text-sky-400"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  onOpenLogin();
                }}
              >
                Войти
              </Link>
            </p>
          </m.div>
        </m.div>
      </m.div>
    </m.div>
  );
};

export default RegistrationModal;
