"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatKRW } from "@/data/products";

export function CartDrawer() {
  const {
    items,
    totalCount,
    totalAmount,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    openCartCheckout,
  } = useCart();

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const pressedOutsideRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isCartOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isCartOpen]);

  const isOutside = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return false;
    const r = dialog.getBoundingClientRect();
    return (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    );
  };

  return (
    <dialog
      ref={dialogRef}
      className="chalna-drawer"
      aria-labelledby="cart-drawer-title"
      onClose={closeCart}
      onPointerDown={(e) => {
        pressedOutsideRef.current = isOutside(e);
      }}
      onPointerUp={(e) => {
        if (pressedOutsideRef.current && isOutside(e)) {
          closeCart();
        }
        pressedOutsideRef.current = false;
      }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-line px-6 py-5 shrink-0">
        <h2
          id="cart-drawer-title"
          className="text-[20px] font-semibold text-ink"
        >
          장바구니 <span className="tabular-nums text-accent">({totalCount})</span>
        </h2>
        <button
          type="button"
          onClick={closeCart}
          autoFocus
          className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center text-muted hover:text-ink transition-colors cursor-pointer"
          aria-label="장바구니 닫기"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* 본문 */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {items.length === 0 ? (
          <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center">
            <p className="text-[16px] font-medium text-ink">
              장바구니가 비어 있습니다.
            </p>
            <p className="mt-2 text-[14px] text-muted">
              일상에 작은 쉼을 더하는 생활 굿즈를 둘러보세요.
            </p>
            <Link
              href="/products"
              onClick={closeCart}
              className="mt-6 inline-flex min-h-[48px] items-center justify-center border border-ink px-6 text-[14px] font-medium text-ink hover:bg-ink hover:text-bg transition-colors"
            >
              상품 보러가기
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((item) => (
              <li key={item.key} className="py-5 first:pt-0">
                <div className="flex gap-4">
                  <Link
                    href={`/products/${item.productSlug}`}
                    onClick={closeCart}
                    className="shrink-0"
                  >
                    <img
                      src={item.imageSrc}
                      alt={item.productName}
                      className="h-20 w-20 object-cover border border-line bg-bg"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.productSlug}`}
                        onClick={closeCart}
                        className="text-[15px] font-medium text-ink hover:text-accent transition-colors"
                      >
                        {item.productName}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="inline-flex min-h-[40px] min-w-[40px] -mt-2 -mr-2 items-center justify-center text-muted hover:text-ink transition-colors cursor-pointer"
                        aria-label={`${item.productName} 삭제`}
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className="text-[13px] text-muted leading-[1.5]">
                      {item.optionSummary}
                    </p>
                    <p className="mt-1 text-[12px] text-muted tabular-nums">
                      단가 {formatKRW(item.unitPrice)}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="inline-flex h-10 w-10 items-center justify-center text-ink hover:bg-surface cursor-pointer"
                          aria-label="수량 줄이기"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                        <span className="w-9 text-center text-[14px] text-ink tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="inline-flex h-10 w-10 items-center justify-center text-ink hover:bg-surface cursor-pointer"
                          aria-label="수량 늘리기"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="text-[15px] font-semibold text-ink tabular-nums">
                        {formatKRW(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 하단 요약 및 주문 버튼 */}
      {items.length > 0 && (
        <div className="border-t border-line bg-surface px-6 py-5 shrink-0 space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[14px] font-medium text-muted">총 상품금액</span>
            <span className="text-[22px] font-semibold text-ink tabular-nums">
              {formatKRW(totalAmount)}
            </span>
          </div>
          <p className="text-[12px] text-muted">
            장바구니에 담은 상품은 현재 브라우저에 보관됩니다.
          </p>
          <button
            type="button"
            onClick={openCartCheckout}
            className="w-full min-h-[52px] bg-accent text-[15px] font-medium text-bg hover:bg-accent-hover transition-colors cursor-pointer"
          >
            주문하기
          </button>
        </div>
      )}
    </dialog>
  );
}
