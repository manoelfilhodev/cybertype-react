export default function ResultScreen({
    score,
    totalTyped,
    errors,
    accuracy,
    wpm,
    record,
    onRestart,
  }: {
    score: number;
    totalTyped: number;
    errors: number;
    accuracy: number;
    wpm: number;
    record: number;
    onRestart: () => void;
  }) {
    return (
      <div className="text-center text-white space-y-4">
        <h2 className="text-4xl font-bold text-cyan-400">Resultado Final</h2>
  
        <div className="space-y-2 text-lg">
          <p>🏆 Pontuação: <span className="text-yellow-400">{score}</span></p>
          <p>⌨️ Palavras digitadas: <span className="text-cyan-300">{totalTyped}</span></p>
          <p>❌ Erros: <span className="text-red-400">{errors}</span></p>
          <p>🎯 Precisão: <span className="text-green-400">{accuracy.toFixed(1)}%</span></p>
          <p>⚡ WPM: <span className="text-blue-400">{wpm.toFixed(1)}</span></p>
          <p>🥇 Recorde atual: <span className="text-purple-400">{record}</span></p>
        </div>
  
        <button
          onClick={onRestart}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition"
        >
          Jogar Novamente
        </button>
      </div>
    );
  }
  