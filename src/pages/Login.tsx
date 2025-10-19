// =============================
// ⚡ Login.tsx — Tela de Login Cyberpunk
// =============================
import { FaGoogle } from "react-icons/fa";
import { loginWithGoogle } from "../core/authService";

export default function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      onLogin(user);
    } catch (err: any) {
      alert("Falha ao autenticar: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-[#020207] text-cyan-400">
      <h1 className="text-5xl font-mono mb-4">
        CYBERTYPE_<span className="text-pink-500">2.0</span>
      </h1>
      <p className="text-gray-400 mb-8">Conecte-se para começar</p>

      <button
        onClick={handleLogin}
        className="flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 px-6 transition-all shadow-[0_0_15px_#ff0044]"
      >
        <FaGoogle /> Entrar com Google
      </button>
    </div>
  );
}
