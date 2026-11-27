"use client";

import { useState } from "react";
import { formatKRW, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface DiffuserRefillPickerProps {
  product: Product;
  compact?: boolean;
}

/**
 * 디퓨저 리필 필수 옵션(타입 + 향) 선택 UI
 * - 두 필수 옵션을 모두 선택하기 전에는 장바구니 담기/구매 버튼 비활성화
 * - 타입·향이 다르면 장바구니에서 별도 행으로 분리
 */
export function DiffuserRefillPicker({
  product,
  compact = false,
}: DiffuserRefillPickerProps) {
  const { addItem, openDirectCheckout } = useCart();
  const types = product.refill.requiredTypeOptions ?? [];
  const scents = product.refill.requiredScentOptions ?? [];

  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedScentId, setSelectedScentId] = useState<string | null>(null);

  const selectedType = types.find((t) => t.id === selectedTypeId) ?? null;
  const selectedScent = scents.find((s) => s.id === selectedScentId) ?? null;
  const isReady = Boolean(selectedType && selectedScent);

  const missingMessage = !selectedType && !selectedScent
    ? "디퓨저 타입과 향을 모두 선택해 주세요."
    : !selectedType
    ? "디퓨저 타입을 선택해 주세요."
    : !selectedScent
    ? "향을 선택해 주세요."
    : `${selectedType.label} · ${selectedScent.label} (${selectedType.spec})`;

  const buildPayload = () => {
    if (!selectedType || !selectedScent) return null;
    return {
      key: `${product.slug}__refill__${selectedType.id}__${selectedScent.id}`,
      productSlug: product.slug,
      productName: product.refill.refillName ?? `${product.name} 리필`,
      imageSrc:
        selectedType.id === "stone-tower"
          ? "/images/products/housewarming-set-04-stone-lifestyle.png"
          : "/images/products/housewarming-set-05-reed-lifestyle.png",
      optionSummary: `타입: ${selectedType.label} · 향: ${selectedScent.label} · 구성: ${selectedType.spec}`,
      unitPrice: selectedType.price,
      quantity: 1,
    };
  };

  return (
    <div className={compact ? "space-y-4" : "space-y-5"}>
      {/* 디퓨저 타입 필수 선택 */}
      <div className="space-y-2">
        <p className="text-[14.5px] font-medium text-ink">
          디퓨저 타입 <span className="text-accent">(필수)</span>
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          role="group"
          aria-label="리필 디퓨저 타입 선택"
        >
          {types.map((t) => {
            const active = selectedTypeId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTypeId(t.id)}
                aria-pressed={active}
                className={`min-h-[52px] border px-3.5 py-2.5 text-left transition-colors cursor-pointer ${
                  active
                    ? "border-accent bg-surface text-ink"
                    : "border-line bg-bg text-ink hover:border-ink"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[15.5px] font-medium">{t.label}</span>
                  <span className="text-[14.5px] text-muted tabular-nums">
                    {formatKRW(t.price)}
                  </span>
                </div>
                <p className="mt-0.5 text-[13.5px] leading-[1.45] text-muted">
                  {t.spec}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 향 필수 선택 */}
      <div className="space-y-2">
        <p className="text-[14.5px] font-medium text-ink">
          향 선택 <span className="text-accent">(필수)</span>
        </p>
        <div
          className="grid grid-cols-1 gap-1.5"
          role="group"
          aria-label="리필 향 선택"
        >
          {scents.map((s) => {
            const active = selectedScentId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedScentId(s.id)}
                aria-pressed={active}
                className={`min-h-[48px] border px-3.5 py-2.5 text-left transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                  active
                    ? "border-accent bg-surface text-ink"
                    : "border-line bg-bg text-ink hover:border-ink"
                }`}
              >
                <span className="text-[15.5px] font-medium">{s.label}</span>
                <span className="hidden sm:inline text-[13.5px] text-muted">
                  {s.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 선택 상태 안내 */}
      <p
        className={`text-[14.5px] leading-[1.55] ${
          isReady ? "text-accent font-medium" : "text-muted"
        }`}
        role="status"
      >
        {missingMessage}
      </p>

      {/* 장바구니 / 구매 버튼 */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          disabled={!isReady}
          onClick={() => {
            const payload = buildPayload();
            if (payload) openDirectCheckout(payload);
          }}
          className={`min-h-[48px] px-3 text-[15.5px] ui-label font-medium transition-colors ${
            isReady
              ? "bg-accent text-bg hover:bg-accent-hover cursor-pointer"
              : "bg-line text-muted cursor-not-allowed"
          }`}
        >
          리필 구매하기
        </button>
        <button
          type="button"
          disabled={!isReady}
          onClick={() => {
            const payload = buildPayload();
            if (payload) addItem(payload);
          }}
          className={`min-h-[48px] border px-3 text-[15.5px] ui-label font-medium transition-colors ${
            isReady
              ? "border-ink bg-bg text-ink hover:bg-ink hover:text-bg cursor-pointer"
              : "border-line bg-surface text-muted cursor-not-allowed"
          }`}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
}
