import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding/Onboarding";
import Games from "./pages/Games/Games";
import WordScrambleGame from "./pages/Games/WorldScramble/WordScrambleGame";
import SpeedRound from "./pages/Games/SpeedRound/SpeedRound";
import Learning from "./pages/Learning";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/word-scramble" element={<WordScrambleGame />} />
        <Route path="/games/speed-round" element={<SpeedRound />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
