// =============================
// 🧠 words.ts — Banco de palavras + gerador CyberType 2.0
// =============================

/**
 * Palavras simples — modo fácil
 */
const wordsEasy: string[] = [
  "sol", "lua", "ar", "dia", "bom",
  "sim", "vai", "paz", "rio", "azul",
];

/**
 * Palavras intermediárias — modo médio
 */
const wordsMedium: string[] = [
  "future", "logic", "matrix", "typing", "coding", "system",
  "energy", "neural", "cyber", "planet",
];

/**
 * Palavras complexas — modo difícil
 */
const wordsHard: string[] = [
  "synchronization", "infrastructure", "implementation",
  "responsibility", "configuration", "artificial",
  "intelligence", "revolution", "javascript", "performance",
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
  return source[index];
}

/**
 * Export opcional — útil caso queira acessar as listas separadamente
 */
export const wordSets = {
  easy: wordsEasy,
  medium: wordsMedium,
  hard: wordsHard,
};
