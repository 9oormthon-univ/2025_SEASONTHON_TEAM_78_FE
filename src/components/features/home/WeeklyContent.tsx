import { useMemo, useState, useEffect } from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import ChallengeToggle from "./ChallengeToggle";
import ChallengeList from "./ChallengeList";
import CreateChallengeButton from "./CreateChallengeButton";

interface WeeklyContentProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

type Tab = "pending" | "done";

type IconName =
  | "ball"
  | "book"
  | "broom"
  | "bus"
  | "edit"
  | "water"
  | "music"
  | "alarm";

type Challenge = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  duration: number;
  createdAt: string;
  status: "pending" | "done";
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

    const pendingChallenges = dayChallenges.filter(
      (c) => c.status === "pending"
    );
    const doneChallenges = dayChallenges.filter((c) => c.status === "done");

    return {
      pending: pendingChallenges,
      done: doneChallenges,
    };
  }, [challenges, selectedDate]);

  const bothEmpty = pending.length === 0 && done.length === 0;
  const currentChallenges = tab === "pending" ? pending : done;

  return (
    <div className="flex flex-col h-full">
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
      <div className="relative">
        <CreateChallengeButton />
      </div>
    </div>
  );
}
