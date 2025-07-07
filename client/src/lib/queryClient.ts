import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const headers: Record<string, string> = {};
  
  if (data) {
    headers["Content-Type"] = "application/json";
  }
  
  // Add admin token for authentication if available
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) {
    headers["Authorization"] = `Bearer ${adminToken}`;
  }

  // Use Netlify functions in production
  const baseUrl = import.meta.env.DEV ? '' : 'https://noshedding.netlify.app/.netlify/functions/supabase-test';
  const fullUrl = import.meta.env.DEV ? url : `${baseUrl}${url}`;
  
  const res = await fetch(fullUrl, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const headers: Record<string, string> = {};
    
    // Add admin token for authentication if available
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      headers["Authorization"] = `Bearer ${adminToken}`;
    }

    // Use Netlify functions in production
  const baseUrl = import.meta.env.DEV ? '' : 'https://noshedding.netlify.app/.netlify/functions/supabase-test';
  const url = queryKey[0] as string;
  const fullUrl = import.meta.env.DEV ? url : `${baseUrl}${url}`;
  
  const res = await fetch(fullUrl, {
      credentials: "include",
      headers,
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
