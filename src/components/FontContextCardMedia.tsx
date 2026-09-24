'use client';

import { useRef, useState } from 'react';

export default function FontContextCardMedia() {
  const cover = useRef<HTMLVideoElement>(null);
  const followUp = useRef<HTMLVideoElement>(null);
  const [showFollowUp, setShowFollowUp] = useState(false);

  const continueSequence = () => {
    const video = followUp.current;
    setShowFollowUp(true);
    if (video) {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    }
  };

  const restartSequence = () => {
    const video = cover.current;
    setShowFollowUp(false);
    if (video) {
      video.currentTime = 0;
      void video.play().catch(() => undefined);
    }
  };

  return (
    <div className={`fontcontext-card-media${showFollowUp ? ' is-follow-up' : ''}`}>
      <video ref={cover} className="fontcontext-card-cover" src="/assets/fontcontext-card.mp4" autoPlay muted playsInline preload="auto" onEnded={continueSequence} aria-hidden={showFollowUp} />
      <video ref={followUp} className="fontcontext-card-follow-up" src="/assets/fontcontext-follow-up.mp4" muted playsInline preload="auto" onEnded={restartSequence} aria-hidden={!showFollowUp} />
    </div>
  );
}
