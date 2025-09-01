import TopNavBar from "@/components/Navbar/TopNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import WeeklyCalendar from "@/components/features/home/WeeklyCalendar";

export default function Home() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const formattedDate = `${month}월 ${date}일`;

  return (
    <>
      <TopNavBar title={formattedDate} />
      <WeeklyCalendar />
      <BottomNavBar />
    </>
  );
}
