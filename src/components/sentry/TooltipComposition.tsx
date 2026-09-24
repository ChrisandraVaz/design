'use client';
import { useState } from 'react';
import { RelativeTimeSpecimen } from './SentryReferencePreviews';
import './tooltip-composition.css';

const compositions = [
  { name: 'Relative time', scene: 0, rows: [
    ['Header', 'What the timestamp describes, plus its relative age.'],
    ['Body', 'Local time and UTC in aligned date and time rows.'],
    ['Footer', 'Not needed for this composition.'],
  ] },
  { name: 'Latency', scene: 3, rows: [
    ['Header', 'The duration is the primary value.'],
    ['Body', 'Occurred and received times explain that duration.'],
    ['Footer', 'Not needed for this composition.'],
  ] },
  { name: 'Chart series', scene: 6, rows: [
    ['Header', 'Omitted so the series values lead.'],
    ['Body', 'Repeatable rows pair each series with its value.'],
    ['Footer', 'A shared timestamp and an action to add local time.'],
  ] },
];

export default function TooltipComposition() {
  const [selected, setSelected] = useState(0);
  const composition = compositions[selected];
  return <div className="tooltip-composition">
    <div className="tc-options" role="group" aria-label="Tooltip compositions">
      {compositions.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="tooltip-composition-example" onClick={() => setSelected(index)}>{item.name}</button>)}
    </div>
    <div className="tc-layout" id="tooltip-composition-example">
      <div className="tc-specimen" tabIndex={composition.scene === 6 ? 0 : undefined} aria-label="Component example"><RelativeTimeSpecimen scene={composition.scene} /></div>
      <dl className="tc-slots" aria-live="polite" aria-label={`${composition.name} component anatomy`}>
        {composition.rows.map(([name, description]) => <div key={name}><dt>{name}</dt><dd>{description}</dd></div>)}
      </dl>
    </div>
    {composition.scene === 6 && <p className="tc-overflow-hint">Scroll within the example to inspect all values.</p>}
    <p className="tc-note">The wrapper and pointer stay consistent. Each composition uses only the rows its content needs.</p>
  </div>;
}
