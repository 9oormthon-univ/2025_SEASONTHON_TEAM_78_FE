// src/components/KakaoLoginButton.tsx
import { useState, useEffect } from "react";
import { useInvalidateMe } from "@/hooks/useMe";
import { initKakao, kakaoPopupLogin } from "@/lib/api/kakao.ts";

export default function KakaoLoginButton() {
  const [loading, setLoading] = useState(false);
  const invalidateMe = useInvalidateMe();

  useEffect(() => {
    initKakao();
  }, []);

  const onClick = async () => {
    try {
      setLoading(true);
      await kakaoPopupLogin();
      await invalidateMe(); // me 다시 조회
    } catch (e) {
      alert("카카오 로그인 실패");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-4 py-2 rounded bg-yellow-400 text-black"
    >
      {loading ? "로그인 중…" : "카카오로 로그인(프론트 테스트)"}
    </button>
  );
}
