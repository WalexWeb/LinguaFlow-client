import { m, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../ui/Input";
import { useAuthStore } from "@/app/stores/AuthStore";

interface RegistrationModalProps {
  onClose: () => void;
}

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationModal = ({ onClose }: RegistrationModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormData>();

  const { setIsAuthenticated } = useAuthStore();

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

  const onSubmit = (data: RegistrationFormData) => {
    console.log(data);
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
    >
      <m.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{
          duration: 0.3,
        }}
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
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-2xl font-bold text-white">
                LF
              </div>
            </div>
            <h1 className="mb-2 text-4xl font-bold text-white">
              Создайте аккаунт
            </h1>
            <p className="text-gray-400 text-lg">Начните изучать языки с LinguaFlow</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence>
              {Object.entries({
                name: {
                  label: "Имя",
                  type: "text",
                  options: { required: "Обязательное поле" },
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
                    className="mb-1 block text-md font-medium text-gray-300"
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

            <m.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-lg bg-gradient-to-r text-xl from-cyan-500 to-blue-600 px-4 py-3 font-medium text-white transition-opacity hover:opacity-90"
            >
              Зарегистрироваться
            </m.button>
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
                onClick={(e) => e.stopPropagation()}
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
