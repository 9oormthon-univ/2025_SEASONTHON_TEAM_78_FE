interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function BoxButtonLarge({
  children,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom))] 
    w-[clamp(320px,calc(100vw),478px)] p-4 border-t border-[#f4f7fb] bg-gray-50/10
      backdrop-blur-lg"
    >
      {/* 버튼 */}
      <button
        onClick={onClick}
        disabled={disabled}
        className={`relative z-10 w-full h-[65px] p-3 rounded-full
          bg-gradient-to-b from-[#4672FF] to-[#8DB7FF] 
          hover:from-[#2B5BFF] hover:to-[#6B9FFF]
          text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200
          disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:opacity-50 ${className}`}
      >
        {children}
      </button>
    </div>
  );
}
