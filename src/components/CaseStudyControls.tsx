'use client';

import Link from 'next/link';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';
import './case-study-controls.css';

export default function CaseStudyControls() {
  const { theme, toggleTheme } = useTheme();
  return <nav className="case-site-controls" data-theme={theme} aria-label="Portfolio navigation">
    <Link href="/#work">Work</Link>
    <Link href="/about">About</Link>
    <button onClick={toggleTheme} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>{theme === 'light' ? <FiMoon /> : <FiSun />}</button>
  </nav>;
}
