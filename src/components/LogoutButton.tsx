import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { kakaoLogout } from "@/lib/api/kakao.ts";

export default function LogoutButton() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await kakaoLogout();

      // React Query 캐시 초기화
      qc.removeQueries({ queryKey: ["me"] });

      // 로그인 페이지로 바로 이동
      navigate("/login", { replace: true });
    } catch (e) {
      console.error("[logout error]", e);
    }
  };

  return (
    <button onClick={handleLogout} className="px-3 py-2 rounded bg-gray-200">
      로그아웃
    </button>
  );
}
