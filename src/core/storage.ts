export function saveScore(score: number) {
  const history = JSON.parse(localStorage.getItem('scores') || '[]');
  history.push({ score, date: new Date().toISOString() });
  localStorage.setItem('scores', JSON.stringify(history));
}

export function getBestScore(): number {
  const history = JSON.parse(localStorage.getItem('scores') || '[]');
  return history.length ? Math.max(...history.map((h: any) => h.score)) : 0;
}
