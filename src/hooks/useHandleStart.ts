import { useAuthStore } from "@/app/stores/AuthStore";

export function useHandleStart() {
  const { isAuthenticated } = useAuthStore();

  return (onOpenRegistration?: () => void) => {
    if (!isAuthenticated && onOpenRegistration) {
      onOpenRegistration();
    } else {
    }
  };
}
