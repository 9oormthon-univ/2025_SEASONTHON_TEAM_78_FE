import { useState, useEffect } from "react";
import { type IconName, ICON_COLORS } from "@/components/Icon/challenge-color";

type Challenge = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  duration: number;
  createdAt: string;
  status: "pending" | "done";
};

interface WeeklyCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  className?: string;
}

export default function WeeklyCalendar({
  selectedDate,
  onDateSelect,
  className = "",
}: WeeklyCalendarProps) {
  const today = new Date();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // 로컬 스토리지에서 챌린지 데이터 로드
  useEffect(() => {
    const storedChallenges = JSON.parse(
      localStorage.getItem("challenges") || "[]"
    );
    setChallenges(storedChallenges);
  }, []);

  // 페이지 포커스 시 데이터 새로고침
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

  // 주간 캘린더 데이터 생성
  const getWeekDates = () => {
    const weekDates = [] as Date[];
    const currentDate = new Date(today);

    // 이번 주 일요일로 이동
    const dayOfWeek = currentDate.getDay();
    currentDate.setDate(currentDate.getDate() - dayOfWeek);

    // 일주일 날짜 생성
    for (let i = 0; i < 7; i++) {
      weekDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekDates;
  };

  const weekDates = getWeekDates();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isSameDay = (a?: Date | null, b?: Date | null) => {
    if (!a || !b) return false;
    return a.toDateString() === b.toDateString();
  };

  // 특정 날짜의 완료된 챌린지 아이콘들 가져오기 (최대 3개)
  const getCompletedChallengeIcons = (date: Date) => {
    const dateStr = date.toDateString();
    const dayChallenges = challenges.filter((challenge) => {
      const challengeDate = new Date(challenge.createdAt).toDateString();
      return challengeDate === dateStr && challenge.status === "done";
    });

    // 최대 3개까지 아이콘 반환
    return dayChallenges.slice(0, 3).map((challenge) => challenge.icon);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center px-8 py-3 mb-4 bg-white rounded-b-3xl ${className}`}
    >
      <div className="w-full flex flex-row gap-2">
        {weekDates.map((date, i) => {
          const isToday = isSameDay(date, today);
          const isCurrentMonth = date.getMonth() === today.getMonth();
          const isSelected = isSameDay(date, selectedDate);
          const completedIcons = getCompletedChallengeIcons(date);
          const day = weekDays[i];

          return (
            <div
              key={`${date.toDateString()}-${i}`}
              className="w-full flex justify-center"
            >
              <button
                type="button"
                onClick={() => onDateSelect(date)}
                className={`flex flex-col items-center justify-start rounded-full h-20 min-w-9 gap-1 pt-2.5
                    transition-all duration-200 focus:outline-none ${
                      isSelected
                        ? "bg-stone-800 text-white shadow"
                        : completedIcons.length > 0
                          ? "bg-gradient-to-b from-[#F4F7FB] to-[#CBE2FF]"
                          : isToday
                            ? "ring-1 ring-gray-800 hover:bg-blue-50"
                            : isCurrentMonth
                              ? "text-gray-800 hover:bg-blue-50"
                              : "text-gray-400 hover:bg-blue-50"
                    }`}
              >
                <span
                  className={`text-xs font-medium ${isSelected ? "text-white/90" : ""}`}
                >
                  {day}
                </span>
                <span className="text-sm font-semibold leading-tight">
                  {date.getDate()}
                </span>
                {completedIcons.length > 0 && (
                  <div className="flex flex-col items-center justify-center">
                    {/* 위쪽 아이콘 (1개) */}
                    {completedIcons[0] && (
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${ICON_COLORS[completedIcons[0]]} ${
                          isSelected ? "opacity-80" : ""
                        } shadow-sm`}
                      />
                    )}
                    {/* 아래쪽 아이콘들 (최대 2개) */}
                    {completedIcons.length > 1 && (
                      <div className="flex items-center justify-center gap-0.25">
                        {completedIcons.slice(1, 3).map((icon, index) => (
                          <div
                            key={index}
                            className={`w-2.5 h-2.5 rounded-full ${ICON_COLORS[icon]} ${
                              isSelected ? "opacity-80" : ""
                            } shadow-sm`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
