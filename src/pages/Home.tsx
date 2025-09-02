import { useState } from "react";
import TopNavBar from "@/components/Navbar/TopNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import WeeklyContent from "@/components/features/home/WeeklyContent";
import CreateChallengeButton from "@/components/features/home/CreateChallengeButton";

export default function Home() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const formattedDate = `${month}월 ${date}일`;

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  return (
    <>
      <TopNavBar title={formattedDate} />
      <WeeklyContent
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
      <CreateChallengeButton />
      <BottomNavBar />
    </>
  );
}
