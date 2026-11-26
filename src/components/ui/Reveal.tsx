"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div
      ref={ref}
      data-hydrated={hydrated ? "true" : "false"}
      data-visible={isVisible ? "true" : "false"}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`reveal-block ${className}`}
    >
      {children}
    </div>
  );
}
