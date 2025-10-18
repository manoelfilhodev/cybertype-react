// =============================
// 🎧 SoundToggle.tsx — Controle de áudio global CyberType 2.0
// =============================
import { useEffect, useState } from "react";

interface SoundToggleProps {
  bgMusic?: HTMLAudioElement;
}

export default function SoundToggle({ bgMusic }: SoundToggleProps) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem("soundEnabled") !== "false"; // padrão: ligado
  });

  // Atualiza volume e salva preferência
  useEffect(() => {
    if (bgMusic) {
      bgMusic.volume = soundEnabled ? 0.35 : 0;
      if (soundEnabled) {
        bgMusic.play().catch(() => {});
      } else {
        bgMusic.pause();
      }
    }
    localStorage.setItem("soundEnabled", soundEnabled.toString());
  }, [soundEnabled, bgMusic]);

  return (
    <button
      onClick={() => setSoundEnabled((prev) => !prev)}
      className="absolute top-4 right-4 bg-gray-800 text-cyan-400 p-2 rounded-full hover:bg-gray-700 transition"
      title={soundEnabled ? "Desligar som" : "Ligar som"}
    >
      {soundEnabled ? "🔊" : "🔇"}
    </button>
  );
}
