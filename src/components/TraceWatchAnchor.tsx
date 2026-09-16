import './trace-watch.css';

/** The user's approved cover, kept intact rather than replaced by the motion model. */
export default function TraceWatchAnchor() {
  // Keep the supplied image unaltered and reserve its intrinsic ratio before loading.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="trace-watch-anchor" src="/trace/watch-cover.png" width={764} height={1204} alt="Original Trace design on a purple-band Apple Watch" decoding="async" fetchPriority="high" draggable={false}/>;
}
