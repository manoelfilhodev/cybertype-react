// =============================
// 🎮 GameArea.tsx — CyberType 2.0 (versão premium UX - tempo contínuo)
// =============================

import "../App.css";
import { useEffect, useRef, useState } from "react";
import { getRandomWord } from "../core/words";
import { saveScore, getBestScore } from "../core/storage";
import VirtualKeyboard from "./VirtualKeyboard";
import { audioManager } from "../core/audioManager";
import { FaTwitter, FaWhatsapp } from "react-icons/fa";
import { saveRanking } from "../core/rankingService";

interface GameAreaProps {
  difficulty: string;
  onExit: () => void;
  onViewRanking: () => void;
}

export default function GameArea({ difficulty, onExit, onViewRanking }: GameAreaProps) {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showAnalyzing, setShowAnalyzing] = useState<boolean>(false);

  // novas métricas
  const [totalTyped, setTotalTyped] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [record, setRecord] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 🧠 Recupera usuário logado
  const [user] = useState<any>(() => {
    const saved = localStorage.getItem("cyberUser");
    return saved ? JSON.parse(saved) : null;
  });

  // === Inicialização ===
  useEffect(() => {
    setBestScore(getBestScore(difficulty));
    setRecord(getBestScore(difficulty));

    let total = 60;
    if (difficulty === "medium") total = 45;
    else if (difficulty === "hard") total = 30;

    setTimeLeft(total);
    setTotalTime(total);
    startNewWord();
    startTimer();

    inputRef.current?.focus();

    if (audioManager.musicEnabled) audioManager.play();

    return () => {
      stopTimer();
      if (!audioManager.musicEnabled) audioManager.stop(false);
      else audioManager.play();
    };
  }, [difficulty]);

  

  // === Nova palavra ===
  function startNewWord() {
    const word = getRandomWord(difficulty);
    setCurrentWord(word);
    setInputValue("");
    setStartTime(Date.now());
  }

  // === Timer ===
  function startTimer() {
    stopTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(timerRef.current!);
          handleTimeout();
          return 0;
        }
        return parseFloat((prev - 0.1).toFixed(1));
      });
    }, 100);
  }

  function stopTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  // === Tempo esgotado ===
  function handleTimeout() {
    stopTimer();
    flashFeedback("wrong");
    audioManager.playError();
    setTimeout(() => endGame(), 500);
  }

  // === Entrada ===
  function handleInput(value: string) {
    setInputValue(value);
    setTotalTyped((prev) => prev + 1);
    audioManager.playKey();

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
    audioManager.playHit();

    // 🎁 bônus opcional: +1s até o limite total da rodada
    setTimeLeft((prev) => Math.min(prev + 1, totalTime));

    startNewWord();
  }

  // === Erro ===
  function handleWrong() {
    setErrors((prev) => prev + 1);
    flashFeedback("wrong");
    audioManager.playError();
  }

  // === Flash visual ===
  function flashFeedback(type: "correct" | "wrong") {
    const el = document.getElementById("game-container");
    if (!el) return;
    el.classList.add(type === "correct" ? "cyber-flash-green" : "cyber-flash-red");
    setTimeout(() => el.classList.remove("cyber-flash-green", "cyber-flash-red"), 250);
  }

  // === Cálculos ===
  const accuracy = totalTyped > 0 ? ((totalTyped - errors) / totalTyped) * 100 : 0;
  const wpm =
    totalTyped > 0 ? (totalTyped / 5) / ((totalTime - timeLeft) / 60) : 0;

  // === Fim de jogo ===
  function endGame() {
    stopTimer();
    saveScore(score, difficulty);
    setBestScore(getBestScore(difficulty));

    // 🧠 Se o jogador estiver logado, salva no ranking global
    if (user) {
      const averageSpeed =
        totalTyped > 0 ? (totalTyped / 5) / ((totalTime - timeLeft) / 60) : 0;
      saveRanking(user.displayName, score, averageSpeed, difficulty as "easy" | "medium" | "hard");
      console.log("📡 Enviando ranking:", {
        name: user.displayName,
        score,
        averageSpeed,
        level: difficulty,
      });
    }
// Se o jogador não fez nenhuma pontuação, ainda assim salva o 0
if (score === 0) {
  saveScore(0, difficulty);
  if (user) {
    saveRanking(user.displayName, 0, 0, difficulty as "easy" | "medium" | "hard");
  }
}
    setShowAnalyzing(true);
    setTimeout(() => {
      setShowAnalyzing(false);
      setGameOver(true);
    }, 1000);
  }

  // === Reiniciar ===
  function restartGame() {
    setScore(0);
    setErrors(0);
    setTotalTyped(0);
    setGameOver(false);

    let total = 60;
    if (difficulty === "medium") total = 45;
    else if (difficulty === "hard") total = 30;

    setTimeLeft(total);
    setTotalTime(total);
    startNewWord();
    startTimer();
  }

  // === Tela "Analisando desempenho" ===
  if (showAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-cyan-400 font-mono animate-pulse">
        ⏳ Analisando desempenho neural...
      </div>
    );
  }

  // === Tela de resultado ===
  if (gameOver) {
    const top10Threshold = 50;
    const diffToTop10 = Math.max(0, top10Threshold - score);

    return (
      <div className="flex flex-col items-center justify-center gap-6 text-center relative fade-in-cyber pt-10">
        <h1 className="text-4xl font-bold text-cyan-400 drop-shadow-[0_0_15px_#00ffe7] animate-pulse">
          🏁 FIM DE SIMULAÇÃO
        </h1>

        {user && (
          <div className="flex flex-col items-center mb-4 animate-fadeIn">
            <img
              src={user.photoURL}
              alt="Avatar"
              className="w-20 h-20 rounded-full border-2 border-pink-500 shadow-[0_0_12px_#ff00ff]"
            />
            <p className="mt-2 text-cyan-400 text-sm tracking-widest font-mono">
              Operador: <span className="text-pink-500">{user.displayName}</span>
            </p>
          </div>
        )}

        <div className="bg-[#0a0a12] text-white px-8 py-6 rounded-lg border border-cyan-500 shadow-[0_0_15px_#00ffe7] space-y-2 text-lg font-mono text-left max-w-md w-full">
          <p>🏆 Pontuação: <span className="text-yellow-400">{score}</span></p>
          <p>🎯 Precisão: <span className="text-green-400">{accuracy.toFixed(1)}%</span></p>
          <p>⚡ WPM: <span className="text-blue-400">{wpm.toFixed(1)}</span></p>
          <p>🥇 Recorde: <span className="text-purple-400">{record}</span></p>
        </div>

        <div className="mt-6 text-lg font-mono text-gray-300">
          {score >= top10Threshold ? (
            <p className="text-yellow-400 animate-pulse">
              🚀 Incrível! Você entrou no TOP 10 do ranking global!
            </p>
          ) : (
            <p>
              💡 Faltam{" "}
              <span className="text-pink-400 font-bold">{diffToTop10}</span>{" "}
              pontos para o TOP 10. Tente novamente!
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button
            onClick={restartGame}
            className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-xl shadow-[0_0_20px_#00ffff] hover:scale-105 transition-all"
          >
            🔁 Reiniciar Simulação
          </button>
          <button
            onClick={onExit}
            className="px-8 py-3 bg-gray-800 text-cyan-300 border border-cyan-500 rounded-xl hover:bg-gray-700 hover:text-white transition-all"
          >
            ⬅️ Retornar ao Menu Neural
          </button>
          <button
            onClick={onViewRanking}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-bold rounded-xl shadow-[0_0_20px_#ff00ff] hover:scale-105 transition-all"
          >
            🌍 Ver Ranking Global
          </button>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <FaTwitter
            title="Compartilhar no X"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `🔥 Fiz ${score} pontos no CyberType_2.0 (${difficulty})! 💥`
                )}`,
                "_blank"
              )
            }
            className="text-[#1DA1F2] text-2xl cursor-pointer hover:scale-110 transition-all drop-shadow-[0_0_10px_#1DA1F2]"
          />
          <FaWhatsapp
            title="Compartilhar no WhatsApp"
            onClick={() =>
              window.open(
                `https://wa.me/?text=${encodeURIComponent(
                  `🔥 Fiz ${score} pontos no CyberType_2.0 (${difficulty})! 👾`
                )}`,
                "_blank"
              )
            }
            className="text-[#25D366] text-2xl cursor-pointer hover:scale-110 transition-all drop-shadow-[0_0_10px_#25D366]"
          />
        </div>

        <p className="mt-6 text-xs text-gray-500 font-mono animate-pulse">
          {user
            ? "🧠 Sincronização concluída com sucesso."
            : "⚠️ Acesso neural não autenticado — resultado não sincronizado."}
        </p>
      </div>
    );
  }

  // === Tela principal (jogo ativo) ===
  return (
    <div
      id="game-container"
      className="flex flex-col items-center justify-center gap-6 text-center relative"
    >
      <h1 className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_#00ffe7]">
        CyberType 2.0
      </h1>
      <p className="text-gray-300">
        Dificuldade: <span className="font-semibold">{difficulty}</span>
      </p>

      <div className="text-xl text-yellow-400 font-mono">
        ⏱️ Tempo: {timeLeft.toFixed(1)}s
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

      <VirtualKeyboard />

      <button
        onClick={endGame}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Encerrar Jogo
      </button>
    </div>
  );
}
