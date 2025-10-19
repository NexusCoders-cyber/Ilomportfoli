import { QueryClient } from "@tanstack/react-query";

function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("adminToken");
      if (window.location.pathname.startsWith("/admin/dashboard")) {
        window.location.href = "/admin";
      }
    }
    
    let errorMessage = `Request failed: ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

async function defaultFetcher({ queryKey }: { queryKey: [string] }) {
  const response = await fetch(queryKey[0], {
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
  });
  return handleResponse(response);
}

export async function apiRequest(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: any
) {
  const headers: HeadersInit = {
    ...getAuthHeaders(),
  };

  const options: RequestInit = {
    method,
    credentials: "include",
    headers,
  };

  if (data !== undefined) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  return handleResponse(response);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultFetcher,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
