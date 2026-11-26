"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, ShieldCheck, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatKRW } from "@/data/products";
import { SITE_INFO } from "@/data/site";

export function DemoCheckoutModal() {
  const { checkoutModal, closeCheckoutModal } = useCart();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const pressedOutsideRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (checkoutModal) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [checkoutModal]);

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
      className="chalna-dialog"
      aria-labelledby="demo-checkout-title"
      onClose={closeCheckoutModal}
      onPointerDown={(e) => {
        pressedOutsideRef.current = isOutside(e);
      }}
      onPointerUp={(e) => {
        if (pressedOutsideRef.current && isOutside(e)) {
          closeCheckoutModal();
        }
        pressedOutsideRef.current = false;
      }}
    >
      {checkoutModal && (
        <div className="flex flex-col bg-bg">
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <h2
              id="demo-checkout-title"
              className="text-[20px] font-semibold text-ink"
            >
              주문 시연 안내
            </h2>
            <button
              type="button"
              onClick={closeCheckoutModal}
              autoFocus
              className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center text-muted hover:text-ink transition-colors cursor-pointer"
              aria-label="주문 안내 닫기"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="px-6 py-6 space-y-6 overflow-y-auto max-h-[68dvh]">
            <div className="border border-line bg-surface p-4 flex items-start gap-3">
              <ShieldCheck
                className="h-5 w-5 shrink-0 text-accent mt-0.5"
                strokeWidth={1.5}
              />
              <div className="text-[14px] leading-[1.65] text-ink">
                <p className="font-medium">
                  실제 결제·배송 및 개인정보 수집이 없는 시연용 스토어입니다.
                </p>
                <p className="mt-1 text-muted">
                  이름, 연락처, 주소, 결제정보를 입력받거나 저장하지 않습니다.
                  선택하신 구성과 금액을 확인해 보세요.
                </p>
              </div>
            </div>

            <div>
              <p className="text-[13px] font-medium text-muted mb-3">
                선택한 상품 내역
              </p>
              <ul className="divide-y divide-line border-y border-line">
                {checkoutModal.items.map((item) => (
                  <li
                    key={item.key}
                    className="py-4 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <img
                        src={item.imageSrc}
                        alt={item.productName}
                        className="h-16 w-16 shrink-0 object-cover border border-line bg-bg"
                      />
                      <div className="min-w-0">
                        <p className="text-[15px] font-medium text-ink">
                          {item.productName}
                        </p>
                        <p className="mt-0.5 text-[13px] text-muted">
                          {item.optionSummary}
                        </p>
                        <p className="mt-1 text-[13px] text-muted tabular-nums">
                          단가 {formatKRW(item.unitPrice)} × {item.quantity}개
                        </p>
                      </div>
                    </div>
                    <p className="shrink-0 text-[15px] font-semibold text-ink tabular-nums">
                      {formatKRW(item.unitPrice * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex items-baseline justify-between">
                <span className="text-[14px] font-medium text-muted">
                  총 상품금액
                </span>
                <span className="text-[22px] font-semibold text-ink tabular-nums">
                  {formatKRW(checkoutModal.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-line bg-surface px-6 py-5 flex flex-col sm:flex-row gap-3">
            {SITE_INFO.isSurveyReady ? (
              <a
                href={SITE_INFO.surveyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex min-h-[52px] items-center justify-center gap-2 bg-accent px-5 text-[14px] font-medium text-bg hover:bg-accent-hover transition-colors"
              >
                <span>구매의향·피드백 설문 참여하기</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ) : (
              <span
                className="flex-1 inline-flex min-h-[52px] items-center justify-center bg-line px-5 text-[14px] font-medium text-muted select-none"
                aria-disabled="true"
              >
                설문 준비 중
              </span>
            )}
            <button
              type="button"
              onClick={closeCheckoutModal}
              className="inline-flex min-h-[52px] items-center justify-center border border-ink bg-bg px-6 text-[14px] font-medium text-ink hover:bg-ink hover:text-bg transition-colors cursor-pointer"
            >
              계속 둘러보기
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
