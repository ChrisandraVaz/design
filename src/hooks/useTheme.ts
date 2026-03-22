"use client";

import { useState, useEffect } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "portfolio-theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved === "light" || saved === "dark") return saved;
  return getSystemTheme();
}

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(getStoredTheme());

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = () => {
      localStorage.removeItem(STORAGE_KEY);
      setTheme(getSystemTheme());
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  return { theme, toggleTheme };
}
