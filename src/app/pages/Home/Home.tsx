import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import HowItWorksModal from "../../components/shared/HowItWorksModal";
import { AnimatedBackground } from "@/app/components/backgrounds/AnimatedBackground";
import HeroBanner from "./HeroBanner";
import LanguageSection from "./LanguageSection";
import MethodsSection from "./MethodsSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import RegistrationModal from "@/app/components/Auth/RegistrationModal";
import LoginModal from "@/app/components/Auth/LoginModal";

const Home = () => {
  const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const mainRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden text-white">
      <AnimatedBackground targetRef={mainRef} />

      <Navbar
        onOpenRegistration={() => setShowRegistration(true)}
        onOpenLogin={() => setShowLogin(true)}
      />

      <main ref={mainRef} className="relative z-10">
        <HeroBanner setShowHowItWorks={setShowHowItWorks} />

        <LanguageSection />

        <MethodsSection />

        <FeaturesSection />

        <CTASection onOpenRegistration={() => setShowRegistration(true)} />

        <AnimatePresence>
          {showHowItWorks && (
            <HowItWorksModal
              setShowHowItWorks={setShowHowItWorks}
              onOpenRegistration={() => setShowRegistration(true)}
            />
          )}
          {showRegistration && (
            <RegistrationModal onClose={() => setShowRegistration(false)} />
          )}
          {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
