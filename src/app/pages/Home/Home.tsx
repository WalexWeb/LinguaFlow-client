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

const Home = () => {
  const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);
  const mainRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden text-white">
      <AnimatedBackground targetRef={mainRef} />

      <Navbar />

      <main ref={mainRef} className="relative z-10">
        <HeroBanner setShowHowItWorks={setShowHowItWorks} />

        <LanguageSection />

        <MethodsSection />

        <FeaturesSection />

        <CTASection />

        <AnimatePresence>
          {showHowItWorks && (
            <HowItWorksModal setShowHowItWorks={setShowHowItWorks} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Home;
