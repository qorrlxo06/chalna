import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { SITE_INFO } from "@/data/site";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { RitualTimer } from "@/components/pdp/RitualTimer";

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

  return (
    <div className="w-full bg-bg">
      <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-10 py-10 md:py-16 space-y-12">
        {/* 상단 돌아가기 */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex min-h-[48px] items-center gap-2 text-[14px] font-medium text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            <span>{product.name} 상세페이지로 돌아가기</span>
          </Link>
          <span className="text-[13px] text-muted">{product.categoryLabel}</span>
        </div>

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

          <div className="md:col-span-7 space-y-4">
            <p className="text-[13px] font-medium text-accent">
              {product.story.motifKeyword}
            </p>
            <h1 className="text-[26px] sm:text-[32px] font-semibold leading-[1.35] text-ink">
              {product.story.headline}
            </h1>
            <div className="space-y-3 text-[16px] leading-[1.7] text-ink">
              {product.story.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* 수록 문장 예시 */}
        {product.story.sampleQuotes && product.story.sampleQuotes.length > 0 && (
          <section className="border-t border-line pt-8 space-y-4">
            <h2 className="text-[16px] font-semibold text-ink">수록 문장 예시</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {product.story.sampleQuotes.map((q, idx) => (
                <blockquote
                  key={idx}
                  className="border border-line bg-surface p-5 flex flex-col justify-between gap-4"
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
          </section>
        )}

        {/* QR 연결 호흡 타이머 */}
        <section>
          <RitualTimer
            title={`${product.name} · ${product.ritualTitle}`}
            defaultSeconds={product.ritualDefaultSeconds}
            presets={product.ritualPresets ?? [180, 300, 600]}
          />
        </section>

        {/* 템플스테이 공식 안내 */}
        <section className="border border-line bg-surface p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h2 className="text-[19px] font-semibold text-ink">
              조금 더 긴 고요함을 경험해 보고 싶다면
            </h2>
            <p className="text-[14px] text-muted">
              종교 여부와 관계없이 누구나 머물다 갈 수 있는 템플스테이 공식 안내로 이어집니다.
            </p>
          </div>
          <a
            href={SITE_INFO.templestayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex min-h-[52px] items-center justify-center gap-2 bg-accent px-6 text-[14px] font-medium text-bg hover:bg-accent-hover transition-colors"
          >
            <span>템플스테이 공식 홈페이지</span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </section>
      </div>
    </div>
  );
}
