"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatKRW, getRefillProducts, PRODUCTS } from "@/data/products";
import { CATEGORIES, type CategoryId } from "@/data/site";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { useCart } from "@/context/CartContext";

function isValidCategory(val: string | null): val is CategoryId {
  return CATEGORIES.some((c) => c.id === val);
}

export function CatalogClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem, openDirectCheckout } = useCart();

  const rawCategory = searchParams.get("category");
  const activeCategory: CategoryId = isValidCategory(rawCategory)
    ? rawCategory
    : "all";

  const activeCategoryMeta =
    CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return PRODUCTS;
    if (activeCategory === "refill") return getRefillProducts();
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleSelectCategory = (id: CategoryId) => {
    if (id === "all") {
      router.push("/products", { scroll: false });
    } else {
      router.push(`/products?category=${id}`, { scroll: false });
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* 헤더 타이틀 */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 pt-12 pb-10 md:pt-20 md:pb-14 border-b border-[#E5E4DE]">
        <p className="font-editorial-en text-[12px] tracking-[0.24em] uppercase text-[#5B8477]">
          {activeCategoryMeta.enLabel}
        </p>
        <div className="mt-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1 className="font-editorial-kr text-[30px] sm:text-[40px] leading-[1.3] text-[#1A1A1A]">
            {activeCategoryMeta.label}
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#4F4F4B] max-w-[44ch]">
            {activeCategoryMeta.description}
          </p>
        </div>

        {/* 카테고리 탭 바 */}
        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="카테고리 필터"
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            const count =
              cat.id === "all"
                ? PRODUCTS.length
                : cat.id === "refill"
                ? getRefillProducts().length
                : PRODUCTS.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectCategory(cat.id)}
                className={`min-h-[48px] px-5 text-[14px] border transition-colors cursor-pointer ${
                  isActive
                    ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#FFFFFF] font-medium"
                    : "border-[#E5E4DE] bg-[#FFFFFF] text-[#4F4F4B] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                }`}
              >
                {cat.label}{" "}
                <span className="font-editorial-en text-[13px] ml-1 opacity-75">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 리필 스테이션 전용 안내 패널 (RQ-017) */}
      {activeCategory === "refill" && (
        <section className="w-full border-b border-[#E5E4DE] bg-[#F7F6F2]">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-12 md:py-16 space-y-8">
            <div className="max-w-[60ch]">
              <p className="font-editorial-en text-[12px] tracking-[0.22em] uppercase text-[#5B8477]">
                REPEATABLE RITUAL · 4 REFILLS
              </p>
              <h2 className="mt-2 font-editorial-kr text-[24px] sm:text-[28px] text-[#1A1A1A]">
                본품과 100% 호환되는 소모품 리필 안내
              </h2>
              <p className="mt-2 text-[14px] sm:text-[15px] text-[#4F4F4B]">
                다 쓴 티백, 디퓨저 향액·오일, 108장 잡념 노트 내지, 연꽃 입체 편지지 추가 팩을
                본품 규격 그대로 다시 채울 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getRefillProducts().map((item) => (
                <div
                  key={item.slug}
                  className="border border-[#E5E4DE] bg-[#FFFFFF] p-6 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[12px] text-[#787872]">
                          호환 본품 ·{" "}
                          <Link
                            href={`/products/${item.slug}`}
                            className="underline underline-offset-4 hover:text-[#1A1A1A]"
                          >
                            {item.name}
                          </Link>
                        </p>
                        <h3 className="mt-1 font-editorial-kr text-[20px] text-[#1A1A1A]">
                          {item.refill.refillName}
                        </h3>
                      </div>
                      <p className="shrink-0 font-editorial-en text-[22px] text-[#5B8477] tabular-nums">
                        {formatKRW(item.refill.refillPrice ?? 0)}
                      </p>
                    </div>

                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-[#E5E4DE] pt-3 text-[13px]">
                      <div>
                        <dt className="text-[#787872]">리필 단위</dt>
                        <dd className="text-[#1A1A1A] mt-0.5">{item.refill.unit}</dd>
                      </div>
                      <div>
                        <dt className="text-[#787872]">권장 주기</dt>
                        <dd className="text-[#1A1A1A] mt-0.5">
                          {item.refill.recommendedCycle}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-[#787872]">호환 기준</dt>
                        <dd className="text-[#4F4F4B] mt-0.5">
                          {item.refill.compatibility}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        openDirectCheckout({
                          key: `${item.slug}__refill`,
                          productSlug: item.slug,
                          productName: item.refill.refillName ?? `${item.name} 리필`,
                          imageSrc: item.images.lifestyle.src,
                          optionSummary: `리필 전용 (${item.refill.unit ?? ""})`,
                          unitPrice: item.refill.refillPrice ?? 0,
                          quantity: 1,
                        })
                      }
                      className="min-h-[48px] bg-[#5B8477] px-3 text-[13px] sm:text-[14px] font-medium text-[#FFFFFF] hover:bg-[#496C61] transition-colors cursor-pointer"
                    >
                      리필 구매하기
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        addItem({
                          key: `${item.slug}__refill`,
                          productSlug: item.slug,
                          productName: item.refill.refillName ?? `${item.name} 리필`,
                          imageSrc: item.images.lifestyle.src,
                          optionSummary: `리필 전용 (${item.refill.unit ?? ""})`,
                          unitPrice: item.refill.refillPrice ?? 0,
                          quantity: 1,
                        })
                      }
                      className="min-h-[48px] border border-[#1A1A1A] bg-[#FFFFFF] px-3 text-[13px] sm:text-[14px] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                    >
                      장바구니 담기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 상품 목록 그리드 */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-14 md:py-24">
        <div className="mb-8 flex items-center justify-between text-[13px] text-[#787872]">
          <span>총 {filteredProducts.length}종의 오브제</span>
          <span>모든 상품 이미지는 AI 연출 시안입니다</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {filteredProducts.map((product, idx) => (
            <Reveal key={product.slug} delayMs={(idx % 3) * 60}>
              <ProductCard
                product={product}
                showRefillMeta={activeCategory === "refill"}
                priority={idx < 3}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
