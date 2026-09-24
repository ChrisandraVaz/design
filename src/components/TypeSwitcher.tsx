'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
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
    const param = params.get('typetest');
    if (param !== null) {
      // ?typetest=1 turns it on, ?typetest=0 off, ?typetest=<variant id> jumps straight to that system.
      const direct = typeVariants.find(v => v.id === param)?.id;
      localStorage.setItem(KEY, param === '0' ? '' : (direct || localStorage.getItem(KEY) || 'crimson'));
    }
    const stored = localStorage.getItem(KEY);
    if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return stored || 'crimson'; // always on for local review
    return stored || '';
  } catch { return ''; }
}
function write(next: string) { try { localStorage.setItem(KEY, next); } catch {} notify(); }

/** Type-system switcher for real pages. Open any case study with ?typetest=1; ?typetest=0 or the × turns it off. */
export default function TypeSwitcher() {
  const id = useSyncExternalStore(subscribe, readStored, () => '');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!id) { applyTypeVariant(null); return; }
    ensureTypeTestFonts();
    applyTypeVariant(typeVariants.find(v => v.id === id) || null);
    return () => applyTypeVariant(null);
  }, [id]);
  if (!id) return null;
  const current = typeVariants.find(v => v.id === id)?.name ?? id;
  if (!open) return <button type="button" className="type-switcher-pill" onClick={() => setOpen(true)}>Type: {current}</button>;
  return (
    <aside className="type-switcher" aria-label="Type test">
      <div className="type-switcher-head"><strong>Type test</strong><span><button type="button" onClick={() => setOpen(false)} aria-label="Collapse">–</button><button type="button" onClick={() => write('')} aria-label="Turn off type test">×</button></span></div>
      <ul>
        {typeVariants.map(v => <li key={v.id}><button type="button" aria-pressed={id === v.id} onClick={() => { write(v.id); setOpen(false); }}>{v.name}</button></li>)}
      </ul>
    </aside>
  );
}
