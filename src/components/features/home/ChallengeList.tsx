import ChallengeIcon from '@/components/Icon/ChallengeIcon';
import {
  type IconName,
  ICON_LIGHT_COLORS,
  ICON_COLOR_CODES,
} from '@/types/challenge';

type Tab = 'pending' | 'done';

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  duration: number;
  createdAt: string;
  status: 'pending' | 'done';
  completedDays?: number; // 완료한 일수 (임시)
  totalDays?: number; // 전체 일수 (임시)
}

interface ChallengeListProps {
  tab: Tab;
  challenges: Challenge[];
  onChallengeToggle?: (challengeId: string) => void;
}

// 원형 진행률 바 컴포넌트
const CircularProgress = ({
  completed,
  total,
  iconName,
}: {
  completed: number;
  total: number;
  iconName: IconName;
}) => {
  const size = 50;
  const strokeWidth = 10;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-[50px] h-[50px]">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* 배경 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={ICON_COLOR_CODES[iconName].background}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* 진행률 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`${ICON_COLOR_CODES[iconName].icon} transition-all duration-300`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
        />
      </svg>
      {/* 중앙 텍스트 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[9px] font-semibold text-gray-500">
          {completed}/{total}
        </span>
      </div>
    </div>
  );
};

export default function ChallengeList({
  tab,
  challenges,
  onChallengeToggle,
}: ChallengeListProps) {
  // 남은 일자 계산 함수
  const getRemainingDays = (challenge: Challenge) => {
    const startDate = new Date(challenge.createdAt);
    const today = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + challenge.duration);

    const timeDiff = endDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff <= 0) return 0;
    return daysDiff;
  };

  // 임시 데이터 생성 함수
  const getProgressData = (challenge: Challenge) => {
    // 임시로 랜덤한 완료 일수 생성 (0 ~ duration 사이)
    const completedDays =
      challenge.completedDays ??
      Math.floor(Math.random() * (challenge.duration + 1));
    const totalDays = challenge.totalDays ?? challenge.duration;
    return { completedDays, totalDays };
  };

  if (challenges.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-center text-gray-500 p-5">
        {tab === 'pending' ? (
          <div className="flex flex-col items-center">
            <div>아직 인증할 챌린지가 없습니다.</div>
            <div>
              <span className="font-bold text-primary">+ 버튼</span>을 눌러
              새로운 챌린지를 <br />
              등록해 보세요!
            </div>
          </div>
        ) : (
          '챌린지 인증을 완료해 보세요!'
        )}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <ul className="space-y-3 w-[clamp(320px,calc(100vw-32px),420px)]px-5 pb-30">
        {challenges.map((challenge) => (
          <li
            key={challenge.id}
            className={`flex items-center gap-3 rounded-3xl px-4 py-3 mx-3 shadow-sm bg-white ${
              onChallengeToggle
                ? 'cursor-pointer hover:shadow-md transition-shadow'
                : ''
            }`}
            onClick={() => onChallengeToggle?.(challenge.id)}
          >
            <div
              className={`w-12 h-12 ${ICON_LIGHT_COLORS[challenge.icon]} rounded-2xl flex items-center justify-center shadow-sm`}
            >
              <ChallengeIcon name={challenge.icon} variant="color" size={20} />
            </div>
            <div className="flex-1">
              <div className="text-gray-800 font-medium">{challenge.title}</div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <img
                  src="/images/timer-icon.svg"
                  alt="timer"
                  className="w-3 h-3"
                />
                <span>
                  {getRemainingDays(challenge) > 0
                    ? `${getRemainingDays(challenge)}일`
                    : '챌린지 종료'}
                </span>
              </div>
            </div>
            {/* 원형 진행률 바 */}
            <CircularProgress
              completed={getProgressData(challenge).completedDays}
              total={getProgressData(challenge).totalDays}
              iconName={challenge.icon}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
