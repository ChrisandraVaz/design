"use client";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
import SketchIntro from "./SketchIntro";
import WidgetCanvas from "./WidgetCanvas";

export default function PortfolioIndex() {
  return <main id="work" className="portfolio-index">
    <aside className="index-sidebar">
      <div className="index-intro">
        <SketchIntro />
      </div>
      <div className="index-socials"><SocialLinks /><span className="index-availability"><span aria-hidden="true" />Open to opportunities</span></div>
      <div className="index-contact">
        <div><p>Interested in working together?</p>
        <p className="index-contact-note">Book a time <a href="https://calendly.com/chrisandravaz12/30min" target="_blank" rel="noreferrer">here</a> if you’d like to chat.</p></div>
        <Link className="index-about" href="/about">About Me</Link>
      </div>
      <div className="index-experience">
        <h2>Current</h2>
        <dl><div><dt>Figma</dt><dd>Campus Leader</dd></div></dl>
        <h2>Previous</h2>
        <dl>
          <div><dt>Sentry</dt><dd>Product Design Intern <span>’26</span></dd></div>
          <div><dt>TD Bank</dt><dd>UX Developer <span>’25</span></dd></div>
          <div><dt>IBM</dt><dd>Design Fellow <span>’24</span></dd></div>
          <div><dt>TD Bank</dt><dd>Product Design Intern <span>’24</span></dd></div>
          <div><dt>TD Bank</dt><dd>Product Design Intern <span>’23</span></dd></div>
        </dl>
      </div>
    </aside>
    <section className="index-component-gallery" aria-label="Canvas components">
      <WidgetCanvas layout="index" />
    </section>
  </main>;
}
