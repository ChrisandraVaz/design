"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return !isTouch;
  });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="cursor"
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
}
