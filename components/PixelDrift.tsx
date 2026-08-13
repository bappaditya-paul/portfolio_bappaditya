"use client";

import { useEffect, useRef, useState } from "react";

interface PixelDriftProps {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  gap?: number;
  speed?: number;
  maxDistance?: number;
  resetDelay?: number;
  align?: "left" | "center" | "right";
  className?: string;
}

interface Pixel {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  settled: boolean;
}

export default function PixelDrift({
  text = "PIXEL DRIFT",
  fontSize = 48,
  fontFamily = "monospace",
  color = "#ff6600",
  gap = 4,
  speed = 3,
  maxDistance = 120,
  resetDelay = 2000,
  align = "left",
  className,
}: PixelDriftProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interactingRef = useRef(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Build pixel map from text
  function buildPixels(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    const textX =
      align === "left" ? gap * 2
      : align === "right" ? canvas.width - gap * 2
      : canvas.width / 2;
    ctx.fillText(text, textX, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels: Pixel[] = [];

    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const idx = (y * canvas.width + x) * 4;
        if (imageData.data[idx + 3] > 128) {
          pixels.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            originX: x,
            originY: y,
            color,
            size: gap - 1,
            vx: 0,
            vy: 0,
            settled: false,
          });
        }
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pixelsRef.current = pixels;
  }

  function animate() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    pixelsRef.current.forEach((p) => {
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.hypot(dx, dy);

      if (dist < maxDistance && interactingRef.current) {
        // Repel from cursor
        const force = (maxDistance - dist) / maxDistance;
        p.vx -= (dx / dist) * force * speed * 1.5;
        p.vy -= (dy / dist) * force * speed * 1.5;
        p.settled = false;
      } else {
        // Return to origin
        const tx = p.originX - p.x;
        const ty = p.originY - p.y;
        p.vx += tx * 0.08;
        p.vy += ty * 0.08;
      }

      p.vx *= 0.78;
      p.vy *= 0.78;
      p.x += p.vx;
      p.y += p.vy;

      const distToOrigin = Math.hypot(p.x - p.originX, p.y - p.originY);
      if (distToOrigin < 0.5 && Math.abs(p.vx) < 0.1 && Math.abs(p.vy) < 0.1) {
        p.settled = true;
        p.x = p.originX;
        p.y = p.originY;
      }

      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    animFrameRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ w: Math.round(width), h: Math.round(height) });
      }
    });

    const parent = canvas.parentElement;
    if (parent) observer.observe(parent);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.w === 0 || size.h === 0) return;

    canvas.width = size.w;
    canvas.height = size.h;
    buildPixels(canvas);

    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animFrameRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, text, fontSize, fontFamily, color, gap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      interactingRef.current = true;

      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        interactingRef.current = false;
        mouseRef.current = { x: -9999, y: -9999 };
      }, resetDelay);
    };

    const handleMouseLeave = () => {
      interactingRef.current = false;
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [resetDelay]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
