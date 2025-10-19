// =============================
// 🔐 Login.tsx — Tela de Login Cyberpunk com Firebase
// =============================
import { FaGoogle } from "react-icons/fa";
import { loginWithGoogle } from "../core/authService";

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      onLogin(user);
    } catch (err: any) {
      console.error(err);
      alert("Falha ao autenticar: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#020207] text-cyan-400 font-mono text-center relative overflow-hidden">
      {/* === Fundo com gradiente e brilho === */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04040a] to-[#000] opacity-80"></div>
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-4 tracking-widest neon-text">
          CYBERTYPE_<span className="text-pink-500">2.0</span>
        </h1>
        <p className="text-gray-400 text-sm mb-8 tracking-widest">
          Conecte-se à sua conta neural para começar
        </p>

        <button
          onClick={handleLogin}
          className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-[0_0_15px_#ff0044]"
        >
          <FaGoogle /> Entrar com Google
        </button>

        <p className="text-xs text-gray-500 mt-10">
          Desenvolvido por <span className="text-cyan-400">SYSTEX</span> — Inteligência Digital
        </p>
      </div>
    </div>
  );
}
