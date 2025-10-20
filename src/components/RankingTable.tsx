export default function RankingTable({ data }: { data: any[] }) {
    return (
      <table className="min-w-[400px] bg-black/40 text-cyan-300 border border-cyan-500 rounded-xl shadow-lg">
        <thead>
          <tr className="border-b border-cyan-500 text-cyan-400">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Jogador</th>
            <th className="px-4 py-2">Pontuação</th>
            <th className="px-4 py-2">Velocidade Média</th>
            <th className="px-4 py-2">Nível</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={5} className="py-4 text-gray-400">
                Nenhum registro ainda 🕹️
              </td>
            </tr>
          )}
          {data.map((r, i) => (
            <tr
              key={i}
              className="border-b border-cyan-800 hover:bg-cyan-800/20 transition"
            >
              <td className="px-4 py-2">{i + 1}</td>
              <td className="px-4 py-2">{r.name}</td>
              <td className="px-4 py-2">{r.score}</td>
              <td className="px-4 py-2">{r.averageSpeed.toFixed(2)} s</td>
              <td className="px-4 py-2 capitalize">{r.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  