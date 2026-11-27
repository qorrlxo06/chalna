import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { SITE_INFO } from "@/data/site";
import { EditorialImage } from "@/components/ui/EditorialImage";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "이야기를 찾을 수 없습니다" };
  }
  return {
    title: `${product.name} — 찰나의 이야기`,
    description: product.story.headline,
  };
}

export default async function ProductStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const media = product.storyMedia?.src ? product.storyMedia : null;

  return (
    <div className="w-full bg-bg">
      <div className="mx-auto max-w-[980px] px-4 sm:px-6 lg:px-10 py-10 md:py-16 space-y-12">
        {/* 상단 돌아가기 */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex min-h-[48px] items-center gap-2 text-[15.5px] ui-label font-medium text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            <span>{product.name} 상세페이지로 돌아가기</span>
          </Link>
          <span className="text-[14.5px] text-muted">{product.categoryLabel}</span>
        </div>

        {/* 조건부 스토리 미디어 슬롯 (storyMedia.src가 있을 때만 렌더링) */}
        {media && (
          <figure className="space-y-2.5">
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

        {/* 이야기 헤더 & 연출 컷 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="md:col-span-5">
            <EditorialImage
              src={product.images.lifestyle.src}
              alt={product.images.lifestyle.alt}
              aspectRatio="4/5"
              showAiCaption
              priority
              tone="surface"
            />
          </div>

          <div className="md:col-span-7 space-y-5">
            <p className="text-[14.5px] font-medium text-accent ui-label">
              {product.story.motifKeyword}
            </p>
            <h1 className="font-editorial-kr text-[27.5px] sm:text-[33px] font-bold leading-[1.38] tracking-[-0.02em] text-ink">
              {product.story.headline}
            </h1>
            <div className="space-y-4 text-[17.5px] leading-[1.78] tracking-[-0.01em] text-ink">
              {product.story.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* 수록 문장 예시 */}
        {product.story.sampleQuotes && product.story.sampleQuotes.length > 0 && (
          <section className="border-t border-line pt-8 space-y-4">
            <h2 className="font-editorial-kr text-[20px] font-bold text-ink">
              수록 문장 예시
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {product.story.sampleQuotes.map((q, idx) => (
                <blockquote
                  key={idx}
                  className="border border-line bg-surface p-5 flex flex-col justify-between gap-4"
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
          </section>
        )}

        {/* 전용 '잠깐, 호흡' 페이지 연결 */}
        <section className="border border-line bg-bg p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="text-[14px] font-medium text-accent ui-label">
              잠깐, 호흡
            </p>
            <h2 className="font-editorial-kr text-[21.5px] font-bold text-ink">
              지금 이 자리에서 3분 · 5분 · 10분 호흡해보기
            </h2>
            <p className="text-[15.5px] leading-[1.7] text-muted">
              4초 들이마시기 · 4초 머무르기 · 6초 길게 내쉬기 리듬에 맞춰
              전용 호흡 타이머를 바로 시작할 수 있습니다.
            </p>
          </div>
          <Link
            href="/pause"
            className="shrink-0 inline-flex min-h-[52px] items-center justify-center gap-2 border border-ink bg-bg px-6 text-[15.5px] ui-label font-medium text-ink hover:bg-ink hover:text-bg transition-colors"
          >
            <span>호흡 타이머 열기</span>
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </section>

        {/* 템플스테이 공식 안내 */}
        <section className="border border-line bg-surface p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-editorial-kr text-[21.5px] font-bold text-ink">
              조금 더 긴 고요함을 경험해 보고 싶다면
            </h2>
            <p className="text-[15.5px] leading-[1.7] text-muted">
              종교 여부와 관계없이 누구나 머물다 갈 수 있는 템플스테이 공식 안내로 이어집니다.
            </p>
          </div>
          <a
            href={SITE_INFO.templestayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex min-h-[52px] items-center justify-center gap-2 bg-accent px-6 text-[15.5px] ui-label font-medium text-bg hover:bg-accent-hover transition-colors"
          >
            <span>템플스테이 공식 홈페이지</span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </section>
      </div>
    </div>
  );
}
