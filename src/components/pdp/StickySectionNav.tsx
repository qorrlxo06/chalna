"use client";

import { useEffect, useState } from "react";

export interface SectionItem {
  id: string;
  num: string;
  label: string;
}

const DEFAULT_SECTIONS: SectionItem[] = [
  { id: "stage-1", num: "01", label: "개요·구성" },
  { id: "stage-2", num: "02", label: "룩북·디테일" },
  { id: "stage-3", num: "03", label: "3분 리추얼" },
  { id: "stage-4", num: "04", label: "리필·스펙·안전" },
  { id: "stage-5", num: "05", label: "찰나의 이야기" },
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
      className="sticky top-16 md:top-[72px] z-30 w-full border-y border-[#E5E4DE] bg-[#FFFFFF]/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <ul className="flex items-center gap-1 sm:gap-6 overflow-x-auto no-scrollbar">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  onClick={() => setActiveId(section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`inline-flex min-h-[48px] items-center gap-1.5 px-2.5 sm:px-1 text-[13px] sm:text-[14px] whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? "border-[#5B8477] text-[#1A1A1A] font-medium"
                      : "border-transparent text-[#787872] hover:text-[#1A1A1A]"
                  }`}
                >
                  <span className="font-editorial-en text-[13px] tracking-[0.12em]">
                    {section.num}
                  </span>
                  <span>{section.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
