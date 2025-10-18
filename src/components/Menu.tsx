export default function Menu({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-5xl font-bold text-cyan-400">CYBERTYPE</h1>
      <p className="text-gray-400">
        Treine sua velocidade e precisão na digitação
      </p>

      <button
        onClick={onStart}
        className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition"
      >
        Iniciar Jogo
      </button>
    </div>
  );
}
