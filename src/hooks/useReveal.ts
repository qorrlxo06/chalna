"use client";

import { useEffect, useRef, useState } from "react";

export interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * 스크롤 시 요소가 뷰포트에 진입하면 부드럽게 페이드인되도록 제어하는 커스텀 훅.
 * prefers-reduced-motion 사용자는 즉시 표시됩니다.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const { threshold = 0.08, rootMargin = "0px 0px -32px 0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
