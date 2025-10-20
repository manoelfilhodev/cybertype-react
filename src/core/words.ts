// =============================
// 🧠 words.ts — Banco de palavras + gerador procedural CyberType 2.0
// =============================

/**
 * Palavras simples — modo fácil
 */
const wordsEasy: string[] = [
  "sol", "lua", "ar", "dia", "bom", "sim", "vai", "paz", "rio", "azul",
  "vento", "fogo", "som", "nuvem", "luz", "vida", "rede", "linha", "eco", "mundo",
  "ponto", "chave", "base", "dado", "nexo", "código", "voz", "laser", "chip", "bot",
  "wifi", "fluxo", "norte", "gato", "mapa", "sede", "drone", "cyber", "neon", "game",
  "login", "loop", "tempo", "sensor", "log", "data", "mover", "rede", "bit", "byte"
];

/**
 * Palavras intermediárias — modo médio
 */
const wordsMedium: string[] = [
  "future", "logic", "matrix", "typing", "coding", "system", "energy", "neural", "cyber", "planet",
  "process", "upload", "download", "network", "quantum", "glitch", "backup", "console", "protocol", "signal",
  "framework", "digital", "scanner", "browser", "firewall", "function", "variable", "control", "command", "terminal",
  "element", "engine", "hardware", "software", "compile", "execute", "database", "storage", "stream", "processador",
  "render", "decode", "binary", "console", "input", "output", "package", "version", "module", "cluster"
];

/**
 * Palavras complexas — modo difícil
 */
const wordsHard: string[] = [
  "synchronization", "infrastructure", "implementation", "responsibility", "configuration",
  "artificial", "intelligence", "revolution", "javascript", "performance",
  "neuralnetwork", "microarchitecture", "hyperthreading", "multidimensional", "virtualization",
  "cryptography", "interoperability", "neurotechnology", "cybersecurity", "metaverse",
  "computational", "parametrization", "nanotechnology", "transcendence", "microprocessor",
  "intercommunication", "neuroplasticity", "ultrasonography", "multithreading", "quantumprocessing",
  "hypersynchronization", "hyperconnectivity", "retrocompatibility", "bioengineering", "photosensitivity",
  "antigravitational", "neurocognitive", "parallelization", "selfreplicating", "decentralization",
  "supraluminal", "subconsciousness", "cybernetic", "universalism", "metaprogramming", "decompilation"
];

/**
 * Retorna uma palavra aleatória com base no nível de dificuldade.
 *
 * @param level - nível de dificuldade ("easy" | "medium" | "hard")
 * @returns uma palavra aleatória da lista correspondente
 */
export function getRandomWord(level: string = "medium"): string {
  let source: string[];

  switch (level) {
    case "easy":
      source = wordsEasy;
      break;
    case "hard":
      source = wordsHard;
      break;
    default:
      source = wordsMedium;
      break;
  }

  const index = Math.floor(Math.random() * source.length);

  // 💡 10% de chance de gerar palavra procedural exclusiva
  if (Math.random() < 0.1) {
    return generateProceduralWord(level);
  }

  return source[index];
}

/**
 * 🔮 Gera uma palavra procedural baseada em prefixos e sufixos temáticos
 * Cria palavras como "cyberflux", "neurocore", "quantumloop" etc.
 */
export function generateProceduralWord(level: string = "medium"): string {
  const prefixes = [
    "cyber", "neuro", "tech", "data", "hyper", "nano", "meta", "astro", "quantum",
    "info", "bio", "ultra", "chrono", "nano", "mecha", "syn", "auto", "crypt", "holo"
  ];

  const cores = [
    "flux", "core", "node", "pulse", "loop", "gate", "net", "storm", "forge",
    "spark", "shift", "drive", "drone", "sync", "stream", "frame", "scope", "grid", "mind", "cell"
  ];

  const suffixes = [
    "", "", "", "X", "One", "OS", "Zone", "Link", "Net", "Flow", "Verse", "Sync", "AI", "Edge"
  ];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const core = cores[Math.floor(Math.random() * cores.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  // Combinação procedural
  let word = prefix + core + suffix;

  // Dificuldade influencia no tamanho ou complexidade
  if (level === "hard" && Math.random() > 0.5) {
    const extra = cores[Math.floor(Math.random() * cores.length)];
    word += extra;
  }

  return word.toLowerCase();
}

/**
 * Export opcional — útil caso queira acessar as listas separadamente
 */
export const wordSets = {
  easy: wordsEasy,
  medium: wordsMedium,
  hard: wordsHard,
};
