import Link from "next/link";
import { formatKRW, getRefillProducts, PRODUCTS } from "@/data/products";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const refillProducts = getRefillProducts();
  const housewarming = PRODUCTS.find((p) => p.slug === "housewarming-set")!;

  return (
    <div className="w-full bg-bg">
      {/* 1. 첫 화면 (히어로 — 1280×800에서 제목·소개·주 버튼 한 화면 노출) */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-8 md:py-12">
        <div className="lookbook-asymmetric items-center">
          <div className="space-y-5 order-2 lg:order-1">
            <h1 className="text-[30px] sm:text-[36px] lg:text-[44px] font-semibold leading-[1.28] tracking-[-0.02em] text-ink">
              하루 중 가장 짧은 쉼.
            </h1>
            <p className="text-[16px] leading-[1.65] text-muted max-w-[40ch]">
              불을 켜고, 차를 우리고, 생각을 적는 시간. 찰나의 생활 굿즈 8종을
              만나보세요.
            </p>
            <div className="pt-1 flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="inline-flex min-h-[52px] items-center justify-center bg-accent px-8 text-[15px] font-medium text-bg hover:bg-accent-hover transition-colors"
              >
                상품 보러가기
              </Link>
              <Link
                href="/products?category=refill"
                className="inline-flex min-h-[52px] items-center justify-center border border-ink bg-bg px-7 text-[15px] font-medium text-ink hover:bg-ink hover:text-bg transition-colors"
              >
                리필 스테이션
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <EditorialImage
              src="/images/products/lotus-lamp-03-lifestyle.png"
              alt="창가 선반 위에 따뜻한 전구색으로 켜진 연꽃 무드등"
              aspectRatio="4/3"
              showAiCaption
              priority
              tone="surface"
            />
          </div>
        </div>
      </section>

      {/* 2. 상품 8종 */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-14 md:py-20 border-t border-line">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
          <div>
            <h2 className="text-[24px] sm:text-[30px] font-semibold leading-[1.35] text-ink">
              일상에 작은 쉼을 더하는 생활 굿즈 8종
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex min-h-[48px] items-center text-[14px] font-medium text-accent underline underline-offset-4 hover:text-accent-hover transition-colors shrink-0"
          >
            카테고리별로 보기
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              showRefill={false}
              priority={index < 3}
            />
          ))}
        </div>
      </section>

      {/* 3. 집들이 추천 */}
      <section className="w-full border-t border-line bg-surface">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-14 md:py-20">
          <div className="lookbook-asymmetric items-center">
            <div className="space-y-2.5">
              <EditorialImage
                src="/images/products/housewarming-set-06-compare.png"
                alt="꽃 리드형 디퓨저 세트와 돌탑형 디퓨저 세트 비교"
                aspectRatio="4/5"
                showAiCaption
                tone="white"
              />
              <p className="text-[13px] font-medium text-ink">
                디퓨저는 두 종류 중 1개만 포함됩니다.
              </p>
            </div>

            <div className="space-y-5">
              <h2 className="text-[26px] sm:text-[32px] font-semibold leading-[1.35] text-ink">
                풍경 집들이 세트
              </h2>
              <p className="text-[16px] leading-[1.65] text-muted">
                꽃 리드와 돌탑 중, 받는 분의 공간에 어울리는 디퓨저를 골라보세요.
                황동 물고기 풍경과 보자기 포장은 두 옵션에 모두 포함됩니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-line py-5">
                <div>
                  <p className="text-[15px] font-semibold text-ink">
                    꽃 리드형 {formatKRW(housewarming.basePrice)}
                  </p>
                  <p className="mt-1 text-[13px] text-muted">
                    리필액 100mL + 리드 5개 + 전용 용기
                  </p>
                </div>
                <div className="sm:border-l sm:border-line sm:pl-4">
                  <p className="text-[15px] font-semibold text-ink tabular-nums">
                    돌탑형 {formatKRW(housewarming.basePrice + 4000)} (+4,000원)
                  </p>
                  <p className="mt-1 text-[13px] text-muted">
                    스톤 5개 + 세라믹 받침 + 오일 10mL
                  </p>
                </div>
              </div>

              <Link
                href="/products/housewarming-set"
                className="inline-flex min-h-[52px] items-center justify-center bg-accent px-7 text-[15px] font-medium text-bg hover:bg-accent-hover transition-colors"
              >
                디퓨저 옵션 고르기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 리필 안내 */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-14 md:py-20 border-t border-line">
        <div className="lookbook-asymmetric-reverse items-center">
          <div className="space-y-5 order-2 lg:order-1">
            <h2 className="text-[26px] sm:text-[32px] font-semibold leading-[1.35] text-ink">
              다 쓴 뒤에도 채워 쓰는 리필 4종
            </h2>
            <p className="text-[16px] leading-[1.65] text-muted">
              찻잔, 디퓨저 용기, 나사 제본 표지는 그대로 두고 티백·향 오일·108장
              내지·편지지 추가 팩만 필요할 때 채워 넣을 수 있습니다.
            </p>

            <ul className="divide-y divide-line border-y border-line">
              {refillProducts.map((item) => (
                <li
                  key={item.slug}
                  className="py-3.5 flex items-center justify-between gap-4"
                >
                  <div>
                    <Link
                      href={`/products/${item.slug}#stage-4`}
                      className="text-[15px] font-medium text-ink hover:text-accent transition-colors"
                    >
                      {item.refill.refillName}
                    </Link>
                    <p className="text-[13px] text-muted">
                      {item.refill.recommendedCycle}
                    </p>
                  </div>
                  <span className="shrink-0 text-[15px] font-semibold text-ink tabular-nums">
                    {formatKRW(item.refill.refillPrice ?? 0)}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/products?category=refill"
              className="inline-flex min-h-[52px] items-center justify-center border border-ink px-7 text-[15px] font-medium text-ink hover:bg-ink hover:text-bg transition-colors"
            >
              리필 스테이션 보기
            </Link>
          </div>

          <div className="order-1 lg:order-2">
            <EditorialImage
              src="/images/products/distress-note-04-fold.png"
              alt="108장 잡념 노트의 절취 내지를 뒷면 점선 가이드에 따라 종이비행기로 접는 장면"
              aspectRatio="4/5"
              showAiCaption
              tone="surface"
            />
          </div>
        </div>
      </section>

      {/* 5. 브랜드 소개 */}
      <section className="w-full border-t border-line bg-surface">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-14 md:py-20">
          <div className="max-w-[56ch] mb-10">
            <h2 className="text-[24px] sm:text-[28px] font-semibold text-ink">
              찰나가 물건을 만드는 기준
            </h2>
            <p className="mt-2 text-[15px] text-muted">
              매일 쓰는 물건의 단정한 쓰임에서 짧은 쉼이 시작됩니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-line pt-5 space-y-2">
              <h3 className="text-[17px] font-semibold text-ink">
                일상에 자연스러운 쓰임
              </h3>
              <p className="text-[14px] leading-[1.65] text-muted">
                침대 옆, 책상 위, 식탁에 매일 두고 쓰고 싶은 형태와 소재를 먼저
                고민합니다.
              </p>
            </div>
            <div className="border-t border-line pt-5 space-y-2">
              <h3 className="text-[17px] font-semibold text-ink">
                짧은 동작으로 만드는 쉼
              </h3>
              <p className="text-[14px] leading-[1.65] text-muted">
                불을 켜고, 차를 따르고, 생각을 적어 접는 단순한 동작으로 하루의
                속도를 늦춥니다.
              </p>
            </div>
            <div className="border-t border-line pt-5 space-y-2">
              <h3 className="text-[17px] font-semibold text-ink">
                리필로 이어지는 사용
              </h3>
              <p className="text-[14px] leading-[1.65] text-muted">
                한 번 쓰고 끝나는 소품이 아니라 소모품을 교체하며 오래 곁에 둘 수
                있게 구성했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
