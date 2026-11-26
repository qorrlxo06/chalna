import Link from "next/link";
import { formatKRW, type Product } from "@/data/products";
import { EditorialImage } from "@/components/ui/EditorialImage";

interface ProductCardProps {
  product: Product;
  showRefillMeta?: boolean;
  priority?: boolean;
}

export function ProductCard({
  product,
  showRefillMeta = false,
  priority = false,
}: ProductCardProps) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-[#5B8477]"
      >
        <EditorialImage
          src={product.images.main.src}
          alt={product.images.main.alt}
          aspectRatio="4/5"
          imgClassName="editorial-card-img"
          showAiCaption
          priority={priority}
        />

        <div className="mt-4 pt-3 border-t border-[#E5E4DE]">
          <div className="flex items-center justify-between gap-2 text-[12px] tracking-[0.06em] text-[#787872]">
            <span>{product.categoryLabel}</span>
            <span className="font-editorial-en tracking-[0.18em]">
              {product.code}
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between gap-3">
            <h3 className="font-editorial-kr text-[19px] text-[#1A1A1A] group-hover:text-[#5B8477] transition-colors">
              {product.name}
            </h3>
            <p className="shrink-0 text-[15px] font-medium text-[#1A1A1A] tabular-nums">
              {formatKRW(product.basePrice)}
            </p>
          </div>

          <p className="mt-1.5 text-[14px] leading-[1.65] text-[#4F4F4B]">
            {product.oneLiner}
          </p>

          {product.refill.available && (
            <div className="mt-3 pt-2.5 border-t border-[#E5E4DE]/70 flex items-center justify-between gap-2 text-[12px] text-[#5B8477]">
              <span>리필 가능 · {product.refill.recommendedCycle}</span>
              {showRefillMeta && product.refill.refillPrice && (
                <span className="tabular-nums font-medium">
                  리필 {formatKRW(product.refill.refillPrice)}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
