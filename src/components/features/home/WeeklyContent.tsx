import { useMemo, useState, useEffect } from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import ChallengeToggle from "./ChallengeToggle";
import ChallengeList from "./ChallengeList";
import { type IconName } from "@/components/Icon/challenge-color";

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
  duration: number;
  createdAt: string;
  status: "pending" | "done" | "stopped";
  stoppedAt?: string;
};

export default function WeeklyContent({
  selectedDate,
  onDateSelect,
}: WeeklyContentProps) {
  const [tab, setTab] = useState<Tab>("pending");
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // 로컬 스토리지에서 챌린지 데이터 로드
  useEffect(() => {
    const storedChallenges = JSON.parse(
      localStorage.getItem("challenges") || "[]"
    );
    setChallenges(storedChallenges);
  }, []);

  // 페이지 포커스 시 데이터 새로고침 (챌린지 등록 후 돌아올 때)
  useEffect(() => {
    const handleFocus = () => {
      const storedChallenges = JSON.parse(
        localStorage.getItem("challenges") || "[]"
      );
      setChallenges(storedChallenges);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // 선택된 날짜에 해당하는 챌린지 필터링
  const { pending, done } = useMemo(() => {
    const selectedDateStr = selectedDate.toDateString();

    const dayChallenges = challenges.filter((challenge) => {
      const challengeDate = new Date(challenge.createdAt).toDateString();
      return challengeDate === selectedDateStr;
    });

    // pending: 진행 중인 챌린지 (pending 상태)
    const pendingChallenges = dayChallenges.filter(
      (c) => c.status === "pending"
    );

    // done: 완료되거나 중단된 챌린지 (done 또는 stopped 상태)
    const doneChallenges = dayChallenges.filter(
      (c) => c.status === "done" || c.status === "stopped"
    );

    return {
      pending: pendingChallenges,
      done: doneChallenges,
    };
  }, [challenges, selectedDate]);

  const bothEmpty = pending.length === 0 && done.length === 0;
  const currentChallenges = tab === "pending" ? pending : done;

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-shrink-0">
        <WeeklyCalendar
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
        />
        <ChallengeToggle value={tab} onChange={setTab} />
      </div>
      <div className="flex-1 overflow-hidden">
        {bothEmpty ? (
          <ChallengeList tab={tab} challenges={[]} />
        ) : (
          <ChallengeList tab={tab} challenges={currentChallenges} />
        )}
      </div>
    </div>
  );
}
