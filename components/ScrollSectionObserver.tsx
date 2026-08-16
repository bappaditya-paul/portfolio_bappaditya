"use client";

import { useEffect, useRef } from "react";
import { playUISFX } from "@/lib/uisfx";

export function ScrollSectionObserver() {
  const lastActiveSection = useRef<string>("");
  const lastPlayTime = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Monitor main content sections on home page
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // High-precision midpoint intersection boundary
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Avoid playing on initial page load render
          if (sectionId && sectionId !== lastActiveSection.current) {
            const isInitial = lastActiveSection.current === "";
            lastActiveSection.current = sectionId;

            if (isInitial) return;

            const now = Date.now();
            // Throttle scroll ticks to 500ms to keep page scanning pleasant
            if (now - lastPlayTime.current > 500) {
              playUISFX("hover");
              lastPlayTime.current = now;
            }
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return null;
}

export default ScrollSectionObserver;
