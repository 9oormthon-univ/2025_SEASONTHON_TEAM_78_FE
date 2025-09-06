import CircularProgress from "@/components/common/CircularProgress";
import { type IconName } from "@/components/Icon/challenge-color";
import type { ChallengeDetailResponse } from "@/types/challenge";

type ChallengeData = ChallengeDetailResponse["data"];

interface ChallengeStatsProps {
  challenge: ChallengeData;
}

export default function ChallengeStats({ challenge }: ChallengeStatsProps) {
  return (
    <div className="grid grid-cols-2 items-start justify-center gap-4">
      {/* 챌린지 남은기간 */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <p className="mb-4 text-sm font-medium">남은 기간</p>
        <div className="flex items-center gap-2 text-xl font-semibold">
          <img
            src="/images/timer-black-icon.webp"
            alt="timer"
            className="w-6 h-6"
          />
          <span>
            {challenge.remainingDays > 0 ? (
              <>
                {challenge.remainingDays}
                <span className="text-base font-normal text-gray-700">일</span>
              </>
            ) : (
              "챌린지 종료"
            )}
          </span>
        </div>
      </div>

      {/* 챌린지 달성률 */}
      <div className="flex flex-row justify-between bg-gray-50 rounded-2xl p-4">
        <div className="flex flex-col">
          <p className="mb-4 text-sm font-medium">달성률</p>
          <div className="text-xl font-bold text-gray-800">
            {challenge.achievementRate}
            <span className="text-base font-normal text-gray-700">%</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <CircularProgress
            completedDays={challenge.certificationCount}
            totalDays={challenge.totalChallengeDays}
            iconName={challenge.challengeIcon as IconName}
            size={60}
            strokeWidth={10}
            showPercentage={false}
          />
        </div>
      </div>
    </div>
  );
}
