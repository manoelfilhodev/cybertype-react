import { useState } from "react";
import "./App.css";
import IntroScreen from "./components/IntroScreen";
import Menu from "./components/Menu";
import GameArea from "./components/GameArea";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [inGame, setInGame] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");

  if (showIntro) {
    return <IntroScreen onFinish={() => setShowIntro(false)} />;
  }

  return (
    <div id="menu-screen" className="flex flex-col items-center justify-center h-screen">
      {!inGame ? (
        <Menu
          onStart={(selectedDifficulty: string) => {
            setDifficulty(selectedDifficulty);
            setInGame(true);
          }}
        />
      ) : (
        <GameArea
          onExit={() => setInGame(false)}
          difficulty={difficulty}
        />
      )}
    </div>
  );
}
