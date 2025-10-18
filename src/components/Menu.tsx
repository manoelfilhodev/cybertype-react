// =============================
// 🕹️ Menu.tsx — Tela inicial CyberType 2.0 (Cyberpunk Neon)
// =============================

export default function Menu({ onStart }: any) {
  function handleStart(level: string) {
    // 🔊 Tocar música quando o jogador clicar
    const music = new Audio("/assets/sounds/bg-music.mp3");
    music.loop = true;
    music.volume = 0.35;
    music.play();
    onStart(level);
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 h-screen text-center">
      <h1 id="introLogo">CYBERTYPE_<span>2.0</span></h1>
      
      <p className="text-gray-400 text-lg tracking-wide">
        Escolha sua dificuldade:
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => handleStart("easy")}
          className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-neon-green text-lg"
        >
          Fácil
        </button>
        <button
          onClick={() => handleStart("medium")}
          className="px-8 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow-neon-yellow text-lg"
        >
          Médio
        </button>
        <button
          onClick={() => handleStart("hard")}
          className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-neon-red text-lg"
        >
          Difícil
        </button>
      </div>

      <footer className="absolute bottom-6 text-cyan-400 text-sm opacity-70">
        <span>⚡ Desenvolvido por Systex Systems • 2077 Edition</span>
      </footer>
    </div>
  );
}
