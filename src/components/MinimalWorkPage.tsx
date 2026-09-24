/* Image-led work page in the same header format as the other case studies. */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import './minimal-work.css';

export type MinimalWorkImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional padded frame behind the image. */
  frame?: 'light' | 'dark';
  caption?: string;
};

export type MinimalWorkProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Optional lead image between the title and the facts row. */
  hero?: MinimalWorkImage;
  meta: { label: string; value: string }[];
  images: MinimalWorkImage[];
};

function Frame({ image, eager = false }: { image: MinimalWorkImage; eager?: boolean }) {
  return (
    <div className={`mw-frame${image.frame ? ` is-${image.frame}` : ''}`}>
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} />
    </div>
  );
}

export default function MinimalWorkPage({ eyebrow, title, description, hero, meta, images }: MinimalWorkProps) {
  return (
    <article className="mw">
      <div className="mw-inner">
        <Link href="/" className="mw-back">‹ Back to Home</Link>
        <header className="mw-header">
          <span className="mw-kicker">{eyebrow}</span>
          <h1>{title}</h1>
        </header>
        {hero && (
          <figure className="mw-hero">
            <Frame image={hero} eager />
            {hero.caption && <figcaption>{hero.caption}</figcaption>}
          </figure>
        )}
        <dl className="mw-facts">
          {meta.map(m => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mw-desc">{description}</p>
        <ol className="mw-images">
          {images.map((img, i) => (
            <li key={img.src} className="mw-item">
              <figure>
                <Frame image={img} eager={!hero && i === 0} />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ol>
        <footer className="mw-footer">
          <p>Designed + Coded with ♡ by Chrisandra</p>
          <nav aria-label="Contact links">
            <a href="https://ca.linkedin.com/in/chrisandra-vaz">LinkedIn</a>
            <a href="mailto:chrisandravaz12@gmail.com">Email</a>
            <a href="https://github.com/ChrisandraVaz">GitHub</a>
          </nav>
        </footer>
      </div>
    </article>
  );
}
