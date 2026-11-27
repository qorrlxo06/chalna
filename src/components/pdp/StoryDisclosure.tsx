"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, QrCode } from "lucide-react";
import type { Product } from "@/data/products";
import { SITE_INFO } from "@/data/site";

export function StoryDisclosure({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);
  const media = product.storyMedia?.src ? product.storyMedia : null;

  return (
    <section id="stage-5" className="scroll-mt-36">
      <div className="border-t border-line pt-12 md:pt-14">
        <h2 className="font-editorial-kr text-[24px] sm:text-[28px] font-normal text-ink">
          이야기
        </h2>
        <p className="mt-2 text-[15.5px] leading-[1.7] text-muted">
          물건의 쓰임만으로 충분하다면 그대로 지나쳐도 좋습니다. 숨은 이야기가 궁금할 때만 열어 보세요.
        </p>

        <details
          className="chalna-story mt-5 border border-line bg-surface"
          onToggle={(e) => setIsOpen((e.currentTarget as HTMLDetailsElement).open)}
        >
          <summary className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left text-[16.5px] font-medium text-ink hover:bg-bg/60 transition-colors">
            <span>{product.story.summaryLabel}</span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              strokeWidth={1.5}
            />
          </summary>

          <div className="border-t border-line bg-bg px-5 sm:px-7 py-8 space-y-7">
            {/* 조건부 스토리 미디어 슬롯 (storyMedia.src가 있을 때만 렌더링, 비어 있으면 아무것도 렌더링하지 않음) */}
            {media && (
              <figure className="max-w-[760px] space-y-2.5">
                <div className="w-full overflow-hidden border border-line bg-surface">
                  {media.type === "video" ? (
                    <video
                      src={media.src}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-auto block"
                    />
                  ) : (
                    <img
                      src={media.src}
                      alt={media.caption || `${product.name} 이야기 이미지`}
                      className="w-full h-auto object-cover block"
                    />
                  )}
                </div>
                {media.caption && (
                  <figcaption className="text-[14px] text-muted">
                    {media.caption}
                  </figcaption>
                )}
              </figure>
            )}

            <div className="max-w-[68ch]">
              <p className="text-[14.5px] font-medium text-accent ui-label">
                {product.story.motifKeyword}
              </p>
              <h3 className="mt-2 font-editorial-kr text-[22px] sm:text-[25px] font-bold leading-[1.38] tracking-[-0.02em] text-ink">
                {product.story.headline}
              </h3>
              <div className="mt-5 space-y-4 text-[17px] sm:text-[17.5px] leading-[1.78] tracking-[-0.01em] text-ink">
                {product.story.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {product.story.sampleQuotes && product.story.sampleQuotes.length > 0 && (
              <div className="border-t border-line pt-6">
                <p className="text-[14.5px] font-medium text-muted mb-3.5">
                  수록 문장 예시
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {product.story.sampleQuotes.map((q, idx) => (
                    <blockquote
                      key={idx}
                      className="border border-line bg-surface p-5 flex flex-col justify-between gap-3.5"
                    >
                      <p className="font-editorial-kr text-[16.5px] leading-[1.68] text-ink">
                        &ldquo;{q.text}&rdquo;
                      </p>
                      <footer className="text-[13.5px] text-muted border-t border-line pt-2.5">
                        {q.origin}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-line pt-6">
              <Link
                href={`/story/${product.slug}`}
                className="inline-flex min-h-[48px] items-center justify-between gap-3 border border-line bg-surface px-4 text-[15.5px] ui-label font-medium text-ink hover:border-ink transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-accent shrink-0" strokeWidth={1.5} />
                  <span>전용 이야기 페이지 열기</span>
                </span>
              </Link>

              <a
                href={SITE_INFO.templestayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-between gap-3 border border-accent bg-bg px-4 text-[15.5px] ui-label font-medium text-accent hover:bg-accent hover:text-bg transition-colors"
              >
                <span>템플스테이 공식 안내 보기</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </details>

        <p className="mt-5 text-[13.5px] leading-[1.65] text-muted">
          {SITE_INFO.business.notice}
        </p>
      </div>
    </section>
  );
}
