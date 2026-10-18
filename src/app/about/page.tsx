import type {Metadata} from 'next';
import SelectedPageShell from '@/components/SelectedPageShell';
import AboutPhotoStrip,{type AboutPhoto} from '@/components/AboutPhotoStrip';
import './about.css';
export const metadata:Metadata={title:'About Chrisandra Vaz',description:'Product designer, Design and Business student at Waterloo, and Figma Campus Leader.'};
const photos:AboutPhoto[]=[
 {src:'/assets/about/about-1-installation.jpg',alt:'Chrisandra under a colourful textile installation'},
 {src:'/assets/about/about-4-community.jpg',alt:'Group photograph from a Figma community event'},
 {src:'/assets/about/about-2-golden-gate.jpg',alt:'Chrisandra in front of the Golden Gate Bridge'},
 {src:'/assets/about/about-3-mewtwo.jpg',alt:'Chrisandra beside a Mewtwo statue'},
];
export default function AboutPage(){return <SelectedPageShell active="about">
 <main id="about-content" className="about-page">
  <AboutPhotoStrip photos={photos}/>
  <section className="about-content about-story" aria-labelledby="about-heading">
   <header className="about-intro">
    <p className="about-kicker">About me</p>
    <h1 id="about-heading">I&apos;m a product designer with more than 3 years of experience in a variety of domains.</h1>
   </header>
   <div className="about-copy">
    <p>I’m driven by curiosity: complex UX problems, pushing boundaries and collaborating with creative people.</p>
    <p>I’m a Design &amp; Business student at the University of Waterloo, where I build the design community as a Campus Leader @ Figma.</p>
    <p>I’m interested in solving hard design problems across agents, data, infrastructure, and complex enterprise services.</p>
    <p>In my free time, I like giving back by mentoring or judging at hackathons and supporting DEI tech initiatives.</p>
   </div>
  </section>
 </main>
 </SelectedPageShell>}
