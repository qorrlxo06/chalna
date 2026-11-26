"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatKRW, getRefillProducts, PRODUCTS } from "@/data/products";
import { CATEGORIES, type CategoryId } from "@/data/site";
import { ProductCard } from "@/components/ProductCard";
import { DiffuserRefillPicker } from "@/components/DiffuserRefillPicker";
import { useCart } from "@/context/CartContext";

function isValidCategory(val: string | null): val is CategoryId {
  return CATEGORIES.some((c) => c.id === val);
}

export function CatalogClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem, openDirectCheckout } = useCart();

  // 이전 쿼리 파라미터(space, tea-note, mind-gift 등)는 오류 없이 '전체 여덟 가지'로 폴백
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
    <div className="w-full bg-bg">
      {/* 상단 제목 + 6개 텍스트 탭 (1366×900에서 첫 상품 이미지 350px 이내 시작) */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 pt-6 md:pt-8">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 pb-4">
          <h1 className="text-[24px] sm:text-[28px] font-semibold leading-[1.3] text-ink">
            {activeCategoryMeta.label}
          </h1>
          <p className="text-[14px] text-muted">
            {activeCategoryMeta.description}
          </p>
        </div>

        {/* 6개 텍스트 탭 바 (개수 표기 없음, 하단 1px 구분선, 활성 2px 세이지 밑줄) */}
        <div className="border-b border-line">
          <div
            className="flex items-center gap-7 sm:gap-8 overflow-x-auto whitespace-nowrap no-scrollbar -mb-[1px]"
            role="tablist"
            aria-label="카테고리 필터"
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`shrink-0 min-h-[48px] px-0.5 text-[15px] border-b-2 transition-colors cursor-pointer ${
                    isActive
                      ? "border-accent text-ink font-medium"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 리필 스테이션 전용 안내 패널 */}
      {activeCategory === "refill" && (
        <section className="w-full border-b border-line bg-surface">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-8 md:py-10 space-y-6">
            <div className="max-w-[60ch]">
              <h2 className="text-[20px] sm:text-[22px] font-semibold text-ink">
                전용 소모품 리필 안내
              </h2>
              <p className="mt-1.5 text-[14px] text-muted">
                티백, 디퓨저 향액·오일, 108장 잡념 노트 내지, 연꽃 입체 편지지 추가 팩을
                본품 규격에 맞게 다시 채워 사용할 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getRefillProducts().map((item) => {
                const hasRequiredOptions = Boolean(
                  item.refill.requiredTypeOptions && item.refill.requiredScentOptions
                );
                return (
                  <div
                    key={item.slug}
                    className="border border-line bg-bg p-6 flex flex-col justify-between gap-5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[13px] text-muted">
                            본품:{" "}
                            <Link
                              href={`/products/${item.slug}`}
                              className="underline underline-offset-4 hover:text-ink"
                            >
                              {item.name}
                            </Link>
                          </p>
                          <h3 className="mt-1 text-[18px] font-semibold text-ink">
                            {item.refill.refillName}
                          </h3>
                        </div>
                        <p className="shrink-0 text-[18px] font-semibold text-accent tabular-nums">
                          {formatKRW(item.refill.refillPrice ?? 0)}
                        </p>
                      </div>

                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-line pt-3 text-[13px]">
                        <div>
                          <dt className="text-muted">리필 구성</dt>
                          <dd className="text-ink mt-0.5">{item.refill.unit}</dd>
                        </div>
                        <div>
                          <dt className="text-muted">권장 교체 주기</dt>
                          <dd className="text-ink mt-0.5">
                            {item.refill.recommendedCycle}
                          </dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-muted">호환 안내</dt>
                          <dd className="text-muted mt-0.5">
                            {item.refill.compatibility}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {hasRequiredOptions ? (
                      <div className="border-t border-line pt-4">
                        <DiffuserRefillPicker product={item} compact />
                      </div>
                    ) : (
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
                          className="min-h-[48px] bg-accent px-3 text-[14px] font-medium text-bg hover:bg-accent-hover transition-colors cursor-pointer"
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
                          className="min-h-[48px] border border-ink bg-bg px-3 text-[14px] font-medium text-ink hover:bg-ink hover:text-bg transition-colors cursor-pointer"
                        >
                          장바구니 담기
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 상품 목록 그리드 (상단 여백 최소화) */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 pt-6 pb-16 md:pt-7 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.map((product, idx) => (
            <ProductCard
              key={product.slug}
              product={product}
              showRefill={activeCategory !== "all"}
              showRefillMeta={activeCategory === "refill"}
              priority={idx < 3}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
