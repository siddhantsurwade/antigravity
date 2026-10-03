import React from "react";

interface BuildingMotifProps {
  className?: string;
  pulse?: boolean;
}

export function BuildingMotif({ className = "", pulse = false }: BuildingMotifProps) {
  return (
    <span
      className={`inline-flex items-center justify-center relative ${className}`}
      aria-hidden="true"
    >
      {pulse && (
        <span className="absolute inline-flex h-2 w-2 rounded-[2px] bg-[var(--accent)] opacity-75 animate-ping" />
      )}
      <span className="relative inline-flex h-2 w-2 rounded-[2px] bg-[var(--accent)]" />
    </span>
  );
}
