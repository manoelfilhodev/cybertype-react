// =============================
// 🕹️ Menu.tsx — CyberType 2.0 (otimizado para performance)
// =============================
import { useEffect, useRef } from "react";
import { audioManager } from "../core/audioManager";
import IconButton from "./IconButton";
import { FaGoogle, FaGithub, FaDiscord, FaApple } from "react-icons/fa";

interface MenuProps {
  onStart: (level: string) => void;
  onSettings: () => void;
}

export default function Menu({ onStart, onSettings }: MenuProps) {
  const textRef = useRef<HTMLParagraphElement | null>(null);

  function handleStart(level: string) {
    if (audioManager.musicEnabled) audioManager.play();
    audioManager.playKey();
    audioManager.playHit();
    audioManager.playError();
    onStart(level);
  }

  // === EFEITO DE PARTÍCULAS CYBERPUNK OTIMIZADO ===
  useEffect(() => {
    const canvas = document.getElementById("bgParticles") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true })!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const numParticles = 40;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.5,
      c: Math.random() > 0.5 ? "#00ffe7" : "#ff00ff",
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));

    let animationFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 6;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // === EFEITO DE DIGITAÇÃO LEVE (DOM direto, sem re-render) ===
  useEffect(() => {
    const fullText = "FAÇA LOGIN COM SUA CONTA NEURAL ↓";
    let i = 0;
    const el = textRef.current;
    if (!el) return;
    el.textContent = "";

    const type = () => {
      el.textContent = fullText.slice(0, i);
      i++;
      if (i <= fullText.length) requestAnimationFrame(() => setTimeout(type, 50));
    };
    type();
  }, []);

  return (
    <div className="cyber-container text-center relative bg-cyberpulse overflow-hidden">
      <canvas
        id="bgParticles"
        className="absolute top-0 left-0 w-full h-full z-0 opacity-60"
      ></canvas>

      <div className="relative z-10 flex flex-col items-center justify-center gap-10 py-10 w-full min-h-screen">
        <h1 id="introLogo" className="menu-title text-6xl md:text-7xl font-bold tracking-widest">
          CYBERTYPE_<span className="text-pink-500">2.0</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl tracking-wide mt-2">
          Escolha sua dificuldade:
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
  {[
    { label: "Fácil", value: "easy", color: "green" },
    { label: "Médio", value: "medium", color: "yellow" },
    { label: "Difícil", value: "hard", color: "red" },
  ].map((lvl, i) => (
    <button
      key={lvl.value}
      onClick={() => handleStart(lvl.value)} // ✅ agora envia o valor certo
      className={`px-8 py-3 md:px-10 md:py-4 text-white rounded-lg text-lg font-semibold transition-all duration-300 ${
        i === 0
          ? "bg-green-500 hover:bg-green-600 shadow-[0_0_15px_#00ff88]"
          : i === 1
          ? "bg-yellow-500 hover:bg-yellow-600 shadow-[0_0_15px_#ffcc00]"
          : "bg-red-500 hover:bg-red-600 shadow-[0_0_15px_#ff0044]"
      }`}
    >
      {lvl.label}
    </button>
  ))}
</div>


        <div className="flex justify-center mt-10">
          <IconButton icon="⚙️" onClick={onSettings} title="Configurações" />
        </div>

        <footer className="absolute bottom-6 w-full flex flex-col items-center justify-center text-gray-400 text-sm tracking-widest">
          <p ref={textRef} className="text-xs text-gray-400 mb-3 font-mono typing-text">
            {/* texto animado via ref */}
            <span className="text-cyan-400 cursor">█</span>
          </p>

          <div className="flex gap-6 mb-3 text-2xl">
            <FaGoogle className="cursor-pointer hover:text-pink-500 hover:drop-shadow-[0_0_8px_#ff00ff] transition" title="Google" />
            <FaGithub className="cursor-pointer hover:text-cyan-400 hover:drop-shadow-[0_0_8px_#00ffe7] transition" title="GitHub" />
            <FaDiscord className="cursor-pointer hover:text-pink-500 hover:drop-shadow-[0_0_8px_#ff00ff] transition" title="Discord" />
            <FaApple className="cursor-pointer hover:text-cyan-400 hover:drop-shadow-[0_0_8px_#00ffe7] transition" title="Apple" />
          </div>

          <p className="text-xs text-gray-500 font-mono neon-text">
            Desenvolvido por <span className="text-cyan-400">SYSTEX</span> © 2025 — 
            <span className="text-pink-500 ml-1">Inteligência Digital</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
