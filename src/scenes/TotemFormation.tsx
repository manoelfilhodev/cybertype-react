// =============================
// ✨ TotemFormation.tsx — CyberType 2.0
// Cena: Formação do Totem Neural (após escolha)
// =============================
import { useEffect, useRef, useState } from "react";

interface TotemData {
  id: string;
  name: string;
  animal: string;
  color: string;
  symbol: string;
  intro: string[];
}

export default function TotemFormation({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [totem, setTotem] = useState<TotemData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("userTotem");
    if (saved) {
      setTotem(JSON.parse(saved));
    }
    setTimeout(() => setVisible(true), 200);
  }, []);

  // Efeito de partículas com pulsação central
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const particles: {
      x: number;
      y: number;
      r: number;
      hue: number;
      vx: number;
      vy: number;
    }[] = [];

    for (let i = 0; i < 250; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.4,
        hue: 180 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
      });
    }

    let time = 0;
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(3,3,9,0.2)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      particles.forEach((p) => {
        // movimento pulsante em direção ao centro
        const angle = Math.atan2(p.y - cy, p.x - cx);
        const dist = Math.hypot(p.x - cx, p.y - cy);
        const force = Math.sin(time / 50) * 0.3;
        p.vx -= (p.x - cx) / dist * 0.005 * force;
        p.vy -= (p.y - cy) / dist * 0.005 * force;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.fillStyle = `hsl(${p.hue}, 100%, 60%)`;
        ctx.globalAlpha = 0.7;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // aura central
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300);
      gradient.addColorStop(0, `${totem?.color || "#00ffe7"}55`);
      gradient.addColorStop(1, "transparent");
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 350, 0, Math.PI * 2);
      ctx.fill();

      time += 1.5;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [totem]);

  // Áudio e tempo de transição final
  useEffect(() => {
    const a = new Audio("/assets/sounds/formation.mp3");
    a.volume = 0.5;
    a.play();
    const timer = setTimeout(() => {
      onFinish();
    }, 4500);
    return () => {
      clearTimeout(timer);
      a.pause();
      a.src = "";
    };
  }, [onFinish]);

  if (!totem) return null;

  return (
    <div
      className={`relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-[#020207] text-cyan-200 transition-all duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Canvas de partículas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Título / símbolo central */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div
          className="text-6xl md:text-8xl mb-3 animate-pulse"
          style={{ color: totem.color }}
        >
          {totem.symbol}
        </div>
        <h1
          className="text-4xl md:text-6xl font-bold tracking-widest mb-2"
          style={{
            color: totem.color,
            textShadow: `0 0 12px ${totem.color}80`,
          }}
        >
          {totem.name}
        </h1>
        <p className="text-sm md:text-base opacity-80">{totem.animal}</p>
        <p className="max-w-md text-xs md:text-sm opacity-60 mt-3 italic">
          {totem.intro[0]}
        </p>
      </div>

      {/* Efeito de fade branco no final */}
      <div className="absolute inset-0 bg-white opacity-0 animate-[flashOut_4.5s_ease-in-out_forwards]" />

      <style>
        {`
          @keyframes flashOut {
            0% { opacity: 0; }
            85% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
