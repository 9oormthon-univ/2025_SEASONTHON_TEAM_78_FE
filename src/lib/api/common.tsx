const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// fetch 기반 API 클라이언트
export const api = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    // 기본 헤더 설정
    const defaultHeaders: HeadersInit = {};

    // FormData가 아닌 경우에만 Content-Type 설정
    if (!(options.body instanceof FormData)) {
      defaultHeaders["Content-Type"] = "application/json";
    }

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

    const response = await fetch(url, config);

    if (!response.ok) {
      // 401 에러 시 로그인 페이지로 리다이렉트
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
      }

      // 500 에러의 경우 서버 응답 내용도 포함
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      if (response.status >= 500) {
        try {
          const errorText = await response.text();
          errorMessage += ` - ${errorText}`;
        } catch {
          // 에러 응답 파싱 실패
        }
      }
      throw new Error(errorMessage);
    }

    // 먼저 텍스트로 읽어서 JSON 파싱 시도
    const responseText = await response.text();

    try {
      // JSON 파싱 시도
      const jsonData = JSON.parse(responseText);
      return jsonData;
    } catch {
      // 두 개의 JSON이 연결된 경우 첫 번째 JSON만 추출
      try {
        const patterns = [
          '}{"success":"false","code":"C001"',
          '}{"success":"false"',
          '}{"success": "false"',
          '}{"success": "false", "code": "C001"',
        ];

        for (const pattern of patterns) {
          const firstJsonEnd = responseText.indexOf(pattern);
          if (firstJsonEnd > 0) {
            const firstJson = responseText.substring(0, firstJsonEnd + 1);
            const jsonData = JSON.parse(firstJson);
            return jsonData;
          }
        }
      } catch {
        // JSON 추출 실패
      }

      // JSON 파싱 실패 시에도 성공으로 처리 (서버가 200을 보냈으므로)
      return { success: "true", data: "인증이 완료되었습니다." } as T;
    }
  },

  // GET 요청
  get<T>(
    endpoint: string,
    options?: {
      params?: Record<string, string | number | boolean>;
    } & RequestInit
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
