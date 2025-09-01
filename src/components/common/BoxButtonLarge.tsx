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
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-12 px-4 py-2 rounded-full 
        bg-gradient-to-b from-[#4672FF] to-[#8DB7FF] 
        hover:from-[#2B5BFF] hover:to-[#6B9FFF]
        text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200
        disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
