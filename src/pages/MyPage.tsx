import { Link } from "react-router-dom";
import TopNavBar from "@/components/Navbar/TopNavBar";
import BottomNavBar from "@/components/Navbar/BottomNavBar";
import LogoutButton from "@/components/features/auth/LogoutButton";
import { useMe } from "@/hooks/useMe";

function Divider() {
  return <hr className="w-full border-t border-[#E7EAED]" />;
}

const STICKER_SRC: Record<string, string> = {
  "emoji-1": "/images/emoji-wow.webp",
  "emoji-2": "/images/emoji-cool.webp",
  "emoji-3": "/images/emoji-heart.webp",
};

const isStickerId = (v?: string | null) =>
  typeof v === "string" && /^emoji-\d+$/.test(v);

function resolveAvatarSrc(picture?: string | null) {
  if (isStickerId(picture))
    return STICKER_SRC[picture as keyof typeof STICKER_SRC];
  if (typeof picture === "string" && picture.length > 0) return picture;
  return "/images/emoji-cool.webp"; // fallback
}

function MyPage() {
  const { data: me, isLoading, error } = useMe();

  if (isLoading) {
    return (
      <>
        <TopNavBar title="마이" />
        <div className="flex items-center justify-center h-screen">
          <p>불러오는 중...</p>
        </div>
        <BottomNavBar />
      </>
    );
  }

  if (error || !me) {
    return (
      <>
        <TopNavBar title="마이" />
        <div className="flex items-center justify-center h-screen">
          <p>내 정보를 불러오지 못했습니다.</p>
        </div>
        <BottomNavBar />
      </>
    );
  }

  const avatarSrc = resolveAvatarSrc(me.picture);

  return (
    <>
      <TopNavBar title="마이" />

      <div className="flex flex-col gap-6 p-4">
        {/* 프로필 영역 */}
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#DAD9D1] bg-white">
            <img
              src={avatarSrc}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <p className="text-lg font-bold text-black">{me.nickname}</p>
        </div>

        <Divider />

        {/* 내 챌린지 */}
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

        {/* 내 정보 */}
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

        {/* 로그아웃 */}
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
