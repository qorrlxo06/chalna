import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { RitualTimer } from "@/components/pdp/RitualTimer";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "잠깐, 호흡",
  description:
    "하루 중 3분·5분·10분. 4초 들이마시고 4초 머무른 뒤 6초 길게 내쉬는 찰나의 호흡 타이머와 상황별 짧은 가이드.",
};

const SITUATION_GUIDES = [
  {
    step: "01",
    situation: "책상 앞에서 집중이 흐트러질 때",
    duration: "3분 권장",
    body: "화면에서 시선을 한 뼘 떼고 두 발바닥이 바닥에 닿은 감각을 느껴 봅니다. 들이마시는 숨에 어깨를 가볍게 풀고, 내쉬는 숨에 손끝의 힘을 내려놓습니다.",
  },
  {
    step: "02",
    situation: "하루를 마치고 잠들기 전",
    duration: "5분 권장",
    body: "방의 주 조명을 끄고 은은한 불빛만 남겨 둔 채 편안히 앉습니다. 6초 동안 천천히 숨을 비워내며 오늘 머릿속에 남은 장면들을 하나씩 흘려보냅니다.",
  },
  {
    step: "03",
    situation: "마음이 복잡하고 속도가 빨라질 때",
    duration: "10분 권장",
    body: "떠오르는 생각을 억지로 지우려 애쓰지 말고, 스쳐 지나가는 소리처럼 가볍게 알아차립니다. 숨이 들어오고 나가는 코끝의 온도로 주의를 천천히 되돌립니다.",
  },
] as const;

const RECOMMENDED_SLUGS = ["petal-cushion", "lotus-lamp", "distress-note"] as const;

export default function PausePage() {
  const recommendedProducts = RECOMMENDED_SLUGS.map((slug) =>
    PRODUCTS.find((p) => p.slug === slug)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="w-full bg-bg">
      {/* 상단 인트로 */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 pt-10 pb-8 md:pt-14 md:pb-10">
        <div className="max-w-[64ch] space-y-3 border-b border-line pb-8">
          <p className="text-[14.5px] font-medium text-accent ui-label">
            잠깐, 호흡
          </p>
          <h1 className="font-editorial-kr text-[29.5px] sm:text-[35px] font-normal leading-[1.38] tracking-[-0.02em] text-ink">
            지금 이 자리에서, 호흡에만 머무는 짧은 시간.
          </h1>
          <p className="text-[17.5px] leading-[1.72] text-muted">
            거창한 준비 없이 원하는 시간(3분·5분·10분)을 고르고 시작을 눌러 보세요.
            14초 주기(4초 들이마시기 · 4초 머무르기 · 6초 길게 내쉬기)에 맞춰
            천천히 숨을 고를 수 있습니다.
          </p>
        </div>
      </section>

      {/* 메인 인터랙티브 호흡 타이머 */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 pb-14 md:pb-20">
        <RitualTimer
          title="잠깐, 호흡 타이머"
          defaultSeconds={180}
          presets={[180, 300, 600]}
        />
      </section>

      {/* 상황별 짧은 가이드 */}
      <section className="w-full border-t border-line bg-surface">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-14 md:py-20 space-y-8">
          <div className="max-w-[58ch] space-y-2">
            <p className="text-[14.5px] font-medium text-accent ui-label">
              상황별 짧은 가이드
            </p>
            <h2 className="font-editorial-kr text-[25.5px] sm:text-[30px] font-normal text-ink">
              오늘의 리듬에 맞춰 가볍게 따라 해 보세요
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-line">
            {SITUATION_GUIDES.map((item) => (
              <article
                key={item.step}
                className="border-r border-b border-line bg-bg p-6 sm:p-7 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-editorial-en text-[18px] font-medium text-accent tabular-nums">
                      {item.step}
                    </span>
                    <span className="text-[13.5px] text-muted ui-label">
                      {item.duration}
                    </span>
                  </div>
                  <h3 className="font-editorial-kr text-[20px] font-bold text-ink">
                    {item.situation}
                  </h3>
                  <p className="text-[15.5px] leading-[1.72] text-muted">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 함께 쓰기 좋은 오브제 큐레이션 */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-14 md:py-20 border-t border-line">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
          <div className="space-y-2">
            <p className="text-[14.5px] font-medium text-accent ui-label">
              함께 쓰기 좋은 오브제
            </p>
            <h2 className="font-editorial-kr text-[25.5px] sm:text-[30px] font-normal text-ink">
              호흡의 자리를 만드는 찰나의 굿즈
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex min-h-[48px] items-center text-[15.5px] ui-label font-medium text-accent underline underline-offset-4 hover:text-accent-hover transition-colors shrink-0"
          >
            전체 8종 보기
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              showRefill={false}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
