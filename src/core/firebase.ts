// =============================
// 🔥 firebase.ts — Inicializa o Firebase Auth
// =============================
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_RFnA80_M9XZ8Yed_emXFrjfhSScSBi4",
  authDomain: "cybertype-cb5a4.firebaseapp.com",
  projectId: "cybertype-cb5a4",
  storageBucket: "cybertype-cb5a4.firebasestorage.app",
  messagingSenderId: "761094224689",
  appId: "1:761094224689:web:9d2a23ad142e46c1a28e10",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
