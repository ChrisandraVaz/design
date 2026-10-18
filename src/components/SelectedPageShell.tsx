"use client";
import {type ReactNode} from 'react';
import {useTheme} from '@/hooks/useTheme';
import {useHydrated} from '@/hooks/useHydrated';
import {FiArrowLeft,FiMoon,FiSun} from 'react-icons/fi';
import Link from 'next/link';
import './about-page-shell.css';

export default function SelectedPageShell({children,active='work'}:{children:ReactNode;active?:'work'|'about'}) {
 const hydrated=useHydrated();
 const {theme,toggleTheme}=useTheme();
 return <div className={`selected-home${active==='about'?' selected-about':''}`} data-theme={theme}>
  <a className="selected-skip" href={active==='work'?'#selected-work':'#about-content'}>Skip to {active==='work'?'selected work':'about content'}</a>
  <header className="selected-topbar">
   <nav className="selected-navigation" aria-label="Main navigation">
    {active==='about'?<Link href="/" className="about-back" aria-label="Back to work"><FiArrowLeft aria-hidden="true"/></Link>:<>
    <Link href={active==='work'?'#selected-work':'/'} aria-current={active==='work'?'page':undefined}>Work</Link>
    <Link href="/about" >About</Link>
    </>}
    <button className="selected-theme-toggle" type="button" disabled={!hydrated} onClick={toggleTheme} aria-label={theme==='light'?'Switch to dark mode':'Switch to light mode'}>{theme==='light'?<FiMoon/>:<FiSun/>}</button>
   </nav>
  </header>
  {children}
 </div>;
}
