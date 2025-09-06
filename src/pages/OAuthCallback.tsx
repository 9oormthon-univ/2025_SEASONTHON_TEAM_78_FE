import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
  const nav = useNavigate();

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const access = p.get("accessToken");
    const refresh = p.get("refreshToken");

    if (access && refresh) {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    }
    nav("/profile-select");
  }, [nav]);

  return <p>로그인 처리 중…</p>;
}
