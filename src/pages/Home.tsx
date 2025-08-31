import { useMe } from "@/hooks/useMe";
import LogoutButton from "@/components/LogoutButton";

export default function Home() {
  const { data } = useMe();

  const nickname = data?.properties?.nickname ?? "";

  return (
    <div className="p-6 space-y-3">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">대시보드</h1>
        <LogoutButton />
      </div>
      <p className="text-xl font-semibold text-center">
        {nickname ? `반가워요 ${nickname}님!` : "반갑습니다."} <br />
        사용하실 프로필을 골라주세요.
      </p>
    </div>
  );
}
