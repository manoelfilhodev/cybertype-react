export default function ScoreBoard({ score }: { score: number }) {
  const best = localStorage.getItem('bestScore') || '0';
  if (score > parseInt(best))
    localStorage.setItem('bestScore', score.toString());

  return (
    <div className="text-center mt-2">
      <p className="text-lg">Pontuação atual: {score}</p>
      <p className="text-sm text-gray-400">Recorde: {best}</p>
    </div>
  );
}
