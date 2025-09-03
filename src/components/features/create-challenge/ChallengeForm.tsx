interface ChallengeFormProps {
  title: string;
  description: string;
  duration: number;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onDurationChange: (duration: number) => void;
}

const DURATION_OPTIONS = [
  { value: 7, label: "1주일" },
  { value: 14, label: "2주일" },
  { value: 21, label: "3주일" },
  { value: 30, label: "1개월" },
];

export default function ChallengeForm({
  title,
  description,
  duration,
  onTitleChange,
  onDescriptionChange,
  onDurationChange,
}: ChallengeFormProps) {
  return (
    <div className="space-y-6">
      {/* 제목 입력 */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          챌린지 제목 *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="예: 물 8잔 마시기"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
        />
      </div>

      {/* 설명 입력 */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          챌린지 설명 (선택사항)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="챌린지에 대한 자세한 설명을 입력해주세요"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-none"
        />
      </div>

      {/* 기간 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          챌린지 기간 *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {DURATION_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onDurationChange(option.value)}
              className={`
                px-4 py-3 rounded-lg border-2 transition-all duration-200 text-center
                ${
                  duration === option.value
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-tertiary)] text-[var(--color-primary)] font-semibold"
                    : "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
