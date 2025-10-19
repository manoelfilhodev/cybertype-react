// =============================
// 🔊 SoundToggle.tsx — Alterna o som do jogo
// =============================
import { useState } from "react";
import { audioManager } from "../core/audioManager";
import IconButton from "./IconButton";

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(false);

  function toggleSound() {
    if (isMuted) {
      audioManager.play();
    } else {
      audioManager.stop();
    }
    setIsMuted(!isMuted);
  }

  return (
    <IconButton
      onClick={toggleSound}
      icon={isMuted ? "🔇" : "🔊"}
      title={isMuted ? "Som desativado" : "Som ativado"}
      active={isMuted}
    />
  );
}
