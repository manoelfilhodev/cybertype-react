// =============================
// 🎧 core/audioManager.ts — CyberType 2.0 (Versão final com autoplay fix e fallbacks)
// =============================

class AudioManager {
  music: HTMLAudioElement | null = null;
  keySound: HTMLAudioElement | null = null;
  hitSound: HTMLAudioElement | null = null;
  errorSound: HTMLAudioElement | null = null;

  // volumes independentes
  musicVolume = Number(localStorage.getItem("musicVolume") || 0.5);
  keyboardVolume = Number(localStorage.getItem("keyboardVolume") || 0.5);
  hitVolume = Number(localStorage.getItem("hitVolume") || 0.6);
  errorVolume = Number(localStorage.getItem("errorVolume") || 0.6);

  // toggles (habilitações)
  musicEnabled = localStorage.getItem("musicEnabled") !== "false";
  keySoundEnabled = localStorage.getItem("keySoundEnabled") !== "false";
  hitSoundEnabled = localStorage.getItem("hitSound") === "true";
  errorSoundEnabled = localStorage.getItem("errorSound") === "true";

  constructor() {
    // 🔧 Inicializa audios apenas se possível
    try {
      this.music = new Audio("/assets/sounds/bg-music.mp3");
      this.music.loop = true;
      this.music.volume = this.musicVolume;

      this.keySound = new Audio("/assets/sounds/key-click.mp3");
      this.keySound.volume = this.keyboardVolume;

      this.hitSound = new Audio("/assets/sounds/correct.mp3");
      this.hitSound.volume = this.hitVolume;

      this.errorSound = new Audio("/assets/sounds/wrong.mp3");
      this.errorSound.volume = this.errorVolume;
    } catch (err) {
      console.warn("⚠️ Falha ao carregar áudios:", err);
    }
  }

  // === MÚSICA DE FUNDO ===
play() {
  if (!this.musicEnabled || !this.music) return;

  // se já estiver tocando, não reinicia
  if (!this.music.paused) return;

  this.music.loop = true;
  this.music.volume = this.musicVolume;

  this.music
    .play()
    .then(() => console.log("🎵 Música tocando..."))
    .catch(() => console.log("🚫 Esperando interação do usuário"));
}

stop(pauseOnly = false) {
  if (!this.music) return;

  if (pauseOnly) {
    this.music.pause(); // pausa mas não zera o tempo
  } else {
    this.music.pause();
    this.music.currentTime = 0; // zera (para usar ao desativar nas configs)
  }
}


  setMusicVolume(volume: number) {
    this.musicVolume = volume;
    if (this.music) this.music.volume = volume;
    localStorage.setItem("musicVolume", String(volume));
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    localStorage.setItem("musicEnabled", String(enabled));
    if (enabled) this.play();
    else this.stop();
  }

  // === TECLADO ===
  playKey() {
    if (!this.keySoundEnabled || !this.keySound) return;
    try {
      this.keySound.currentTime = 0;
      this.keySound.volume = this.keyboardVolume;
      this.keySound.play().catch(() => {});
    } catch {}
  }

  setKeyVolume(volume: number) {
    this.keyboardVolume = volume;
    if (this.keySound) this.keySound.volume = volume;
    localStorage.setItem("keyboardVolume", String(volume));
  }

  setKeySoundEnabled(enabled: boolean) {
    this.keySoundEnabled = enabled;
    localStorage.setItem("keySoundEnabled", String(enabled));
  }

  // === ACERTO ===
  playHit() {
    if (!this.hitSoundEnabled || !this.hitSound) return;
    try {
      this.hitSound.currentTime = 0;
      this.hitSound.volume = this.hitVolume;
      this.hitSound.play().catch(() => {});
    } catch {}
  }

  setHitVolume(volume: number) {
    this.hitVolume = volume;
    if (this.hitSound) this.hitSound.volume = volume;
    localStorage.setItem("hitVolume", String(volume));
  }

  setHitSoundEnabled(enabled: boolean) {
    this.hitSoundEnabled = enabled;
    localStorage.setItem("hitSound", String(enabled));
  }

  // === ERRO ===
  playError() {
    if (!this.errorSoundEnabled || !this.errorSound) return;
    try {
      this.errorSound.currentTime = 0;
      this.errorSound.volume = this.errorVolume;
      this.errorSound.play().catch(() => {});
    } catch {}
  }

  setErrorVolume(volume: number) {
    this.errorVolume = volume;
    if (this.errorSound) this.errorSound.volume = volume;
    localStorage.setItem("errorVolume", String(volume));
  }

  setErrorSoundEnabled(enabled: boolean) {
    this.errorSoundEnabled = enabled;
    localStorage.setItem("errorSound", String(enabled));
  }
}

export const audioManager = new AudioManager();
