'use client';
import './sticker-deck.css';

/* The shortcut sticker on a MacBook palm rest, cropped so the sticker is the
   subject: squared up, centred in frame, with the last two keyboard rows above
   and the trackpad entering at the right for scale. Drawn rather than
   photographed so it repaints with the theme.

   The sticker art carries its own rounded corners in its alpha channel, so it
   is placed with no clip of ours: the radius is the artwork's, exactly. */

const VIEW = { width: 840, height: 747.3 };
/* A close crop: the sticker fills the frame with the keyboard directly above
   it and the trackpad running out on the right. It keeps VIEW's aspect, so the
   card stays the height that lines it up with its neighbours. */
const CROP_W = 500;
/* The crop starts just inside the machine's left edge, so the metal runs to the
   face on every side and the card's own inner radius rounds it, like the
   other covers. A strip of desk there read as a square corner. */
const CROP = { x: 18, y: 60, w: CROP_W, h: CROP_W * VIEW.height / VIEW.width };
/* Scissor-switch keyboard, matched to a space-black MacBook:
   - keys are near square with a narrow gap and a small radius
   - each cap is lit from the top, so a faint rim sits on its upper edge
   - letters are centred; modifier names sit low with their symbol above
   - the punctuation keys carry the shifted glyph above the unshifted one
   - the arrows are an inverted T: a half-height up over left, down, right
   Both rows total 14.5 units, so they share one grid and line up column to
   column exactly as they do on the real keyboard. */
const KEY_GAP = 7;
const KEY_H = 60;
const KEY_R = 5;
/* The machine is a rounded slab with its left and bottom edges inside the
   frame, so those corners are its own and read as the real thing. It runs off
   the top and right, which is what a close crop of a laptop actually looks
   like. There is no separate keyboard well: on a MacBook the metal between the
   caps is the same anodised surface as the palm rest. */
const BODY = { x: 16, y: -420, right: 1090.5, bottom: 862, r: 44 };
/* Keys are inset from the machine's edge, never bled off it. */
const KEY_INSET = 26;
const WELL = { x: BODY.x + KEY_INSET, right: BODY.right - KEY_INSET };
/* Fully on the machine and fully in frame, so it cannot read as falling off. */
const TRACKPAD = { x: 264, y: 200, w: 312, h: 260, r: 20 };
const STICKER = { size: 200, x: 48, y: 205 };
const STICKER_RADIUS = STICKER.size * 0.024; // matches the artwork's own corner

type Key = {
  weight: number;
  glyph?: string;   // centred legend, as on a letter key
  over?: string;    // shifted glyph, set above the unshifted one
  word?: string;    // modifier name, set low on the cap
  align?: 'start' | 'end';
  fn?: boolean;     // name top right, globe bottom left
  arrows?: boolean; // the inverted-T cluster
  small?: boolean;  // arrow glyphs are set smaller than letters
};

/* Legend positions as a fraction of cap height, read off the reference:
   a letter sits on the optical centre, a modifier's symbol sits high with its
   name low, and a shifted pair splits the cap between them. */
const BASE_LETTER = 0.60;
const BASE_SYMBOL = 0.37;
const BASE_WORD = 0.84;
const BASE_OVER = 0.43;
const BASE_UNDER = 0.80;

