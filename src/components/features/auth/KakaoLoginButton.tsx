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
    <div
      className="fixed left-1/2 -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom)+16px)] 
  w-[clamp(320px,calc(100vw),478px)] px-6"
    >
      <button
        onClick={onClick}
        disabled={loading}
        className={`relative z-10 w-full h-[65px] p-3 rounded-full
           bg-[#FEE500]
           text-black font-semibold hover:shadow-lg transition-all duration-200
           disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <div className="flex items-center justify-center gap-3">
          <img
            src="/images/bubble-icon.webp"
            alt="카카오 로그인 버튼"
            className="w-5 h-5"
          />
          {loading ? "로그인 중…" : "카카오로 로그인하기"}
        </div>
      </button>
    </div>
  );
}
