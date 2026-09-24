'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { applyTypeVariant, ensureTypeTestFonts, typeVariants } from '@/lib/typeVariants';
import './type-switcher.css';

const KEY = 'portfolio-typetest';
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };
const notify = () => listeners.forEach(cb => cb());

/** '' or null means off; otherwise the active variant id. */
function readStored(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has('typetest')) localStorage.setItem(KEY, params.get('typetest') === '0' ? '' : (localStorage.getItem(KEY) || 'crimson'));
    return localStorage.getItem(KEY) || '';
  } catch { return ''; }
}
function write(next: string) { try { localStorage.setItem(KEY, next); } catch {} notify(); }

/** Type-system switcher for real pages. Open any case study with ?typetest=1; ?typetest=0 or the × turns it off. */
export default function TypeSwitcher() {
  const id = useSyncExternalStore(subscribe, readStored, () => '');
  useEffect(() => {
    if (!id) { applyTypeVariant(null); return; }
    ensureTypeTestFonts();
    applyTypeVariant(typeVariants.find(v => v.id === id) || null);
    return () => applyTypeVariant(null);
  }, [id]);
  if (!id) return null;
  return (
    <aside className="type-switcher" aria-label="Type test">
      <div className="type-switcher-head"><strong>Type test</strong><button type="button" onClick={() => write('')} aria-label="Close type test">×</button></div>
      <ul>
        {typeVariants.map(v => <li key={v.id}><button type="button" aria-pressed={id === v.id} onClick={() => write(v.id)}>{v.name}</button></li>)}
      </ul>
    </aside>
  );
}
