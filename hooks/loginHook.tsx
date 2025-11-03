// src/hooks/useLocalAuth.ts
"use client";
import { useEffect, useState, useCallback } from "react";

export const LS_EMAIL_KEY = "demo_email";
const EVT = "auth:changed";

function emitAuthChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(EVT));
}

export function useLocalAuth() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const read = () => setEmail(localStorage.getItem(LS_EMAIL_KEY));
    read();
    setLoading(false);

    const onStorage = (e: StorageEvent) => { if (e.key === LS_EMAIL_KEY) read(); };
    const onCustom = () => read();
    const onFocus = () => read();

    window.addEventListener("storage", onStorage);
    window.addEventListener(EVT, onCustom);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVT, onCustom);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, []);

  const login = useCallback((rawEmail: string) => {
    const value = rawEmail.trim();
    localStorage.setItem(LS_EMAIL_KEY, value);
    setEmail(value);
    emitAuthChanged();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(LS_EMAIL_KEY);
    setEmail(null);
    emitAuthChanged();
  }, []);

  return { email, isAuthenticated: !!email, loading, login, logout };
}
