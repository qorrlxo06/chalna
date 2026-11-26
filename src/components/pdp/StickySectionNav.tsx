"use client";

import { useEffect, useState } from "react";

export interface SectionItem {
  id: string;
  label: string;
}

const DEFAULT_SECTIONS: SectionItem[] = [
  { id: "stage-1", label: "핵심 특징" },
  { id: "stage-2", label: "구성" },
  { id: "stage-3", label: "사용 순서" },
  { id: "stage-4", label: "사양·관리" },
  { id: "stage-5", label: "이야기" },
];

export function StickySectionNav({
  sections = DEFAULT_SECTIONS,
}: {
  sections?: SectionItem[];
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "stage-1");

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-140px 0px -55% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="상세페이지 섹션 바로가기"
      className="sticky top-16 md:top-[72px] z-30 w-full border-y border-line bg-bg/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <ul className="flex items-center gap-6 sm:gap-8 overflow-x-auto whitespace-nowrap no-scrollbar -mb-[1px]">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  onClick={() => setActiveId(section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`inline-flex min-h-[48px] items-center text-[14px] border-b-2 transition-colors ${
                    isActive
                      ? "border-accent text-ink font-medium"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
