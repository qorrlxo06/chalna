import Link from "next/link";
import { formatKRW, type Product } from "@/data/products";
import { EditorialImage } from "@/components/ui/EditorialImage";

interface ProductCardProps {
  product: Product;
  /** '전체 여덟 가지' 탭에서만 false를 전달해 카드 하단 '리필 가능' 문구 숨김 */
  showRefill?: boolean;
  showRefillMeta?: boolean;
  priority?: boolean;
}

export function ProductCard({
  product,
  showRefill = true,
  showRefillMeta = false,
  priority = false,
}: ProductCardProps) {
  const displayPrice = product.listPriceDisplay ?? formatKRW(product.basePrice);

  return (
    <article className="group flex flex-col h-full">
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-col flex-1 h-full focus-visible:outline-2 focus-visible:outline-accent"
      >
        {/* 1. 이미지 프레임 (4/5 고정 비율로 행 상·하단선 통일) */}
        <EditorialImage
          src={product.images.main.src}
          alt={product.images.main.alt}
          aspectRatio="4/5"
          imgClassName="editorial-card-img"
          showAiCaption
          priority={priority}
          tone="white"
        />

        {/* 2. 카테고리 라벨 → 3. 상품명 → 4. 가격 → 5. 한 줄 특징 → 6. 하단 구분선 */}
        <div className="mt-4 pt-3.5 border-t border-line flex flex-col flex-1 justify-between">
          <div>
            <p className="text-[13.5px] ui-label text-muted">
              {product.categoryLabel}
            </p>

            <h3 className="mt-2 font-editorial-kr text-[20px] font-bold leading-[1.38] tracking-[-0.02em] text-ink group-hover:text-accent transition-colors min-h-[28px]">
              {product.name}
            </h3>

            <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-h-[28px]">
              <p className="text-[17.5px] font-semibold leading-[1.3] text-ink tabular-nums">
                {displayPrice}
              </p>
              {product.listPriceSubNote && (
                <span className="text-[14.5px] leading-[1.3] text-muted">
                  {product.listPriceSubNote}
                </span>
              )}
            </div>

            <p className="mt-2.5 text-[15.5px] leading-[1.68] text-muted">
              {product.oneLiner}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-line flex items-center justify-between gap-2 min-h-[34px]">
            {showRefill && product.refill.available ? (
              <>
                <span className="text-[14.5px] ui-label text-accent font-medium">
                  리필 가능
                </span>
                {showRefillMeta && product.refill.refillPrice && (
                  <span className="text-[14.5px] ui-label text-accent font-medium tabular-nums">
                    리필 {formatKRW(product.refill.refillPrice)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-[14px] ui-label text-muted group-hover:text-ink transition-colors">
                자세히 보기
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
