import TopNavBar from "@/components/Navbar/TopNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import Icon from "@/components/Icon/ChallengeIcon";

export default function Collection() {
  return (
    <>
      <TopNavBar title="컬렉션" />

      {/* 아이콘 테스트용 */}
      <div className="p-4">
        <Icon name="book" variant="color" size={40} alt="책 아이콘" />
      </div>

      <BottomNavBar />
    </>
  );
}
