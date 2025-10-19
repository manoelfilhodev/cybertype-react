// =============================
// ⚙️ Settings.tsx — CyberType 2.0 (Configurações completas)
// =============================

import { useState } from "react";
import { audioManager } from "../core/audioManager";
import { FaSave, FaArrowLeft } from "react-icons/fa";


export default function Settings({ onBack }: { onBack: () => void }) {
  const [musicVolume, setMusicVolume] = useState(audioManager.musicVolume);
  const [keyboardVolume, setKeyboardVolume] = useState(audioManager.keyboardVolume);
  const [hitVolume, setHitVolume] = useState(audioManager.hitVolume);
  const [errorVolume, setErrorVolume] = useState(audioManager.errorVolume);

  const [musicEnabled, setMusicEnabled] = useState(audioManager.musicEnabled);
  const [keyEnabled, setKeyEnabled] = useState(audioManager.keySoundEnabled);
  const [hitSound, setHitSound] = useState(audioManager.hitSoundEnabled);
  const [errorSound, setErrorSound] = useState(audioManager.errorSoundEnabled);

  // 💾 Salva e aplica todas as configurações
  function saveSettings() {
    audioManager.setMusicEnabled(musicEnabled);
    audioManager.setMusicVolume(musicVolume);
    audioManager.setKeySoundEnabled(keyEnabled);
    audioManager.setKeyVolume(keyboardVolume);
    audioManager.setHitSoundEnabled(hitSound);
    audioManager.setHitVolume(hitVolume);
    audioManager.setErrorSoundEnabled(errorSound);
    audioManager.setErrorVolume(errorVolume);

    const msg = document.createElement("div");
    msg.innerText = "⚙️ Configurações aplicadas!";
    msg.className =
      "fixed bottom-10 px-8 py-3 bg-cyan-500/10 border border-cyan-400 text-cyan-300 rounded-lg backdrop-blur-sm text-lg shadow-[0_0_20px_#00ffe7] animate-pulse";
    msg.style.left = "50%";
    msg.style.transform = "translateX(-50%)";
    msg.style.zIndex = "9999";
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 1500);
  }

  // ✨ adiciona glow visual ao mover sliders
  function glow(e: React.ChangeEvent<HTMLInputElement>) {
    const label = e.target.previousElementSibling as HTMLElement;
    label?.classList.add("glow-pulse");
    setTimeout(() => label?.classList.remove("glow-pulse"), 600);
  }

  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-md mx-auto gap-8 py-8">
      <h1 className="text-4xl font-bold drop-shadow-[0_0_25px_#00ffe7]">
        CONFIGURAÇÕES
      </h1>

      <div className="bg-black/60 p-8 rounded-2xl border border-cyan-500 shadow-[0_0_25px_#00ffe7] w-full space-y-6 backdrop-blur-sm text-cyan-200 text-left">
        {/* === Música === */}
        <div>
          <label>Música de Fundo</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={musicVolume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setMusicVolume(v);
              audioManager.setMusicVolume(v);
              glow(e);
            }}
            className="w-full accent-cyan-400"
          />
          <div className="flex items-center justify-between mt-2">
            <span>Ativar música</span>
            <input
              type="checkbox"
              checked={musicEnabled}
              onChange={(e) => {
                const enabled = e.target.checked;
                setMusicEnabled(enabled);
                audioManager.setMusicEnabled(enabled);
                if (enabled) audioManager.play();
                else audioManager.stop(false);
              }}
              
              className="w-5 h-5 accent-cyan-400"
            />
          </div>
        </div>

        {/* === Teclado === */}
        <div>
          <label>Som do Teclado</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={keyboardVolume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setKeyboardVolume(v);
              audioManager.setKeyVolume(v);
              audioManager.playKey();
              glow(e);
            }}
            className="w-full accent-cyan-400"
          />
          <div className="flex items-center justify-between mt-2">
            <span>Ativar som do teclado</span>
            <input
              type="checkbox"
              checked={keyEnabled}
              onChange={(e) => {
                setKeyEnabled(e.target.checked);
                audioManager.setKeySoundEnabled(e.target.checked);
              }}
              className="w-5 h-5 accent-cyan-400"
            />
          </div>
        </div>

        {/* === Acerto === */}
        <div>
          <label>Som de Acerto</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={hitVolume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setHitVolume(v);
              audioManager.setHitVolume(v);
              if (hitSound) audioManager.playHit();
              glow(e);
            }}
            className="w-full accent-cyan-400"
          />
          <div className="flex items-center justify-between mt-2">
            <span>Ativar som de acerto</span>
            <input
              type="checkbox"
              checked={hitSound}
              onChange={(e) => {
                setHitSound(e.target.checked);
                audioManager.setHitSoundEnabled(e.target.checked);
              }}
              className="w-5 h-5 accent-cyan-400"
            />
          </div>
        </div>

        {/* === Erro === */}
        <div>
          <label>Som de Erro</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={errorVolume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setErrorVolume(v);
              audioManager.setErrorVolume(v);
              if (errorSound) audioManager.playError();
              glow(e);
            }}
            className="w-full accent-cyan-400"
          />
          <div className="flex items-center justify-between mt-2">
            <span>Ativar som de erro</span>
            <input
              type="checkbox"
              checked={errorSound}
              onChange={(e) => {
                setErrorSound(e.target.checked);
                audioManager.setErrorSoundEnabled(e.target.checked);
              }}
              className="w-5 h-5 accent-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* === Botões === */}
      <div className="flex flex-col gap-3 pt-4">
        <button
          onClick={saveSettings}
          className="w-full px-6 py-3 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg 
                     border border-cyan-400 shadow-[0_0_15px_#00ffe7] hover:scale-[1.03] transition-all"
        >
          <FaSave className="inline mr-2" /> Salvar
        </button>

        <button
          onClick={onBack}
          className="w-full px-6 py-3 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg 
                     border border-pink-400 shadow-[0_0_15px_#ff00ff] hover:scale-[1.03] transition-all"
        >
          <FaArrowLeft className="inline mr-2" /> Voltar
        </button>
      </div>
    </div>
  );
}
