import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { audioManager } from "../core/audioManager";

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState<boolean>(audioManager.isPlaying());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlaying(audioManager.isPlaying());
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    audioManager.toggle();
    setIsPlaying(audioManager.isPlaying());
  };

  return (
    <button
      onClick={toggleMusic}
      className={`fixed top-4 right-4 z-[100] flex items-center justify-center
        w-10 h-10 rounded-full border-2 transition-all duration-300
        ${
          isPlaying
            ? "border-cyan-400 text-cyan-300 hover:shadow-[0_0_15px_#00ffe7]"
            : "border-pink-500 text-pink-400 hover:shadow-[0_0_15px_#ff00ff]"
        }
        bg-black bg-opacity-40 backdrop-blur-sm hover:scale-110`}
      title={isPlaying ? "Pausar música" : "Tocar música"}
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
