import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import KakaoLoginButton from "@/components/KakaoLoginButton";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const qc = useQueryClient();
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSuccess = async (at: string) => {
    console.log("[login] accessToken:", at);

    await qc.invalidateQueries({ queryKey: ["me"] });
    navigate(from, { replace: true });
  };

  return (
    <div className={"flex flex-col p-10 gap-5 items-center justify-center"}>
      <h1 className="text-2xl  font-vitro-core">Minimo</h1>
      <p className="text-xl font-semi">미니모에 오신 걸 환영해요!</p>
      <KakaoLoginButton onSuccess={handleSuccess} />
    </div>
  );
}
