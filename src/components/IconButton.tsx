// =============================
// 🎛️ IconButton.tsx — Botão icônico base (usado em Som e Configurações)
// =============================
interface IconButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
    title?: string;
    active?: boolean;
    color?: "cyan" | "pink";
  }
  
  export default function IconButton({
    icon,
    onClick,
    title,
    active = false,
    color = "cyan",
  }: IconButtonProps) {
    const borderColor = active ? "border-pink-500" : "border-cyan-400";
    const textColor = active ? "text-pink-400" : "text-cyan-400";
    const glow = active
      ? "shadow-[0_0_15px_#ff00ff]"
      : "shadow-[0_0_10px_#00ffe7]";
  
    return (
      <button
        onClick={onClick}
        title={title}
        className={`flex items-center justify-center w-12 h-12 rounded-full 
          bg-black/40 border ${borderColor} ${textColor} text-2xl
          hover:text-pink-500 hover:border-pink-500 transition-all duration-300 
          ${glow} hover:shadow-[0_0_18px_#ff00ff]`}
      >
        {icon}
      </button>
    );
  }
  