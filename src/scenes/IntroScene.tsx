// =============================
// 🎬 IntroScene.tsx — CyberType 2.0
// Cena: Nascimento do Totem (texto + partículas + áudio)
// =============================
import { useEffect, useMemo, useRef, useState } from "react";

type IntroSceneProps = {
  onContinue: () => void; // Navegar para a seleção do Totem
};

export default function IntroScene({ onContinue }: IntroSceneProps) {
  // ====== Texto (efeito typing) ======
  const script = useMemo(
    () => [
      "Sinapse inicial detectada...",
      "Identificando operador...",
      "Conexão neural estabelecida.",
      "Eu sou um fragmento da Rede Central.",
      "Fui programado para evoluir com você.",
      "Mas antes... preciso de uma forma.",
    ],
    []
  );

  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [isDone, setIsDone] = useState(false);
  const typingSpeed = 24; // ms por caractere
  const linePause = 600; // pausa entre linhas

  useEffect(() => {
    let mounted = true;
    let char = 0;
    let typer: number;
    let nextLineTimer: number;

    const typeLine = () => {
      if (!mounted) return;
      const line = script[lineIndex] || "";
      if (char <= line.length) {
        setTyped(line.slice(0, char));
        char++;
        typer = window.setTimeout(typeLine, typingSpeed);
      } else {
        // Linha completa — aguarda e avança
        if (lineIndex < script.length - 1) {
          nextLineTimer = window.setTimeout(() => {
            if (!mounted) return;
            setLineIndex((i) => i + 1);
            setTyped("");
          }, linePause);
        } else {
          // Última linha concluída
          nextLineTimer = window.setTimeout(() => {
            if (!mounted) return;
            setIsDone(true);
          }, 400);
        }
      }
    };

    typeLine();

    return () => {
      mounted = false;
      window.clearTimeout(typer);
      window.clearTimeout(nextLineTimer);
    };
  }, [lineIndex, script]);

  // ====== Áudio de introdução (loop suave) ======
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const a = new Audio("/assets/sounds/intro_pulse.mp3");
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;
    setAudioReady(true);

    // Tentar autoplay discreto
    a.play().then(
      () => setAudioEnabled(true),
      () => setAudioEnabled(false) // se bloquear, mostra botão
    );

    return () => {
      a.pause();
      a.src = "";
      audioRef.current = null;
    };
  }, []);

  const handleEnableAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .then(() => setAudioEnabled(true))
      .catch(() => setAudioEnabled(false));
  };

  // ====== Partículas (canvas) ======
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    // Partículas
    const PARTICLES = 120; // leve e bonito
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
      hue: number;
    }[] = [];

    const center = () => ({ x: width / 2, y: height / 2 });

    for (let i = 0; i < PARTICLES; i++) {
      const c = center();
      particles.push({
        x: c.x + (Math.random() - 0.5) * 80,
        y: c.y + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 0.6,
        a: Math.random() * 0.6 + 0.2,
        hue: 185 + Math.random() * 80, // ciano → magenta
      });
    }

    let raf = 0;
    const draw = () => {
      // fundo translúcido para “rastro”
      ctx.fillStyle = "rgba(3,3,9,0.28)";
      ctx.fillRect(0, 0, width, height);

      // brilho central
      const grd = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.02,
        width / 2,
        height / 2,
        Math.min(width, height) * 0.45
      );
      grd.addColorStop(0, "rgba(0,255,231,0.12)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // partículas
      particles.forEach((p) => {
        // leve atração ao centro (efeito “nascimento”)
        const c = center();
        const dx = c.x - p.x;
        const dy = c.y - p.y;
        p.vx += (dx * 0.0004);
        p.vy += (dy * 0.0004);

        // velocidade limitada
        p.vx *= 0.995;
        p.vy *= 0.995;

        p.x += p.vx;
        p.y += p.vy;

        // wrap suave nas bordas
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        // desenho
        ctx.beginPath();
        ctx.globalAlpha = p.a;
        ctx.fillStyle = `hsl(${p.hue}, 95%, 60%)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // linhas de ligação próximas
        particles.forEach((q) => {
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const dist2 = ddx * ddx + ddy * ddy;
          if (dist2 < 85 * 85 && Math.random() < 0.008) {
            ctx.beginPath();
            ctx.globalAlpha = 0.08;
            ctx.strokeStyle = `hsl(${(p.hue + q.hue) / 2}, 95%, 65%)`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ====== Ações de avançar ======
  const continueNow = () => {
    // Fade-out rápido do áudio para transição gostosa
    if (audioRef.current) {
      const a = audioRef.current;
      const fade = () => {
        if (a.volume > 0.01) {
          a.volume = Math.max(0, a.volume - 0.05);
          requestAnimationFrame(fade);
        } else {
          a.pause();
        }
      };
      fade();
    }
    onContinue();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (isDone) continueNow();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDone]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#020207] text-cyan-300">
      {/* Canvas das partículas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full block" />

      {/* Vignette/scanline para vibe retro-neon */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-25 [background:repeating-linear-gradient(0deg,rgba(255,255,255,.05)_0px,rgba(255,255,255,.05)_2px,transparent_2px,transparent_4px)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,231,0.08)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.7)_100%)]" />

      {/* Conteúdo central */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="max-w-3xl px-6 text-center">
          {/* Logo/Chamada */}
          <h1 className="mb-6 text-4xl md:text-5xl font-bold tracking-[0.2em] text-cyan-300 drop-shadow-[0_0_16px_rgba(0,255,231,0.35)]">
            CYBERTYPE_<span className="text-[#ff00ff]">2.0</span>
          </h1>

          {/* Linhas anteriores já reveladas */}
          <div className="mx-auto mb-3 max-w-2xl text-cyan-200/70 text-sm md:text-base leading-relaxed">
            {script.slice(0, lineIndex).map((l, i) => (
              <div key={i} className="mb-1">{l}</div>
            ))}
          </div>

          {/* Linha atual digitando */}
          <p className="mx-auto max-w-2xl text-cyan-100 text-base md:text-lg leading-relaxed">
            {typed}
            <span className="ml-1 animate-pulse">▌</span>
          </p>

          {/* CTA */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={continueNow}
              disabled={!isDone}
              className={`px-6 py-3 rounded-2xl border text-sm md:text-base transition
                ${isDone
                  ? "border-cyan-400/60 text-cyan-200 hover:bg-cyan-400/10 hover:shadow-[0_0_24px_rgba(0,255,231,0.25)]"
                  : "border-cyan-800/40 text-cyan-700 cursor-not-allowed"
                }`}
              aria-label="Escolher a essência do Totem"
            >
              {isDone ? "Escolher Essência" : "Inicializando..."}
            </button>

            {/* Botão para habilitar áudio, se necessário */}
            {audioReady && !audioEnabled && (
              <button
                onClick={handleEnableAudio}
                className="px-4 py-3 rounded-2xl border border-fuchsia-400/50 text-fuchsia-200 text-xs md:text-sm hover:bg-fuchsia-400/10 transition"
                aria-label="Ativar áudio"
              >
                Ativar áudio
              </button>
            )}
          </div>

          {/* Dica de atalho */}
          <p className="mt-3 text-[11px] md:text-xs text-cyan-300/50">
            Pressione <span className="text-cyan-200">Enter</span> ou{" "}
            <span className="text-cyan-200">Espaço</span> para continuar
          </p>
        </div>
      </div>
    </div>
  );
}
