// =============================
// 🚀 IntroScreen.tsx — CyberType 2.0 (Intro Responsiva Cyberpunk Matrix)
// =============================
import { useEffect, useRef } from "react";

export default function IntroScreen({ onFinish }: { onFinish: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // === Função de redimensionamento dinâmico ===
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const letters = "CYBERTYPE_2025";
    const fontSize = window.innerWidth < 768 ? 12 : 16; // menor em telas pequenas
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(2, 2, 7, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'Share Tech Mono'`;
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const color = Math.random() > 0.5 ? "#00ffe7" : "#ff00ff";
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // === Encerra a intro depois de alguns segundos ===
  useEffect(() => {
    const timer = setTimeout(onFinish, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      id="intro"
      className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-black"
    >
      {/* Canvas animado */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Conteúdo sobreposto */}
      <div
        id="logoArea"
        className="relative z-10 text-center px-6 select-none"
        style={{
          textShadow:
            "0 0 20px #00fff2, 0 0 30px #00fff2, 0 0 40px #ff00ff",
        }}
      >
        <h1
          id="introLogo"
          className="text-cyan-400 font-mono font-bold tracking-widest drop-shadow-[0_0_25px_#00ffff] animate-pulse"
          style={{
            fontSize:
              window.innerWidth < 400
                ? "1.8rem"
                : window.innerWidth < 768
                ? "2.5rem"
                : "3.5rem",
          }}
        >
          CYBERTYPE_<span className="text-pink-500">2.0</span>
        </h1>

        <p
          className="introSub text-gray-400 font-mono mt-3 animate-pulse"
          style={{
            fontSize:
              window.innerWidth < 400
                ? "0.8rem"
                : window.innerWidth < 768
                ? "0.9rem"
                : "1rem",
            letterSpacing: "2px",
          }}
        >
          INICIANDO SIMULAÇÃO NEURAL...
        </p>
      </div>

      {/* Reflexo inferior */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#00fff2]/15 to-transparent blur-2xl" />
    </div>
  );
}
