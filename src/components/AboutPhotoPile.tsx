'use client';

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

export type PilePhoto = { src: string; alt: string; rotate: number; x: number; y: number };

type CardState = { x: number; y: number; z: number };

const NUDGE = 12;

export default function AboutPhotoPile({ photos }: { photos: PilePhoto[] }) {
  const [cards, setCards] = useState<CardState[]>(() => photos.map((p, i) => ({ x: p.x, y: p.y, z: i + 1 })));
  const topZ = useRef(photos.length);
  const drag = useRef<{ index: number; startX: number; startY: number; originX: number; originY: number } | null>(null);

  const bringToFront = (index: number) => {
    topZ.current += 1;
    const z = topZ.current;
    setCards(prev => prev.map((c, i) => (i === index ? { ...c, z } : c)));
  };

  const onPointerDown = (index: number) => (e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const card = cards[index];
    drag.current = { index, startX: e.clientX, startY: e.clientY, originX: card.x, originY: card.y };
    bringToFront(index);
  };

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    const x = d.originX + (e.clientX - d.startX);
    const y = d.originY + (e.clientY - d.startY);
    setCards(prev => prev.map((c, i) => (i === d.index ? { ...c, x, y } : c)));
  };

  const onPointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    if (drag.current) e.currentTarget.releasePointerCapture(e.pointerId);
    drag.current = null;
  };

  const onKeyDown = (index: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-NUDGE, 0],
      ArrowRight: [NUDGE, 0],
      ArrowUp: [0, -NUDGE],
      ArrowDown: [0, NUDGE],
    };
    if (delta[e.key]) {
      e.preventDefault();
      const [dx, dy] = delta[e.key];
      setCards(prev => prev.map((c, i) => (i === index ? { ...c, x: c.x + dx, y: c.y + dy } : c)));
      bringToFront(index);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      bringToFront(index);
    }
  };

  return (
    <div className="about-pile" role="group" aria-label="Draggable photographs">
      {photos.map((photo, i) => (
        <button
          key={photo.src}
          type="button"
          className="about-pile-card"
          aria-label={`${photo.alt}. Drag, or use arrow keys to move and Enter to bring to the front.`}
          style={{ transform: `translate(${cards[i].x}px, ${cards[i].y}px) rotate(${photo.rotate}deg)`, zIndex: cards[i].z }}
          onPointerDown={onPointerDown(i)}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown(i)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.src} alt="" draggable={false} loading={i === photos.length - 1 ? 'eager' : 'lazy'} />
        </button>
      ))}
    </div>
  );
}
