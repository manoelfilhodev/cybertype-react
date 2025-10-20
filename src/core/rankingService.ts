// =============================
// 🌐 rankingService.ts — Ranking Global com CyberScore
// =============================

import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  DocumentReference,
} from "firebase/firestore";

/**
 * Salva o desempenho do jogador no ranking global (Firestore)
 */
export async function saveRanking(
  name: string,
  score: number,
  averageSpeed: number,
  level: "easy" | "medium" | "hard",
  cyberScore?: number // 🧠 novo parâmetro opcional
): Promise<void> {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, "rankings"), {
      name,
      score,
      averageSpeed,
      level,
      cyberScore: cyberScore ?? 0, // adiciona o campo mesmo se vier vazio
      createdAt: new Date(),
    });

    console.log("✅ Ranking salvo com ID:", docRef.id);
  } catch (error) {
    console.error("❌ Erro ao salvar ranking:", error);
  }
}

/**
 * Busca o Top 10 global (ou por nível)
 */
export async function getRanking(level?: "easy" | "medium" | "hard") {
  try {
    let q;

    if (level) {
      // 🔹 Ranking filtrado por nível, ordenado pelo CyberScore (desc)
      q = query(
        collection(db, "rankings"),
        where("level", "==", level),
        orderBy("cyberScore", "desc"),
        limit(10)
      );
    } else {
      // 🔹 Ranking geral
      q = query(
        collection(db, "rankings"),
        orderBy("cyberScore", "desc"),
        limit(10)
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("❌ Erro ao carregar ranking:", error);
    return [];
  }
}
