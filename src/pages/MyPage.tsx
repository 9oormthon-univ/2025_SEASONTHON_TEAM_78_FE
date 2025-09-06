import { Link } from "react-router-dom";
import TopNavBar from "@/components/Navbar/TopNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import LogoutButton from "@/components/features/auth/LogoutButton";

/* interface MyPageProps {
  userName: string; //카톡 이름
  avatarUrl: string; //프로필 사진 선택
}
 */

function Divider() {
  return <hr className="w-full border-t border-[#E7EAED]" />;
}

function MyPage() {
  //api 연결전 하드코딩
  const userName = "미르미";
  const avatarUrl = "/images/cat1.webp";
  return (
    <>
      <TopNavBar title="마이" />

      <div className="flex flex-col gap-6 p-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#DAD9D1] bg-white">
            <img
              src={avatarUrl}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <p className="text-lg font-bold text-black">{userName}</p>
        </div>

        <Divider />

        <section className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-left text-black">
            내 챌린지
          </p>
          <Link
            to="/my/ongoing"
            className="block py-3 text-base font-medium text-black"
          >
            현재 진행중인 챌린지
          </Link>
          <Link
            to="/my/incomplete"
            className="block py-3 text-base font-medium text-black"
          >
            미달성 챌린지
          </Link>
        </section>

        <Divider />

        <section className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-left text-black">내 정보</p>
          <Link
            to="/my/profile"
            className="block py-3 text-base font-medium text-black"
          >
            회원 정보 수정
          </Link>
        </section>

        <Divider />

        <section className="flex flex-col gap-2">
          <LogoutButton className="block py-3 text-base font-medium text-left">
            로그아웃
          </LogoutButton>
        </section>
      </div>

      <BottomNavBar />
    </>
  );
}

export default MyPage;
