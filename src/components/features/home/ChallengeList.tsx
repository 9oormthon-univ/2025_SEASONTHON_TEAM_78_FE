import { useNavigate } from "react-router-dom";
import ChallengeIcon from "@/components/Icon/ChallengeIcon";
import {
  type IconName,
  ICON_LIGHT_COLORS,
} from "@/components/Icon/challenge-color";
import CircularProgress from "@/components/common/CircularProgress";
import type { Challenge } from "@/types/challenge";

interface ChallengeListProps {
  challenges: Challenge[];
  onChallengeToggle?: (challengeId: string) => void;
}

export default function ChallengeList({ challenges }: ChallengeListProps) {
  const navigate = useNavigate();

  // 챌린지 상세 페이지로 이동
  const handleChallengeClick = (
    challengeId: number,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    navigate(`/challenge/${challengeId}`);
  };

  const getRemainingDays = (challenge: Challenge) => {
    return challenge.remainingDays;
  };

  // 진행률 계산
  const getProgressData = (challenge: Challenge) => {
    const completedDays = Math.round(
      (challenge.achievementRate / 100) * challenge.remainingDays
    );
    return {
      completedDays,
      totalDays: challenge.remainingDays,
      percentage: challenge.achievementRate,
    };
  };

  if (challenges.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-center text-gray-500 p-5">
        <div className="flex flex-col items-center">
          <div>아직 인증할 챌린지가 없습니다.</div>
          <div>
            <span className="font-bold text-primary">+ 버튼</span>을 눌러 새로운
            챌린지를 <br />
            등록해 보세요!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <ul className="space-y-3 w-[clamp(320px,calc(100vw-32px),420px)]px-5 pb-30">
        {challenges.map((challenge) => (
          <li
            key={challenge.id}
            className="flex items-center gap-3 rounded-3xl px-4 py-3 mx-3 shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow"
            onClick={(event) => handleChallengeClick(challenge.id, event)}
          >
            <div
              className={`w-12 h-12 ${ICON_LIGHT_COLORS[challenge.challengeIcon as IconName]} rounded-2xl flex items-center justify-center shadow-sm`}
            >
              <ChallengeIcon
                name={challenge.challengeIcon as IconName}
                variant="color"
                size={20}
              />
            </div>
            <div className="flex-1">
              <div className="text-gray-800 font-medium flex items-center gap-2">
                {challenge.title}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <img
                  src="/images/timer-icon.svg"
                  alt="timer"
                  className="w-3 h-3"
                />
                <span>
                  {getRemainingDays(challenge) > 0
                    ? `${getRemainingDays(challenge)}일`
                    : "챌린지 종료"}
                </span>
              </div>
            </div>
            {/* 원형 진행률 바 */}
            <CircularProgress
              completedDays={getProgressData(challenge).completedDays}
              totalDays={getProgressData(challenge).totalDays}
              iconName={challenge.challengeIcon as IconName}
              showPercentage={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
