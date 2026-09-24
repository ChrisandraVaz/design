'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import BotanicalStudy from './BotanicalStudy';
import './shader-experiment-viewer.css';

const titles = ['Wind Field', 'Flower Meadow', 'Split Leaf'];

function WindField() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data?.type === 'portfolio-wind-field-ready') {
        setReady(true);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="shader-viewer-art shader-viewer-art--square shader-viewer-art--wind" data-live={ready}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/widget-images/wind-field-square.jpg" alt="Four people in a field of wind-swept grass" />
      <iframe src="/shaders/wind-field/index.html" title="Live Wind Field WebGL shader" />
    </div>
  );
}

export default function ShaderExperimentViewer({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') setIndex(current => (current + 1) % titles.length);
      if (event.key === 'ArrowLeft') setIndex(current => (current + titles.length - 1) % titles.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="shader-viewer-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="shader-viewer" role="dialog" aria-modal="true" aria-labelledby="shader-viewer-title">
        <header className="shader-viewer-header">
          <span id="shader-viewer-title">Shader Experiments</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close shader experiments"><FiX aria-hidden="true" /></button>
        </header>
        <div className="shader-viewer-stage">
          <button className="shader-viewer-arrow" type="button" onClick={() => setIndex(current => (current + titles.length - 1) % titles.length)} aria-label="Previous shader"><FiChevronLeft aria-hidden="true" /></button>
          {index === 0 ? <WindField /> : (
            <div className="shader-viewer-art shader-viewer-art--square" key={index}>
              {index === 1 ? <BotanicalStudy kind="flowers" /> : <BotanicalStudy kind="leaf" />}
            </div>
          )}
          <button className="shader-viewer-arrow" type="button" onClick={() => setIndex(current => (current + 1) % titles.length)} aria-label="Next shader"><FiChevronRight aria-hidden="true" /></button>
        </div>
        <footer className="shader-viewer-footer">
          <span>{String(index + 1).padStart(2, '0')} / 03</span>
          <strong>{titles[index]}</strong>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
