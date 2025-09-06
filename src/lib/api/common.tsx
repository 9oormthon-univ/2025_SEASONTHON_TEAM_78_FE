const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 토큰 재발급 함수
const refreshTokens = async (): Promise<boolean> => {
  try {
    const { refreshToken } = await import("./auth");
    const newTokens = await refreshToken();

    // 새로운 토큰을 localStorage에 저장
    localStorage.setItem("accessToken", newTokens.accessToken);
    localStorage.setItem("refreshToken", newTokens.refreshToken);

    return true;
  } catch (error) {
    // 토큰 재발급 실패 시 로그인 페이지로 리다이렉트
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    return false;
  }
};

// fetch 기반 API 클라이언트
export const api = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    // 기본 헤더 설정
    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    // 토큰이 있으면 Authorization 헤더 추가
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      defaultHeaders.Authorization = `Bearer ${accessToken}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // 401 에러이고 토큰이 있는 경우 토큰 재발급 시도
        if (response.status === 401 && localStorage.getItem("accessToken")) {
          const refreshSuccess = await refreshTokens();

          if (refreshSuccess) {
            // 토큰 재발급 성공 시 원래 요청 재시도
            const newAccessToken = localStorage.getItem("accessToken");
            const newConfig = {
              ...config,
              headers: {
                ...config.headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            };

            const retryResponse = await fetch(url, newConfig);
            if (!retryResponse.ok) {
              throw new Error(
                `HTTP ${retryResponse.status}: ${retryResponse.statusText}`
              );
            }
            return await retryResponse.json();
          }
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // GET 요청
  get<T>(
    endpoint: string,
    options?: { params?: Record<string, any> } & RequestInit
  ): Promise<T> {
    let url = endpoint;

    // params가 있으면 쿼리 스트링으로 변환
    if (options?.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const { params, ...restOptions } = options || {};
    return this.request<T>(url, { ...restOptions, method: "GET" });
  },

  // POST 요청
  post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // PUT 요청
  put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // PATCH 요청
  patch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // DELETE 요청
  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  },
};
