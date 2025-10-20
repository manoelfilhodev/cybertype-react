// =============================
// 🔥 firebase.ts — Inicializa Firebase (Auth + Firestore)
// =============================

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚙️ Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_RFnA80_M9XZ8Yed_emXFrjfhSScSBi4",
  authDomain: "cybertype-cb5a4.firebaseapp.com",
  projectId: "cybertype-cb5a4",
  storageBucket: "cybertype-cb5a4.appspot.com",
  messagingSenderId: "761094224689",
  appId: "1:761094224689:web:9d2a23ad142e46c1a28e10",
};

// 🚀 Inicializa o Firebase App
const app = initializeApp(firebaseConfig);

// 🔐 Autenticação
export const auth = getAuth(app);

// 💾 Banco de dados Firestore
export const db = getFirestore(app);
