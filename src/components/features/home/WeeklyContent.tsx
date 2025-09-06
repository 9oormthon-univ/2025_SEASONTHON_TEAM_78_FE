import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import WeeklyCalendar from "./WeeklyCalendar";
import ChallengeToggle from "./ChallengeToggle";
import ChallengeList from "./ChallengeList";
import CertifiedChallenge from "./CertifiedChallenge";
import { type IconName } from "@/components/Icon/challenge-color";
import {
  getActiveChallenge,
  getCertifiedChallenges,
} from "@/lib/api/challenges";
import { useQuery } from "@tanstack/react-query";

interface WeeklyContentProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

type Tab = "pending" | "done";

type Challenge = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  remainingDays: number;
  achievementRate: number;
  status: "pending" | "done" | "stopped";
};

export default function WeeklyContent({
  selectedDate,
  onDateSelect,
}: WeeklyContentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 탭과 날짜 파라미터 읽기
  const urlTab = (searchParams.get("tab") as Tab) || "pending";
  const urlDate = searchParams.get("date");

  const [tab, setTab] = useState<Tab>(urlTab);

  // 사용할 날짜 결정: URL에 날짜가 있으면 그것을 사용, 없으면 selectedDate 사용
  const dateToUse = urlDate || selectedDate.toISOString().split("T")[0];

  // 활성 챌린지 조회
  const {
    data: activeChallenges,
    isLoading: activeLoading,
    isError: activeError,
  } = useQuery({
    queryKey: ["activeChallenge"],
    queryFn: getActiveChallenge,
  });

  // 인증 완료 챌린지 조회
  const {
    data: certifiedChallenges,
    isLoading: certifiedLoading,
    isError: certifiedError,
  } = useQuery({
    queryKey: ["certifiedChallenges", dateToUse],
    queryFn: () => getCertifiedChallenges(dateToUse),
    enabled: tab === "done", // done 탭일 때만 호출
  });

  const hasActiveChallenge = activeChallenges && activeChallenges.length > 0;
  const hasCertifiedChallenge =
    certifiedChallenges && certifiedChallenges.length > 0;
  const isLoading = activeLoading || certifiedLoading;
  const isError = activeError || certifiedError;
  const isCertifiedError = tab === "done" && certifiedError;

  // 챌린지 데이터를 기존 형식으로 변환
  const challenges: Challenge[] = useMemo(() => {
    if (tab === "pending" && hasActiveChallenge) {
      // 인증할 챌린지 (활성 챌린지)
      return activeChallenges.map((activeChallenge) => ({
        id: activeChallenge.id.toString(),
        title: activeChallenge.title,
        description: `남은 일수: ${activeChallenge.remainingDays}일 | 진행률: ${activeChallenge.achievementRate}%`,
        icon: activeChallenge.challengeIcon as IconName,
        remainingDays: activeChallenge.remainingDays,
        achievementRate: activeChallenge.achievementRate,
        status: "pending" as const,
      }));
    } else if (tab === "done" && hasCertifiedChallenge) {
      // 인증 완료 챌린지
      return certifiedChallenges.map((certifiedChallenge) => ({
        id: certifiedChallenge.id.toString(),
        title: certifiedChallenge.title,
        description: `남은 일수: ${certifiedChallenge.remainingDays}일 | 진행률: ${certifiedChallenge.achievementRate}%`,
        icon: certifiedChallenge.challengeIcon as IconName,
        remainingDays: certifiedChallenge.remainingDays,
        achievementRate: certifiedChallenge.achievementRate,
        status: "done" as const,
      }));
    }
    return [];
  }, [
    tab,
    hasActiveChallenge,
    hasCertifiedChallenge,
    activeChallenges,
    certifiedChallenges,
  ]);

  const currentChallenges = challenges;

  // URL 파라미터 변경 감지
  useEffect(() => {
    if (urlTab !== tab) {
      setTab(urlTab);
    }
  }, [urlTab, tab]);

  // 탭 변경 핸들러
  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("tab", newTab);

    if (newTab === "done") {
      // 인증 완료 탭일 때는 현재 사용할 날짜를 URL에 추가
      newSearchParams.set("date", dateToUse);
    } else {
      // 인증할 챌린지 탭일 때는 날짜 파라미터 제거
      newSearchParams.delete("date");
    }

    setSearchParams(newSearchParams);
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
          <ChallengeList challenges={currentChallenges} />
        ) : (
          <CertifiedChallenge challenges={certifiedChallenges || []} />
        )}
      </div>
    </div>
  );
}
