import type { Metadata } from 'next';
import Link from 'next/link';
import CaseStudyControls from '@/components/CaseStudyControls';
import AboutPhotoPile, { type PilePhoto } from '@/components/AboutPhotoPile';
import './about.css';
export const metadata:Metadata={title:'About Chrisandra Vaz',description:'Product designer, Design and Business student at Waterloo, and Figma Campus Leader.'};
const pilePhotos:PilePhoto[]=[
 {src:'/assets/about/about-4-community.jpg',alt:'Group photograph from a Figma community event',rotate:-7,x:-70,y:40},
 {src:'/assets/about/about-3-mewtwo.jpg',alt:'Chrisandra beside a Mewtwo statue',rotate:5,x:40,y:-30},
 {src:'/assets/about/about-2-golden-gate.jpg',alt:'Chrisandra in front of the Golden Gate Bridge',rotate:-3,x:-30,y:-60},
 {src:'/assets/about/about-1-installation.jpg',alt:'Chrisandra under a colourful textile installation',rotate:3,x:20,y:20},
];
export default function AboutPage(){return <main className="about-page"><header className="about-top"><Link href="/" className="about-back">‹ Back to Home</Link><CaseStudyControls /></header><div className="about-content"><section className="about-hero"><header className="about-intro"><p className="about-kicker" aria-hidden="true">About me.</p><h1><span className="sr-only">About me. </span>I&apos;m a product designer with more than 3 years of experience in a variety of domains.</h1><p>I’m driven by curiosity: complex UX problems, pushed boundaries, and collaboration with creative people.</p><p>I’m a Design &amp; Business student at the University of Waterloo, where I build the design community as a Figma Campus Leader.</p><p>I design with purpose, and I give back by mentoring and speaking at hackathons and DEI initiatives for young teens.</p></header>
<div className="about-hero-pile"><p className="about-pile-label">Gotcha I see you 👀</p><p className="about-pile-hint">Pssst...You can drag the photographs<svg viewBox="0 0 32 48" width="26" height="39" aria-hidden="true"><path d="M8 4c12 5-2 14 6 22s12 8 4 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M11 36l7 7 6-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></p><AboutPhotoPile photos={pilePhotos}/></div></section>
<footer className="about-footer"><p>Designed + Coded with ♡ by Chrisandra</p><nav aria-label="Contact links"><a href="https://ca.linkedin.com/in/chrisandra-vaz">LinkedIn</a><a href="mailto:chrisandravaz12@gmail.com">Email</a><a href="https://github.com/ChrisandraVaz">GitHub</a></nav></footer></div></main>}
