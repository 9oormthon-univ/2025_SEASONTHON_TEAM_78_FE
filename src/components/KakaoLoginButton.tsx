import { useState } from "react";
import { kakaoPopupLogin } from "@/lib/api/kakao.ts";

interface Props {
  onSuccess?: (accessToken: string) => void;
}

export default function KakaoLoginButton({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const at = await kakaoPopupLogin();
      if (onSuccess) onSuccess(at);
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
      className="px-4 py-2 rounded bg-primary text-black"
    >
      {loading ? "로그인 중…" : "카카오로 로그인"}
    </button>
  );
}