const rowHome: Key[] = [
  { weight: 1.75, word: 'caps lock', align: 'start' },
  ...['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(g => ({ weight: 1, glyph: g })),
  { weight: 1, glyph: ';', over: ':' },
  { weight: 1, glyph: "'", over: '"' },
  { weight: 1.75, word: 'return', align: 'end' },
];

const rowUpper: Key[] = [
  { weight: 2.25, word: 'shift', align: 'start' },
  ...['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(g => ({ weight: 1, glyph: g })),
  { weight: 1, glyph: ',', over: '<' },
  { weight: 1, glyph: '.', over: '>' },
  { weight: 1, glyph: '/', over: '?' },
  { weight: 2.25, word: 'shift', align: 'end' },
];

const rowLower: Key[] = [
  { weight: 1, word: 'fn', fn: true },
  { weight: 1, glyph: '\u2303', word: 'control', align: 'end' },
  { weight: 1, glyph: '\u2325', word: 'option', align: 'end' },
  { weight: 1.25, glyph: '\u2318', word: 'command', align: 'end' },
  { weight: 5 },
  { weight: 1.25, glyph: '\u2318', word: 'command', align: 'start' },
  { weight: 1, glyph: '\u2325', word: 'option', align: 'start' },
  { weight: 3, arrows: true },
];

/* The fn cap carries a globe in its lower left corner. */
function Globe({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g className="deck-key-icon" transform={`translate(${x} ${y})`}>
      <circle r={r} />
      <ellipse rx={r * 0.45} ry={r} />
      <path d={`M${-r} 0 H${r}`} />
      <path d={`M${-r * 0.82} ${-r * 0.5} H${r * 0.82}`} />
      <path d={`M${-r * 0.82} ${r * 0.5} H${r * 0.82}`} />
    </g>
  );
}

function Cap({ x, y, w, h, k }: { x: number; y: number; w: number; h: number; k: Key }) {
  const mid = x + w / 2;
  const inset = 9;
  const cx = k.align === 'start' ? x + inset : k.align === 'end' ? x + w - inset : mid;
  const anchor = k.align === 'start' ? 'start' : k.align === 'end' ? 'end' : 'middle';
  const legend = k.small ? 'deck-key-legend is-small' : 'deck-key-legend';
  return (
    <g>
      {/* The cutout in the deck, then the cap sitting just inside it. */}
      <rect x={x - 1.2} y={y - 1.2} width={w + 2.4} height={h + 2.4} rx={KEY_R + 1.2} className="deck-key-cut" />
      <rect x={x} y={y} width={w} height={h} rx={KEY_R} className="deck-key" />
      {/* A matte cap only just catches light along its upper edge. */}
      <path d={`M${x + KEY_R} ${y + .7} H${x + w - KEY_R}`} className="deck-key-rim" />

      {k.fn && (
        <>
          <text x={x + w - inset} y={y + h * BASE_SYMBOL} className="deck-key-symbol" style={{ textAnchor: 'end' }}>{k.word}</text>
          <Globe x={x + inset + 5.2} y={y + h * 0.74} r={5.2} />
        </>
      )}
      {k.over && (
        <>
          <text x={mid} y={y + h * BASE_OVER} className={legend}>{k.over}</text>
          <text x={mid} y={y + h * BASE_UNDER} className={legend}>{k.glyph}</text>
        </>
      )}
      {k.glyph && !k.over && !k.word && (
        <text x={mid} y={y + h * BASE_LETTER} className={legend}>{k.glyph}</text>
      )}
      {k.glyph && k.word && (
        <>
          <text x={cx} y={y + h * BASE_SYMBOL} className="deck-key-symbol" style={{ textAnchor: anchor }}>{k.glyph}</text>
          <text x={cx} y={y + h * BASE_WORD} className="deck-key-word" style={{ textAnchor: anchor }}>{k.word}</text>
        </>
      )}
      {!k.glyph && k.word && !k.fn && (
        <text x={cx} y={y + h * BASE_WORD} className="deck-key-word" style={{ textAnchor: anchor }}>{k.word}</text>
      )}
    </g>
  );
}

/* Up sits alone on the top half; left, down and right share the bottom. */
function Arrows({ x, y, w }: { x: number; y: number; w: number }) {
  const col = (w - KEY_GAP * 2) / 3;
  const half = (KEY_H - KEY_GAP) / 2;
  const lower = y + half + KEY_GAP;
  const a = (glyph: string) => ({ weight: 1, glyph, small: true });
  return (
    <>
      <Cap x={x + col + KEY_GAP} y={y} w={col} h={half} k={a('\u25b2')} />
      <Cap x={x} y={lower} w={col} h={half} k={a('\u25c0')} />
      <Cap x={x + col + KEY_GAP} y={lower} w={col} h={half} k={a('\u25bc')} />
      <Cap x={x + (col + KEY_GAP) * 2} y={lower} w={col} h={half} k={a('\u25b6')} />
    </>
  );
}

function Row({ keys, y, h = KEY_H }: { keys: Key[]; y: number; h?: number }) {
  const innerX = WELL.x;
  const innerWidth = WELL.right - WELL.x;
  const total = keys.reduce((a, k) => a + k.weight, 0);
  const pitch = (innerWidth + KEY_GAP) / total;
  let x = innerX;
  const out: React.ReactElement[] = [];
  keys.forEach((k, i) => {
    const w = pitch * k.weight - KEY_GAP;
    out.push(k.arrows
      ? <Arrows key={i} x={x} y={y} w={w} />
      : <Cap key={i} x={x} y={y} w={w} h={h} k={k} />);
    x += w + KEY_GAP;
  });
  return <>{out}</>;
}

export default function StickerDeck() {
  return (
    <div className="portfolio-experiment-card sticker-deck">
      <div className="deck-stage">
        <svg viewBox={`${CROP.x} ${CROP.y} ${CROP.w} ${CROP.h}`} role="img"
          aria-label="Figma for Edu keyboard shortcut sticker applied square to the palm rest of a MacBook, beside the trackpad">
          <defs>
            <linearGradient id="deck-alu" x1=".08" y1="0" x2=".92" y2="1">
              <stop offset="0" className="alu-1" />
              <stop offset=".4" className="alu-2" />
              <stop offset="1" className="alu-3" />
            </linearGradient>
            <linearGradient id="deck-cap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" className="cap-1" />
              <stop offset="1" className="cap-2" />
            </linearGradient>
            <linearGradient id="deck-pad" x1=".1" y1="0" x2=".9" y2="1">
              <stop offset="0" className="pad-1" />
              <stop offset="1" className="pad-2" />
            </linearGradient>
            {/* Bead-blasted anodised aluminium: an even matte grain, no lines. */}
            <filter id="deck-grain" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="7" result="n" />
              <feColorMatrix in="n" type="matrix"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .33 .33 .33 0 -.42" />
            </filter>
            <linearGradient id="deck-pad-shade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity=".11" />
              <stop offset=".14" stopColor="#000" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="deck-light" cx=".3" cy=".1" r="1.05">
              <stop offset="0" stopColor="#fff" stopOpacity=".3" />
              <stop offset=".5" stopColor="#fff" stopOpacity=".04" />
              <stop offset="1" stopColor="#000" stopOpacity=".22" />
            </radialGradient>
          </defs>

          {/* The surface the machine rests on. */}
          <rect x={CROP.x} y={CROP.y} width={CROP.w} height={CROP.h} className="deck-desk" />

          {/* The machine: one continuous slab. Left and bottom edges are in
              frame with their own radius; top and right run out of the crop. */}
          <g className="deck-body">
            <rect x={BODY.x} y={BODY.y} width={BODY.right - BODY.x}
              height={BODY.bottom - BODY.y} rx={BODY.r} fill="url(#deck-alu)" />
            <rect x={CROP.x} y={CROP.y} width={CROP.w} height={CROP.h}
              filter="url(#deck-grain)" className="deck-grain" />
            {/* Machined chamfer catching light along the near edges. */}
            <rect x={BODY.x + .6} y={BODY.y} width={BODY.right - BODY.x - 1.2}
              height={BODY.bottom - BODY.y - .6} rx={BODY.r} className="deck-chamfer" />
          </g>

          {/* Keys sit straight on the metal, each in its own shallow cutout. */}
          <Row keys={rowHome} y={-20} />
          <Row keys={rowUpper} y={47} />
          <Row keys={rowLower} y={114} />

          {/* Trackpad sits fully inside the crop, centred on the palm rest. */}
          <g>
            <rect x={TRACKPAD.x} y={TRACKPAD.y} width={TRACKPAD.w} height={TRACKPAD.h}
              rx={TRACKPAD.r} fill="url(#deck-pad)" />
            <rect x={TRACKPAD.x} y={TRACKPAD.y} width={TRACKPAD.w} height={TRACKPAD.h}
              rx={TRACKPAD.r} fill="url(#deck-pad-shade)" />
            <rect x={TRACKPAD.x + .75} y={TRACKPAD.y + .75} width={TRACKPAD.w - 1.5}
              height={TRACKPAD.h - 1.5} rx={TRACKPAD.r - .75} className="deck-trackpad-edge" />
          </g>

          {/* Applied square. Alpha supplies the radius. */}
          <g className="deck-sticker">
            <image href="/assets/figma-edu/sticker-light.png"
              x={STICKER.x} y={STICKER.y} width={STICKER.size} height={STICKER.size}
              className="deck-sticker-light" />
            <image href="/assets/figma-edu/sticker-dark.png"
              x={STICKER.x} y={STICKER.y} width={STICKER.size} height={STICKER.size}
              className="deck-sticker-dark" />
            <rect x={STICKER.x + .5} y={STICKER.y + .5} width={STICKER.size - 1}
              height={STICKER.size - 1} rx={STICKER_RADIUS} className="deck-sticker-edge" />
          </g>

          <rect x={CROP.x} y={CROP.y} width={CROP.w} height={CROP.h} fill="url(#deck-light)" style={{ mixBlendMode: 'soft-light' }} />
        </svg>
        {/* Second part of the cover: the sticker on its own, close up. */}
        <div className="deck-closeup" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/figma-edu/sticker-dark.png" alt="" draggable={false} />
        </div>
      </div>
      <span className="card-kind">FigBuild 2026 Merch · Shipped</span>
    </div>
  );
}
