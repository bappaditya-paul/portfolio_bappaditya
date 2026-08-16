"use client";

import { useEffect, useState } from "react";
import { createUISFX, type UISFXPlayer } from "uisfx";

let globalUISFX: UISFXPlayer | null = null;
let soundEnabled = true;
let currentPack = "scifi";

// Safely retrieve the UISFX instance on the client
export function getUISFX(): UISFXPlayer | null {
  if (typeof window === "undefined") return null;

  if (!globalUISFX) {
    try {
      // Read initial settings from localStorage on client mount
      const savedEnabled = localStorage.getItem("uisfx-enabled") !== "false";
      const savedPack = localStorage.getItem("uisfx-pack") || "scifi";
      soundEnabled = savedEnabled;
      currentPack = savedPack;

      // Instantiate with clean options per guidelines: volume 0.7, default pack scifi
      globalUISFX = createUISFX({
        pack: savedPack as any,
        volume: 0.7,
        enabled: savedEnabled,
      });

      // Lazy unlock on initial user gesture to respect browser autoplay policies
      const handleUnlock = () => {
        globalUISFX?.unlock().catch((err) => {
          console.warn("UISFX unlock failed:", err);
        });
        window.removeEventListener("click", handleUnlock);
        window.removeEventListener("keydown", handleUnlock);
        window.removeEventListener("touchstart", handleUnlock);
      };

      window.addEventListener("click", handleUnlock, { passive: true });
      window.addEventListener("keydown", handleUnlock, { passive: true });
      window.addEventListener("touchstart", handleUnlock, { passive: true });
    } catch (e) {
      console.warn("Failed to initialize UISFX:", e);
    }
  }

  return globalUISFX;
}

// Global play helper that can be called from anywhere (SSR safe)
export function playUISFX(cue: string) {
  if (typeof window === "undefined" || !soundEnabled) return null;
  
  try {
    const fx = getUISFX();
    if (fx) {
      const handle = fx.play(cue as any);
      return handle; // Handle play returning null safely
    }
  } catch (e) {
    console.warn(`Failed to play UISFX cue "${cue}":`, e);
  }
  return null;
}

// React Hook for component state synchronization
export function useUISFX() {
  const [enabled, setEnabledState] = useState(true);
  const [pack, setPackState] = useState("scifi");

  useEffect(() => {
    const savedEnabled = localStorage.getItem("uisfx-enabled") !== "false";
    const savedPack = localStorage.getItem("uisfx-pack") || "scifi";
    
    soundEnabled = savedEnabled;
    currentPack = savedPack;
    
    setEnabledState(savedEnabled);
    setPackState(savedPack);
  }, []);

  const toggleSound = () => {
    const nextState = !enabled;
    soundEnabled = nextState;
    setEnabledState(nextState);
    localStorage.setItem("uisfx-enabled", String(nextState));
    
    const fx = getUISFX();
    if (fx) {
      // Prior to disabling, stop active loops & cues immediately per guidelines
      if (!nextState) {
        fx.stopAll();
      }
      fx.setEnabled(nextState);
    }

    if (nextState) {
      setTimeout(() => {
        playUISFX("success");
      }, 50);
    }
  };

  const changePack = (newPack: string) => {
    try {
      const fx = getUISFX();
      if (fx) {
        fx.setPack(newPack as any);
        currentPack = newPack;
        setPackState(newPack);
        localStorage.setItem("uisfx-pack", newPack);
        playUISFX("success");
      }
    } catch (e) {
      console.warn(`Failed to change UISFX pack to "${newPack}":`, e);
    }
  };

  return {
    isEnabled: enabled,
    toggleSound,
    pack,
    changePack,
    play: playUISFX,
  };
}
