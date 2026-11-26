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
      <div className="border-t border-[#E5E4DE] pt-12 md:pt-16">
        <p className="font-editorial-en text-[12px] tracking-[0.22em] uppercase text-[#787872]">
          05 · HIDDEN STORY
        </p>
        <p className="mt-2 text-[14px] text-[#787872]">
          물건의 쓰임만으로 충분하다면 그대로 지나쳐도 좋습니다. 궁금할 때만 천천히 열어 보세요.
        </p>

        <details
          className="chalna-story mt-6 border border-[#E5E4DE] bg-[#F7F6F2]"
          onToggle={(e) => setIsOpen((e.currentTarget as HTMLDetailsElement).open)}
        >
          <summary className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 sm:px-8 py-4 text-left text-[15px] sm:text-[16px] font-medium text-[#1A1A1A] hover:bg-[#EFECE4]/60 transition-colors">
            <span className="flex items-center gap-3">
              <span
                className={`inline-block h-2 w-2 shrink-0 transition-colors ${
                  isOpen ? "bg-[#5B8477]" : "bg-[#787872]"
                }`}
                aria-hidden="true"
              />
              <span>{product.story.summaryLabel}</span>
            </span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-[#4F4F4B] transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              strokeWidth={1.5}
            />
          </summary>

          <div className="border-t border-[#E5E4DE] bg-[#FFFFFF] px-5 sm:px-8 py-8 sm:py-10 space-y-8">
            {/* 은유적 서사 본문 */}
            <div className="max-w-[68ch]">
              <p className="font-editorial-en text-[12px] tracking-[0.18em] text-[#5B8477]">
                {product.story.motifKeyword}
              </p>
              <h3 className="mt-2 font-editorial-kr text-[22px] sm:text-[26px] leading-[1.45] text-[#1A1A1A]">
                {product.story.headline}
              </h3>
              <div className="mt-5 space-y-4 text-[15px] sm:text-[16px] leading-[1.85] text-[#4F4F4B]">
                {product.story.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* 108장 잡념 노트 등 발췌 문장 */}
            {product.story.sampleQuotes && product.story.sampleQuotes.length > 0 && (
              <div className="border-t border-[#E5E4DE] pt-6">
                <p className="font-editorial-en text-[11px] tracking-[0.2em] uppercase text-[#787872] mb-4">
                  SELECTED QUOTES
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {product.story.sampleQuotes.map((q, idx) => (
                    <blockquote
                      key={idx}
                      className="border border-[#E5E4DE] bg-[#F7F6F2] p-4 flex flex-col justify-between gap-3"
                    >
                      <p className="font-editorial-kr text-[15px] leading-[1.7] text-[#1A1A1A]">
                        &ldquo;{q.text}&rdquo;
                      </p>
                      <footer className="text-[12px] text-[#787872] border-t border-[#E5E4DE] pt-2">
                        {q.origin}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            {/* QR 스토리 링크 & 템플스테이 공식 안내 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-[#E5E4DE] pt-6">
              <Link
                href={`/story/${product.slug}`}
                className="inline-flex min-h-[48px] items-center justify-between gap-3 border border-[#E5E4DE] bg-[#F7F6F2] px-4 text-[14px] text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-[#5B8477]" strokeWidth={1.5} />
                  <span>호흡 타이머·이야기 전용 페이지</span>
                </span>
                <span className="font-editorial-en text-xs text-[#787872]">→</span>
              </Link>

              <a
                href={SITE_INFO.templestayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-between gap-3 border border-[#5B8477] bg-[#FFFFFF] px-4 text-[14px] text-[#5B8477] hover:bg-[#5B8477] hover:text-[#FFFFFF] transition-colors"
              >
                <span>조용한 쉼이 더 궁금하다면 · 템플스테이 공식 안내</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </details>

        <p className="mt-6 text-[12px] leading-[1.7] text-[#787872]">
          ※ 본 상품 페이지의 이미지는 AI 연출 시안이며, 화면 해상도 및 제작 공정에 따라 색상과 세부 마감이 다소 달라질 수 있습니다.
        </p>
      </div>
    </section>
  );
}
