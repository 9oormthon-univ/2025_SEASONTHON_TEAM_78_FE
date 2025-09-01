import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import KakaoLoginButton from "@/components/features/auth/KakaoLoginButton";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const qc = useQueryClient();
  const from = (location.state as Record<string, any>)?.from?.pathname || "/";

  const handleSuccess = async (at: string) => {
    console.log("[login] accessToken:", at);

    await qc.invalidateQueries({ queryKey: ["me"] });
    navigate(from, { replace: true });
  };

  return (
    <div
      className={
        "flex flex-col min-h-dvh gap-10 p-10 items-center justify-center"
      }
    >
      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="text-5xl font-vitro-core">Minimo</h1>
        <p className="text-2xl font-semibold">미니모에 오신 걸 환영해요!</p>
      </div>
      <img
        src="public/images/temp-img.webp"
        alt="미니모 환영 이미지"
        className="my-4 w-48"
      />
      <KakaoLoginButton onSuccess={handleSuccess} />
    </div>
  );
}
