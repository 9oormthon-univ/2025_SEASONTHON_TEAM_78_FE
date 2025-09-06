const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

function getAuthHeader() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(getAuthHeader() as Record<string, string>),
    },
  });

  if (!res.ok) {
    let detail: unknown = undefined;
    try {
      detail = await res.json();
    } catch {}
    throw new Error(
      `[${res.status}] ${res.statusText} ${detail ? JSON.stringify(detail) : ""}`
    );
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
