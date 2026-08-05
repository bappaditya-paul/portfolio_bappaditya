"use client";

export function TopPattern() {
  return (
    <div className="border-x border-edge select-none screen-line-before screen-line-after before:-top-px after:-bottom-px">
      <div className="overflow-hidden p-5">
        <div className="h-full min-h-[70px] w-full pattern-dots px-[5px] sm:min-h-[110px]" />
      </div>
    </div>
  );
}
