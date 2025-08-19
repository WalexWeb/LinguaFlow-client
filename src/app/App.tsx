import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding/Onboarding";
import Games from "./pages/Games/Games";
import Learning from "./pages/Learning";
import WordScrambleGame from "./pages/Games/WordScrambleGame";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/word-scramble" element={<WordScrambleGame />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
