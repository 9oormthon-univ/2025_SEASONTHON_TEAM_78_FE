import { useState } from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import ChallengeToggle from "./ChallengeToggle";
import ChallengeList from "./ChallengeList";
import CertifiedChallenge from "./CertifiedChallenge";
import {
  getNotCertifiedChallenges,
  getCertifiedChallenges,
} from "@/lib/api/challenges";
import { useQuery } from "@tanstack/react-query";
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

  // 사용할 날짜: 한국 시간대 고려하여 YYYY-MM-DD 형식으로 변환
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const dateToUse = formatDate(selectedDate);

  // 미인증 챌린지 조회
  const {
    data: activeChallenges,
    isLoading: activeLoading,
    isError: activeError,
  } = useQuery({
    queryKey: ["notCertifiedChallenges", dateToUse],
    queryFn: () => getNotCertifiedChallenges({ date: dateToUse }),
  });

  // 인증 완료 챌린지 조회
  const {
    data: certifiedChallenges,
    isLoading: certifiedLoading,
    isError: certifiedError,
  } = useQuery({
    queryKey: ["certifiedChallenges", dateToUse],
    queryFn: () => getCertifiedChallenges({ date: dateToUse }),
    enabled: tab === "done",
  });

  const isLoading = activeLoading || certifiedLoading;
  const isError = activeError || certifiedError;
  const isCertifiedError = tab === "done" && certifiedError;

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
            weeklyData={activeChallenges}
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
            weeklyData={activeChallenges}
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
          weeklyData={activeChallenges}
        />
        <ChallengeToggle value={tab} onChange={handleTabChange} />
      </div>
      <div className="flex-1 overflow-hidden">
        {tab === "pending" ? (
          <ChallengeList challenges={activeChallenges?.challenges || []} />
        ) : (
          <CertifiedChallenge
            challenges={certifiedChallenges?.challenges || []}
          />
        )}
      </div>
    </div>
  );
}
