// =============================
// 🚀 IntroScreen.tsx — CyberType 2.0 Intro com efeito Matrix Cyberpunk
// =============================
import { useEffect, useRef } from "react";

export default function IntroScreen({ onFinish }: { onFinish: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "CYBERTYPE_2025";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    function draw() {
      // Fundo translúcido para efeito de rastro
      ctx.fillStyle = "rgba(2, 2, 7, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Share Tech Mono'`;
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        // Cor alternada entre cyan e magenta
        const color = Math.random() > 0.5 ? "#00ffe7" : "#ff00ff";
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reseta a posição quando sai da tela
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33); // ~30fps
    return () => clearInterval(interval);
  }, []);

  // Encerra a intro depois de alguns segundos
  useEffect(() => {
    const timer = setTimeout(onFinish, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div id="intro" className="relative">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div id="logoArea" className="relative z-10">
        <h1 id="introLogo">
          CYBERTYPE_<span>2.0</span>
        </h1>
        <p className="introSub">INICIANDO SIMULAÇÃO NEURAL...</p>
      </div>
    </div>
  );
}
