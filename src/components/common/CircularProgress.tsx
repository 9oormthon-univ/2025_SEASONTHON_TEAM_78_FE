import { type IconName, ICON_COLOR_CODES } from "@/types/challenge";

interface CircularProgressProps {
  completedDays: number; // API에서 받아올 성공한 일수
  totalDays: number; // API에서 받아올 챌린지 기간
  iconName: IconName;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  showBoth?: boolean; // 퍼센트와 분수 둘 다 표시
  // 하위 호환성을 위한 기존 props (deprecated)
  completed?: number;
  total?: number;
}

export default function CircularProgress({
  completedDays,
  totalDays,
  iconName,
  size = 50,
  strokeWidth = 10,
  showPercentage = true,
  showBoth = false,
  // 하위 호환성을 위한 기존 props
  completed,
  total,
}: CircularProgressProps) {
  // API 데이터 우선 사용, 없으면 기존 props 사용 (하위 호환성)
  const actualCompleted = completedDays ?? completed ?? 0;
  const actualTotal = totalDays ?? total ?? 1;

  // 진행률 계산 (0-100%)
  const percentage =
    actualTotal > 0 ? Math.round((actualCompleted / actualTotal) * 100) : 0;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100); // 0-100 범위로 제한

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (clampedPercentage / 100) * circumference;

  const iconColor = ICON_COLOR_CODES[iconName]?.icon || "stroke-blue-500";
  const bgColor = ICON_COLOR_CODES[iconName]?.background || "stroke-blue-100";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* 배경 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className={bgColor}
        />
        {/* 진행률 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
          className={`transition-all duration-300 ${iconColor}`}
        />
      </svg>
      {/* 중앙 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {showBoth ? (
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-medium text-gray-700">
              {clampedPercentage}%
            </span>
            <span className="text-[7px] font-medium text-gray-500">
              {actualCompleted}/{actualTotal}
            </span>
          </div>
        ) : showPercentage ? (
          <span className="text-[9px] font-medium text-gray-700">
            {clampedPercentage}%
          </span>
        ) : (
          <span className="text-[9px] font-medium text-gray-700">
            {actualCompleted}/{actualTotal}
          </span>
        )}
      </div>
    </div>
  );
}
