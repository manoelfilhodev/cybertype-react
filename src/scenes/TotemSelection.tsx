// =============================
// 🧠 TotemSelection.tsx — CyberType 2.0
// Cena: Escolha da Essência Neural (Totem)
// =============================
import { useEffect, useState } from "react";

// Sons opcionais (adicione em /public/assets/sounds/)
const sounds = {
  select: "/assets/sounds/select_tone.mp3",
  hover: "/assets/sounds/hover_tone.mp3",
};

// Tipos
type TotemKey = "kaer" | "lykon" | "rhyn";

interface TotemData {
  id: TotemKey;
  name: string;
  animal: string;
  color: string;
  description: string;
  intro: string[];
  symbol: string; // emoji ou ícone
}

const TOTEMS: TotemData[] = [
  {
    id: "kaer",
    name: "KAER",
    animal: "Corvo",
    color: "#7B2FFF",
    symbol: "🪶",
    description: "Inteligência, mistério e introspecção.",
    intro: [
      "A escuridão observa... mas também protege.",
      "Você escolheu o caminho do pensamento profundo.",
    ],
  },
  {
    id: "lykon",
    name: "LYKON",
    animal: "Lobo",
    color: "#3FB9FF",
    symbol: "🐺",
    description: "Instinto, foco e lealdade.",
    intro: [
      "Os instintos guiam. O grupo protege.",
      "Você caminha pelo caminho do foco e da harmonia.",
    ],
  },
  {
    id: "rhyn",
    name: "RHYN",
    animal: "Rinoceronte",
    color: "#E5B80B",
    symbol: "🦏",
    description: "Força, paciência e resistência.",
    intro: [
      "A força não é velocidade, é consistência.",
      "Você trilha o caminho da estabilidade neural.",
    ],
  },
];

export default function TotemSelection({ onContinue }: { onContinue: () => void }) {
  const [selected, setSelected] = useState<TotemKey | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [animating, setAnimating] = useState(false);

  // const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = (src: string, vol = 0.4) => {
    const a = new Audio(src);
    a.volume = vol;
    a.play();
  };

  useEffect(() => {
    // animação de entrada suave
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (id: TotemKey) => {
    if (selected === id) return;
    playSound(sounds.hover);
    setSelected(id);
  };

  const handleConfirm = () => {
    if (!selected) return;
    const totem = TOTEMS.find((t) => t.id === selected);
    if (!totem) return;

    playSound(sounds.select, 0.6);
    setConfirmed(true);

    // Salva escolha
    localStorage.setItem("userTotem", JSON.stringify(totem));

    // Pequena pausa pra animação antes de continuar
    setTimeout(() => {
      onContinue();
    }, 2200);
  };

  return (
    <div
      className={`relative h-screen w-screen flex flex-col items-center justify-center text-center transition-all duration-700 
      ${animating ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}
      bg-[#020207] text-cyan-200 overflow-hidden`}
    >
      {/* Efeito de fundo pulsante */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,231,0.08)_0%,transparent_60%)]"
        style={{
          boxShadow: selected
            ? `0 0 80px 10px ${TOTEMS.find((t) => t.id === selected)?.color}55 inset`
            : "none",
          transition: "box-shadow 0.8s ease",
        }}
      />

      {/* Título */}
      <h1 className="z-10 mb-8 text-3xl md:text-5xl font-bold tracking-[0.15em] text-cyan-300 drop-shadow-[0_0_16px_rgba(0,255,231,0.4)]">
        ESCOLHA SUA <span className="text-[#ff00ff]">ESSÊNCIA</span> NEURAL
      </h1>

      {/* Cards dos Totens */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-8 max-w-5xl">
        {TOTEMS.map((totem) => (
          <button
            key={totem.id}
            onClick={() => handleSelect(totem.id)}
            className={`p-6 rounded-3xl border-2 transition-all duration-300 bg-[#030309]/80 
              ${
                selected === totem.id
                  ? "scale-105 border-cyan-400 shadow-[0_0_24px_rgba(0,255,231,0.3)]"
                  : "hover:scale-105 hover:border-cyan-300/40 border-cyan-700/50"
              }`}
            style={{
              color: selected === totem.id ? totem.color : "#b8e7e5",
              textShadow:
                selected === totem.id
                  ? `0 0 8px ${totem.color}88`
                  : "0 0 0 transparent",
            }}
          >
            <div className="text-5xl mb-3">{totem.symbol}</div>
            <h2 className="text-xl font-bold mb-1 tracking-widest">
              {totem.name}
            </h2>
            <p className="text-sm opacity-80 mb-2">{totem.animal}</p>
            <p className="text-xs opacity-60 leading-relaxed">{totem.description}</p>
          </button>
        ))}
      </div>

      {/* Botão de confirmar */}
      <div className="z-10 mt-10">
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className={`px-8 py-3 rounded-2xl border transition-all duration-300 text-sm md:text-base tracking-widest 
            ${
              selected
                ? "border-cyan-400/60 text-cyan-200 hover:bg-cyan-400/10 hover:shadow-[0_0_24px_rgba(0,255,231,0.25)]"
                : "border-cyan-900/50 text-cyan-700 cursor-not-allowed"
            }`}
        >
          {selected ? "CONFIRMAR ESSÊNCIA" : "SELECIONE UM TOTEM"}
        </button>
      </div>

      {/* Mensagem após confirmar */}
      {confirmed && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-black/70 text-cyan-200 animate-fadeIn z-20"
          style={{ animation: "fadeIn 1.5s ease" }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              color: TOTEMS.find((t) => t.id === selected)?.color,
              textShadow: `0 0 16px ${
                TOTEMS.find((t) => t.id === selected)?.color
              }99`,
            }}
          >
            {TOTEMS.find((t) => t.id === selected)?.name}
          </h2>
          <p className="text-sm md:text-base opacity-80 max-w-md leading-relaxed">
            {TOTEMS.find((t) => t.id === selected)?.intro[0]}
          </p>
          <p className="text-sm md:text-base opacity-70 mt-3 italic">
            {TOTEMS.find((t) => t.id === selected)?.intro[1]}
          </p>
        </div>
      )}

      {/* CSS simples para fade-in */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
