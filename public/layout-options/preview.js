export function layoutCSS(layout) {
  const scope = '.canvas-folio:not(.index-folio) .widget-world';
  return `@media (min-width:1101px) {
    ${scope} .scatter-viewport { --puzzle-width:${layout.width}px; --puzzle-height:${layout.height}px; --canvas-scale:tan(atan2(var(--frame-width, min(1600px, calc(100cqw - 2 * var(--folio-gutter)))),var(--puzzle-width))); }
    ${layout.cards.map(card => {
      const cls = card.id === 'fontcontext' ? 'scatter-fontcontext-slot' : `scatter-${card.id}`;
      return `${scope} .scatter .${cls} { --puzzle-x:${card.x}px; --puzzle-y:${card.y}px; }`;
    }).join('\n')}
  }`;
}
