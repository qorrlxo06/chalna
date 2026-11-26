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
        className="flex flex-col flex-1 focus-visible:outline-2 focus-visible:outline-accent"
      >
        {/* 1. 사진 */}
        <EditorialImage
          src={product.images.main.src}
          alt={product.images.main.alt}
          aspectRatio="4/5"
          imgClassName="editorial-card-img"
          showAiCaption
          priority={priority}
          tone="white"
        />

        {/* 2. 상품명 → 3. 가격 → 4. 한 줄 특징 */}
        <div className="mt-3.5 pt-3 border-t border-line flex flex-col flex-1">
          <p className="text-[12px] text-muted">{product.categoryLabel}</p>

          <h3 className="mt-1 text-[18px] font-semibold leading-[1.4] text-ink group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <p className="text-[16px] font-semibold text-ink tabular-nums">
              {displayPrice}
            </p>
            {product.listPriceSubNote && (
              <span className="text-[13px] text-muted">
                {product.listPriceSubNote}
              </span>
            )}
          </div>

          <p className="mt-2 text-[14px] leading-[1.6] text-muted">
            {product.oneLiner}
          </p>

          {showRefill && product.refill.available && (
            <div className="mt-auto pt-3">
              <div className="border-t border-line pt-2.5 flex items-center justify-between gap-2 text-[13px] text-accent font-medium">
                <span>리필 가능</span>
                {showRefillMeta && product.refill.refillPrice && (
                  <span className="tabular-nums">
                    리필 {formatKRW(product.refill.refillPrice)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
