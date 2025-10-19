// =============================
// 🌌 Layout.tsx — Base visual global CyberType 2.0 (Dark Neon)
// =============================
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center text-cyan-400 font-[Share_Tech_Mono] overflow-x-hidden"
      style={{
        backgroundColor: "#030308",
        backgroundImage: "radial-gradient(circle at center, #030308 0%, #010104 100%)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        color: "#00ffe7",
      }}
    >
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-7xl px-4">
        {children}
      </main>

      <footer className="text-cyan-400 text-sm py-4 opacity-70 text-center w-full border-t border-cyan-500/10 tracking-widest">
        ⚡ Desenvolvido por <span className="text-white">Systex Systems</span> • 2077 Edition
      </footer>
    </div>
  );
}
