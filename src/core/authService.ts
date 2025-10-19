// =============================
// 🔐 authService.ts — Login Social com Firebase (Google, GitHub, Discord, Apple)
// =============================
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";

/**
 * 🧠 Login com Google
 */
export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return await signInWithPopup(auth, provider);
}

/**
 * 🐙 Login com GitHub
 * 🔧 É necessário ativar o GitHub nas Configurações → Autenticação → Método de login
 * e cadastrar o domínio do app no GitHub Developer Settings.
 */
export async function loginWithGithub() {
  const provider = new GithubAuthProvider();
  provider.addScope("read:user");
  provider.addScope("user:email");
  return await signInWithPopup(auth, provider);
}

/**
 * 🎮 Login com Discord (OIDC)
 * ⚙️ No Firebase, adicione um provedor OIDC chamado "discord"
 * e use as credenciais obtidas no Discord Developer Portal.
 */
export async function loginWithDiscord() {
  const provider = new OAuthProvider("oidc.discord");
  return await signInWithPopup(auth, provider);
}

/**
 * 🍏 Login com Apple
 * ⚙️ Requer conta Apple Developer e configuração no Firebase
 */
export async function loginWithApple() {
  const provider = new OAuthProvider("apple.com");
  return await signInWithPopup(auth, provider);
}

/**
 * 🚪 Logout do usuário
 */
export async function logoutUser() {
  await signOut(auth);
  localStorage.removeItem("cyberUser");
}

/**
 * 👁️ Observa o estado de autenticação
 */
export function watchAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
