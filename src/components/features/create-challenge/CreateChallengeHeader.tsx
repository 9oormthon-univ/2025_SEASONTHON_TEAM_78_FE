interface CreateChallengeHeaderProps {
  onBack: () => void;
}

export default function CreateChallengeHeader({
  onBack,
}: CreateChallengeHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      <button
        onClick={onBack}
        className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className="text-lg font-normal text-gray-900">새로운 챌린지 추가</h1>
      <div className="w-8"></div>
    </div>
  );
}
