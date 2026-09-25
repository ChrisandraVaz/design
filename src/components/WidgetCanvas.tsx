'use client';
/* Native images preserve the existing asset crops and OpenStreetMap tile sizing. */
/* eslint-disable @next/next/no-img-element */
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  useSyncExternalStore,
} from 'react';
import { FiPause as Pause, FiPlay as Play, FiSkipBack as SkipBack, FiSkipForward as SkipForward, FiSearch as Search, FiMapPin as Footprints, FiX as X, FiGrid as Grid2X2, FiArrowLeft as ArrowLeft, FiMaximize2 as Maximize2 } from 'react-icons/fi';
import SketchIntro from './SketchIntro';
import Link from 'next/link';
import TraceWatchAnchor from './TraceWatchAnchor';
import { TracePalette, OriginalTraceStudy } from './TraceStudies';
import { useHydrated } from '@/hooks/useHydrated';
import { useCanvasDrag } from '@/hooks/useCanvasDrag';
import FontContextCardMedia from './FontContextCardMedia';
import FigmaEduMerch from './FigmaEduMerch';
import FigBuildFlyers from './FigBuildFlyers';
import StickerDeck from './StickerDeck';
import IndexCardLayout from './IndexCardLayout';
import SentryCard from './sentry/SentryCard';
import BotanicalStudy from './BotanicalStudy';
import ShaderExperimentViewer from './ShaderExperimentViewer';
import {sentryProjects,sentrySlots} from '@/lib/sentry/projects';
import './portfolio-bento.css';


