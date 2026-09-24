"use client";
import { useEffect, useRef, useState } from "react";

export default function SketchIntro() {
  const [isDrawMode, setIsDrawMode] = useState(false);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);


  useEffect(() => {
    const resizeCanvas = () => {
      const panel = leftPanelRef.current;
      const canvas = canvasRef.current;
      if (!panel || !canvas) return;
      const { clientWidth: width, clientHeight: height } = panel;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#e91e8c";
    };

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    if (leftPanelRef.current) observer.observe(leftPanelRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isDrawMode) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDrawMode(false);
        drawingRef.current = false;
        const canvas = canvasRef.current;
        canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isDrawMode]);

  const pointFromEvent = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * event.currentTarget.clientWidth / rect.width,
      y: (event.clientY - rect.top) * event.currentTarget.clientHeight / rect.height,
    };
  };

  const onDrawStart = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode) return;
    drawingRef.current = true;
    const p = pointFromEvent(event);
    const ctx = event.currentTarget.getContext("2d");
    ctx?.beginPath();
    ctx?.moveTo(p.x, p.y);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onDrawMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode || !drawingRef.current) return;
    const p = pointFromEvent(event);
    const ctx = event.currentTarget.getContext("2d");
    ctx?.lineTo(p.x, p.y);
    ctx?.stroke();
    ctx?.beginPath();
    ctx?.moveTo(p.x, p.y);
  };

  const onDrawEnd = () => {
    drawingRef.current = false;
  };

  const toggleDrawMode = () => {
    setIsDrawMode((prev) => {
      const next = !prev;
      if (!next) {
        drawingRef.current = false;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      return next;
    });
  };
  return <section ref={leftPanelRef} className="profile-intro original-intro">
    <canvas ref={canvasRef} className={`draw-layer ${isDrawMode ? "active" : ""}`} aria-label="Drawing canvas" onPointerDown={onDrawStart} onPointerMove={onDrawMove} onPointerUp={onDrawEnd} onPointerCancel={onDrawEnd}/>
    <h1 className="hero-headline">
      <span className="name-squiggle">Chrisandra</span>{" "}
      <span className="pencil-wrap"><button type="button" onClick={toggleDrawMode} className={`inline-block twitch-symbol pencil-trigger pencil-attention ${isDrawMode ? "active" : ""}`} aria-label={isDrawMode ? "Disable drawing mode" : "Enable drawing mode"} aria-pressed={isDrawMode}>✐</button></span>{" "}
      is a product designer{" "}<span className="intro-details">at Waterloo who ships products that click{" "}<span className="inline-block">✦</span> builds agentic workflows and design systems in Figma and code{" "}<span className="inline-block">✧</span>.</span>
    </h1>
  </section>;
}
