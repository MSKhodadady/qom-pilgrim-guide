"use client";

import { clearAuthToken, getAuthToken } from "./auth";

export async function fetchWrap<T extends { status: number }>(
  fn: (init?: RequestInit) => Promise<T>,
  init?: RequestInit,
) {
  const token = getAuthToken();
  if (!token) {
    window.location.href = "/admin/login";
    return null;
  }

  const passedInit: RequestInit = {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...init?.headers },
  };

  const res = await fn(passedInit);

  if (res.status == 401) {
    clearAuthToken();
    window.location.href = "/admin/login";
    return null;
  }

  return res;
}
