// =============================
// 🕹️ Menu.tsx — Tela inicial CyberType 2.0 (Cyberpunk Neon)
// =============================

import { audioManager } from "../core/audioManager";
import SoundToggle from "./SoundToggle";

interface MenuProps {
  onStart: (level: string) => void;
}

export default function Menu({ onStart }: MenuProps) {
  function handleStart(level: string) {
    audioManager.play(); // 🎧 inicia música global
    onStart(level);
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 h-screen text-center">
      {/* Botão de som global (fixo no canto) */}
      <SoundToggle />

      {/* Título principal */}
      <h1
        id="introLogo"
        className="text-5xl font-bold text-cyan-400 tracking-widest drop-shadow-[0_0_12px_#00ffe7]"
      >
        CYBERTYPE_<span className="text-pink-500">2.0</span>
      </h1>

      <p className="text-gray-400 text-lg tracking-wide mt-2">
        Escolha sua dificuldade:
      </p>

      {/* Botões de dificuldade */}
      <div className="flex gap-6 mt-4">
        <button
          onClick={() => handleStart("easy")}
          className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 shadow-[0_0_10px_#00ff88]"
        >
          Fácil
        </button>

        <button
          onClick={() => handleStart("medium")}
          className="px-8 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300 shadow-[0_0_10px_#ffcc00]"
        >
          Médio
        </button>

        <button
          onClick={() => handleStart("hard")}
          className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-[0_0_10px_#ff0044]"
        >
          Difícil
        </button>
      </div>

      {/* Rodapé */}
      <footer className="absolute bottom-6 text-cyan-400 text-sm opacity-70">
        ⚡ Desenvolvido por <span className="text-white">Systex Systems</span> • 2077 Edition
      </footer>
    </div>
  );
}
