"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, ShieldCheck, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatKRW } from "@/data/products";
import { SITE_INFO } from "@/data/site";

/**
 * 시연용 결제·설문 모달 (RQ-024, RQ-030)
 * - Native <dialog> + showModal() 사용 (modern-web-guidance 준수)
 * - 이름·연락처·결제정보 입력 폼 0개 (개인정보 미수집)
 */
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
        <div className="flex flex-col bg-[#FFFFFF]">
          {/* 헤더 */}
          <div className="flex items-center justify-between border-b border-[#E5E4DE] px-6 py-5">
            <div>
              <p className="font-editorial-en text-[11px] tracking-[0.22em] uppercase text-[#5B8477]">
                CHALNA ORDER PREVIEW
              </p>
              <h2
                id="demo-checkout-title"
                className="mt-1 font-editorial-kr text-[20px] text-[#1A1A1A]"
              >
                주문 시연 안내
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCheckoutModal}
              autoFocus
              className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center text-[#4F4F4B] hover:text-[#1A1A1A] transition-colors cursor-pointer"
              aria-label="시연 안내 모달 닫기"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* 본문 */}
          <div className="px-6 py-6 space-y-6 overflow-y-auto max-h-[68dvh]">
            {/* 시연 고지 박스 */}
            <div className="border border-[#E5E4DE] bg-[#F7F6F2] p-4 flex items-start gap-3">
              <ShieldCheck
                className="h-5 w-5 shrink-0 text-[#5B8477] mt-0.5"
                strokeWidth={1.5}
              />
              <div className="text-[14px] leading-[1.7] text-[#4F4F4B]">
                <p className="font-medium text-[#1A1A1A]">
                  현재 정식 오픈 전 시연 단계로, 실제 결제·배송이 진행되지 않습니다.
                </p>
                <p className="mt-1">
                  이름, 연락처, 주소, 결제정보 등 어떠한 개인정보도 수집하지 않으며 실제 주문이 접수되지 않습니다.
                  선택하신 구성과 가격을 확인하신 뒤, 아래 설문으로 상품에 대한 솔직한 의견을 남겨 주세요.
                </p>
              </div>
            </div>

            {/* 선택 상품 / 옵션 / 총액 요약 */}
            <div>
              <p className="font-editorial-en text-[11px] tracking-[0.2em] uppercase text-[#787872] mb-3">
                SELECTED SUMMARY
              </p>
              <ul className="divide-y divide-[#E5E4DE] border-y border-[#E5E4DE]">
                {checkoutModal.items.map((item) => (
                  <li
                    key={item.key}
                    className="py-4 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <img
                        src={item.imageSrc}
                        alt={item.productName}
                        className="h-16 w-16 shrink-0 object-cover border border-[#E5E4DE] bg-[#F7F6F2]"
                      />
                      <div className="min-w-0">
                        <p className="text-[15px] font-medium text-[#1A1A1A]">
                          {item.productName}
                        </p>
                        <p className="mt-0.5 text-[13px] text-[#787872]">
                          {item.optionSummary}
                        </p>
                        <p className="mt-1 text-[13px] text-[#4F4F4B] tabular-nums">
                          수량 {item.quantity}개 · 개당 {formatKRW(item.unitPrice)}
                        </p>
                      </div>
                    </div>
                    <p className="shrink-0 text-[15px] font-medium text-[#1A1A1A] tabular-nums">
                      {formatKRW(item.unitPrice * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex items-baseline justify-between">
                <span className="text-[14px] text-[#4F4F4B]">
                  총 주문 금액
                </span>
                <span className="font-editorial-en text-[24px] text-[#1A1A1A] tabular-nums">
                  {formatKRW(checkoutModal.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* 하단 액션 버튼 */}
          <div className="border-t border-[#E5E4DE] bg-[#F7F6F2] px-6 py-5 flex flex-col sm:flex-row gap-3">
            <a
              href={SITE_INFO.surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex min-h-[52px] items-center justify-center gap-2 bg-[#5B8477] px-5 text-[14px] font-medium text-[#FFFFFF] hover:bg-[#496C61] transition-colors"
            >
              <span>구매의향 · 피드백 설문 참여하기</span>
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <button
              type="button"
              onClick={closeCheckoutModal}
              className="inline-flex min-h-[52px] items-center justify-center border border-[#1A1A1A] bg-[#FFFFFF] px-6 text-[14px] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              계속 둘러보기
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
