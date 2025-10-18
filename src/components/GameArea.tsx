import { useState } from "react";
import VirtualKeyboard from "./VirtualKeyboard";
import Timer from "./Timer";
import ScoreBoard from "./ScoreBoard";
import { getRandomWord } from "../core/words";
import { saveScore } from "../core/storage";

export default function GameArea({
  onExit,
  difficulty,
}: {
  onExit: () => void;
  difficulty: string;
}) {
  const [word, setWord] = useState(getRandomWord(difficulty));
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim().toLowerCase() === word.toLowerCase()) {
      setScore(score + 1);
      setWord(getRandomWord(difficulty));
      setInput("");
    }
  };

  const handleFinish = () => {
    saveScore(score);
    onExit();
  };

  // Duração baseada na dificuldade
  const duration = difficulty === "easy" ? 60 : difficulty === "hard" ? 15 : 30;

  return (
    <div className="flex flex-col items-center space-y-4">
      <Timer duration={duration} onFinish={handleFinish} />
      <h2 className="text-3xl text-cyan-400">{word}</h2>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="p-3 text-black rounded text-center"
        autoFocus
      />
      <ScoreBoard score={score} />
      <VirtualKeyboard />
      <button
        onClick={onExit}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
      >
        Sair
      </button>
    </div>
  );
}
