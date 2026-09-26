"use client";
import { useEffect, useSyncExternalStore } from "react";
export type Theme = "dark" | "light";
const STORAGE_KEY = "portfolio-theme";
const CHANGE_EVENT = "portfolio-theme-change";
function snapshot():Theme { try { return localStorage.getItem(STORAGE_KEY)==="light"?"light":"dark"; } catch { return "dark"; } }
function subscribe(notify:()=>void) { window.addEventListener('storage',notify);window.addEventListener(CHANGE_EVENT,notify);return ()=>{window.removeEventListener('storage',notify);window.removeEventListener(CHANGE_EVENT,notify);}; }
export function useTheme():{theme:Theme;toggleTheme:()=>void} {
 const theme=useSyncExternalStore(subscribe,snapshot,()=>"dark" as Theme);
 useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;},[theme]);
 const toggleTheme=()=>{const next=snapshot()==="dark"?"light":"dark";localStorage.setItem(STORAGE_KEY,next);window.dispatchEvent(new Event(CHANGE_EVENT));};
 return {theme,toggleTheme};
}
