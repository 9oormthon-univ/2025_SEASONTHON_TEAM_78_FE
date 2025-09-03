import TopNavBar from "@/components/Navbar/TopNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";

function MyPage() {
  return (
    <div className="w-full max-w-[480px] mx-auto">
      <TopNavBar title="마이" />
      <BottomNavBar />
    </div>
  );
}

export default MyPage;
