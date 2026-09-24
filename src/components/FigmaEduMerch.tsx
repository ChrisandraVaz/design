'use client';
/* Native image keeps the cover exactly as exported, like the rest of the canvas. */
/* eslint-disable @next/next/no-img-element */
import './figma-edu-merch.css';

/* The keychain cover is a finished composition in its own right, so the card
   shows it whole: no grid, no splits, no badge over the artwork. */
export default function FigmaEduMerch() {
  return (
    <div className="portfolio-experiment-card edu-merch">
      <img
        className="edu-merch-cover"
        src="/assets/figma-edu/keychain-cover.jpg"
        alt="Figma for Edu keychain exploration: six knot colourways, a black strap with a clover charm, and braided paracord keychains with clover tags"
        draggable={false}
      />
      <span className="card-kind">Exploration Concept</span>
    </div>
  );
}
