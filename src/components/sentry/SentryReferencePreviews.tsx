"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./sentry-reference-previews.css";

function usePreviewSequence(length: number, paused = false, duration = 3400) {
  const [scene, setScene] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (ref.current) observer.observe(ref.current);
    const timer = setInterval(() => {
      if (visible && !paused && !document.hidden && !motion.matches)
        setScene((n) => (n + 1) % length);
    }, duration);
    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [length, paused, duration]);
  return { scene, ref };
}

function useTooltipSequence(length: number, paused = false) {
  const [scene, setScene] = useState(0);
  const [phase, setPhase] = useState<"entering" | "holding" | "leaving">("entering");
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(motion.matches);
    const syncVisibility = () => setDocumentVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    syncMotion();
    syncVisibility();
    if (ref.current) observer.observe(ref.current);
    motion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);
  useEffect(() => {
    if (!visible || paused || reduced || !documentVisible) return;
    const start = window.setTimeout(() => setPhase("entering"), 0);
    const hold = window.setTimeout(() => setPhase("holding"), 460);
    const leave = window.setTimeout(() => setPhase("leaving"), 3000);
    const next = window.setTimeout(() => {
      setPhase("entering");
      setScene((value) => (value + 1) % length);
    }, 3260);
    return () => {
      clearTimeout(start);
      clearTimeout(hold);
      clearTimeout(leave);
      clearTimeout(next);
    };
  }, [scene, visible, paused, reduced, documentVisible, length]);
  const renderedPhase = !visible || paused || reduced || !documentVisible ? "holding" : phase;
  return { scene, phase: renderedPhase, ref };
}

