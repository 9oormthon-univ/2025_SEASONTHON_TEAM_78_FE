interface WeeklyCalendarProps {
  className?: string;
}

export default function WeeklyCalendar({
  className = "",
}: WeeklyCalendarProps) {
  const today = new Date();

  // 주간 캘린더 데이터 생성
  const getWeekDates = () => {
    const weekDates = [];
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

  return (
    <div
      className={`flex flex-col items-center justify-center py-8 px-4 ${className}`}
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <div className="grid grid-cols-7 gap-2">
          {/* 요일 헤더 */}
          {weekDays.map((day) => (
            <div key={day} className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">
                {day}
              </div>
            </div>
          ))}

          {/* 날짜 */}
          {weekDates.map((date, index) => {
            const isToday = date.toDateString() === today.toDateString();
            const isCurrentMonth = date.getMonth() === today.getMonth();

            return (
              <div key={index} className="text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    isToday
                      ? "bg-gray-800 text-white"
                      : isCurrentMonth
                        ? "text-gray-800"
                        : "text-gray-400"
                  }`}
                >
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
