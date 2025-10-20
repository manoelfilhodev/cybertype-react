// =============================
// ⚡ App.tsx — CyberType 2.0 (fluxo completo + aviso mobile)
// =============================
import { useState, useEffect } from "react";
import "./App.css";
import IntroScreen from "./components/IntroScreen";
import Menu from "./components/Menu";
import GameArea from "./components/GameArea";
import Settings from "./components/Settings";
import RankingScreen from "./screens/RankingScreen";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [inGame, setInGame] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [showSettings, setShowSettings] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ⚙️ Detecta se o usuário está em celular/tablet
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android|iPad|iPhone|iPod/i.test(userAgent)) {
      setIsMobile(true);
    }
  }, []);

  // 🧠 Mostra intro inicial
  if (showIntro) {
    return <IntroScreen onFinish={() => setShowIntro(false)} />;
  }

// 🚫 Caso esteja em celular, mostra aviso e bloqueia o jogo
if (isMobile) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-[#020207] via-[#030311] to-black text-cyan-400 font-mono px-6 py-12 overflow-hidden">
      {/* Partículas sutis de fundo */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-500 blur-[2px] animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${i * 0.3}s`,
              opacity: Math.random() * 0.6,
            }}
          />
        ))}
      </div>

      {/* Interface principal */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-widest drop-shadow-[0_0_25px_#00ffff] mb-3 animate-pulse">
        ⚠️ ACESSO NEURAL RESTRITO
      </h1>

      <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-sm mb-2">
        <span className="text-pink-400">[ALERTA DO SISTEMA]</span> — Terminal
        não identificado como unidade compatível.
      </p>

      <p className="text-gray-400 text-sm mb-6">
        Este simulador opera apenas em ambientes{" "}
        <span className="text-cyan-400 font-semibold">desktop neurais</span>.
      </p>

      <div className="text-pink-400 font-semibold text-sm sm:text-base mb-10">
        Conecte-se de um dispositivo com teclado físico
        <br />
        para sincronizar com o CyberType_2.0.
      </div>

      {/* Mensagem otimista */}
      <div className="text-cyan-300 text-xs sm:text-sm italic animate-pulse">
        💾 Atualização em desenvolvimento:{" "}
        <span className="text-yellow-400 font-bold">CyberType Mobile OS</span>{" "}
        — disponível em breve.
      </div>

      {/* Rodapé holográfico */}
      <div className="absolute bottom-4 text-gray-600 text-[10px] sm:text-xs tracking-widest animate-fadeIn">
        ⓘ SYSTEX GAMES NEURAL LAB // v2.0.9_BETA
      </div>

      {/* Glow inferior */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#00fff2]/25 to-transparent blur-2xl" />
    </div>
  );
}



  // 🎮 Estrutura principal normal (PC)
  return (
    <div className="cyber-wrapper bg-cyberpulse">
      <div className="cyber-container">
        {showSettings ? (
          <Settings onBack={() => setShowSettings(false)} />
        ) : showRanking ? (
          <RankingScreen onBack={() => setShowRanking(false)} />
        ) : !inGame ? (
          <Menu
            onStart={(selectedDifficulty: string) => {
              setDifficulty(selectedDifficulty);
              setInGame(true);
            }}
            onSettings={() => setShowSettings(true)}
            onViewRanking={() => setShowRanking(true)}
          />
        ) : (
          <GameArea
            onExit={() => setInGame(false)}
            onViewRanking={() => setShowRanking(true)}
            difficulty={difficulty}
          />
        )}
      </div>
    </div>
  );
}
