// =============================
// 💾 storage.ts — Sistema de pontuação CyberType 2.0
// =============================

interface ScoreRecord {
  score: number;
  difficulty: string;
  date: string;
}

/**
 * Salva uma nova pontuação no histórico local.
 */
export function saveScore(score: number, difficulty: string): void {
  const history: ScoreRecord[] = JSON.parse(localStorage.getItem("scores") || "[]");

  history.push({
    score,
    difficulty,
    date: new Date().toISOString(),
  });

  localStorage.setItem("scores", JSON.stringify(history));
}

/**
 * Retorna o melhor score global ou por dificuldade.
 */
export function getBestScore(difficulty?: string): number {
  const history: ScoreRecord[] = JSON.parse(localStorage.getItem("scores") || "[]");

  if (difficulty) {
    const filtered = history.filter((h) => h.difficulty === difficulty);
    return filtered.length ? Math.max(...filtered.map((h) => h.score)) : 0;
  }

  return history.length ? Math.max(...history.map((h) => h.score)) : 0;
}
