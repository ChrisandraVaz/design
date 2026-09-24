// Explanatory wireframes of the documented alternatives, not final product UI.
export default function QueueConceptSketch({ mode }: { mode: string }) {
  const drawer = mode !== 'final';
  const closed = mode === 'collapsed';
  return <div className="queue-concept-sketch" aria-label={closed ? 'Collapsed queue above the composer' : `${drawer ? 'Drawer with multiple messages' : 'One pending message'} above the composer`} role="img">
    <div className="qcs-header">Seer</div>
    <div className="qcs-response"><i /><i /><i /></div>
    <div className={`qcs-pending${drawer ? ' qcs-drawer' : ''}`}>
      {drawer && <div className="qcs-count"><span>{closed ? '›' : '⌄'} Queued · 2</span></div>}
      {!closed && <>
        <div className="qcs-row"><span>Next question</span><b>{mode === 'controls' ? '↑ ✎ ×' : mode === 'reorder' ? '✎ ×' : '×'}</b></div>
        {drawer && <div className="qcs-row"><span>Another question</span><b>{mode === 'controls' ? '↑ ✎ ×' : '✎ ×'}</b></div>}
      </>}
    </div>
    <div className="qcs-composer"><span>Ask Seer…</span><span>↑</span></div>
  </div>;
}
