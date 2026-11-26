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
    <div className="w-full bg-[#FFFFFF]">
      <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-10 py-12 md:py-20 space-y-14">
        {/* 상단 돌아가기 */}
        <div className="flex items-center justify-between border-b border-[#E5E4DE] pb-5">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex min-h-[48px] items-center gap-2 text-[14px] text-[#4F4F4B] hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            <span>{product.name} 상세페이지로 돌아가기</span>
          </Link>
          <span className="font-editorial-en text-[12px] tracking-[0.2em] uppercase text-[#787872]">
            CHALNA STORY · {product.code}
          </span>
        </div>

        {/* 이야기 헤더 & 연출 컷 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-5">
            <EditorialImage
              src={product.images.lifestyle.src}
              alt={product.images.lifestyle.alt}
              aspectRatio="4/5"
              showAiCaption
              priority
            />
          </div>

          <div className="md:col-span-7 space-y-5">
            <p className="font-editorial-en text-[12px] tracking-[0.2em] text-[#5B8477]">
              {product.story.motifKeyword}
            </p>
            <h1 className="font-editorial-kr text-[28px] sm:text-[34px] leading-[1.4] text-[#1A1A1A]">
              {product.story.headline}
            </h1>
            <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.85] text-[#4F4F4B]">
              {product.story.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* 108문장 발췌 (해당 상품에만) */}
        {product.story.sampleQuotes && product.story.sampleQuotes.length > 0 && (
          <section className="border-t border-[#E5E4DE] pt-10 space-y-4">
            <p className="font-editorial-en text-[12px] tracking-[0.2em] uppercase text-[#787872]">
              SELECTED QUOTES
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {product.story.sampleQuotes.map((q, idx) => (
                <blockquote
                  key={idx}
                  className="border border-[#E5E4DE] bg-[#F7F6F2] p-5 flex flex-col justify-between gap-4"
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
          </section>
        )}

        {/* 호흡 타이머 */}
        <section className="space-y-4">
          <RitualTimer
            title={`${product.name} · ${product.ritualTitle}`}
            defaultSeconds={product.ritualDefaultSeconds}
            presets={product.ritualPresets ?? [180, 300, 600]}
          />
        </section>

        {/* 템플스테이 공식 안내 */}
        <section className="border border-[#E5E4DE] bg-[#F7F6F2] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <p className="font-editorial-en text-[11px] tracking-[0.22em] uppercase text-[#5B8477]">
              FURTHER PAUSE
            </p>
            <h2 className="font-editorial-kr text-[20px] text-[#1A1A1A]">
              조금 더 긴 고요함을 경험해 보고 싶다면
            </h2>
            <p className="text-[14px] text-[#4F4F4B]">
              종교 여부와 관계없이 누구나 머물다 갈 수 있는 템플스테이 공식 안내로 이어집니다.
            </p>
          </div>
          <a
            href={SITE_INFO.templestayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex min-h-[52px] items-center justify-center gap-2 bg-[#5B8477] px-6 text-[14px] font-medium text-[#FFFFFF] hover:bg-[#496C61] transition-colors"
          >
            <span>템플스테이 공식 홈페이지</span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </section>
      </div>
    </div>
  );
}
