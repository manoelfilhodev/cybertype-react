import { useState } from "react";

export default function Menu({ onStart }: { onStart: (difficulty: string) => void }) {
  const [difficulty, setDifficulty] = useState("medium");

  return (
    <div className="text-center space-y-6">
      <h1 className="text-5xl font-bold text-cyan-400">CYBERTYPE</h1>
      <p className="text-gray-400">Treine sua velocidade e precisão na digitação</p>

      <div className="space-y-2">
        <p className="text-gray-300 font-semibold">Selecione a dificuldade:</p>
        <div className="flex justify-center space-x-3">
          {["easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-4 py-2 rounded-lg text-sm capitalize transition ${
                difficulty === level
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {level === "easy" && "Fácil"}
              {level === "medium" && "Médio"}
              {level === "hard" && "Difícil"}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStart(difficulty)}
        className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition"
      >
        Iniciar Jogo
      </button>
    </div>
  );
}