// Eight structurally distinct specimens from the author's component board.
// Near-duplicates are intentionally omitted from the cover sequence.
const specimens = [
  { title: "First Seen", value: "8 months ago", width: "small" },
  { title: "Events", value: "10,085", width: "small" },
  { title: "Timestamp precision", value: "", width: "medium" },
  { title: "Latency", value: "12 seconds", width: "medium" },
  { title: "Event timing", value: "", width: "wide" },
  { title: "Chrisandra Vaz", value: "chrisandra.vaz@sentry.io", width: "wide" },
  { title: "Performance scores", value: "", width: "wide" },
  { title: "Percentiles", value: "", width: "medium" },
];
const colors = ["#f42ba0", "#ff942e", "#ffca00", "#69bf00"];
export function RelativeTimeSpecimen({ scene = 0 }: { scene?: number }) {
  const index = Math.max(0, Math.min(scene, specimens.length - 1));
  const spec = specimens[index];
  return (
    <div className={`rt-specimen rt-${spec.width} rt-scene-${index}`}>
      {index < 2 ? (
        <>
          <div className="rt-heading"><strong>{spec.title}</strong><span>{spec.value}</span></div>
          <div className="rt-dates">
            <div><span className="rt-zone">PDT</span><span>Jul 28, 2026</span><time>11:40 PM</time></div>
            <div><span className="rt-zone rt-utc">UTC</span><span>Jul 29, 2026</span><time>6:40 AM</time></div>
          </div>
        </>
      ) : index === 2 ? (
        <div className="rt-dates rt-precision">
          <div><span className="rt-zone">PDT</span><span>Jul 28, 2026</span><time>4:46:52.942 PM</time></div>
          <div><span className="rt-zone rt-utc">UTC</span><span>Jul 29, 2026</span><time>11:46:52.942 PM</time></div>
        </div>
      ) : index === 3 ? (
        <>
          <div className="rt-heading"><strong>Latency</strong><span>12 seconds</span></div>
          <div className="rt-detail-rows">
            <div><strong>Occurred</strong><span>Jul 20, 2026</span><time>2:25:50 PM PDT</time></div>
            <div><strong>Received</strong><span>Jul 20, 2026</span><time>2:26:02 PM PDT</time></div>
          </div>
        </>
      ) : index === 4 ? (
        <>
          <div className="rt-detail-rows rt-event-rows">
            <div><strong>Occurred</strong><span>Jul 29, 2026&nbsp; 11:46:52.998 PM UTC</span><time>(1785368812998)</time></div>
            <div><strong>Received</strong><span>Jul 29, 2026&nbsp; 4:46:52.998 PM PDT</span><time>(1785368812998)</time></div>
          </div>
          <div className="rt-footer"><span>Add your local timezone</span></div>
        </>
      ) : index === 5 ? (
        <>
          <div className="rt-heading rt-person-heading"><strong><i>CV</i>Chrisandra Vaz</strong><span>chrisandra.vaz@sentry.io</span></div>
          <div className="rt-dates">
            <div><span className="rt-zone">PDT</span><span>Jul 29, 2026</span><time>3:40 PM</time></div>
            <div><span className="rt-zone rt-utc">UTC</span><span>Jul 29, 2026</span><time>10:40 PM</time></div>
          </div>
        </>
      ) : (
        <>
          <div className="rt-series">
            {(index === 7
              ? ["p99( )", "p95( )", "p75( )", "p50( )"]
              : [
                  "performance_score(measurements.score.lcp)",
                  "performance_score(measurements.score.fcp)",
                  "performance_score(measurements.score)",
                  "performance_score(measurements.score.cls)",
                  "performance_score(measurements.score.ttfb)",
                ]
            ).map((label, i) => (
              <div key={i}>
                <i
                  style={{
                    background:
                      index === 6
                        ? ["#7951ff", "#37177c", ...colors][i]
                        : colors[i],
                  }}
                />
                <span>{label}</span>
                <b>
                  {index === 7
                    ? ["181.15ms", "173.01ms", "92.43ms", "71.07ms"][i]
                    : ["16.064", "10.772", "21.362", "13.2958", "2.788"][i]}
                </b>
              </div>
            ))}
          </div>
          <div className="rt-footer">
            <span>Jul 22, 2026 9:30 PM UTC</span>
            {index === 6 && <span>Add your local timezone</span>}
          </div>
        </>
      )}
    </div>
  );
}
export function RelativeTimePreview({ paused = false }: { paused?: boolean }) {
  const { scene, phase, ref } = useTooltipSequence(specimens.length, paused);
  return (
    <div
      ref={ref}
      className="relative-time-reference sentry-demo is-compact"
      data-variant={scene}
      aria-label={`Relative time design: ${specimens[scene].title || "Timestamp precision"}`}
    >
      <div className="rt-preview-deck">
        {specimens.map((_, i) => (
          <div
            key={i}
            className={`rt-preview-layer ${scene === i ? `is-current is-${phase}` : ""}`}
            aria-hidden={scene !== i}
          >
            <RelativeTimeSpecimen scene={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
export function SplitPanelPreview({ paused = false }: { paused?: boolean }) {
  const { scene, ref } = usePreviewSequence(6, paused, 2200);
  const [dragRatio, setDragRatio] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [manual, setManual] = useState(false);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const scriptedRatio = [40, 40, 40, 62, 30, 40][scene];
  const ratio = dragRatio ?? scriptedRatio;
  const panelVisible = manual || scene >= 2;
  const active = dragging || hovered || (!manual && (scene === 3 || scene === 4));
  const updateRatio = (clientX: number) => {
    const box = surfaceRef.current?.getBoundingClientRect();
    if (!box) return;
    setDragRatio(Math.max(20, Math.min(80, ((clientX - box.left) / box.width) * 100)));
  };
  return (
    <div
      ref={ref}
      className="split-reference-preview sentry-demo is-compact"
      data-scene={scene}
      data-view={panelVisible ? "panel" : "terminal"}
      data-paused={paused}
    >
      <div className={`sp-terminal-stage ${panelVisible ? "" : "is-visible"}`}>
        <div className="sp-terminal-window">
          <header>
            <span className="sp-window-dots" aria-hidden="true"><i/><i/><i/></span>
            <span>components/SplitPanel.tsx</span>
            <b>tsx</b>
          </header>
          <div className="sp-terminal-code" aria-hidden="true">
            <pre className={scene === 0 ? "is-current" : ""}><code><span className="syntax-tag">&lt;SplitPanel</span>{"\n  "}<span className="syntax-prop">orientation</span><span className="syntax-equals">=</span>{"{{"}<span className="syntax-prop">xs</span>: <span className="syntax-string">&apos;vertical&apos;</span>, <span className="syntax-prop">md</span>: <span className="syntax-string">&apos;horizontal&apos;</span>{"}}"}{"\n  "}<span className="syntax-prop">defaultSize</span><span className="syntax-equals">=</span>{"{220}"}{"\n  "}<span className="syntax-prop">sized</span><span className="syntax-equals">=</span>{"{<"}<span className="syntax-tag">Sidebar</span>{" />}"}{"\n  "}<span className="syntax-prop">fill</span><span className="syntax-equals">=</span>{"{<"}<span className="syntax-tag">Content</span>{" />}"}{"\n"}<span className="syntax-tag">/&gt;</span></code></pre>
            <pre className={scene === 1 ? "is-current" : ""}><code><span className="syntax-tag">&lt;SplitPanel</span>{"\n  "}<span className="syntax-prop">defaultSize</span><span className="syntax-equals">=</span>{"{300}"}{"\n  "}<span className="syntax-prop">minSize</span><span className="syntax-equals">=</span>{"{120}"}{"\n  "}<span className="syntax-prop">fillMinSize</span><span className="syntax-equals">=</span>{"{120}"}{"\n  "}<span className="syntax-prop">sized</span><span className="syntax-equals">=</span>{"{<"}<span className="syntax-tag">SizedPane</span>{" />}"}{"\n  "}<span className="syntax-prop">fill</span><span className="syntax-equals">=</span>{"{<"}<span className="syntax-tag">FillPane</span>{" />}"}{"\n"}<span className="syntax-tag">/&gt;</span></code></pre>
          </div>
        </div>
      </div>
      <div className={`sp-panel-stage ${panelVisible ? "is-visible" : ""}`}>
        <div className="sp-document-frame">
          <div
            ref={surfaceRef}
            className={`sp-reference-surface ${dragging ? "is-dragging" : ""}`}
            style={{ "--split-position": `${ratio}%` } as CSSProperties}
          >
            <div className="sp-sized-pane">Sized pane</div>
            <div
              className={`sp-reference-divider ${active ? "is-active" : ""}`}
              onPointerEnter={() => { setManual(true); setHovered(true); }}
              onPointerLeave={() => setHovered(false)}
              onPointerDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setManual(true);
                setDragging(true);
                event.currentTarget.setPointerCapture(event.pointerId);
                updateRatio(event.clientX);
              }}
              onPointerMove={(event) => {
                if (dragging) updateRatio(event.clientX);
              }}
              onPointerUp={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setDragging(false);
                if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
              }}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <i />
              <svg viewBox="0 0 20 12" aria-hidden="true">
                <path d="M1 6l4-4v3h10V2l4 4-4 4V7H5v3Z" fill="#27212f" stroke="white" strokeWidth=".7" />
              </svg>
            </div>
            <div className="sp-fill-pane">Fill pane</div>
          </div>
        </div>
      </div>
    </div>
  );
}
