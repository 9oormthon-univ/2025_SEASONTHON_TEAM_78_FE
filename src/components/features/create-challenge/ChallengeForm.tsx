import { useState, useRef, useEffect } from "react";
import {
  CHALLENGE_SUGGESTIONS,
  type ChallengeSuggestion,
  ICON_LIGHT_COLORS,
} from "@/types/challenge";
import ChallengeIcon from "@/components/Icon/ChallengeIcon";

interface ChallengeFormProps {
  title: string;
  description: string;
  duration: number;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onDurationChange: (duration: number) => void;
}

const DURATION_OPTIONS = [
  { value: 7, label: "7일" },
  { value: 15, label: "15일" },
  { value: 30, label: "30일" },
  { value: 50, label: "50일" },
];

export default function ChallengeForm({
  title,
  description,
  duration,
  onTitleChange,
  onDescriptionChange,
  onDurationChange,
}: ChallengeFormProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    ChallengeSuggestion[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // 추천 목록 필터링
  useEffect(() => {
    if (title.trim()) {
      const filtered = CHALLENGE_SUGGESTIONS.filter((suggestion) =>
        suggestion.title.toLowerCase().includes(title.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 10)); // 최대 5개만 표시
    } else {
      setFilteredSuggestions(CHALLENGE_SUGGESTIONS.slice(0, 10));
    }
  }, [title]);

  // 외부 클릭 시 추천 목록 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestionTitle: string) => {
    onTitleChange(suggestionTitle);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-6">
      {/* 제목 입력 */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="title" className="block font-semibold">
            챌린지 제목
          </label>
          <span className="text-sm text-gray-500">{title.length}/11</span>
        </div>
        <div className="relative">
          <input
            ref={inputRef}
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= 11) {
                onTitleChange(e.target.value);
              }
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="챌린지 제목을 입력해 주세요."
            maxLength={11}
            className={`w-full px-4 py-3 pr-10 rounded-2xl border-2 transition-all duration-200 outline-none
            ${
              title.trim()
                ? "bg-white border-gray-100 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                : "bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            }`}
          />
          {/* X 버튼 */}
          {title.trim() && (
            <button
              type="button"
              onClick={() => onTitleChange("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 
              bg-gray-300 hover:bg-gray-400 text-white rounded-full 
              flex items-center justify-center transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* 추천 목록 */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-3 z-10"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-600 font-medium">
                  💡 추천 챌린지
                </div>
                <button
                  type="button"
                  onClick={() => setShowSuggestions(false)}
                  className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-600 
                  rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion.title)}
                    className="group relative px-4 py-2 
                    bg-gradient-to-r from-blue-50 to-purple-50 
                    hover:from-blue-100 hover:to-purple-100 border border-blue-200 hover:border-blue-300
                    rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700">
                        {suggestion.title}
                      </span>
                      <div
                        className={`w-5 h-5 ${ICON_LIGHT_COLORS[suggestion.icon]} rounded-full flex items-center justify-center transition-colors`}
                      >
                        <ChallengeIcon
                          name={suggestion.icon}
                          variant="color"
                          size={12}
                        />
                      </div>
                    </div>
                    {/* 호버 시 나타나는 플러스 아이콘 */}
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white rounded-full 
                    flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 설명 입력 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="description" className="block font-semibold">
            챌린지 내용
          </label>
          <span className="text-sm text-gray-500">{description.length}/50</span>
        </div>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              onDescriptionChange(e.target.value);
            }
          }}
          placeholder="챌린지에 대한 내용을 입력해 주세요."
          rows={4}
          maxLength={50}
          className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-200 outline-none resize-none
          ${
            description.trim()
              ? "bg-white border-gray-100 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              : "bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          }`}
        />
      </div>

      {/* 기간 선택 */}
      <div>
        <label className="block font-semibold mb-2">챌린지 기간</label>
        <div className="grid grid-cols-4 gap-3">
          {DURATION_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onDurationChange(option.value)}
              className={`
                p-4 rounded-2xl border-2 transition-all duration-200 text-center text-sm
                ${
                  duration === option.value
                    ? "bg-white border-gray-100 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    : "bg-gray-100 border-transparent hover:bg-white hover:border-gray-100"
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
