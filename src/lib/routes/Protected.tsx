import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useMe } from "@/hooks/useMe";

export default function Protected() {
  const { data, isLoading, isSuccess } = useMe();
  const location = useLocation();

  if (isLoading) return <div className="p-6">로딩 중…</div>;
  if (isSuccess && data) return <Outlet />;

  return <Navigate to="/login" replace state={{ from: location }} />;
}
