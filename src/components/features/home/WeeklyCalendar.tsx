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

  // Mock 데이터
  const getCompletedDates = () => {
    const completedDates = new Set<string>();
    const today = new Date();

    // 오늘부터 3일 전까지 완료된 것으로 설정 (예시)
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      completedDates.add(date.toDateString());
    }

    return completedDates;
  };

  const completedDates = getCompletedDates();

  return (
    <div
      className={`flex flex-col items-center justify-center px-8 py-5 ${className}`}
    >
      <div className="w-full flex flex-row gap-2">
        {weekDates.map((date, i) => {
          const isToday = isSameDay(date, today);
          const isCurrentMonth = date.getMonth() === today.getMonth();
          const isSelected = isSameDay(date, selectedDate);
          const isCompleted = completedDates.has(date.toDateString());
          const day = weekDays[i];

          return (
            <div
              key={`${date.toDateString()}-${i}`}
              className="w-full flex justify-center"
            >
              <button
                type="button"
                onClick={() => onDateSelect(date)}
                className={`flex flex-col items-center justify-center rounded-full h-20 min-w-9 gap-1
                    transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-300 ${
                      isSelected
                        ? "bg-gray-800 text-white shadow"
                        : isToday
                          ? "ring-1 ring-gray-800"
                          : isCurrentMonth
                            ? "text-gray-800 hover:bg-gray-100"
                            : "text-gray-400"
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
                {isCompleted && (
                  <div className="flex flex-col items-center justify-center">
                    {/* 위쪽 별 */}
                    <svg
                      className={`w-2 h-2 ${isSelected ? "text-yellow-300" : "text-yellow-500"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {/* 아래쪽 두 별 */}
                    <div className="flex items-center justify-center gap-1">
                      <svg
                        className={`w-2 h-2 ${isSelected ? "text-yellow-300" : "text-yellow-500"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        className={`w-2 h-2 ${isSelected ? "text-yellow-300" : "text-yellow-500"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
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
