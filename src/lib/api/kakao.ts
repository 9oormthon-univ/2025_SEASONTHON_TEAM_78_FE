declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao?: any;
  }
}

/** head에 스크립트 태그가 없다면 동적으로 로드 */
function loadKakaoSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Kakao) return resolve();

    const existed = document.querySelector(
      'script[src*="kakao.min.js"]',
    ) as HTMLScriptElement | null;
    if (existed) {
      existed.addEventListener("load", () => resolve());
      existed.addEventListener("error", () =>
        reject(new Error("Kakao SDK load error")),
      );
      return;
    }

    const s = document.createElement("script");
    s.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Kakao SDK load error"));
    document.head.appendChild(s);
  });
}

/** SDK가 로드되고 init까지 된 상태를 보장 */
export async function ensureKakaoReady() {
  await loadKakaoSdk();

  if (!window.Kakao) throw new Error("Kakao SDK not found");

  const key = import.meta.env.VITE_KAKAO_JS_KEY;
  if (!window.Kakao.isInitialized()) {
    if (!key) throw new Error("VITE_KAKAO_JS_KEY missing");
    window.Kakao.init(key);
  }

  if (!window.Kakao.Auth) throw new Error("Kakao.Auth not ready");
}

/** 팝업 로그인 */
export async function kakaoPopupLogin(): Promise<string> {
  await ensureKakaoReady();

  return new Promise((resolve, reject) => {
    window.Kakao.Auth.login({
      scope: "profile_nickname",
      success: () => {
        const at = window.Kakao.Auth.getAccessToken();
        if (!at) return reject(new Error("Access token missing"));
        resolve(at);
      },
      fail: (err: unknown) => reject(err),
    });
  });
}

/** 프로필 조회 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchKakaoMe(): Promise<any> {
  await ensureKakaoReady();
  return new Promise((resolve, reject) => {
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: resolve,
      fail: reject,
    });
  });
}

/** 로그아웃 (토큰만 해제) */
export async function kakaoLogout(): Promise<void> {
  await ensureKakaoReady();
  return new Promise((resolve) => {
    window.Kakao.Auth.logout(() => resolve());
  });
}
