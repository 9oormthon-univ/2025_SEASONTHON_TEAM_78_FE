import { useState } from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import ChallengeToggle from "./ChallengeToggle";
import ChallengeList from "./ChallengeList";
import CertifiedChallenge from "./CertifiedChallenge";
interface WeeklyContentProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

type Tab = "pending" | "done";

export default function WeeklyContent({
  selectedDate,
  onDateSelect,
}: WeeklyContentProps) {
  const [tab, setTab] = useState<Tab>("pending");

  // 임시 데이터
  const activeChallenges = [
    {
      id: 1,
      title: "매일 물 마시기",
      challengeIcon: "water",
      achievementRate: 80,
      remainingDays: 5,
    },
    {
      id: 2,
      title: "매일 운동하기",
      challengeIcon: "run",
      achievementRate: 60,
      remainingDays: 10,
    },
  ];

  const certifiedChallenges = [
    {
      id: 3,
      title: "매일 독서하기",
      challengeIcon: "book",
      achievementRate: 100,
      remainingDays: 0,
    },
    {
      id: 4,
      title: "매일 정리하기",
      challengeIcon: "broom",
      achievementRate: 90,
      remainingDays: 0,
    },
  ];

  const isLoading = false;
  const isError = false;
  const isCertifiedError = false;

  // 탭 변경 핸들러
  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-gray-100">
        <div className="flex-shrink-0">
          <WeeklyCalendar
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
          />
          <ChallengeToggle value={tab} onChange={handleTabChange} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">챌린지 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (isError) {
    return (
      <div className="flex flex-col h-full bg-gray-100">
        <div className="flex-shrink-0">
          <WeeklyCalendar
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
          />
          <ChallengeToggle value={tab} onChange={handleTabChange} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500 text-center">
            <div>챌린지 정보를 불러올 수 없습니다.</div>
            {isCertifiedError && (
              <div className="text-sm mt-2 text-gray-500">
                인증 완료 챌린지 조회 중 오류가 발생했습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-shrink-0">
        <WeeklyCalendar
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
        />
        <ChallengeToggle value={tab} onChange={handleTabChange} />
      </div>
      <div className="flex-1 overflow-hidden">
        {tab === "pending" ? (
          <ChallengeList challenges={activeChallenges || []} />
        ) : (
          <CertifiedChallenge challenges={certifiedChallenges || []} />
        )}
      </div>
    </div>
  );
}
