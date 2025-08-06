import { useAuthStore } from "@/app/stores/AuthStore";
import { useNavigate } from "react-router-dom";

export function useHandleStart() {
  const { isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  return (onOpenRegistration?: () => void) => {
    if (!isAuthenticated && onOpenRegistration) {
      onOpenRegistration();
    } else {
      navigate("/onboard");
    }
  };
}
