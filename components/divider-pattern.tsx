"use client";

export function DividerPattern() {
  return (
    <div className="relative flex h-6 w-full border-x border-edge">
      <div 
        className="absolute left-[-100vw] top-0 -z-[1] h-6 w-[200vw] pattern-diagonal"
      />
    </div>
  );
}
