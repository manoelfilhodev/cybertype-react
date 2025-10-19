import { useState } from "react";
import "./App.css";
import IntroScreen from "./components/IntroScreen";
import Menu from "./components/Menu";
import GameArea from "./components/GameArea";
import Settings from "./components/Settings";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [inGame, setInGame] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [showSettings, setShowSettings] = useState(false);

  // === INTRO ===
  if (showIntro) {
    return <IntroScreen onFinish={() => setShowIntro(false)} />;
  }

  return (
    <div className="cyber-wrapper bg-cyberpulse">
      <div className="cyber-container">
        {showSettings ? (
          <Settings onBack={() => setShowSettings(false)} />
        ) : !inGame ? (
          <Menu
            onStart={(selectedDifficulty: string) => {
              setDifficulty(selectedDifficulty);
              setInGame(true);
            }}
            onSettings={() => setShowSettings(true)}
          />
        ) : (
          <GameArea
            onExit={() => setInGame(false)}
            difficulty={difficulty}
          />
        )}
      </div>
    </div>
  );
}
