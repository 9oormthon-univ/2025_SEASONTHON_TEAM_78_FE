type Tab = "pending" | "done";

interface ChallengeToggleProps {
  value: Tab;
  onChange: (value: Tab) => void;
  className?: string;
}

export default function ChallengeToggle({
  value,
  onChange,
  className = "",
}: ChallengeToggleProps) {
  return (
    <div
      className={`grid grid-cols-2 p-1 rounded-full bg-gray-200 mb-5
        shadow-sm border border-gray-200 mx-16 ${className}`}
      role="tablist"
      aria-label="챌린지 인증 상태 전환"
    >
      <button
        type="button"
        onClick={() => onChange("pending")}
        className={`flex justify-center w-full rounded-full py-2 
          text-xs font-semibold transition-colors outline-none 
          ${value === "pending" ? "bg-white text-primary" : "text-gray-800 hover:text-primary"}`}
        aria-pressed={value === "pending"}
      >
        인증할 챌린지
      </button>
      <button
        type="button"
        onClick={() => onChange("done")}
        className={`flex justify-center w-full rounded-full py-2 
          text-xs font-semibold transition-colors outline-none 
          ${value === "done" ? "bg-white text-primary" : "text-gray-800 hover:text-primary"}`}
        aria-pressed={value === "done"}
      >
        인증 완료한 챌린지
      </button>
    </div>
  );
}
