/** Small diagrams keyed to the idea, rather than repeated directional arrows. */
export default function EditorialIcon({kind}:{kind:'queue'|'measure'|'states'|'layout'|'audit'|'adoption'|'align'|'hierarchy'|'precision'|'system'|'time'|'migration'}) {
  const paths = {
    queue:<><rect x="3" y="4" width="18" height="5" rx="1"/><path d="M6 13h15M6 18h15"/><circle cx="3" cy="13" r=".7"/><circle cx="3" cy="18" r=".7"/></>,
    measure:<><path d="M4 20V4M4 20h17"/><path d="M8 16v-5M13 16V7M18 16V3"/></>,
    states:<><rect x="2" y="8" width="5" height="8" rx="1"/><rect x="9.5" y="5" width="5" height="14" rx="1"/><rect x="17" y="8" width="5" height="8" rx="1"/></>,
    layout:<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 4v16M13 10v4"/></>,
    audit:<><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6M7 10l2 2 4-4"/></>,
    adoption:<><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4H5v4m7-4h7v4"/></>,
    align:<><path d="M8 3v18M16 3v18M3 6h2M11 6h2M19 6h2M3 12h2M11 12h2M19 12h2M3 18h2M11 18h2M19 18h2"/></>,
    hierarchy:<><rect x="3" y="3" width="18" height="5" rx="1"/><path d="M3 12h12M3 16h18M3 20h9"/></>,
    precision:<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/></>,
    system:<><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><path d="M14 18h8M18 14v8"/></>,
    time:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    migration:<><rect x="2" y="3" width="8" height="7" rx="1"/><rect x="14" y="14" width="8" height="7" rx="1"/><path d="M14 6h4v4M10 18H6v-4M5 14h2M17 10h2"/></>,
  };
  return <svg className="editorial-idea-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}
