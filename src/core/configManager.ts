// =============================
// 🧠 core/configManager.ts
// =============================

type Config = {
    musicVolume: number;
    keyboardVolume: number;
    hitSound: boolean;
    errorSound: boolean;
  };
  
  type Listener = (config: Config) => void;
  
  let config: Config = {
    musicVolume: Number(localStorage.getItem("musicVolume") || 0.5),
    keyboardVolume: Number(localStorage.getItem("keyboardVolume") || 0.5),
    hitSound: localStorage.getItem("hitSound") === "true",
    errorSound: localStorage.getItem("errorSound") === "true",
  };
  
  const listeners: Listener[] = [];
  
  export const configManager = {
    get: () => config,
  
    set(newConfig: Partial<Config>) {
      config = { ...config, ...newConfig };
  
      // salva no localStorage
      Object.entries(newConfig).forEach(([key, value]) =>
        localStorage.setItem(key, String(value))
      );
  
      // notifica todos os inscritos
      listeners.forEach((l) => l(config));
    },
  
    subscribe(listener: Listener) {
      listeners.push(listener);
      return () => {
        const i = listeners.indexOf(listener);
        if (i !== -1) listeners.splice(i, 1);
      };
    },
  };
  