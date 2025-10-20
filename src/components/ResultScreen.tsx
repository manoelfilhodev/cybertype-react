// =============================
// 🧠 ResultScreen.tsx — Exibe o resultado final com CyberScore
// =============================

import { calculateCyberScore } from "../core/scoreUtils";

export default function ResultScreen({
  score,
  totalTyped,
  errors,
  accuracy,
  wpm,
  record,
  onRestart,
}: {
  score: number;
  totalTyped: number;
  errors: number;
  accuracy: number;
  wpm: number;
  record: number;
  onRestart: () => void;
}) {
  // 🧮 Cálculo do CyberScore (substitua o "medium" se o nível vier via props futuramente)
  const cyberScore = calculateCyberScore(wpm, accuracy, "medium");

  return (
    <div className="text-center text-white space-y-4 fade-in-cyber">
      <h2 className="text-4xl font-bold text-cyan-400 drop-shadow-[0_0_15px_#00ffe7]">
        Resultado Final
      </h2>

      <div className="space-y-2 text-lg font-mono bg-[#0a0a12]/60 border border-cyan-500 rounded-xl p-6 shadow-[0_0_15px_#00ffe7] max-w-md mx-auto">
        <p>
          🏆 Pontuação:{" "}
          <span className="text-yellow-400 font-semibold">{score}</span>
        </p>
        <p>
          ⌨️ Palavras digitadas:{" "}
          <span className="text-cyan-300">{totalTyped}</span>
        </p>
        <p>
          ❌ Erros: <span className="text-red-400">{errors}</span>
        </p>
        <p>
          🎯 Precisão:{" "}
          <span className="text-green-400">{accuracy.toFixed(1)}%</span>
        </p>
        <p>
          ⚡ WPM: <span className="text-blue-400">{wpm.toFixed(1)}</span>
        </p>
        <p>
          🧠 CyberScore:{" "}
          <span className="text-pink-500 font-bold drop-shadow-[0_0_8px_#ff00ff]">
            {cyberScore}
          </span>
        </p>
        <p>
          🥇 Recorde atual:{" "}
          <span className="text-purple-400">{record}</span>
        </p>
      </div>

      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 text-white px-6 py-3 rounded-lg font-mono shadow-[0_0_15px_#00ffff] transition-all duration-300"
      >
        🔁 Jogar Novamente
      </button>
    </div>
  );
}
