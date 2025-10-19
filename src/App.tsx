// =============================
// ⚡ App.tsx — CyberType 2.0 (fluxo original restaurado)
// =============================
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

  // === TELA DE INTRO (animação inicial) ===
  if (showIntro) {
    return <IntroScreen onFinish={() => setShowIntro(false)} />;
  }

  // === ESTRUTURA PRINCIPAL ===
  return (
    <div className="cyber-wrapper bg-cyberpulse">
      <div className="cyber-container">
        {showSettings ? (
          // ⚙️ Tela de configurações
          <Settings onBack={() => setShowSettings(false)} />
        ) : !inGame ? (
          // 🕹️ Menu principal (agora com login integrado)
          <Menu
            onStart={(selectedDifficulty: string) => {
              setDifficulty(selectedDifficulty);
              setInGame(true);
            }}
            onSettings={() => setShowSettings(true)}
          />
        ) : (
          // 🎯 Tela de jogo
          <GameArea
            onExit={() => setInGame(false)}
            difficulty={difficulty}
          />
        )}
      </div>
    </div>
  );
}
