import { ApiResponse } from "./types";

export async function apiClient<T>(
    path: string,
    options?: RequestInit
  ): Promise<T> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  
    const json: ApiResponse<T> = await res.json().catch(() => ({}));
  
    if (!res.ok) {
      throw new Error(json?.errorMessage ?? "Request failed");
    }
  
    return json.data;
}