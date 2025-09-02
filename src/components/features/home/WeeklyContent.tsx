import { useMemo, useState } from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import ChallengeToggle from "./ChallengeToggle";
import ChallengeList from "./ChallengeList";
import CreateChallengeButton from "./CreateChallengeButton";

interface WeeklyContentProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

type Tab = "pending" | "done";

type Challenge = {
  id: string;
  title: string;
};

export default function WeeklyContent({
  selectedDate,
  onDateSelect,
}: WeeklyContentProps) {
  const [tab, setTab] = useState<Tab>("pending");

  // 날짜에 따라 샘플 데이터 변화
  const { pending, done } = useMemo(() => {
    const day = selectedDate.getDate();
    const mod = day % 3;

    // TODO: 실제 챌린지들로 받아오기
    const basePending: Challenge[] = [
      { id: "p1", title: "물 8잔 마시기" },
      { id: "p2", title: "산책 20분" },
      { id: "p2", title: "산책 20분" },
      { id: "p2", title: "산책 20분" },
      { id: "p2", title: "산책 20분" },
      { id: "p2", title: "산책 20분" },
      { id: "p2", title: "산책 20분" },
      { id: "p2", title: "산책 20분" },
      { id: "p2", title: "산책 20분" },
      { id: "p2", title: "산책 20분" },
      { id: "p2", title: "산책 20분" },
      { id: "p2", title: "산책 20분" },
      { id: "p2", title: "산책 20분" },
      { id: "p2", title: "산책 20분" },
    ];
    const baseDone: Challenge[] = [
      {
        id: "d1",
        title: "아침 스트레칭",
      },
      { id: "d2", title: "영어 단어 20개" },
    ];

    if (mod === 0) return { pending: basePending, done: baseDone };
    if (mod === 1) return { pending: basePending.slice(0, 1), done: [] };
    return { pending: [], done: baseDone.slice(0, 1) };
  }, [selectedDate]);

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
