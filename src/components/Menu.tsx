// =============================
// 🕹️ Menu.tsx — CyberType 2.0 (login sem recarregar, com estado local do usuário)
// =============================
import { useEffect, useRef, useState } from "react";
import { audioManager } from "../core/audioManager";
import {
  loginWithGoogle,
  loginWithGithub,
  loginWithApple,
  logoutUser,
  watchAuthState,
} from "../core/authService"; // 🔥 mantemos só os provedores Firebase
import { FaGoogle, FaGithub, FaDiscord, FaApple, FaSignOutAlt } from "react-icons/fa";
import { loginWithDiscordDirect } from "../core/discordAuth"; // 🎮 novo método Discord direto


interface MenuProps {
  onStart: (level: string) => void;
  onSettings: () => void;
}

export default function Menu({ onStart, onSettings }: MenuProps) {
  const textRef = useRef<HTMLParagraphElement | null>(null);

  // === Estado do usuário (inicializa do localStorage e mantém via Firebase) ===
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem("cyberUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    // === 🔥 Sessão Firebase (Google / GitHub / Apple) ===
    const unsub = watchAuthState((u) => {
      setUser(u);
      if (u) {
        localStorage.setItem("cyberUser", JSON.stringify(u));
      } else {
        localStorage.removeItem("cyberUser");
      }
    });
  
    // === 🎮 Sessão Discord (OAuth direto) ===
    import("../core/discordAuth").then(({ checkDiscordCallback }) => {
      checkDiscordCallback().then((discordUser) => {
        if (discordUser) {
          setUser(discordUser);
          localStorage.setItem("cyberUser", JSON.stringify(discordUser));
        }
      });
    });
  
    return () => unsub();
  }, []);
  

  // === Funções de login (sem reload da página) ===
  const handleLogin = async (providerFn: any) => {
    try {
      const result = await providerFn();
      const loggedUser = result.user;
      setUser(loggedUser); // atualiza o estado do menu
      localStorage.setItem("cyberUser", JSON.stringify(loggedUser)); // persiste sessão
      // ✅ sem window.location.reload() para não voltar à IntroScreen
    } catch (err: any) {
      console.error("Erro ao autenticar:", err);
      alert("Falha ao autenticar: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  // === Iniciar o jogo ===
  function handleStart(level: string) {
    if (audioManager.musicEnabled) audioManager.play();
    audioManager.playKey();
    audioManager.playHit();
    audioManager.playError();
    onStart(level);
  }

  // === Efeito de partículas ===
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

  // === Efeito de digitação ===
  useEffect(() => {
    const fullText = user
      ? `🧠 Acesso neural concedido, ${user.displayName?.split(" ")[0]}_404`
      : "FAÇA LOGIN COM SUA CONTA NEURAL ↓";
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
  }, [user]);

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

        {/* === Saudação / Perfil do usuário === */}
        {user && (
          <div className="flex flex-col items-center gap-3 animate-fadeIn">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Avatar"
                className="w-16 h-16 rounded-full border-2 border-pink-500 shadow-[0_0_10px_#ff00ff]"
              />
            )}
            <p className="text-gray-300 font-mono text-sm tracking-widest">
              {user.displayName}
            </p>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-xs px-4 py-2 rounded-lg mt-1 transition-all shadow-[0_0_10px_#ff00ff]"
            >
              <FaSignOutAlt /> Encerrar Sessão Neural
            </button>
          </div>
        )}

        {/* === Botões de dificuldade === */}
        <p className="text-gray-400 text-lg md:text-xl tracking-wide mt-2">
          Escolha sua dificuldade:
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {[
            { label: "Fácil", value: "easy" },
            { label: "Médio", value: "medium" },
            { label: "Difícil", value: "hard" },
          ].map((lvl, i) => (
            <button
              key={lvl.value}
              onClick={() => handleStart(lvl.value)}
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

        {/* === BOTÃO DE CONFIGURAÇÕES === */}
        <button
          onClick={onSettings}
          className="absolute top-6 right-6 p-3 rounded-full bg-gray-900/70 border border-cyan-500 hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_10px_#00ffe7]"
          title="Abrir Configurações"
        >
          ⚙️
        </button>

        {/* === Rodapé === */}
        <footer className="absolute bottom-6 w-full flex flex-col items-center justify-center text-gray-400 text-sm tracking-widest">
          <p ref={textRef} className="text-xs text-gray-400 mb-3 font-mono typing-text">
            <span className="text-cyan-400 cursor">█</span>
          </p>

          {/* === Ícones de login (somente quando não logado) === */}
          {!user && (
            <div className="flex gap-6 mb-3 text-2xl">
              <FaGoogle
                onClick={() => handleLogin(loginWithGoogle)}
                className="cursor-pointer hover:text-pink-500 hover:drop-shadow-[0_0_8px_#ff00ff] transition"
                title="Entrar com Google"
              />
              <FaGithub
                onClick={() => handleLogin(loginWithGithub)}
                className="cursor-pointer hover:text-cyan-400 hover:drop-shadow-[0_0_8px_#00ffe7] transition"
                title="Entrar com GitHub"
              />
              <FaDiscord
  onClick={() => loginWithDiscordDirect()}
  className="cursor-pointer hover:text-pink-500 hover:drop-shadow-[0_0_8px_#ff00ff] transition"
  title="Entrar com Discord"
/>
              <FaApple
                onClick={() => handleLogin(loginWithApple)}
                className="cursor-pointer hover:text-cyan-400 hover:drop-shadow-[0_0_8px_#00ffe7] transition"
                title="Entrar com Apple"
              />
            </div>
          )}

          <p className="text-xs text-gray-500 font-mono neon-text">
            Desenvolvido por <span className="text-cyan-400">SYSTEX</span> © 2025 — 
            <span className="text-pink-500 ml-1">Inteligência Digital</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
