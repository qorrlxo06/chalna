"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, QrCode } from "lucide-react";
import type { Product } from "@/data/products";
import { SITE_INFO } from "@/data/site";

export function StoryDisclosure({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="stage-5" className="scroll-mt-36">
      <div className="border-t border-line pt-12 md:pt-14">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-ink">
          이야기
        </h2>
        <p className="mt-1.5 text-[14px] text-muted">
          물건의 쓰임만으로 충분하다면 그대로 지나쳐도 좋습니다. 궁금할 때만 열어 보세요.
        </p>

        <details
          className="chalna-story mt-5 border border-line bg-surface"
          onToggle={(e) => setIsOpen((e.currentTarget as HTMLDetailsElement).open)}
        >
          <summary className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left text-[15px] font-medium text-ink hover:bg-bg/60 transition-colors">
            <span>{product.story.summaryLabel}</span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              strokeWidth={1.5}
            />
          </summary>

          <div className="border-t border-line bg-bg px-5 sm:px-6 py-7 space-y-6">
            <div className="max-w-[68ch]">
              <p className="text-[13px] font-medium text-accent">
                {product.story.motifKeyword}
              </p>
              <h3 className="mt-1.5 text-[20px] sm:text-[22px] font-semibold leading-[1.4] text-ink">
                {product.story.headline}
              </h3>
              <div className="mt-4 space-y-3 text-[15px] sm:text-[16px] leading-[1.7] text-ink">
                {product.story.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {product.story.sampleQuotes && product.story.sampleQuotes.length > 0 && (
              <div className="border-t border-line pt-5">
                <p className="text-[13px] font-medium text-muted mb-3">
                  수록 문장 예시
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {product.story.sampleQuotes.map((q, idx) => (
                    <blockquote
                      key={idx}
                      className="border border-line bg-surface p-4 flex flex-col justify-between gap-3"
                    >
                      <p className="text-[15px] leading-[1.65] text-ink">
                        &ldquo;{q.text}&rdquo;
                      </p>
                      <footer className="text-[12px] text-muted border-t border-line pt-2">
                        {q.origin}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-line pt-5">
              <Link
                href={`/story/${product.slug}`}
                className="inline-flex min-h-[48px] items-center justify-between gap-3 border border-line bg-surface px-4 text-[14px] font-medium text-ink hover:border-ink transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  <span>QR 호흡·이야기 페이지 열기</span>
                </span>
              </Link>

              <a
                href={SITE_INFO.templestayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-between gap-3 border border-accent bg-bg px-4 text-[14px] font-medium text-accent hover:bg-accent hover:text-bg transition-colors"
              >
                <span>템플스테이 공식 안내 보기</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </details>

        <p className="mt-5 text-[12px] leading-[1.65] text-muted">
          본 상품 페이지는 교육용 시연 MVP이며, 게시된 이미지는 프로젝트용 AI 연출 시안입니다.
        </p>
      </div>
    </section>
  );
}
