// =============================
// 🎮 GameArea.tsx — CyberType 2.0 (React + Timer + Tela de Resultado + Som + Toggle)
// =============================

import { useEffect, useRef, useState } from "react";
import { getRandomWord } from "../core/words";
import { saveScore, getBestScore } from "../core/storage";
import SoundToggle from "./SoundToggle";

// 🎧 Sons globais (Cyberpunk Edition)
const correctSound = new Audio("/assets/sounds/correct.mp3");
const wrongSound = new Audio("/assets/sounds/wrong.mp3");
const timeoutSound = new Audio("/assets/sounds/timeout.mp3");
const bgMusic = new Audio("/assets/sounds/bg-music.mp3");

bgMusic.loop = true; // música contínua
bgMusic.volume = 0.35;
correctSound.volume = 0.6;
wrongSound.volume = 0.6;
timeoutSound.volume = 0.6;

interface GameAreaProps {
  difficulty: string;
  onExit: () => void;
}

export default function GameArea({ difficulty, onExit }: GameAreaProps) {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // === Inicialização ===
  useEffect(() => {
    setBestScore(getBestScore(difficulty));
    startNewWord();
    inputRef.current?.focus();

    // 🎶 Toca música ao iniciar
    bgMusic.play().catch(() => {
      console.log("🎵 Aguardando interação do usuário para iniciar o som...");
    });

    return () => {
      stopTimer();
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, [difficulty]);

  // === Atualiza contagem regressiva ===
  useEffect(() => {
    if (timeLeft <= 0 && !gameOver) handleTimeout();
  }, [timeLeft]);

  // === Inicia nova palavra ===
  function startNewWord() {
    const word = getRandomWord(difficulty);
    setCurrentWord(word);
    setInputValue("");
    setStartTime(Date.now());

    let initialTime = 10;
    if (difficulty === "easy") initialTime = 12;
    else if (difficulty === "hard") initialTime = 8;

    setTimeLeft(initialTime);
    startTimer();
  }

  // === Inicia contagem regressiva ===
  function startTimer() {
    stopTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => parseFloat((prev - 0.1).toFixed(1)));
    }, 100);
  }

  // === Para o timer ===
  function stopTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  // === Tempo esgotado ===
  function handleTimeout() {
    stopTimer();
    flashFeedback("wrong");
    timeoutSound.currentTime = 0;
    timeoutSound.play();
    setStatus("⏰ Tempo esgotado!");
    setTimeout(() => setStatus(""), 800);
    startNewWord();
  }

  // === Entrada ===
  function handleInput(value: string) {
    setInputValue(value);
    if (value === currentWord) handleCorrect();
    else {
      const expected = currentWord.substring(0, value.length);
      if (value !== expected) handleWrong();
    }
  }

  // === Acerto ===
  function handleCorrect() {
    const timeTaken = (Date.now() - startTime) / 1000;
    const points = Math.max(1, Math.floor(10 - timeTaken));
    setScore((prev) => prev + points);
    flashFeedback("correct");
    startNewWord();
  }

  // === Erro ===
  function handleWrong() {
    flashFeedback("wrong");
    setStatus("❌ Erro!");
    setTimeout(() => setStatus(""), 500);
  }

  // === Feedback visual + som ===
  function flashFeedback(type: "correct" | "wrong") {
    if (type === "correct") {
      correctSound.currentTime = 0;
      correctSound.play();
      document.body.classList.add("correct-flash");
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play();
      document.body.classList.add("wrong-flash");
    }

    setTimeout(() => {
      document.body.classList.remove("correct-flash", "wrong-flash");
    }, 150);
  }

  // === Fim de jogo ===
  function endGame() {
    stopTimer();
    saveScore(score, difficulty);
    setBestScore(getBestScore(difficulty));
    setGameOver(true);
  }

  // === Reiniciar jogo ===
  function restartGame() {
    setScore(0);
    setGameOver(false);
    startNewWord();
  }

  // === Tela de resultado ===
  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 text-center relative">
        <SoundToggle bgMusic={bgMusic} />
        <h1 className="text-3xl font-bold text-cyan-400 drop-shadow-md">🏁 Fim de Jogo!</h1>
        <p className="text-xl text-gray-300">
          Dificuldade: <span className="font-semibold">{difficulty}</span>
        </p>

        <div className="bg-gray-800 text-white px-8 py-6 rounded-lg shadow-lg border border-cyan-500">
          <p className="text-2xl mb-2">
            Pontuação Final: <span className="text-green-400">{score}</span>
          </p>
          <p className="text-lg text-yellow-400">
            Melhor Pontuação: {bestScore}
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={restartGame}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Jogar Novamente
          </button>
          <button
            onClick={onExit}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Voltar ao Menu
          </button>
        </div>
      </div>
    );
  }

  // === Tela do jogo ===
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center relative">
      <SoundToggle bgMusic={bgMusic} />

      <h1 className="text-3xl font-bold text-cyan-400">CyberType 2.0</h1>
      <p className="text-gray-300">
        Dificuldade: <span className="font-semibold">{difficulty}</span>
      </p>

      <div className="text-xl text-yellow-400 font-mono">
        ⏱️ Tempo: {timeLeft.toFixed(1)}s
      </div>

      <div id="status" className="text-red-400 text-xl">
        {status}
      </div>

      <div
        id="current-word"
        className="text-4xl font-mono tracking-widest text-white bg-gray-800 px-6 py-4 rounded-lg shadow-lg border border-cyan-500"
      >
        {currentWord}
      </div>

      <input
        id="typing-input"
        ref={inputRef}
        value={inputValue}
        onChange={(e) => handleInput(e.target.value)}
        className="mt-4 px-4 py-2 text-lg text-center rounded-md bg-gray-700 text-white focus:outline-none border border-cyan-500"
        autoFocus
      />

      <div className="flex gap-8 mt-4 text-lg text-gray-300">
        <p>
          Pontuação: <span className="text-white">{score}</span>
        </p>
        <p>
          Melhor: <span className="text-yellow-400">{bestScore}</span>
        </p>
      </div>

      <button
        onClick={endGame}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Encerrar Jogo
      </button>
    </div>
  );
}
