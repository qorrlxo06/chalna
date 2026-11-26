"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, Check, ChevronDown, Minus, Plus } from "lucide-react";
import { formatKRW, PRODUCTS, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { StickySectionNav } from "@/components/pdp/StickySectionNav";
import { RitualTimer } from "@/components/pdp/RitualTimer";
import { StoryDisclosure } from "@/components/pdp/StoryDisclosure";
import { DiffuserRefillPicker } from "@/components/DiffuserRefillPicker";
import { ProductCard } from "@/components/ProductCard";

export function ProductDetailClient({ product }: { product: Product }) {
  const { addItem, openDirectCheckout } = useCart();

  // 각 옵션 그룹의 초기 선택값
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};
      for (const group of product.optionGroups) {
        if (group.choices[0]) {
          initial[group.id] = group.choices[0].id;
        }
      }
      return initial;
    }
  );

  // 갤러리 이미지 목록 (중복 제거, 최소 3장 이상 보장)
  const galleryImages = useMemo(() => {
    const raw = [
      product.images.main,
      product.images.composition,
      product.images.lifestyle,
      ...product.images.details,
    ];
    const seen = new Set<string>();
    return raw.filter((img) => {
      if (seen.has(img.src)) return false;
      seen.add(img.src);
      return true;
    });
  }, [product]);

  const [activeImageSrc, setActiveImageSrc] = useState<string>(
    product.images.main.src
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [stage4Tab, setStage4Tab] = useState<"selected" | "alt">("selected");
  const [timerOpen, setTimerOpen] = useState<boolean>(
    Boolean(product.timerOpenByDefault)
  );

  // 현재 선택된 옵션 객체들
  const selectedChoices = useMemo(() => {
    return product.optionGroups.map((group) => {
      const chosenId = selectedOptions[group.id];
      const choice =
        group.choices.find((c) => c.id === chosenId) ?? group.choices[0];
      return { groupId: group.id, groupName: group.name, choice };
    });
  }, [product.optionGroups, selectedOptions]);

  // 실시간 1개(1세트) 단가 계산
  const unitPrice = useMemo(() => {
    const delta = selectedChoices.reduce(
      (sum, item) => sum + (item.choice?.priceDelta ?? 0),
      0
    );
    return Math.max(0, product.basePrice + delta);
  }, [product.basePrice, selectedChoices]);

  const totalPrice = unitPrice * quantity;

  // 실시간 구성품 목록 (옵션별 override 반영 — 집들이 세트 꽃 리드형/돌탑형 연동)
  const currentIncludedItems = useMemo(() => {
    for (let i = selectedChoices.length - 1; i >= 0; i--) {
      const override = selectedChoices[i]?.choice?.includedOverride;
      if (override && override.length > 0) {
        return override;
      }
    }
    return product.includedItems;
  }, [product.includedItems, selectedChoices]);

  // 집들이 세트용 선택 구성 / 공통 구성 분리
  const splitIncluded = useMemo(() => {
    const selectedOnly = currentIncludedItems
      .filter((item) => item.startsWith("[선택]"))
      .map((item) => item.replace(/^\[선택\]\s*/, ""));
    const commonOnly = currentIncludedItems
      .filter((item) => item.startsWith("[공통]"))
      .map((item) => item.replace(/^\[공통\]\s*/, ""));
    return {
      hasSplit: selectedOnly.length > 0 && commonOnly.length > 0,
      selectedOnly,
      commonOnly,
    };
  }, [currentIncludedItems]);

  const optionSummary = useMemo(() => {
    return selectedChoices
      .map((item) => item.choice?.label ?? "")
      .filter(Boolean)
      .join(" / ");
  }, [selectedChoices]);

  const activeImageObj =
    galleryImages.find((img) => img.src === activeImageSrc) ??
    product.images.main;

  const handleSelectOption = (
    groupId: string,
    choiceId: string,
    imageSrc?: string
  ) => {
    setSelectedOptions((prev) => ({ ...prev, [groupId]: choiceId }));
    if (imageSrc) {
      setActiveImageSrc(imageSrc);
    }
  };

  const buildCartPayload = () => ({
    key: `${product.slug}__${Object.values(selectedOptions).join("_")}`,
    productSlug: product.slug,
    productName: product.name,
    imageSrc: activeImageSrc,
    optionSummary: optionSummary || "기본 구성",
    unitPrice,
    quantity,
  });

  const handleAddToCart = () => {
    addItem(buildCartPayload());
  };

  const handleDirectCheckout = () => {
    openDirectCheckout(buildCartPayload());
  };

  const handleRefillAction = (action: "cart" | "direct") => {
    if (!product.refill.available || !product.refill.refillPrice) return;
    const payload = {
      key: `${product.slug}__refill`,
      productSlug: product.slug,
      productName: product.refill.refillName ?? `${product.name} 리필`,
      imageSrc: product.images.lifestyle.src,
      optionSummary: `리필 전용 (${product.refill.unit ?? ""})`,
      unitPrice: product.refill.refillPrice,
      quantity: 1,
    };
    if (action === "cart") {
      addItem(payload);
    } else {
      openDirectCheckout(payload);
    }
  };

  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);
  }, [product.slug]);

  const isHousewarming = product.slug === "housewarming-set";
  const hasDiffuserRefillPicker = Boolean(
    product.refill.requiredTypeOptions && product.refill.requiredScentOptions
  );

  return (
    <div className="w-full bg-bg">
      {/* 상단 브레드크럼 */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 pt-5 pb-3">
        <nav aria-label="현재 위치" className="text-[13px] text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">
                홈
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/products?category=${product.category}`}
                className="hover:text-ink transition-colors"
              >
                {product.categoryLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink font-medium" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      {/* 상단 2단 구매 영역 */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 pb-14 md:pb-20">
        <div className="lookbook-asymmetric items-start">
          {/* 좌측: 갤러리 */}
          <div className="space-y-3">
            <EditorialImage
              src={activeImageSrc}
              alt={activeImageObj.alt}
              aspectRatio="1/1"
              showAiCaption
              priority
              tone="white"
            />
            {activeImageObj.caption && (
              <p className="text-[13px] text-muted">{activeImageObj.caption}</p>
            )}

            {/* 썸네일 스트립 */}
            <div
              className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-1"
              role="group"
              aria-label="상품 이미지 선택"
            >
              {galleryImages.map((img, idx) => {
                const isSelected = img.src === activeImageSrc;
                return (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImageSrc(img.src)}
                    aria-label={`${product.name} 이미지 ${idx + 1} 보기`}
                    aria-pressed={isSelected}
                    className={`relative aspect-square overflow-hidden border bg-bg transition-opacity cursor-pointer ${
                      isSelected
                        ? "border-accent opacity-100"
                        : "border-line opacity-65 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 우측: 실시간 옵션 선택기 & 구매 영역 */}
          <div className="lg:sticky lg:top-[88px] space-y-6">
            <div className="border-b border-line pb-5">
              <p className="text-[13px] text-muted">{product.categoryLabel}</p>

              <h1 className="mt-1.5 text-[24px] sm:text-[30px] font-semibold leading-[1.3] text-ink">
                {product.name}
              </h1>

              <p className="mt-2 text-[15px] text-muted leading-[1.6]">
                {product.oneLiner}
              </p>

              {/* 단가 vs 총 상품금액 명확 분리 (Phase 1 #01) */}
              <div className="mt-5 border-t border-line pt-4 space-y-1.5">
                <div className="flex items-baseline justify-between gap-4 text-[14px]">
                  <span className="text-muted">선택 옵션 단가 ({product.unitLabel})</span>
                  <span className="font-medium text-ink tabular-nums">
                    {formatKRW(unitPrice)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[14px] font-medium text-ink">
                    총 상품금액{quantity >= 2 ? ` (${quantity}개)` : ""}
                  </span>
                  <div className="text-right">
                    <p className="text-[26px] sm:text-[28px] font-semibold text-ink tabular-nums leading-tight">
                      {formatKRW(totalPrice)}
                    </p>
                    {quantity >= 2 && (
                      <p className="mt-0.5 text-[12px] text-muted tabular-nums">
                        {formatKRW(unitPrice)} × {quantity}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 다중 옵션 선택기 */}
            <div className="space-y-5">
              {product.optionGroups.map((group) => {
                const selectedId = selectedOptions[group.id];
                const isDiffuserGroup = group.id === "diffuser-type";
                return (
                  <div key={group.id} className="space-y-2">
                    <p className="text-[14px] font-medium text-ink">
                      {group.name}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {group.choices.map((choice) => {
                        const isSelected = selectedId === choice.id;
                        const choiceFinalPrice = product.basePrice + choice.priceDelta;

                        // Phase 1 #01: 집들이 디퓨저 옵션 카드에 최종가 + 추가금 명시
                        const optionHeading = isDiffuserGroup
                          ? choice.priceDelta > 0
                            ? `${choice.label} ${formatKRW(choiceFinalPrice)} · +${formatKRW(choice.priceDelta)}`
                            : `${choice.label} ${formatKRW(choiceFinalPrice)}`
                          : choice.label;

                        return (
                          <button
                            key={choice.id}
                            type="button"
                            onClick={() =>
                              handleSelectOption(group.id, choice.id, choice.imageSrc)
                            }
                            aria-pressed={isSelected}
                            className={`min-h-[52px] w-full border px-4 py-3 text-left transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                              isSelected
                                ? "border-accent bg-surface"
                                : "border-line bg-bg hover:border-ink"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {choice.swatchHex && (
                                <span
                                  className="h-4 w-4 shrink-0 border border-ink/20"
                                  style={{ backgroundColor: choice.swatchHex }}
                                  aria-hidden="true"
                                />
                              )}
                              <div className="min-w-0">
                                <p className="text-[14px] font-medium text-ink tabular-nums">
                                  {optionHeading}
                                </p>
                                {choice.sublabel && (
                                  <p className="text-[12px] text-muted leading-[1.5]">
                                    {choice.sublabel}
                                  </p>
                                )}
                              </div>
                            </div>
                            {!isDiffuserGroup && (
                              <span className="shrink-0 text-[13px] tabular-nums text-muted">
                                {choice.priceDelta === 0
                                  ? "기본가"
                                  : choice.priceDelta > 0
                                  ? `+${formatKRW(choice.priceDelta)}`
                                  : `-${formatKRW(Math.abs(choice.priceDelta))}`}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* 수량 조절 */}
              <div className="flex items-center justify-between border-y border-line py-3.5">
                <span className="text-[14px] font-medium text-ink">수량</span>
                <div className="inline-flex items-center border border-line">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="inline-flex h-11 w-11 items-center justify-center text-ink hover:bg-surface cursor-pointer"
                    aria-label="수량 1 줄이기"
                  >
                    <Minus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <span className="w-11 text-center text-[15px] font-medium text-ink tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="inline-flex h-11 w-11 items-center justify-center text-ink hover:bg-surface cursor-pointer"
                    aria-label="수량 1 늘리기"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* 선택한 구성 요약 */}
            <div className="border border-line bg-surface p-4">
              <p className="text-[13px] font-medium text-ink mb-2">
                선택한 구성
              </p>
              <ul className="space-y-1.5 text-[13px] sm:text-[14px] text-muted">
                {currentIncludedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check
                      className="h-4 w-4 shrink-0 text-accent mt-0.5"
                      strokeWidth={1.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 구매 / 장바구니 CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDirectCheckout}
                className="min-h-[52px] w-full bg-accent px-5 text-[15px] font-medium text-bg hover:bg-accent-hover transition-colors cursor-pointer"
              >
                바로 구매하기
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="min-h-[52px] w-full border border-ink bg-bg px-5 text-[15px] font-medium text-ink hover:bg-ink hover:text-bg transition-colors cursor-pointer"
              >
                장바구니 담기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 스티키 섹션 내비게이션 */}
      <StickySectionNav />

      {/* 본문 5단계: 핵심 특징 → 구성 → 사용 순서 → 사양·관리 → 이야기 */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-14 md:py-20 space-y-16 md:space-y-24">
        {/* STAGE 1: 핵심 특징 */}
        <section id="stage-1" className="scroll-mt-36">
          <div className="lookbook-asymmetric items-center">
            <div className="space-y-2.5">
              <EditorialImage
                src={product.images.composition.src}
                alt={product.images.composition.alt}
                aspectRatio={product.images.composition.aspectRatio ?? "4/5"}
                showAiCaption
                tone="white"
              />
              {isHousewarming ? (
                <p className="text-[14px] font-medium text-ink">
                  디퓨저는 두 종류 중 1개만 포함됩니다.
                </p>
              ) : (
                product.images.composition.caption && (
                  <p className="text-[13px] text-muted">
                    {product.images.composition.caption}
                  </p>
                )
              )}
            </div>

            <div className="space-y-5">
              <p className="text-[13px] font-medium text-accent">핵심 특징</p>
              <h2 className="text-[24px] sm:text-[30px] font-semibold leading-[1.35] text-ink">
                {product.detailHeadline}
              </h2>
              <p className="text-[16px] leading-[1.65] text-muted">
                {product.coreDescription}
              </p>

              {product.compositionNotice && (
                <div className="border-l-2 border-accent bg-surface px-4 py-3 text-[14px] font-medium text-ink">
                  {product.compositionNotice}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* STAGE 2: 구성 & 사용 장면 */}
        <section
          id="stage-2"
          className="scroll-mt-36 border-t border-line pt-14 md:pt-18 space-y-12"
        >
          <div className="lookbook-asymmetric-reverse items-center">
            <div className="space-y-4 order-2 lg:order-1">
              <p className="text-[13px] font-medium text-accent">사용 장면</p>
              <h2 className="text-[24px] sm:text-[28px] font-semibold leading-[1.35] text-ink">
                {product.sceneHeadline}
              </h2>
              <p className="text-[16px] leading-[1.65] text-muted">
                {product.sceneBody}
              </p>

              <div className="border-t border-line pt-4">
                <p className="text-[14px] font-medium text-ink mb-2">
                  선택한 구성 ({optionSummary || "기본 구성"})
                </p>
                {splitIncluded.hasSplit ? (
                  <div className="space-y-3 text-[14px]">
                    <div>
                      <p className="text-[13px] font-medium text-accent">
                        선택 디퓨저
                      </p>
                      <ul className="mt-1 space-y-1 text-ink">
                        {splitIncluded.selectedOnly.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-muted">
                        공통 구성
                      </p>
                      <ul className="mt-1 space-y-1 text-muted">
                        {splitIncluded.commonOnly.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <ul className="space-y-1 text-[14px] text-muted">
                    {currentIncludedItems.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-2">
              <EditorialImage
                src={product.images.lifestyle.src}
                alt={product.images.lifestyle.alt}
                aspectRatio="4/5"
                showAiCaption
                tone="surface"
              />
              {product.images.lifestyle.caption && (
                <p className="text-[13px] text-muted">
                  {product.images.lifestyle.caption}
                </p>
              )}
            </div>
          </div>

          {/* 2열 디테일 컷 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.images.details.map((detail, idx) => (
              <figure key={idx} className="space-y-2.5">
                <EditorialImage
                  src={detail.src}
                  alt={detail.alt}
                  aspectRatio={detail.aspectRatio ?? "4/5"}
                  showAiCaption
                  tone="white"
                />
                {detail.caption && (
                  <figcaption className="text-[13px] text-muted border-t border-line pt-2.5">
                    {detail.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>

        {/* STAGE 3: 사용 순서 + 접힘 호흡 타이머 (잠깐, 방석만 기본 열림) */}
        <section
          id="stage-3"
          className="scroll-mt-36 border-t border-line pt-14 md:pt-18 space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[13px] font-medium text-accent">사용 순서</p>
              <h2 className="mt-1.5 text-[24px] sm:text-[28px] font-semibold leading-[1.35] text-ink">
                이렇게 사용해 보세요
              </h2>
            </div>

            {!product.timerOpenByDefault && (
              <button
                type="button"
                onClick={() => setTimerOpen((v) => !v)}
                aria-expanded={timerOpen}
                aria-controls="pdp-breath-timer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-accent bg-bg px-5 text-[14px] font-medium text-accent hover:bg-accent hover:text-bg transition-colors cursor-pointer shrink-0"
              >
                <span>잠깐 호흡하기</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    timerOpen ? "rotate-180" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
            )}
          </div>

          {/* 3단계 사용 방법 */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-line">
            {product.ritualSteps.map((step) => (
              <div
                key={step.step}
                className="border-r border-b border-line bg-bg p-6 space-y-2.5"
              >
                <p className="text-[13px] font-semibold text-accent tabular-nums">
                  {step.step}
                </p>
                <h3 className="text-[17px] font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* 호흡 타이머 (일반 상품: 버튼 클릭 시 열림 / 잠깐, 방석: 기본 열림) */}
          {timerOpen && (
            <div id="pdp-breath-timer">
              <RitualTimer
                title={product.ritualTitle}
                defaultSeconds={product.ritualDefaultSeconds}
                presets={product.ritualPresets}
              />
            </div>
          )}
        </section>

        {/* STAGE 4: 사양·관리 (현재 선택한 구성 실시간 연동 + 리필/묶음 탭 + 스펙 + 안전 + 교환·환불) */}
        <section
          id="stage-4"
          className="scroll-mt-36 border-t border-line pt-14 md:pt-18 space-y-12"
        >
          <div className="space-y-5">
            <div>
              <p className="text-[13px] font-medium text-accent">사양·관리</p>
              <h2 className="mt-1.5 text-[24px] sm:text-[28px] font-semibold leading-[1.35] text-ink">
                구성 확인 · 상세 사양 · 안전 안내
              </h2>
            </div>

            {/* 현재 선택한 구성 vs 리필/묶음 탭 스위처 (Phase 1 #02 실시간 연동) */}
            <div className="border border-line">
              <div
                role="tablist"
                aria-label="구성 및 리필 안내 탭"
                className="grid grid-cols-2 border-b border-line"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={stage4Tab === "selected"}
                  onClick={() => setStage4Tab("selected")}
                  className={`min-h-[52px] px-4 text-[14px] sm:text-[15px] transition-colors cursor-pointer ${
                    stage4Tab === "selected"
                      ? "bg-ink text-bg font-medium"
                      : "bg-surface text-muted hover:text-ink"
                  }`}
                >
                  현재 선택한 구성
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={stage4Tab === "alt"}
                  onClick={() => setStage4Tab("alt")}
                  className={`min-h-[52px] px-4 text-[14px] sm:text-[15px] border-l border-line transition-colors cursor-pointer ${
                    stage4Tab === "alt"
                      ? "bg-accent text-bg font-medium"
                      : "bg-surface text-muted hover:text-ink"
                  }`}
                >
                  {product.refill.available
                    ? "리필 안내"
                    : product.refill.giftOrBundleTabLabel ?? "선물·묶음 구성"}
                </button>
              </div>

              {stage4Tab === "selected" ? (
                <div className="p-6 sm:p-7 bg-bg grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <h3 className="text-[18px] font-semibold text-ink">
                        {product.name} ({optionSummary || "기본 구성"})
                      </h3>
                      <p className="mt-1 text-[13px] text-muted">
                        상단에서 선택한 옵션과 실시간으로 연동된 구성입니다.
                      </p>
                    </div>

                    {splitIncluded.hasSplit ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-line pt-4 text-[14px]">
                        <div>
                          <p className="text-[13px] font-semibold text-accent mb-2">
                            선택 구성
                          </p>
                          <ul className="space-y-1.5 text-ink">
                            {splitIncluded.selectedOnly.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check
                                  className="h-4 w-4 shrink-0 text-accent mt-0.5"
                                  strokeWidth={1.5}
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="sm:border-l sm:border-line sm:pl-4">
                          <p className="text-[13px] font-semibold text-muted mb-2">
                            공통 구성
                          </p>
                          <ul className="space-y-1.5 text-muted">
                            {splitIncluded.commonOnly.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check
                                  className="h-4 w-4 shrink-0 text-muted mt-0.5"
                                  strokeWidth={1.5}
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <ul className="space-y-1.5 border-t border-line pt-4 text-[14px] text-ink">
                        {currentIncludedItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check
                              className="h-4 w-4 shrink-0 text-accent mt-0.5"
                              strokeWidth={1.5}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-line pt-5 md:pt-0 md:pl-6 space-y-1.5">
                    <p className="text-[13px] text-muted">현재 선택 가격</p>
                    <p className="text-[24px] font-semibold text-ink tabular-nums">
                      {formatKRW(unitPrice)}{" "}
                      <span className="text-[14px] font-normal text-muted">
                        ({product.unitLabel})
                      </span>
                    </p>
                    <p className="text-[12px] text-muted">
                      상단 옵션 전환 시 구성품과 가격이 즉시 반영됩니다.
                    </p>
                  </div>
                </div>
              ) : product.refill.available ? (
                <div className="p-6 sm:p-7 bg-bg grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <h3 className="text-[18px] font-semibold text-ink">
                        {product.refill.refillName}
                      </h3>
                      <p className="mt-1 text-[14px] text-muted">
                        {product.refill.compatibility}
                      </p>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px] border-t border-line pt-4">
                      <div>
                        <dt className="text-[12px] text-muted">리필 구성</dt>
                        <dd className="text-ink mt-0.5">{product.refill.unit}</dd>
                      </div>
                      <div>
                        <dt className="text-[12px] text-muted">권장 교체 주기</dt>
                        <dd className="text-ink mt-0.5">
                          {product.refill.recommendedCycle}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-line pt-5 md:pt-0 md:pl-6 space-y-4">
                    {hasDiffuserRefillPicker ? (
                      <DiffuserRefillPicker product={product} compact />
                    ) : (
                      <>
                        <div>
                          <p className="text-[12px] text-muted">리필 판매가</p>
                          <p className="text-[24px] font-semibold text-accent tabular-nums">
                            {formatKRW(product.refill.refillPrice ?? 0)}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            type="button"
                            onClick={() => handleRefillAction("direct")}
                            className="min-h-[48px] w-full bg-accent px-4 text-[14px] font-medium text-bg hover:bg-accent-hover transition-colors cursor-pointer"
                          >
                            리필 구매하기
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRefillAction("cart")}
                            className="min-h-[48px] w-full border border-ink bg-bg px-4 text-[14px] font-medium text-ink hover:bg-ink hover:text-bg transition-colors cursor-pointer"
                          >
                            리필 장바구니 담기
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-7 bg-bg grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <h3 className="text-[18px] font-semibold text-ink">
                      {product.refill.giftOrBundleTitle}
                    </h3>
                    <p className="text-[14px] text-muted">
                      {product.refill.giftOrBundleSummary}
                    </p>
                    {product.refill.giftOrBundleIncluded && (
                      <ul className="space-y-1.5 pt-2 text-[14px] text-ink">
                        {product.refill.giftOrBundleIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check
                              className="h-4 w-4 shrink-0 text-accent mt-0.5"
                              strokeWidth={1.5}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-line pt-5 md:pt-0 md:pl-6 space-y-1.5">
                    <p className="text-[12px] text-muted">묶음 기준가</p>
                    <p className="text-[24px] font-semibold text-ink tabular-nums">
                      {formatKRW(product.refill.giftOrBundlePrice ?? product.basePrice)}
                    </p>
                    <p className="text-[12px] text-muted">
                      상단 구성 선택에서 바로 선택할 수 있습니다.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 상세 스펙 표 */}
          <div>
            <h3 className="text-[18px] font-semibold text-ink mb-4">
              상품 상세 사양
            </h3>
            <div className="overflow-x-auto border-t border-ink">
              <table className="w-full border-collapse text-left text-[14px] sm:text-[15px]">
                <tbody className="divide-y divide-line border-b border-line">
                  {product.specs.map((row) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="w-[34%] sm:w-[24%] bg-surface px-4 sm:px-5 py-3.5 font-medium text-ink align-top"
                      >
                        {row.label}
                      </th>
                      <td className="px-4 sm:px-5 py-3.5 text-muted align-top">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 안전 주의사항 & 안전·표시·청약철회 안내 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-line bg-surface p-6 space-y-4">
              <div className="flex items-center gap-2 text-ink">
                <AlertCircle className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <h3 className="text-[16px] font-semibold">사용 안전 및 주의사항</h3>
              </div>
              <div className="space-y-4">
                {product.safetyNotices.map((notice, idx) => (
                  <div
                    key={idx}
                    className="border-t border-line pt-3 text-[14px] leading-[1.65] text-muted space-y-1"
                  >
                    <p className="font-medium text-ink">{notice.title}</p>
                    <p>예방: {notice.prevention}</p>
                    <p>대처: {notice.action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-line bg-bg p-6 flex flex-col justify-between gap-6">
              <div className="space-y-2.5">
                <h3 className="text-[16px] font-semibold text-ink">
                  안전·표시 안내
                </h3>
                <p className="text-[14px] leading-[1.65] text-muted">
                  {product.complianceNotice}
                </p>
              </div>

              <div className="border-t border-line pt-5 space-y-2 text-[14px] leading-[1.65] text-muted">
                <h3 className="text-[15px] font-semibold text-ink">
                  청약철회 및 교환·환불 안내
                </h3>
                <p>
                  전자상거래 등에서의 소비자보호에 관한 법률에 따라 재화 수령일로부터{" "}
                  <strong className="font-medium text-ink">7일 이내</strong>{" "}
                  청약철회가 가능합니다.
                </p>
                <Link
                  href="/policy/returns"
                  className="inline-flex min-h-[44px] items-center text-[14px] font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
                >
                  교환·환불 안내 자세히 보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STAGE 5: 기본 접힘 이야기 영역 */}
        <StoryDisclosure product={product} />

        {/* 함께 둘러보기 */}
        <section className="border-t border-line pt-14 md:pt-18">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="text-[22px] sm:text-[26px] font-semibold text-ink">
              다른 상품 둘러보기
            </h2>
            <Link
              href="/products"
              className="inline-flex min-h-[48px] items-center text-[14px] font-medium text-accent underline underline-offset-4 hover:text-accent-hover shrink-0"
            >
              전체 8종 보기
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} product={item} showRefill={false} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
