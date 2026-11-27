"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Check, Minus, Plus, QrCode } from "lucide-react";
import { formatKRW, PRODUCTS, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { StickySectionNav } from "@/components/pdp/StickySectionNav";
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
  const isCushion = product.slug === "petal-cushion";
  const hasDiffuserRefillPicker = Boolean(
    product.refill.requiredTypeOptions && product.refill.requiredScentOptions
  );

  return (
    <div className="w-full bg-bg">
      {/* 상단 브레드크럼 */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 pt-5 pb-3">
        <nav aria-label="현재 위치" className="text-[14.5px] text-muted">
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

      {/* 상단 2단 구매 영역 (items-start로 좌우 시작선 정밀 정렬) */}
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
              <p className="text-[14.5px] leading-[1.6] text-muted">
                {activeImageObj.caption}
              </p>
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
              <p className="text-[14.5px] ui-label text-muted">
                {product.categoryLabel}
              </p>

              <h1 className="mt-2 font-editorial-kr text-[27px] sm:text-[32px] font-bold leading-[1.38] tracking-[-0.02em] text-ink">
                {product.name}
              </h1>

              <p className="mt-2.5 text-[16.5px] leading-[1.68] text-muted">
                {product.oneLiner}
              </p>

              {/* 단가 vs 총 상품금액 명확 분리 */}
              <div className="mt-5 border-t border-line pt-4 space-y-2">
                <div className="flex items-baseline justify-between gap-4 text-[15.5px]">
                  <span className="text-muted">
                    선택 옵션 단가 ({product.unitLabel})
                  </span>
                  <span className="font-medium text-ink tabular-nums">
                    {formatKRW(unitPrice)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[15.5px] font-medium text-ink">
                    총 상품금액{quantity >= 2 ? ` (${quantity}개)` : ""}
                  </span>
                  <div className="text-right">
                    <p className="text-[27.5px] sm:text-[30px] font-semibold text-ink tabular-nums leading-tight">
                      {formatKRW(totalPrice)}
                    </p>
                    {quantity >= 2 && (
                      <p className="mt-1 text-[13.5px] text-muted tabular-nums">
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
                  <div key={group.id} className="space-y-2.5">
                    <p className="text-[15.5px] font-medium text-ink">
                      {group.name}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {group.choices.map((choice) => {
                        const isSelected = selectedId === choice.id;
                        const choiceFinalPrice = product.basePrice + choice.priceDelta;

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
                            className={`min-h-[54px] w-full border px-4 py-3 text-left transition-colors cursor-pointer flex items-center justify-between gap-3 ${
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
                                <p className="text-[15.5px] font-medium text-ink tabular-nums leading-[1.4]">
                                  {optionHeading}
                                </p>
                                {choice.sublabel && (
                                  <p className="mt-0.5 text-[13.5px] text-muted leading-[1.55]">
                                    {choice.sublabel}
                                  </p>
                                )}
                              </div>
                            </div>
                            {!isDiffuserGroup && (
                              <span className="shrink-0 text-[14.5px] tabular-nums text-muted">
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
                <span className="text-[15.5px] font-medium text-ink">수량</span>
                <div className="inline-flex items-center border border-line">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="inline-flex h-12 w-12 items-center justify-center text-ink hover:bg-surface cursor-pointer"
                    aria-label="수량 1 줄이기"
                  >
                    <Minus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <span className="w-12 text-center text-[16.5px] font-medium text-ink tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="inline-flex h-12 w-12 items-center justify-center text-ink hover:bg-surface cursor-pointer"
                    aria-label="수량 1 늘리기"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* 선택한 구성 요약 */}
            <div className="border border-line bg-surface p-4 sm:p-5">
              <p className="text-[14.5px] font-semibold text-ink mb-2.5">
                선택한 구성
              </p>
              <ul className="space-y-1.5 text-[14.5px] sm:text-[15.5px] leading-[1.6] text-muted">
                {currentIncludedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check
                      className="h-4 w-4 shrink-0 text-accent mt-1"
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
                className="min-h-[52px] w-full bg-accent px-5 text-[16px] ui-label font-medium text-bg hover:bg-accent-hover transition-colors cursor-pointer"
              >
                바로 구매하기
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="min-h-[52px] w-full border border-ink bg-bg px-5 text-[16px] ui-label font-medium text-ink hover:bg-ink hover:text-bg transition-colors cursor-pointer"
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
            <div className="space-y-3">
              <EditorialImage
                src={product.images.composition.src}
                alt={product.images.composition.alt}
                aspectRatio={product.images.composition.aspectRatio ?? "4/5"}
                showAiCaption
                tone="white"
              />
              {isHousewarming ? (
                <p className="text-[15.5px] font-medium text-ink">
                  디퓨저는 두 종류 중 1개만 포함됩니다.
                </p>
              ) : (
                product.images.composition.caption && (
                  <p className="text-[14.5px] text-muted">
                    {product.images.composition.caption}
                  </p>
                )
              )}
            </div>

            <div className="space-y-5">
              <p className="text-[14.5px] font-medium text-accent ui-label">
                핵심 특징
              </p>
              <h2 className="font-editorial-kr text-[25.5px] sm:text-[31px] font-normal leading-[1.38] tracking-[-0.02em] text-ink">
                {product.detailHeadline}
              </h2>
              <p className="text-[17.5px] leading-[1.72] text-muted">
                {product.coreDescription}
              </p>

              {product.compositionNotice && (
                <div className="border-l-2 border-accent bg-surface px-4 py-3.5 text-[15.5px] leading-[1.65] font-medium text-ink">
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
              <p className="text-[14.5px] font-medium text-accent ui-label">
                사용 장면
              </p>
              <h2 className="font-editorial-kr text-[25.5px] sm:text-[30px] font-normal leading-[1.38] tracking-[-0.02em] text-ink">
                {product.sceneHeadline}
              </h2>
              <p className="text-[17.5px] leading-[1.72] text-muted">
                {product.sceneBody}
              </p>

              <div className="border-t border-line pt-4">
                <p className="text-[15.5px] font-medium text-ink mb-2.5">
                  선택한 구성 ({optionSummary || "기본 구성"})
                </p>
                {splitIncluded.hasSplit ? (
                  <div className="space-y-3.5 text-[15.5px] leading-[1.65]">
                    <div>
                      <p className="text-[14.5px] font-semibold text-accent">
                        선택 디퓨저
                      </p>
                      <ul className="mt-1 space-y-1 text-ink">
                        {splitIncluded.selectedOnly.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[14.5px] font-semibold text-muted">
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
                  <ul className="space-y-1 text-[15.5px] leading-[1.65] text-muted">
                    {currentIncludedItems.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-2.5">
              <EditorialImage
                src={product.images.lifestyle.src}
                alt={product.images.lifestyle.alt}
                aspectRatio="4/5"
                showAiCaption
                tone="surface"
              />
              {product.images.lifestyle.caption && (
                <p className="text-[14.5px] text-muted">
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
                  <figcaption className="text-[14.5px] leading-[1.6] text-muted border-t border-line pt-2.5">
                    {detail.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>

        {/* STAGE 3: 사용 순서 (공통 반복 타이머 제거 — 잠깐, 방석만 전용 /pause 연동 안내 제공) */}
        <section
          id="stage-3"
          className="scroll-mt-36 border-t border-line pt-14 md:pt-18 space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[14.5px] font-medium text-accent ui-label">
                사용 순서
              </p>
              <h2 className="mt-2 font-editorial-kr text-[25.5px] sm:text-[30px] font-normal leading-[1.38] tracking-[-0.02em] text-ink">
                이렇게 사용해 보세요
              </h2>
            </div>

            {isCushion && (
              <Link
                href="/pause"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-accent px-5 text-[15.5px] ui-label font-medium text-bg hover:bg-accent-hover transition-colors shrink-0"
              >
                <span>잠깐, 호흡 타이머 열기</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            )}
          </div>

          {/* 3단계 사용 방법 */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-line">
            {product.ritualSteps.map((step) => (
              <div
                key={step.step}
                className="border-r border-b border-line bg-bg p-6 sm:p-7 space-y-3"
              >
                <p className="font-editorial-en text-[17px] font-medium text-accent tabular-nums">
                  {step.step}
                </p>
                <h3 className="font-editorial-kr text-[19.5px] font-bold text-ink">
                  {step.title}
                </h3>
                <p className="text-[15.5px] leading-[1.72] text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* 잠깐, 방석 전용 QR 라벨 ↔ /pause 연결 카드 */}
          {isCushion && (
            <div className="border border-line bg-surface p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-[56ch]">
                <p className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-accent ui-label">
                  <QrCode className="h-4 w-4" strokeWidth={1.5} />
                  <span>옆면 QR 라벨 연동 안내</span>
                </p>
                <p className="font-editorial-kr text-[20px] font-bold text-ink">
                  방석에 앉아 바로 여는 3분 · 5분 · 10분 호흡 타이머
                </p>
                <p className="text-[15.5px] leading-[1.7] text-muted">
                  옆면 CHALNA QR 라벨을 스캔하거나 아래 버튼을 누르면 전용
                  &lsquo;잠깐, 호흡&rsquo; 페이지로 이동해 4·4·6 호흡 가이드를 바로
                  시작할 수 있습니다.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                <Link
                  href="/pause"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-accent px-6 text-[15.5px] ui-label font-medium text-bg hover:bg-accent-hover transition-colors"
                >
                  <span>잠깐, 호흡으로 이동</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/story/petal-cushion"
                  className="inline-flex min-h-[48px] items-center justify-center border border-ink bg-bg px-5 text-[15.5px] ui-label font-medium text-ink hover:bg-ink hover:text-bg transition-colors"
                >
                  QR 이야기 페이지
                </Link>
              </div>
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
              <p className="text-[14.5px] font-medium text-accent ui-label">
                사양·관리
              </p>
              <h2 className="mt-2 font-editorial-kr text-[25.5px] sm:text-[30px] font-normal leading-[1.38] tracking-[-0.02em] text-ink">
                구성 확인 · 상세 사양 · 안전 안내
              </h2>
            </div>

            {/* 현재 선택한 구성 vs 리필/묶음 탭 스위처 */}
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
                  className={`min-h-[52px] px-4 text-[15.5px] sm:text-[16.5px] ui-label transition-colors cursor-pointer ${
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
                  className={`min-h-[52px] px-4 text-[15.5px] sm:text-[16.5px] ui-label border-l border-line transition-colors cursor-pointer ${
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
                      <h3 className="font-editorial-kr text-[20px] font-bold text-ink">
                        {product.name} ({optionSummary || "기본 구성"})
                      </h3>
                      <p className="mt-1 text-[14.5px] text-muted">
                        상단에서 선택한 옵션과 실시간으로 연동된 구성입니다.
                      </p>
                    </div>

                    {splitIncluded.hasSplit ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-line pt-4 text-[15.5px] leading-[1.65]">
                        <div>
                          <p className="text-[14.5px] font-semibold text-accent mb-2">
                            선택 구성
                          </p>
                          <ul className="space-y-1.5 text-ink">
                            {splitIncluded.selectedOnly.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check
                                  className="h-4 w-4 shrink-0 text-accent mt-1"
                                  strokeWidth={1.5}
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="sm:border-l sm:border-line sm:pl-4">
                          <p className="text-[14.5px] font-semibold text-muted mb-2">
                            공통 구성
                          </p>
                          <ul className="space-y-1.5 text-muted">
                            {splitIncluded.commonOnly.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check
                                  className="h-4 w-4 shrink-0 text-muted mt-1"
                                  strokeWidth={1.5}
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <ul className="space-y-1.5 border-t border-line pt-4 text-[15.5px] leading-[1.65] text-ink">
                        {currentIncludedItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check
                              className="h-4 w-4 shrink-0 text-accent mt-1"
                              strokeWidth={1.5}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-line pt-5 md:pt-0 md:pl-6 space-y-2">
                    <p className="text-[14.5px] text-muted">현재 선택 가격</p>
                    <p className="text-[25.5px] font-semibold text-ink tabular-nums leading-snug">
                      {formatKRW(unitPrice)}{" "}
                      <span className="text-[15.5px] font-normal text-muted">
                        ({product.unitLabel})
                      </span>
                    </p>
                    <p className="text-[13.5px] leading-[1.6] text-muted">
                      상단 옵션 전환 시 구성품과 가격이 즉시 반영됩니다.
                    </p>
                  </div>
                </div>
              ) : product.refill.available ? (
                <div className="p-6 sm:p-7 bg-bg grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <h3 className="font-editorial-kr text-[20px] font-bold text-ink">
                        {product.refill.refillName}
                      </h3>
                      <p className="mt-1.5 text-[15.5px] leading-[1.68] text-muted">
                        {product.refill.compatibility}
                      </p>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[15.5px] border-t border-line pt-4">
                      <div>
                        <dt className="text-[13.5px] text-muted">리필 구성</dt>
                        <dd className="text-ink mt-0.5">{product.refill.unit}</dd>
                      </div>
                      <div>
                        <dt className="text-[13.5px] text-muted">권장 교체 주기</dt>
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
                          <p className="text-[13.5px] text-muted">리필 판매가</p>
                          <p className="text-[25.5px] font-semibold text-accent tabular-nums">
                            {formatKRW(product.refill.refillPrice ?? 0)}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            type="button"
                            onClick={() => handleRefillAction("direct")}
                            className="min-h-[48px] w-full bg-accent px-4 text-[15.5px] ui-label font-medium text-bg hover:bg-accent-hover transition-colors cursor-pointer"
                          >
                            리필 구매하기
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRefillAction("cart")}
                            className="min-h-[48px] w-full border border-ink bg-bg px-4 text-[15.5px] ui-label font-medium text-ink hover:bg-ink hover:text-bg transition-colors cursor-pointer"
                          >
                            리필 장바구니 담기
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-7 bg-bg grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-8 space-y-3">
                    <h3 className="font-editorial-kr text-[20px] font-bold text-ink">
                      {product.refill.giftOrBundleTitle}
                    </h3>
                    <p className="text-[15.5px] leading-[1.68] text-muted">
                      {product.refill.giftOrBundleSummary}
                    </p>
                    {product.refill.giftOrBundleIncluded && (
                      <ul className="space-y-1.5 pt-2 text-[15.5px] text-ink">
                        {product.refill.giftOrBundleIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check
                              className="h-4 w-4 shrink-0 text-accent mt-1"
                              strokeWidth={1.5}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-line pt-5 md:pt-0 md:pl-6 space-y-2">
                    <p className="text-[13.5px] text-muted">묶음 기준가</p>
                    <p className="text-[25.5px] font-semibold text-ink tabular-nums">
                      {formatKRW(product.refill.giftOrBundlePrice ?? product.basePrice)}
                    </p>
                    <p className="text-[13.5px] leading-[1.6] text-muted">
                      상단 구성 선택에서 바로 선택할 수 있습니다.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 상세 스펙 표 (th/td 너비 비율 및 align-middle 수직 중앙 정렬 통일) */}
          <div>
            <h3 className="font-editorial-kr text-[20px] font-bold text-ink mb-4">
              상품 상세 사양
            </h3>
            <div className="overflow-x-auto border-t border-ink">
              <table className="w-full border-collapse text-left text-[15.5px] sm:text-[16px]">
                <tbody className="divide-y divide-line border-b border-line">
                  {product.specs.map((row) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="w-[34%] sm:w-[24%] bg-surface px-4 sm:px-5 py-4 font-medium text-ink align-middle"
                      >
                        {row.label}
                      </th>
                      <td className="w-[66%] sm:w-[76%] px-4 sm:px-5 py-4 text-muted align-middle leading-[1.68]">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 안전 주의사항 & 안전·표시·청약철회 안내 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="border border-line bg-surface p-6 space-y-4">
              <div className="flex items-center gap-2 text-ink">
                <AlertCircle className="h-4 w-4 text-accent shrink-0" strokeWidth={1.5} />
                <h3 className="font-editorial-kr text-[18.5px] font-bold">
                  사용 안전 및 주의사항
                </h3>
              </div>
              <div className="space-y-4">
                {product.safetyNotices.map((notice, idx) => (
                  <div
                    key={idx}
                    className="border-t border-line pt-3.5 text-[15.5px] leading-[1.7] text-muted space-y-1.5"
                  >
                    <p className="font-semibold text-ink">{notice.title}</p>
                    <p>예방: {notice.prevention}</p>
                    <p>대처: {notice.action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-line bg-bg p-6 flex flex-col justify-between gap-6">
              <div className="space-y-2.5">
                <h3 className="font-editorial-kr text-[18.5px] font-bold text-ink">
                  안전·표시 안내
                </h3>
                <p className="text-[15.5px] leading-[1.7] text-muted">
                  {product.complianceNotice}
                </p>
              </div>

              <div className="border-t border-line pt-5 space-y-2.5 text-[15.5px] leading-[1.7] text-muted">
                <h3 className="font-editorial-kr text-[17.5px] font-bold text-ink">
                  청약철회 및 교환·환불 안내
                </h3>
                <p>
                  전자상거래 등에서의 소비자보호에 관한 법률에 따라 재화 수령일로부터{" "}
                  <strong className="font-medium text-ink">7일 이내</strong>{" "}
                  청약철회가 가능합니다.
                </p>
                <Link
                  href="/policy/returns"
                  className="inline-flex min-h-[44px] items-center text-[15.5px] ui-label font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
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
            <h2 className="font-editorial-kr text-[24px] sm:text-[28px] font-normal text-ink">
              다른 상품 둘러보기
            </h2>
            <Link
              href="/products"
              className="inline-flex min-h-[48px] items-center text-[15.5px] ui-label font-medium text-accent underline underline-offset-4 hover:text-accent-hover shrink-0"
            >
              전체 8종 보기
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} product={item} showRefill={false} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
