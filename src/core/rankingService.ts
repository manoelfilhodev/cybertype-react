import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  DocumentReference
} from "firebase/firestore";

export async function saveRanking(
  name: string,
  score: number,
  averageSpeed: number,
  level: "easy" | "medium" | "hard"
): Promise<void> {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, "rankings"), {
      name,
      score,
      averageSpeed,
      level,
      createdAt: new Date(),
    });

    console.log("✅ Ranking salvo com ID:", docRef.id);
  } catch (error) {
    console.error("❌ Erro ao salvar ranking:", error);
  }
}

export async function getRanking(level?: "easy" | "medium" | "hard") {
  try {
    let q;
    if (level) {
      q = query(
        collection(db, "rankings"),
        where("level", "==", level),
        orderBy("score", "desc"),
        limit(10)
      );
    } else {
      q = query(collection(db, "rankings"), orderBy("score", "desc"), limit(10));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("❌ Erro ao carregar ranking:", error);
    return [];
  }
}
