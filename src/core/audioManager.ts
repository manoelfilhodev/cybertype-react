// 🎧 Gerenciador global de áudio — evita recriação do objeto e bugs de pausa

class AudioManager {
  private static instance: AudioManager;
  public bgMusic: HTMLAudioElement;

  private constructor() {
    this.bgMusic = new Audio("/assets/sounds/bg-music.mp3");
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.35;
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  play() {
    this.bgMusic.play().catch(() => {});
  }

  pause() {
    this.bgMusic.pause();
  }

  toggle() {
    if (this.bgMusic.paused) this.play();
    else this.pause();
  }

  isPlaying() {
    return !this.bgMusic.paused;
  }
}

export const audioManager = AudioManager.getInstance();
