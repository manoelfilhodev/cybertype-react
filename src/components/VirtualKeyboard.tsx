import { useEffect, useState, useRef } from "react";

export default function VirtualKeyboard() {
  const [pressed, setPressed] = useState<string>("");
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Cria um contexto global de áudio (uma vez)
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioCtx();

    // Desbloqueia o contexto no primeiro clique (Chrome fix)
    const unlockAudio = () => {
      audioContextRef.current?.resume();
      window.removeEventListener("click", unlockAudio);
    };
    window.addEventListener("click", unlockAudio);
  }, []);

  // 🔊 Toca som com pitch aleatório e sem delay
  

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        setPressed(key);
       
      }
    };
    const handleKeyUp = () => setPressed("");

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const row1 = "QWERTYUIOP".split("");
  const row2 = "ASDFGHJKL".split("");
  const row3 = "ZXCVBNM".split("");

  const renderKey = (k: string) => (
    <div
      key={k}
      className={`p-3 rounded text-center font-semibold transition-all duration-150 select-none w-10 cursor-default
        ${
          pressed === k
            ? "bg-cyan-400 text-black scale-110 shadow-[0_0_15px_#00ffe7]"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
    >
      {k}
    </div>
  );

  return (
    <div className="flex flex-col items-center mt-8 space-y-2">
      <div className="flex justify-center gap-2">{row1.map(renderKey)}</div>
      <div className="flex justify-center gap-2 pl-6">{row2.map(renderKey)}</div>
      <div className="flex justify-center gap-2 pl-14">{row3.map(renderKey)}</div>
    </div>
  );
}
