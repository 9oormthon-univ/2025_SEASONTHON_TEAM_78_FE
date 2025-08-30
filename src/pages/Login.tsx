// src/pages/Login.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { kakaoPopupLogin } from "@/lib/api/kakao.ts";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const qc = useQueryClient();
  const from = (location.state as any)?.from?.pathname || "/";

  const handleKakaoLogin = async () => {
    try {
      const at = await kakaoPopupLogin(); // SDK 준비 + 로그인까지 보장
      console.log("[login] accessToken:", at);

      await qc.invalidateQueries({ queryKey: ["me"] }); // me 최신화
      navigate(from, { replace: true }); // 홈(또는 원래 경로) 이동
    } catch (e: any) {
      console.error("[login error]", e);
      alert(e?.error_description || e?.message || "로그인 실패");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">로그인이 필요합니다</h1>
      <button
        onClick={handleKakaoLogin}
        className="px-4 py-2 rounded bg-yellow-400"
      >
        카카오로 로그인
      </button>
    </div>
  );
}
