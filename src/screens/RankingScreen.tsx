// =============================
// 🧠 RankingScreen.tsx — CyberType 2.0 (Neon + Responsivo + Centralizado Final)
// =============================
import { useEffect, useState } from "react";
import { db } from "../core/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
} from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa";

export default function RankingScreen({ onBack }: { onBack: () => void }) {
  const [level, setLevel] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [ranking, setRanking] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"global" | "personal">("global");

  const [user] = useState<any>(() => {
    const saved = localStorage.getItem("cyberUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    let q;
    if (activeTab === "personal" && user) {
      q = query(
        collection(db, "rankings"),
        where("name", "==", user.displayName),
        orderBy("score", "desc"),
        limit(50)
      );
    } else {
      q =
        level === "all"
          ? query(collection(db, "rankings"), orderBy("score", "desc"), limit(50))
          : query(
              collection(db, "rankings"),
              where("level", "==", level),
              orderBy("score", "desc"),
              limit(50)
            );
    }

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setRanking(data);
    });

    return () => unsub();
  }, [level, activeTab, user]);

  const levels = [
    { key: "all", label: "Geral" },
    { key: "easy", label: "Fácil" },
    { key: "medium", label: "Médio" },
    { key: "hard", label: "Difícil" },
  ];

  const tabs = [
    { key: "global", label: "🌍 Top 50 Globais" },
    { key: "personal", label: "👤 Meus Resultados" },
  ];

  const getBadge = (score: number) => {
    if (score >= 900) return "🌐 Neural Master";
    if (score >= 700) return "⚡ Cyber Runner";
    if (score >= 500) return "💾 Data Seeker";
    if (score >= 300) return "🔹 Neon Initiate";
    return "👾 Noob";
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[radial-gradient(circle_at_center,#020207_0%,#030311_50%,#000_100%)] text-cyan-400 font-mono relative overflow-hidden px-4 sm:px-6">
      
      {/* 🔹 Container centralizado com balanceamento vertical */}
      <div className="flex flex-col items-center justify-between w-full max-w-6xl h-[90vh] sm:h-[88vh] bg-[#050510]/60 border border-cyan-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_40px_#00ffff30] p-4 sm:p-8 md:p-10 overflow-hidden">
        
        {/* 🔷 Cabeçalho fixo */}
        <div className="flex flex-col items-center justify-start flex-shrink-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-[0_0_20px_#00ffff] mb-6 tracking-widest">
            🏆 RANKING NEURAL GLOBAL
          </h1>

          {/* 🔹 Abas */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-[0_0_20px_#00ffff]"
                    : "bg-gray-800 text-cyan-300 border border-cyan-600 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 🔸 Filtros */}
          {activeTab === "global" && (
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
              {levels.map((lvl) => (
                <button
                  key={lvl.key}
                  onClick={() => setLevel(lvl.key as any)}
                  className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm md:text-base font-bold uppercase transition-all duration-300 ${
                    level === lvl.key
                      ? "bg-cyan-400 text-black shadow-[0_0_20px_#00ffff]"
                      : "bg-gray-800 text-cyan-300 border border-cyan-600 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          )}

          {/* 💠 Tooltips Interativos */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
            {[
              {
                key: "easy",
                color: "text-green-400",
                title: "🟢 Neon Initiate",
                desc: "Modo de calibração neural. Sinapses lentas e estáveis — ideal para novos operadores.",
              },
              {
                key: "medium",
                color: "text-yellow-400",
                title: "🟡 Cyber Runner",
                desc: "Ritmo médio de pulsação neural. Velocidade e precisão em harmonia.",
              },
              {
                key: "hard",
                color: "text-red-400",
                title: "🔴 Ghost Protocol",
                desc: "Modo de risco elevado. Erros não são tolerados. Desafie o sistema.",
              },
            ].map((lvl) => (
              <div key={lvl.key} className="relative group cursor-pointer select-none">
                <div
                  className={`px-4 sm:px-5 py-2 border border-cyan-500/40 rounded-lg bg-[#04040a]/70 text-cyan-300 font-semibold tracking-wide hover:text-white hover:border-cyan-300 transition-all duration-300`}
                >
                  <span className={`${lvl.color}`}>{lvl.title}</span>
                </div>

                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 sm:w-72 md:w-80 text-xs sm:text-sm text-left bg-[#03030a] border border-cyan-500/40 text-cyan-200 rounded-lg shadow-[0_0_15px_#00ffff40] p-3 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 pointer-events-none z-20 backdrop-blur-md">
                  <p className="leading-relaxed break-words">{lvl.desc}</p>
                  <p className="text-center text-cyan-500 text-[10px] mt-2">
                    ░▒▓ CyberType // protocolo ativo ▓▒░
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🧾 Tabela centralizada com scroll */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-auto rounded-xl border border-cyan-500/40 shadow-inner shadow-cyan-900/40">
          <table className="min-w-full border-collapse text-[0.8rem] sm:text-sm md:text-base">
            <thead className="bg-cyan-500/10 text-cyan-300 uppercase sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Jogador</th>
                <th className="p-3 text-right">Pontuação</th>
                <th className="p-3 text-right">Velocidade</th>
                <th className="p-3 text-right">Nível</th>
                <th className="p-3 text-right">Badge</th>
              </tr>
            </thead>
            <tbody>
              {ranking.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-gray-500 text-center">
                    Nenhum resultado disponível 🕹️
                  </td>
                </tr>
              ) : (
                ranking.map((r, i) => (
                  <tr
                    key={i}
                    className={`border-t border-cyan-900/60 hover:bg-cyan-800/20 transition ${
                      i === 0
                        ? "text-yellow-400 font-bold"
                        : i === 1
                        ? "text-gray-300 font-semibold"
                        : i === 2
                        ? "text-orange-400 font-semibold"
                        : "text-cyan-200"
                    }`}
                  >
                    <td className="p-3 text-left">{i + 1}</td>
                    <td className="p-3 text-left truncate max-w-[160px]" title={r.name}>
                      {r.name}
                    </td>
                    <td className="p-3 text-right">{r.score}</td>
                    <td className="p-3 text-right">{r.averageSpeed?.toFixed(2)} s</td>
                    <td className="p-3 text-right">
                      <span
                        className={`px-3 py-1 rounded-md text-sm tracking-wide ${
                          r.level === "easy"
                            ? "bg-green-500/10 border border-green-400 text-green-300"
                            : r.level === "medium"
                            ? "bg-yellow-400/10 border border-yellow-300 text-yellow-200"
                            : "bg-red-500/10 border border-red-400 text-red-300"
                        }`}
                      >
                        {r.level?.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-right italic text-cyan-300">
                      {getBadge(r.score)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ⚙️ Rodapé */}
        <div className="flex flex-col items-center justify-center mt-3 flex-shrink-0">
          <p className="text-xs sm:text-sm text-gray-400 mb-3">
            {activeTab === "global"
              ? "Exibindo top 50 jogadores globais"
              : user
              ? `Resultados de ${user.displayName}`
              : "Entre com sua conta para ver seus resultados"}
          </p>

          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-400 hover:text-white transition-all hover:scale-105"
          >
            <FaArrowLeft /> Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}
