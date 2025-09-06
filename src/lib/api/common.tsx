const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API 요청 오류:", error);
      throw error;
    }
  },

  // GET 요청
  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
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
