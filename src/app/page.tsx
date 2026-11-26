import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatKRW, getRefillProducts, PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/site";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const refillProducts = getRefillProducts();
  const housewarming = PRODUCTS.find((p) => p.slug === "housewarming-set")!;

  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* 1. 에디토리얼 히어로 (비대칭 2단 1.15fr : 0.85fr) */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 pt-10 pb-16 md:pt-16 md:pb-28">
        <div className="lookbook-asymmetric items-end">
          {/* 좌측 대형 히어로 비주얼 */}
          <div className="space-y-3">
            <EditorialImage
              src="/images/products/lotus-lamp-03-lifestyle.png"
              alt="창가 원목 선반 위에 따뜻한 전구색으로 켜진 연꽃 무드등"
              aspectRatio="4/5"
              showAiCaption
              priority
            />
            <div className="flex items-center justify-between gap-3 text-[12px] text-[#787872]">
              <span className="font-editorial-en tracking-[0.18em] uppercase">
                LOOKBOOK 01 · LOTUS AMBIENT LAMP
              </span>
              <Link
                href="/products/lotus-lamp"
                className="shrink-0 whitespace-nowrap underline underline-offset-4 hover:text-[#1A1A1A] transition-colors"
              >
                오브제 보기
              </Link>
            </div>
          </div>

          {/* 우측 타이포그래피 & 철학 도입 */}
          <div className="flex flex-col justify-between gap-10 lg:pb-6">
            <div className="space-y-6">
              <p className="font-editorial-en text-[12px] tracking-[0.26em] uppercase text-[#5B8477]">
                CHALNA · EVERYDAY RITUAL OBJECTS
              </p>
              <h1 className="font-editorial-kr text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.32] tracking-[-0.01em] text-[#1A1A1A]">
                하루 중 가장 짧은 쉼,
                <br />
                일상에 놓는 여덟 가지 찰나.
              </h1>
              <p className="text-[15px] sm:text-[16px] leading-[1.85] text-[#4F4F4B] max-w-[44ch]">
                거창한 휴식 대신 퇴근 후 불을 켜는 순간, 따뜻한 차를 우리는 3분,
                생각을 적어 접어 내려놓는 손끝의 감각에서 시작합니다. 디자인과
                쓰임이 먼저인 생활 오브제 컬렉션을 만나보세요.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/products"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 bg-[#5B8477] px-7 text-[15px] font-medium text-[#FFFFFF] hover:bg-[#496C61] transition-colors"
                >
                  <span>컬렉션 전체 보기</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/products?category=refill"
                  className="inline-flex min-h-[52px] items-center justify-center border border-[#1A1A1A] bg-[#FFFFFF] px-7 text-[15px] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFFFFF] transition-colors"
                >
                  리필 스테이션
                </Link>
              </div>
            </div>

            {/* 우측 보조 룩북 컷 */}
            <div className="hidden lg:block border-t border-[#E5E4DE] pt-8">
              <div className="grid grid-cols-12 gap-5 items-end">
                <div className="col-span-6">
                  <EditorialImage
                    src="/images/products/lotus-tea-set-05-steeping.png"
                    alt="따뜻한 차를 우리는 변색 연꽃 찻잔과 티백 세트"
                    aspectRatio="4/5"
                    showAiCaption
                  />
                </div>
                <div className="col-span-6 space-y-2 pb-1">
                  <p className="font-editorial-en text-[11px] tracking-[0.2em] uppercase text-[#787872]">
                    THREE MINUTES
                  </p>
                  <p className="font-editorial-kr text-[17px] leading-[1.55] text-[#1A1A1A]">
                    온기에 피어나고,
                    <br />
                    식으며 달라지는 꽃.
                  </p>
                  <Link
                    href="/products/lotus-tea-set"
                    className="inline-flex min-h-[48px] items-center text-[13px] text-[#5B8477] hover:text-[#496C61] underline underline-offset-4"
                  >
                    변색 연꽃 찻잔·티백 세트 →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 브랜드 3가지 약속 (Brand Philosophy Strip) */}
      <section className="w-full border-y border-[#E5E4DE] bg-[#F7F6F2]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-16 md:py-24">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              <div className="space-y-3 md:pr-6 md:border-r md:border-[#E5E4DE]">
                <p className="font-editorial-en text-[13px] tracking-[0.22em] text-[#5B8477]">
                  01 · OBJECT FIRST
                </p>
                <h2 className="font-editorial-kr text-[21px] text-[#1A1A1A]">
                  공간에 스며드는 단정한 쓰임
                </h2>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-[#4F4F4B]">
                  과장된 장식이나 유행성 소품 대신, 침대 옆·책상 위·거실 테이블에
                  매일 두고 쓰고 싶은 조형과 질감에 집중했습니다.
                </p>
              </div>

              <div className="space-y-3 md:pr-6 md:border-r md:border-[#E5E4DE]">
                <p className="font-editorial-en text-[13px] tracking-[0.22em] text-[#5B8477]">
                  02 · DAILY RITUAL
                </p>
                <h2 className="font-editorial-kr text-[21px] text-[#1A1A1A]">
                  하루 3분, 감각으로 돌아오는 루틴
                </h2>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-[#4F4F4B]">
                  불을 켜고, 차를 따르고, 생각을 적어 접는 단순한 동작이
                  분주한 하루 속에서 잠시 숨을 고르는 신호가 됩니다.
                </p>
              </div>

              <div className="space-y-3">
                <p className="font-editorial-en text-[13px] tracking-[0.22em] text-[#5B8477]">
                  03 · CONTINUOUS REFILL
                </p>
                <h2 className="font-editorial-kr text-[21px] text-[#1A1A1A]">
                  다 쓴 뒤에도 이어지는 리필 구조
                </h2>
                <p className="text-[14px] sm:text-[15px] leading-[1.8] text-[#4F4F4B]">
                  한 번 쓰고 끝나는 단품이 아니라 티백·디퓨저 오일·108장 내지·편지지
                  리필로 나만의 휴식 루틴을 오래 이어갈 수 있습니다.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. 카테고리 큐레이션 (공간·휴식 / 차·기록 / 마음·선물 / 리필 스테이션) */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-16 md:py-28">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <p className="font-editorial-en text-[12px] tracking-[0.24em] uppercase text-[#787872]">
                CURATED CATEGORIES
              </p>
              <h2 className="mt-2 font-editorial-kr text-[26px] sm:text-[32px] text-[#1A1A1A]">
                지금 나에게 필요한 쉼의 방식
              </h2>
            </div>
            <p className="text-[14px] text-[#787872] max-w-[38ch]">
              머무는 공간, 차와 기록, 선물하는 마음, 그리고 반복해서 채우는 리필까지
              네 가지 주제로 살펴보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#E5E4DE]">
            {CATEGORIES.filter((c) => c.id !== "all").map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="group border-r border-b border-[#E5E4DE] bg-[#FFFFFF] p-6 sm:p-7 flex flex-col justify-between gap-8 hover:bg-[#F7F6F2] transition-colors min-h-[196px]"
              >
                <div className="flex items-center justify-between text-[12px] text-[#787872]">
                  <span className="font-editorial-en tracking-[0.2em]">
                    0{idx + 1}
                  </span>
                  <span className="font-editorial-en tracking-[0.16em] uppercase">
                    {cat.enLabel}
                  </span>
                </div>
                <div>
                  <h3 className="font-editorial-kr text-[21px] text-[#1A1A1A] group-hover:text-[#5B8477] transition-colors">
                    {cat.label}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-[#4F4F4B]">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 4. 8종 전체 에디토리얼 컬렉션 (넉넉한 2~3열 그리드) */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-16 md:py-28 border-t border-[#E5E4DE]">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 md:mb-16">
            <div>
              <p className="font-editorial-en text-[12px] tracking-[0.24em] uppercase text-[#5B8477]">
                THE EIGHT OBJECTS
              </p>
              <h2 className="mt-2 font-editorial-kr text-[26px] sm:text-[34px] text-[#1A1A1A]">
                찰나 컬렉션 8종
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex min-h-[48px] items-center gap-2 text-[14px] text-[#1A1A1A] underline underline-offset-4 hover:text-[#5B8477] transition-colors"
            >
              <span>카테고리별 필터 보기</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 md:gap-y-20">
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.slug} delayMs={(index % 3) * 70}>
              <ProductCard product={product} priority={index < 3} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. 에디토리얼 스포트라이트 01: 풍경 집들이 세트 (디퓨저 2종 선택) */}
      <section className="w-full border-t border-[#E5E4DE] bg-[#F7F6F2]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-16 md:py-28">
          <Reveal>
            <div className="lookbook-asymmetric items-center">
              <div>
                <EditorialImage
                  src="/images/products/housewarming-set-06-compare.png"
                  alt="꽃 리드 디퓨저 세트와 돌탑 스톤 디퓨저 세트 나란히 비교한 풍경 집들이 세트"
                  aspectRatio="4/5"
                  showAiCaption
                />
              </div>

              <div className="space-y-6">
                <p className="font-editorial-en text-[12px] tracking-[0.24em] uppercase text-[#5B8477]">
                  FEATURED GIFT · HOUSEWARMING SET
                </p>
                <h2 className="font-editorial-kr text-[28px] sm:text-[36px] leading-[1.38] text-[#1A1A1A]">
                  향으로 채우고,
                  <br />
                  소리로 환기하는 집.
                </h2>
                <p className="text-[15px] sm:text-[16px] leading-[1.85] text-[#4F4F4B]">
                  황동 물고기 풍경과 세이지·분홍 배색 보자기 포장은 공통으로 담고,
                  받는 분의 공간에 맞춰 두 가지 디퓨저 방식 중 하나를 고릅니다.
                  상세페이지에서 옵션 선택 시 구성과 이미지, 가격이 즉시 바뀝니다.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-[#E5E4DE] py-5 text-[14px]">
                  <div>
                    <p className="font-medium text-[#1A1A1A]">A. 꽃 리드 디퓨저</p>
                    <p className="mt-1 text-[#787872]">
                      향액 80mL · 연꽃 리드 3 + 기본 리드 2
                    </p>
                    <p className="mt-1.5 font-editorial-en text-[17px] text-[#1A1A1A] tabular-nums">
                      {formatKRW(housewarming.basePrice)}
                    </p>
                  </div>
                  <div className="sm:border-l sm:border-[#E5E4DE] sm:pl-4">
                    <p className="font-medium text-[#1A1A1A]">B. 돌탑 스톤 디퓨저</p>
                    <p className="mt-1 text-[#787872]">
                      다공성 스톤 5개 · 세라믹 받침 · 오일 10mL
                    </p>
                    <p className="mt-1.5 font-editorial-en text-[17px] text-[#1A1A1A] tabular-nums">
                      {formatKRW(housewarming.basePrice + 4000)}
                    </p>
                  </div>
                </div>

                <Link
                  href="/products/housewarming-set"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 bg-[#1A1A1A] px-7 text-[14px] text-[#FFFFFF] hover:bg-[#5B8477] transition-colors"
                >
                  <span>집들이 세트 옵션 선택하기</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. 에디토리얼 스포트라이트 02: 리필 스테이션 (반복 구매 4종) */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-16 md:py-28">
        <Reveal>
          <div className="lookbook-asymmetric-reverse items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <p className="font-editorial-en text-[12px] tracking-[0.24em] uppercase text-[#5B8477]">
                REFILL STATION · SUSTAINABLE RITUAL
              </p>
              <h2 className="font-editorial-kr text-[28px] sm:text-[36px] leading-[1.38] text-[#1A1A1A]">
                비워지면 다시 채워,
                <br />
                오래 이어가는 휴식.
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.85] text-[#4F4F4B]">
                찻잔과 디퓨저 용기, 나사 제본 표지는 오래 곁에 두고
                티백·향 오일·108장 내지·편지지 추가 팩만 필요한 주기에 맞춰
                간편하게 채워 넣을 수 있습니다.
              </p>

              <ul className="divide-y divide-[#E5E4DE] border-y border-[#E5E4DE]">
                {refillProducts.map((item) => (
                  <li
                    key={item.slug}
                    className="py-3.5 flex items-center justify-between gap-4 text-[14px]"
                  >
                    <div>
                      <Link
                        href={`/products/${item.slug}#stage-4`}
                        className="font-medium text-[#1A1A1A] hover:text-[#5B8477] transition-colors"
                      >
                        {item.refill.refillName}
                      </Link>
                      <p className="text-[12px] text-[#787872]">
                        권장 주기: {item.refill.recommendedCycle}
                      </p>
                    </div>
                    <span className="shrink-0 font-editorial-en text-[17px] text-[#1A1A1A] tabular-nums">
                      {formatKRW(item.refill.refillPrice ?? 0)}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/products?category=refill"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-[#1A1A1A] px-7 text-[14px] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFFFFF] transition-colors"
              >
                <span>리필 스테이션 전체 보기</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <EditorialImage
                src="/images/products/distress-note-04-fold.png"
                alt="108장 잡념 노트의 절취 내지를 뒷면 점선 가이드에 따라 종이비행기로 접는 모습"
                aspectRatio="4/5"
                showAiCaption
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* 7. 하루 3분 리추얼 안내 */}
      <section className="w-full border-t border-[#E5E4DE] bg-[#FFFFFF]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-16 md:py-24">
          <Reveal>
            <div className="border border-[#E5E4DE] bg-[#F7F6F2] p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-2.5 max-w-[60ch]">
                <p className="font-editorial-en text-[12px] tracking-[0.22em] uppercase text-[#5B8477]">
                  THREE-MINUTE PAUSE
                </p>
                <h2 className="font-editorial-kr text-[22px] sm:text-[26px] text-[#1A1A1A]">
                  하루 3분, 지금 이 자리에서 호흡을 고르는 시간.
                </h2>
                <p className="text-[14px] leading-[1.75] text-[#4F4F4B]">
                  복잡한 준비 없이 찰나가 제안하는 4·4·6 호흡 타이머와 함께 짧은 멈춤을
                  경험해 보세요. 각 오브제 상세페이지에서 나만의 리추얼 가이드를 바로
                  만나보실 수 있습니다.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/products/petal-cushion#stage-3"
                  className="inline-flex min-h-[52px] items-center justify-center bg-[#5B8477] px-6 text-[14px] font-medium text-[#FFFFFF] hover:bg-[#496C61] transition-colors"
                >
                  3분 호흡 타이머 시작하기
                </Link>
                <Link
                  href="/policy"
                  className="inline-flex min-h-[52px] items-center justify-center border border-[#E5E4DE] bg-[#FFFFFF] px-6 text-[14px] text-[#4F4F4B] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                >
                  이용 안내 보기
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
