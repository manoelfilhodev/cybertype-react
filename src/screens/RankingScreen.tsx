// =============================
// 🧠 RankingScreen.tsx — CyberType 2.0 (Neon + Abas + Badges + Rolagem)
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

  // 🧠 Usuário logado (para aba "Meus Resultados")
  const [user] = useState<any>(() => {
    const saved = localStorage.getItem("cyberUser");
    return saved ? JSON.parse(saved) : null;
  });

  // 🧩 Atualiza ranking conforme aba e nível
  useEffect(() => {
    let q;
    if (activeTab === "personal" && user) {
      // 👤 Exibe apenas partidas do jogador logado
      q = query(
        collection(db, "rankings"),
        where("name", "==", user.displayName),
        orderBy("score", "desc"),
        limit(50)
      );
    } else {
      // 🌍 Ranking global
      if (level === "all") {
        q = query(collection(db, "rankings"), orderBy("score", "desc"), limit(50));
      } else {
        q = query(
          collection(db, "rankings"),
          where("level", "==", level),
          orderBy("score", "desc"),
          limit(50)
        );
      }
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
    <div className="flex flex-col items-center justify-center text-center min-h-screen text-cyan-400 font-mono p-4 fade-in-cyber relative">
      <h1 className="text-4xl font-bold drop-shadow-[0_0_15px_#00ffff] mb-4 tracking-widest">
        🏆 RANKING NEURAL GLOBAL
      </h1>

      {/* 🔹 Abas principais */}
      <div className="flex justify-center gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-5 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-cyan-400 to-pink-500 text-black shadow-[0_0_20px_#00ffff]"
                : "bg-gray-800 text-cyan-300 border border-cyan-600 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 🔸 Filtros de nível (apenas no modo global) */}
      {activeTab === "global" && (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {levels.map((lvl) => (
            <button
              key={lvl.key}
              onClick={() => setLevel(lvl.key as any)}
              className={`px-6 py-2 rounded-xl text-sm font-bold uppercase transition-all duration-300 ${
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

      {/* 🧾 Tabela de Ranking */}
      <div className="overflow-y-auto max-h-[70vh] w-full max-w-3xl bg-[#050510]/90 backdrop-blur-md border border-cyan-500/60 rounded-2xl shadow-[0_0_20px_#00ffff] scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-800">
        <table className="w-full border-collapse">
          <thead className="bg-cyan-500/10 text-cyan-300 uppercase text-sm sticky top-0 z-10 backdrop-blur-md">
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
                  <td className="p-3 text-left">
                    {i === 0
                      ? "🥇"
                      : i === 1
                      ? "🥈"
                      : i === 2
                      ? "🥉"
                      : i + 1}
                  </td>
                  <td className="p-3 text-left truncate max-w-[150px]" title={r.name}>
                    {r.name}
                  </td>
                  <td className="p-3 text-right">{r.score}</td>
                  <td className="p-3 text-right">
                    {r.averageSpeed?.toFixed(2)} s
                  </td>
                  <td className="p-3 text-right capitalize">{r.level}</td>
                  <td className="p-3 text-right italic text-cyan-300">
                    {getBadge(r.score)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-400 mt-3">
        {activeTab === "global"
          ? "Exibindo top 50 jogadores globais"
          : user
          ? `Resultados de ${user.displayName}`
          : "Entre com sua conta para ver seus resultados"}
      </p>

      {/* 🔙 Botão Voltar */}
      <button
        onClick={onBack}
        className="mt-10 flex items-center gap-2 text-cyan-400 hover:text-white transition-all hover:scale-105"
      >
        <FaArrowLeft /> Voltar ao Menu
      </button>

      {/* 💫 Efeito Neon Flutuante */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-[#020207] via-[#030311] to-black opacity-90" />
    </div>
  );
}
