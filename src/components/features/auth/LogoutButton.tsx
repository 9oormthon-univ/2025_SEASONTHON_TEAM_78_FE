import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/api/auth";

interface LogoutButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function LogoutButton({
  className,
  children,
}: LogoutButtonProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await logout();
      // 토큰 제거
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // 쿼리 캐시 초기화
      queryClient.clear();
      // 로그인 페이지로 이동
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("로그아웃 오류:", error);
      // API 오류가 있어도 로컬 상태는 정리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children}
    </button>
  );
}
