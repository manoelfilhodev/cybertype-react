const wordsEasy = ["sol", "lua", "ar", "dia", "bom", "sim", "vai", "paz", "rio", "azul"];
const wordsMedium = [
  "future", "logic", "matrix", "typing", "coding", "system",
  "energy", "neural", "cyber", "planet",
];
const wordsHard = [
  "synchronization", "infrastructure", "implementation",
  "responsibility", "configuration", "artificial", "intelligence",
  "revolution", "javascript", "performance",
];

export function getRandomWord(level: string = "medium") {
  let source;
  if (level === "easy") source = wordsEasy;
  else if (level === "hard") source = wordsHard;
  else source = wordsMedium;

  return source[Math.floor(Math.random() * source.length)];
}
