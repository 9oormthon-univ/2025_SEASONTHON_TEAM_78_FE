import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useMe } from "@/hooks/useMe";

export default function Protected() {
  const { data, isLoading, isError } = useMe();
  const location = useLocation();

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 인증된 사용자
  if (data && !isError) {
    return <Outlet />;
  }

  // 인증되지 않은 사용자 - 로그인 페이지로 리다이렉트
  return <Navigate to="/login" replace state={{ from: location }} />;
}