function Photo({
  src,
  alt = '',
  className = '',
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <img src={`/widget-images/${src}.jpg`} alt={alt} draggable={false} />
    </div>
  );
}
function CardArrow({href,label,external=false}:{href:string;label:string;external?:boolean}) {
  const contents=<Maximize2 aria-hidden="true"/>;
  const arrowLabel=label.replace(/^Open /,'Expand ');
  return external
    ? <a className="card-heading-action" href={href} target="_blank" rel="noreferrer" aria-label={arrowLabel}>{contents}</a>
    : <Link className="card-heading-action" href={href} prefetch={href.endsWith('.html') ? false : undefined} aria-label={arrowLabel}>{contents}</Link>;
}
function Blueprint({ height }: { height: number }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      className="blueprint"
      viewBox={`0 0 446 ${height}`}
      width="446"
      height={height}
      role="img"
      aria-label={`8 pixel grid, 352 pixels wide, ${height} pixels high, 24 pixel padding and corner radius`}
    >
      <defs>
        <pattern
          id={`${id}-padding`}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0.5 8 V 0.5 H 8"
            fill="none"
            stroke="#b4a0ce"
            strokeOpacity=".62"
            strokeWidth=".8"
          />
        </pattern>
        <pattern
          id={`${id}-content`}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0.5 8 V 0.5 H 8"
            fill="none"
            stroke="#a1b3d2"
            strokeOpacity=".65"
            strokeWidth=".8"
          />
        </pattern>
        <clipPath id={`${id}-corners`}>
          <rect width="352" height={height} rx="24" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-corners)`}>
        <rect width="352" height={height} fill="#faf3f9" />
        <rect width="352" height={height} fill={`url(#${id}-padding)`} />
        <rect x="24" y="24" width="304" height={height - 48} fill="#fff" />
        <rect
          x="24"
          y="24"
          width="304"
          height={height - 48}
          fill={`url(#${id}-content)`}
        />
      </g>
      <g className="blueprint-labels">
        <text x="376" y="36">
          HEIGHT
        </text>
        <text className="blueprint-value" x="376" y="56">
          {height} PX
        </text>
        <text x="376" y={height - 48}>
          RADIUS
        </text>
        <text className="blueprint-value" x="376" y={height - 28}>
          24 PX
        </text>
      </g>
    </svg>
  );
}
function CoastMap() {
  const zoom = 13;
  const longitude = -123.058;
  const latitude = 38.309;
  const worldX = ((longitude + 180) / 360) * 2 ** zoom;
  const rad = (latitude * Math.PI) / 180;
  const worldY =
    ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) *
    2 ** zoom;
  const tileX = Math.floor(worldX),
    tileY = Math.floor(worldY);
  return (
    <div className="coast-map" aria-label="Map of Bodega Bay, California">
      {[-1, 0, 1].flatMap((dy) =>
        [-1, 0, 1].map((dx) => (
          <img
            key={`${dx}:${dy}`}
            alt=""
            src={`https://tile.openstreetmap.org/${zoom}/${tileX + dx}/${tileY + dy}.png`}
            style={{
              left: `calc(50% + ${(tileX + dx - worldX) * 256}px)`,
              top: `${128 + (tileY + dy - worldY) * 256}px`,
            }}
          />
        )),
      )}
    </div>
  );
}
const names = [
  'Music',
  'Focus timer',
  'Flight',
  'Location',
  'Weather',
  'News',
  'Inbox',
  'Quick note',
  'Mood board',
  'Up next',
  'Nike running',
  'Activity',
  'Shader Experiments',
];
const heights = [
  200, 304, 224, 304, 184, 272, 392, 240, 352, 240, 320, 232, 351,
];
const messages = [
  {
    name: 'Research agent',
    time: '2:40 PM',
    body: 'Three Bay Area stories, with the key details and sources ready to explore.',
    unread: true,
  },
  {
    name: 'Motion agent',
    time: '2:32 PM',
    body: 'Content comes and goes independently. Every surface moves at the same pace.',
    unread: false,
  },
  {
    name: 'Weather agent',
    time: '2:18 PM',
    body: 'Current conditions and the five-day forecast, all in one place.',
    unread: true,
  },
];
const subscribeNever = () => () => {};
const readRecordingPreview = () => new URLSearchParams(window.location.search).get('shaderPreview') === 'recordings';
export default function WidgetCanvas({ layout = 'canvas' }: { layout?: 'canvas' | 'index' } = {}) {
  const indexLayout = layout === 'index';
  const Container = indexLayout ? 'div' : 'main';
  const Scatter = indexLayout ? IndexCardLayout : 'div';
  const hydrated=useHydrated();
  const [active, setActive] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const {movable: draggable,isInteracting}=useCanvasDrag(canvasRef,setActive);
  const movable = indexLayout ? (id: string) => ({ 'data-card-id': id }) : draggable;
  const [selected, setSelected] = useState<number | null>(null);
  const [inspect, setInspect] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [track, setTrack] = useState(0);
  const [position, setPosition] = useState(142);
  const [query, setQuery] = useState('');
  const [read, setRead] = useState<string[]>([]);
  const [note, setNote] = useState('Leave a little room for the unexpected.');
  const [day, setDay] = useState(3);
  const [fahrenheit, setFahrenheit] = useState(true);
  const [study, setStudy] = useState<number | null>(null);
  const [shaderOpen, setShaderOpen] = useState(false);
  /* Read once from the URL; false on the server so hydration matches. */
  const recordingPreview = useSyncExternalStore(subscribeNever, readRecordingPreview, () => false);
  const closeShaderViewer = useCallback(() => setShaderOpen(false), []);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Safari mis-evaluates viewport units inside atan2(), so the CSS scale formula reads the measured frame width in px.
  useEffect(() => {
    const frame = canvasRef.current;
    const world = frame?.closest('.widget-world') as HTMLElement | null;
    if (!frame || !world || typeof ResizeObserver === 'undefined') return;
    const apply = () => world.style.setProperty('--frame-width', `${frame.getBoundingClientRect().width}px`);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const preview = new Image();
    preview.src = '/widget-images/wind-field-square.jpg';
  }, []);
  useEffect(() => {
    const saved = localStorage.getItem('widget-note');
    const frame = requestAnimationFrame(() => { if (saved) setNote(saved); });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (selected !== 0) return;
    const id = setInterval(() => {
      if (playing) setPosition((p) => (p >= 250 ? 0 : p + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [playing, selected]);
  useEffect(() => {
    if (selected === null) return;
    closeRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handler);
    };
  }, [selected]);
  const time = (n: number) =>
    `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;
  const media = (i: number) => (
    <Photo src={['poster', 'flower', 'packaging', 'chair'][i]} />
  );
  function widget(index: number): ReactNode {
    switch (index) {
      case 0:
        return (
          <div className="card music">
            <div className="music-top">
              <Photo
                src="album"
                alt="Agar Agar album artwork"
                className="album"
              />
              <div className="music-info">
                <strong>
                  {['The Visit', 'Prettiest Virgin', 'Fangs Out'][track]}
                </strong>
                <p>Agar Agar</p>
                <div className="music-controls">
                  <button disabled={!hydrated}
                    aria-label="Previous track"
                    onClick={() => {
                      setTrack((track + 2) % 3);
                      setPosition(0);
                    }}
                  >
                    <SkipBack />
                  </button>
                  <button disabled={!hydrated}
                    className="play"
                    aria-label={playing ? 'Pause music' : 'Play music'}
                    onClick={() => setPlaying(!playing)}
                  >
                    {playing ? <Pause /> : <Play />}
                  </button>
                  <button disabled={!hydrated}
                    aria-label="Next track"
                    onClick={() => {
                      setTrack((track + 1) % 3);
                      setPosition(0);
                    }}
                  >
                    <SkipForward />
                  </button>
                </div>
              </div>
            </div>
            <input
              className="seek"
              aria-label="Track position"
              type="range"
              min="0"
              max="250"
              value={position}
              onChange={(e) => setPosition(+e.target.value)}
              style={
                { '--progress': `${(position / 250) * 100}%` } as CSSProperties
              }
            />
            <div className="split muted caption">
              <span>{time(position)}</span>
              <span>-{time(250 - position)}</span>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="card location" onDoubleClick={() => setSelected(3)}>
            <CoastMap />
            <div className="location-caption">
              <strong>Bodega Bay</strong>
              <p>California, United States</p>
              <a
                className="map-credit"
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noreferrer"
              >
                © OpenStreetMap
              </a>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="card weather">
            <strong>Bodega Bay</strong>
            <div className="split temperature">
              <button disabled={!hydrated}
                aria-label="Switch temperature units"
                onClick={() => setFahrenheit(!fahrenheit)}
              >
                {fahrenheit ? '58°' : '14°'}
                <small>{fahrenheit ? 'F' : 'C'}</small>
              </button>
              <span>Clear</span>
            </div>
            <div className="forecast">
              {['Sat', 'Sun', 'Mon', 'Tue', 'Wed'].map((d, i) => (
                <div key={d}>
                  <span>{d}</span>
                  <strong>
                    {fahrenheit
                      ? [63, 65, 72, 70, 66][i]
                      : [17, 18, 22, 21, 19][i]}
                    °
                  </strong>
                </div>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="card news">
            <strong>News stories</strong>
            <div className="stories">
              {[
                ['Gimlet raises $300M', 'AI infrastructure · Gimlet Labs'],
                ['Agents take over a website', 'OpenAI agents · Reuters'],
                ['Alation named a leader', 'Data intelligence · Alation'],
              ].map(([title, description], index) => (
                <button key={title} type="button" disabled={!hydrated} onClick={() => setSelected(5)}>
                  <div className={`news-art art-${index}`} aria-hidden="true">
                    {index === 2 && <Photo src="grass-waves" />}
                  </div>
                  <div><strong>{title}</strong><p className="muted">{description}</p></div>
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="card inbox">
            <div className="split inbox-heading">
              <div>
                <strong>Inbox</strong>
                <span className="muted caption">
                  {2 - read.filter((n) => n !== 'Motion agent').length} unread
                </span>
              </div>
              <label className="search">
                <Search />
                <input
                  aria-label="Search inbox"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            </div>
            <div className="messages">
              {messages
                .filter((m) =>
                  `${m.name} ${m.body}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
                )
                .map((m) => (
                  <button disabled={!hydrated}
                    className="message"
                    key={m.name}
                    onClick={() =>
                      setRead((r) => (r.includes(m.name) ? r : [...r, m.name]))
                    }
                  >
                    <span
                      className={`unread ${m.unread && !read.includes(m.name) ? 'visible' : ''}`}
                    />
                    <div>
                      <div className="split">
                        <strong>{m.name}</strong>
                        <time>{m.time}</time>
                      </div>
                      <p>{m.body}</p>
                      {m.name === 'Motion agent' && (
                        <div className="attachments">
                          {[0, 1, 2].map((j) => (
                            <span key={j}>{media(j)}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              {messages.filter((m) =>
                `${m.name} ${m.body}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              ).length === 0 && <p className="muted">No matching messages.</p>}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="card note">
            <strong>Quick note</strong>
            <textarea
              aria-label="Quick note"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                localStorage.setItem('widget-note', e.target.value);
              }}
            />
            <span className="draft">Draft · This session</span>
          </div>
        );
      case 8:
        return (
          <div className="card mood">
            <div className="mood-grid">
              {[0, 1, 2, 3].map((i) => (
                <button disabled={!hydrated}
                  key={i}
                  aria-label={`View reference ${i + 1}`}
                  onClick={() => setStudy(study === i ? null : i)}
                >
                  {media(i)}
                </button>
              ))}
            </div>
            <div className="split collection-caption">
              <div>
                <strong>Mood board</strong>
                <p>Collected inspiration</p>
              </div>
              <span className="caption muted">4 references</span>
            </div>
            {study !== null && (
              <button disabled={!hydrated}
                className="reference-preview"
                onClick={() => setStudy(null)}
                aria-label="Close reference"
              >
                {media(study)}
                <X />
              </button>
            )}
          </div>
        );
      case 10:
        return (
          <div className="card running">
            <Photo
              src="runner"
              alt="Trail runner in a blue jacket crossing a rocky mountain ridge"
            />
            <div className="running-controls">
              <strong>Nike running</strong>
              <button disabled={!hydrated}
                aria-label="View running photograph"
                onClick={() => setSelected(10)}
              >
                <Maximize2 />
              </button>
            </div>
          </div>
        );
      case 11:
        return (
          <div className="card activity">
            <div className="split">
              <strong>Activity</strong>
              <Footprints className="muted" />
            </div>
            <div className="distance">
              {[4.2, 0.4, 5.7, 3.1, 0.3, 8.2, 4.0][day]}
              <small>km</small>
            </div>
            <div className="bars">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <button disabled={!hydrated}
                  key={i}
                  aria-label={`${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i]} activity`}
                  onClick={() => setDay(i)}
                >
                  <span
                    style={{ height: `${[32, 3, 44, 24, 3, 64, 30][i]}px` }}
                    className={day === i ? 'active' : ''}
                  />
                  <small>{d}</small>
                </button>
              ))}
            </div>
          </div>
        );
      case 12:
        return (
          <div className="card shader">
            <div className="grass-grid">
              <div className="photo wind-field-art">
                <img src="/widget-images/wind-field.jpg" alt="Four figures in a wind-shaped field of grass" draggable={false} />
              </div>
              {recordingPreview ? (
                <>
                  <div className="shader-recording shader-recording--city">
                    <video src="/layout-options/assets/city-study.mp4" poster="/layout-options/assets/city-study.jpg" autoPlay muted loop playsInline preload="metadata" onLoadedMetadata={event => { event.currentTarget.currentTime = 3.5; }} aria-label="Animated city lights study" />
                  </div>
                  <div className="shader-recording shader-recording--origami">
                    <video src="/layout-options/assets/origami-study.mp4" poster="/layout-options/assets/origami-study.jpg" autoPlay muted playsInline preload="metadata" onLoadedMetadata={event => { event.currentTarget.currentTime = 7.5; }} onEnded={event => { event.currentTarget.currentTime = 7.5; void event.currentTarget.play(); }} aria-label="Animated origami folding study" />
                  </div>
                </>
              ) : (
                <>
                  <BotanicalStudy kind="flowers" />
                  <BotanicalStudy kind="leaf" />
                </>
              )}
            </div>
            <div className="split collection-caption">
              <div>
                <strong>{recordingPreview ? 'Experiments' : 'Shader Experiments'}</strong>
                <p>{recordingPreview ? 'Motion studies' : 'Field studies'}</p>
              </div>
              <span className="caption muted">3 studies</span>
            </div>
            {!recordingPreview && <button className="shader-card-open" type="button" aria-label="Open Shader Experiments" onClick={() => setShaderOpen(true)} />}
          </div>
        );
    }
  }
  return (
    <Container className={`widget-world${indexLayout ? ' index-widget-world' : ''}`} id={indexLayout ? 'index-components' : 'work'} data-ready={hydrated}>
      <div className="scatter-viewport" ref={canvasRef}>
      <Scatter onDragStart={event=>event.preventDefault()} onPointerLeave={()=>{if(!isInteracting())setActive(null);}} className={`scatter ${active ? 'has-active' : ''}`}>
        {!indexLayout && <div className="scatter-intro"><SketchIntro /></div>}
        {(indexLayout ? [1,9,2] : [9,1,2]).map(i => <section key={i} {...movable(String(i))} className={`scatter-item scatter-${i} scatter-sentry ${active===String(i)?'is-active':''}`} aria-label={`${sentryProjects[sentrySlots[i]].title} case study`} onPointerEnter={e=>{if(e.pointerType==='mouse' && !isInteracting())setActive(String(i));}} onFocus={()=>setActive(String(i))}>
          <div className="widget-label card-heading"><span>{sentryProjects[sentrySlots[i]].title}</span><CardArrow href={`/projects/sentry-${sentrySlots[i]}`} label={`Open ${sentryProjects[sentrySlots[i]].title}`}/></div><SentryCard kind={sentrySlots[i]}/>
        </section>)}
        <section {...movable('fontcontext')} className={`scatter-item scatter-0 scatter-fontcontext-slot ${active==='fontcontext'?'is-active':''}`} aria-label="Font Context Plugin case study" onPointerEnter={e=>{if(e.pointerType==='mouse' && !isInteracting())setActive('fontcontext');}} onFocus={()=>setActive('fontcontext')}>
          <div className="widget-label card-heading"><span>Font Context Plugin</span><CardArrow href="/fontcontext.html" label="Open Font Context Plugin"/></div>
          <Link className="portfolio-experiment-card fontcontext-card" href="/fontcontext.html" prefetch={false} aria-label="Open Font Context Plugin case study">
            <FontContextCardMedia />
            <span className="card-kind">Shipped · Case Study</span>
          </Link>
        </section>
        {[3,12].map(i => i===3 ? <section key={i} {...movable(String(i))} className={`scatter-item scatter-3 scatter-sentry ${active==='3'?'is-active':''}`} aria-label="Relative Time case study" onPointerEnter={e=>{if(e.pointerType==='mouse'&&!isInteracting())setActive('3')}} onFocus={()=>setActive('3')}><div className="widget-label card-heading"><span>Relative Time</span><CardArrow href="/projects/sentry-relative-time" label="Open Relative Time"/></div><SentryCard kind="relative-time"/></section> : <section key={i} {...movable(String(i))} className={`scatter-item scatter-${i} ${active===String(i)?'is-active':''}`} aria-label={`${names[i]} widget`} onPointerEnter={e=>{if(e.pointerType==='mouse' && !isInteracting())setActive(String(i));}}  onFocus={()=>setActive(String(i))} >
          <div className={`widget-label${i===10?'':' card-heading'}`}><span>{i === 12 && recordingPreview ? 'Experiments' : names[i]}</span>{!(i === 12 && recordingPreview) && <button disabled={!hydrated} aria-label={`Inspect ${names[i]}`} onClick={()=>{if(i===12){setShaderOpen(true);}else{setSelected(i);setInspect(false);}}}><Maximize2/></button>}</div>{indexLayout && i !== 10 ? <div className="index-component-frame">{widget(i)}</div> : widget(i)}
        </section>)}
        <section {...movable('trace')} className={`scatter-item scatter-trace ${active==='trace'?'is-active':''}`} aria-label="Trace watchOS concept project" onPointerEnter={e=>{if(e.pointerType==='mouse' && !isInteracting())setActive('trace');}} onFocus={()=>setActive('trace')}>
          <div className="widget-label card-heading"><span>Apple Watch Trace</span><CardArrow href="/projects/trace" label="Open Apple Watch Trace"/></div>
          <Link href="/projects/trace" className="trace-project-link" aria-label="Explore Trace">
            <div className="trace-project-art">
              <div className="trace-bento-watch"><TraceWatchAnchor/></div>
              <div className="trace-bento-widget"><div className="trace-project-widget"><OriginalTraceStudy label="Trace component study"/></div><span>Component study</span></div>
              <div className="trace-bento-state trace-color-study"><TracePalette/></div>
            </div>
            <span className="card-kind">Concept · Case Study</span>
          </Link>
        </section>
        <section {...movable('metallic')} className="scatter-item scatter-metallic" aria-label="Liquid Metallic Button experiment">
          <div className="widget-label card-heading"><span>Liquid Metallic Button</span><CardArrow href="https://chrisandravaz.github.io/Liquid-Metallic-Button-/liquid-metal-button" label="Open Liquid Metallic Button" external/></div><a className="portfolio-experiment-card metallic-card" href="https://chrisandravaz.github.io/Liquid-Metallic-Button-/liquid-metal-button" target="_blank" rel="noreferrer" aria-label="Open Liquid Metallic Button">
            <video src="/assets/metallic-button.mp4" autoPlay loop muted playsInline preload="metadata" />
            <span className="card-kind component-kind">Experiment</span>
          </a>
        </section>
        <section {...movable('paint')} className="scatter-item scatter-paint" aria-label="Microsoft Paint recreation">
          <div className="widget-label card-heading"><span>Microsoft Paint Recreation</span><CardArrow href="https://chrisandravaz.github.io/Microsoft-Paint/" label="Open Microsoft Paint recreation" external/></div>
          <a className="portfolio-experiment-card paint-card" href="https://chrisandravaz.github.io/Microsoft-Paint/" target="_blank" rel="noreferrer" aria-label="Open Microsoft Paint recreation">
            <video src="/assets/microsoftpaint-540.mp4" autoPlay loop muted playsInline preload="metadata" />
            <span className="card-kind component-kind">Experiment</span>
          </a>
        </section>
        <section {...movable('edu')} className={`scatter-item scatter-edu ${active==='edu'?'is-active':''}`} aria-label="Figma for Edu keychain exploration" onPointerEnter={e=>{if(e.pointerType==='mouse' && !isInteracting())setActive('edu');}} onFocus={()=>setActive('edu')}>
          <div className="widget-label card-heading"><span>Figma for Edu Keychain Exploration</span><CardArrow href="/projects/figma-keychain" label="Open Figma for Edu keychain exploration"/></div>
          <Link href="/projects/figma-keychain" className="widget-link" aria-label="Open Figma for Edu keychain exploration"><FigmaEduMerch /></Link>
        </section>
        <section {...movable('flyers')} className={`scatter-item scatter-flyers ${active==='flyers'?'is-active':''}`} aria-label="FigBuild 2025 campaign flyers" onPointerEnter={e=>{if(e.pointerType==='mouse' && !isInteracting())setActive('flyers');}} onFocus={()=>setActive('flyers')}>
          <div className="widget-label card-heading"><span>FigBuild 2025</span><CardArrow href="/projects/figbuild" label="Open FigBuild 2025"/></div>
          <Link href="/projects/figbuild" className="widget-link" aria-label="Open FigBuild 2025"><FigBuildFlyers /></Link>
        </section>
        <section {...movable('deck')} className={`scatter-item scatter-deck ${active==='deck'?'is-active':''}`} aria-label="Figma for Edu shortcut sticker on a MacBook" onPointerEnter={e=>{if(e.pointerType==='mouse' && !isInteracting())setActive('deck');}} onFocus={()=>setActive('deck')}>
          <div className="widget-label card-heading"><span>Figma Shortcut Sticker</span><CardArrow href="/projects/figma-sticker" label="Open Figma Shortcut Sticker"/></div>
          <Link href="/projects/figma-sticker" className="widget-link" aria-label="Open Figma Shortcut Sticker"><StickerDeck /></Link>
        </section>
        <section {...movable('claims')} className={`scatter-item scatter-claims ${active==='claims'?'is-active':''}`} aria-label="TD Securities Interest Claims case study" onPointerEnter={e=>{if(e.pointerType==='mouse' && !isInteracting())setActive('claims');}} onFocus={()=>setActive('claims')}>
          <div className="widget-label card-heading"><span>TD Securities Interest Claims</span></div>
          <div className="portfolio-experiment-card td-claims-card" aria-label="TD Securities Interest Claims, case study coming soon">
            <span className="td-claims-media"><img src="/assets/tdinterestclaims.png" alt="Interest Claims workspace with regional upload status and claim opportunities" draggable={false}/></span>
            <span className="card-kind">TD Internship · Coming Soon</span>
          </div>
        </section>
      </Scatter></div>
      {!indexLayout && <button disabled={!hydrated}
        className="grid-toggle"
        aria-label="Inspect widget grid"
        title="Inspect widget grid"
        onClick={() => {
          setSelected(5);
          setInspect(true);
        }}
      >
        <Grid2X2 />
      </button>}
      {selected !== null && (
        <div
          className="detail"
          role="dialog"
          aria-modal="true"
          aria-label={`${names[selected]} detail`}
        >
          <header className="detail-toolbar">
            <button disabled={!hydrated} ref={closeRef} onClick={() => setSelected(null)}>
              <ArrowLeft />
              All widgets
            </button>
            <span>{names[selected]}</span>
            <button disabled={!hydrated}
              className={inspect ? 'chosen' : ''}
              onClick={() => setInspect(!inspect)}
            >
              <Grid2X2 />
              Grid
            </button>
          </header>
          <div className={`detail-stage ${inspect ? 'inspecting' : ''}`}>
            <div className="detail-widget">{widget(selected)}</div>
            {inspect && (
              <div className="blueprint-wrap">
                <Blueprint height={heights[selected]} />
              </div>
            )}
          </div>
          <nav className="detail-nav">
            {names.map((name, i) => [1,2,3,9].includes(i)?null:(
              <button disabled={!hydrated}
                key={name}
                aria-label={`Show ${name}`}
                title={name}
                className={i === selected ? 'active' : ''}
                onClick={() => setSelected(i)}
              />
            ))}
          </nav>
        </div>
      )}
      {shaderOpen && <ShaderExperimentViewer onClose={closeShaderViewer} />}
    </Container>
  );
}
