// =============================
// 🧠 scoreUtils.ts — Cálculo do CyberScore
// =============================
export function calculateCyberScore(wpm: number, accuracy: number, level: string): number {
  const levelMultiplier = {
    easy: 1.0,
    medium: 1.3,
    hard: 1.6,
  }[level] || 1.0;

  // Fórmula base: (WPM * (Accuracy / 100)) * multiplicador
  const cyberScore = Math.round(wpm * (accuracy / 100) * levelMultiplier);
  return cyberScore;
}
