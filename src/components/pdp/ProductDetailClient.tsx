"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, Check, Minus, Plus } from "lucide-react";
import {
  formatKRW,
  PRODUCTS,
  type Product,
} from "@/data/products";
import { useCart } from "@/context/CartContext";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Reveal } from "@/components/ui/Reveal";
import { StickySectionNav } from "@/components/pdp/StickySectionNav";
import { RitualTimer } from "@/components/pdp/RitualTimer";
import { StoryDisclosure } from "@/components/pdp/StoryDisclosure";
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
  const [stage4Tab, setStage4Tab] = useState<"full" | "alt">("full");

  // 현재 선택된 옵션 객체들
  const selectedChoices = useMemo(() => {
    return product.optionGroups.map((group) => {
      const chosenId = selectedOptions[group.id];
      const choice =
        group.choices.find((c) => c.id === chosenId) ?? group.choices[0];
      return { groupName: group.name, choice };
    });
  }, [product.optionGroups, selectedOptions]);

  // 실시간 가격 계산
  const unitPrice = useMemo(() => {
    const delta = selectedChoices.reduce(
      (sum, item) => sum + (item.choice?.priceDelta ?? 0),
      0
    );
    return Math.max(0, product.basePrice + delta);
  }, [product.basePrice, selectedChoices]);

  // 실시간 구성품 목록 (옵션별 override 반영 — RQ-022 집들이 세트 등)
  const currentIncludedItems = useMemo(() => {
    for (let i = selectedChoices.length - 1; i >= 0; i--) {
      const override = selectedChoices[i]?.choice?.includedOverride;
      if (override && override.length > 0) {
        return override;
      }
    }
    return product.includedItems;
  }, [product.includedItems, selectedChoices]);

  const optionSummary = useMemo(() => {
    return selectedChoices
      .map((item) => `${item.groupName}: ${item.choice?.label ?? ""}`)
      .join(" / ");
  }, [selectedChoices]);

  const activeImageObj =
    galleryImages.find((img) => img.src === activeImageSrc) ??
    product.images.main;

  const handleSelectOption = (groupId: string, choiceId: string, imageSrc?: string) => {
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

  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* 상단 브레드크럼 */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 pt-6 pb-4">
        <nav aria-label="현재 위치" className="text-[13px] text-[#787872]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#1A1A1A] transition-colors">
                홈
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/products?category=${product.category}`}
                className="hover:text-[#1A1A1A] transition-colors"
              >
                {product.categoryLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#1A1A1A]" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      {/* 상단 2단 구매 영역 (1.15fr : 0.85fr) */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 pb-16 md:pb-24">
        <div className="lookbook-asymmetric items-start">
          {/* 좌측: 룩북 갤러리 */}
          <div className="space-y-4">
            <EditorialImage
              src={activeImageSrc}
              alt={activeImageObj.alt}
              aspectRatio="1/1"
              showAiCaption
              priority
            />
            {activeImageObj.caption && (
              <p className="text-[13px] text-[#787872]">{activeImageObj.caption}</p>
            )}

            {/* 썸네일 스트립 */}
            <div
              className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 pt-1"
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
                    className={`relative aspect-square overflow-hidden border bg-[#F7F6F2] transition-opacity cursor-pointer ${
                      isSelected
                        ? "border-[#1A1A1A] opacity-100"
                        : "border-[#E5E4DE] opacity-65 hover:opacity-100"
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

          {/* 우측: 실시간 옵션 선택기 & 구매 체험 영역 */}
          <div className="lg:sticky lg:top-[136px] space-y-7">
            <div className="border-b border-[#E5E4DE] pb-6">
              <div className="flex items-center justify-between gap-3 text-[12px] tracking-[0.18em] text-[#787872]">
                <span className="font-editorial-en uppercase">
                  {product.code} · {product.enName}
                </span>
                <span className="shrink-0 whitespace-nowrap tracking-[0.04em]">
                  {product.categoryLabel}
                </span>
              </div>

              <h1 className="mt-3 font-editorial-kr text-[28px] sm:text-[34px] leading-[1.3] text-[#1A1A1A]">
                {product.name}
              </h1>

              <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#4F4F4B]">
                {product.oneLiner}
              </p>

              <div className="mt-6 flex items-baseline justify-between gap-4">
                <p className="font-editorial-en text-[28px] sm:text-[32px] text-[#1A1A1A] tabular-nums">
                  {formatKRW(unitPrice * quantity)}
                </p>
                {quantity > 1 && (
                  <p className="text-[13px] text-[#787872] tabular-nums">
                    개당 {formatKRW(unitPrice)} × {quantity}
                  </p>
                )}
              </div>
            </div>

            {/* 다중 옵션 선택기 */}
            <div className="space-y-6">
              {product.optionGroups.map((group) => {
                const selectedId = selectedOptions[group.id];
                return (
                  <div key={group.id} className="space-y-2.5">
                    <p className="text-[13px] font-medium text-[#1A1A1A]">
                      {group.name}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {group.choices.map((choice) => {
                        const isSelected = selectedId === choice.id;
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
                                ? "border-[#1A1A1A] bg-[#F7F6F2]"
                                : "border-[#E5E4DE] bg-[#FFFFFF] hover:border-[#787872]"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {choice.swatchHex && (
                                <span
                                  className="h-4 w-4 shrink-0 border border-[#1A1A1A]/20"
                                  style={{ backgroundColor: choice.swatchHex }}
                                  aria-hidden="true"
                                />
                              )}
                              <div className="min-w-0">
                                <p className="text-[14px] font-medium text-[#1A1A1A]">
                                  {choice.label}
                                </p>
                                {choice.sublabel && (
                                  <p className="text-[12px] text-[#787872] leading-[1.5]">
                                    {choice.sublabel}
                                  </p>
                                )}
                              </div>
                            </div>
                            <span className="shrink-0 text-[13px] tabular-nums text-[#4F4F4B]">
                              {choice.priceDelta === 0
                                ? "기본가"
                                : choice.priceDelta > 0
                                ? `+${formatKRW(choice.priceDelta)}`
                                : `-${formatKRW(Math.abs(choice.priceDelta))}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* 수량 조절 */}
              <div className="flex items-center justify-between border-y border-[#E5E4DE] py-4">
                <span className="text-[14px] text-[#4F4F4B]">수량</span>
                <div className="inline-flex items-center border border-[#E5E4DE]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="inline-flex h-12 w-12 items-center justify-center text-[#1A1A1A] hover:bg-[#F7F6F2] cursor-pointer"
                    aria-label="수량 1 줄이기"
                  >
                    <Minus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <span className="w-12 text-center text-[15px] text-[#1A1A1A] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="inline-flex h-12 w-12 items-center justify-center text-[#1A1A1A] hover:bg-[#F7F6F2] cursor-pointer"
                    aria-label="수량 1 늘리기"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* 실시간 구성품 요약 (RQ-021, RQ-022) */}
            <div className="border border-[#E5E4DE] bg-[#F7F6F2] p-4 sm:p-5">
              <p className="font-editorial-en text-[11px] tracking-[0.2em] uppercase text-[#787872] mb-2.5">
                INCLUDED IN THIS SELECTION
              </p>
              <ul className="space-y-1.5 text-[13px] sm:text-[14px] text-[#4F4F4B]">
                {currentIncludedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check
                      className="h-4 w-4 shrink-0 text-[#5B8477] mt-1"
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
                className="min-h-[52px] w-full bg-[#5B8477] px-5 text-[15px] font-medium text-[#FFFFFF] hover:bg-[#496C61] transition-colors cursor-pointer"
              >
                바로 구매하기
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="min-h-[52px] w-full border border-[#1A1A1A] bg-[#FFFFFF] px-5 text-[15px] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFFFFF] transition-colors cursor-pointer"
              >
                장바구니 담기
              </button>
            </div>

            <p className="text-[12px] leading-[1.65] text-[#787872]">
              주문 전 선택하신 옵션과 구성품을 확인해 주세요. 상품 이미지는 AI 연출 시안입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 스티키 섹션 내비게이션 (스크롤 스파이 연동) */}
      <StickySectionNav />

      {/* 본문 5단계 에디토리얼 영역 */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-16 md:py-28 space-y-20 md:space-y-32">
        {/* STAGE 1: 전체 구성 컷 우선 + 결핍 공감 카피 */}
        <section id="stage-1" className="scroll-mt-36">
          <Reveal>
            <div className="lookbook-asymmetric items-center">
              <div>
                <EditorialImage
                  src={product.images.composition.src}
                  alt={product.images.composition.alt}
                  aspectRatio={product.images.composition.aspectRatio ?? "4/5"}
                  showAiCaption
                />
                {product.images.composition.caption && (
                  <p className="mt-3 text-[13px] text-[#787872]">
                    {product.images.composition.caption}
                  </p>
                )}
              </div>

              <div className="space-y-6">
                <p className="font-editorial-en text-[12px] tracking-[0.22em] uppercase text-[#5B8477]">
                  01 · FULL COMPOSITION &amp; PAUSE
                </p>
                <h2 className="font-editorial-kr text-[26px] sm:text-[32px] leading-[1.45] text-[#1A1A1A]">
                  {product.empathyHeadline}
                </h2>
                <p className="text-[15px] sm:text-[16px] leading-[1.85] text-[#4F4F4B]">
                  {product.empathyBody}
                </p>
                <div className="border-t border-[#E5E4DE] pt-5">
                  <p className="text-[13px] font-medium text-[#1A1A1A] mb-2">
                    현재 선택 기준 구성품
                  </p>
                  <ul className="space-y-1.5 text-[14px] text-[#4F4F4B]">
                    {currentIncludedItems.map((item, idx) => (
                      <li key={idx}>— {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* STAGE 2: 비대칭 룩북 + 2열 디테일 컷 */}
        <section id="stage-2" className="scroll-mt-36 border-t border-[#E5E4DE] pt-16 md:pt-24 space-y-14 md:space-y-20">
          <Reveal>
            <div className="lookbook-asymmetric-reverse items-center">
              <div className="space-y-5 order-2 lg:order-1">
                <p className="font-editorial-en text-[12px] tracking-[0.22em] uppercase text-[#5B8477]">
                  02 · EDITORIAL LOOKBOOK
                </p>
                <h2 className="font-editorial-kr text-[26px] sm:text-[32px] leading-[1.45] text-[#1A1A1A]">
                  {product.editorialHeadline}
                </h2>
                <p className="text-[15px] sm:text-[16px] leading-[1.85] text-[#4F4F4B]">
                  {product.editorialBody}
                </p>
              </div>

              <div className="order-1 lg:order-2">
                <EditorialImage
                  src={product.images.lifestyle.src}
                  alt={product.images.lifestyle.alt}
                  aspectRatio="4/5"
                  showAiCaption
                />
                {product.images.lifestyle.caption && (
                  <p className="mt-3 text-[13px] text-[#787872]">
                    {product.images.lifestyle.caption}
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          {/* 2열 디테일 컷 */}
          <Reveal delayMs={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {product.images.details.map((detail, idx) => (
                <figure key={idx} className="space-y-3">
                  <EditorialImage
                    src={detail.src}
                    alt={detail.alt}
                    aspectRatio={detail.aspectRatio ?? "4/5"}
                    showAiCaption
                  />
                  {detail.caption && (
                    <figcaption className="text-[13px] text-[#4F4F4B] border-t border-[#E5E4DE] pt-3">
                      {detail.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </Reveal>
        </section>

        {/* STAGE 3: 실제 작동하는 3분 호흡·리추얼 타이머 위젯 + STEP 1~3 */}
        <section id="stage-3" className="scroll-mt-36 border-t border-[#E5E4DE] pt-16 md:pt-24 space-y-12">
          <Reveal>
            <div className="max-w-[60ch]">
              <p className="font-editorial-en text-[12px] tracking-[0.22em] uppercase text-[#5B8477]">
                03 · THREE-MINUTE RITUAL
              </p>
              <h2 className="mt-2 font-editorial-kr text-[26px] sm:text-[32px] leading-[1.45] text-[#1A1A1A]">
                사용 방법과 하루 3분의 호흡
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] text-[#4F4F4B]">
                복잡한 준비 없이 세 가지 짧은 동작만으로 하루의 속도를 늦춰 보세요.
                아래 타이머로 지금 바로 3분 호흡을 체험할 수 있습니다.
              </p>
            </div>
          </Reveal>

          {/* 3단계 사용 방법 */}
          <Reveal delayMs={80}>
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#E5E4DE]">
              {product.ritualSteps.map((step) => (
                <div
                  key={step.step}
                  className="border-r border-b border-[#E5E4DE] bg-[#FFFFFF] p-6 sm:p-8 space-y-3"
                >
                  <p className="font-editorial-en text-[13px] tracking-[0.2em] text-[#5B8477]">
                    {step.step}
                  </p>
                  <h3 className="font-editorial-kr text-[19px] text-[#1A1A1A]">
                    {step.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] leading-[1.75] text-[#4F4F4B]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* 실제 작동하는 3분 호흡 타이머 */}
          <Reveal delayMs={120}>
            <RitualTimer
              title={product.ritualTitle}
              defaultSeconds={product.ritualDefaultSeconds}
              presets={product.ritualPresets}
            />
          </Reveal>
        </section>

        {/* STAGE 4: 풀세트 vs 리필/선물 탭 스위처 + 상세 스펙 + 안전·인증·청약철회 */}
        <section id="stage-4" className="scroll-mt-36 border-t border-[#E5E4DE] pt-16 md:pt-24 space-y-14">
          <Reveal>
            <div className="space-y-6">
              <div>
                <p className="font-editorial-en text-[12px] tracking-[0.22em] uppercase text-[#5B8477]">
                  04 · SET, REFILL &amp; SPECIFICATION
                </p>
                <h2 className="mt-2 font-editorial-kr text-[26px] sm:text-[32px] leading-[1.45] text-[#1A1A1A]">
                  구성 비교 · 상세 사양 · 안전 안내
                </h2>
              </div>

              {/* 풀세트 vs 리필/선물 탭 스위처 */}
              <div className="border border-[#E5E4DE]">
                <div
                  role="tablist"
                  aria-label="구성 비교 탭"
                  className="grid grid-cols-2 border-b border-[#E5E4DE]"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={stage4Tab === "full"}
                    onClick={() => setStage4Tab("full")}
                    className={`min-h-[52px] px-4 text-[14px] sm:text-[15px] transition-colors cursor-pointer ${
                      stage4Tab === "full"
                        ? "bg-[#1A1A1A] text-[#FFFFFF] font-medium"
                        : "bg-[#F7F6F2] text-[#4F4F4B] hover:text-[#1A1A1A]"
                    }`}
                  >
                    기본 풀세트 구성
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={stage4Tab === "alt"}
                    onClick={() => setStage4Tab("alt")}
                    className={`min-h-[52px] px-4 text-[14px] sm:text-[15px] border-l border-[#E5E4DE] transition-colors cursor-pointer ${
                      stage4Tab === "alt"
                        ? "bg-[#5B8477] text-[#FFFFFF] font-medium"
                        : "bg-[#F7F6F2] text-[#4F4F4B] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {product.refill.available
                      ? "리필 반복 구매 안내"
                      : product.refill.giftOrBundleTabLabel ?? "선물·묶음 구성"}
                  </button>
                </div>

                {stage4Tab === "full" ? (
                  <div className="p-6 sm:p-8 bg-[#FFFFFF] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8 space-y-3">
                      <p className="font-editorial-kr text-[20px] text-[#1A1A1A]">
                        {product.name} — 기본 풀세트
                      </p>
                      <p className="text-[14px] text-[#787872]">
                        처음 시작하는 분을 위한 전체 본품 및 패키지 구성입니다.
                      </p>
                      <ul className="space-y-1.5 pt-2 text-[14px] text-[#4F4F4B]">
                        {product.includedItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check
                              className="h-4 w-4 shrink-0 text-[#5B8477] mt-1"
                              strokeWidth={1.5}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#E5E4DE] pt-5 md:pt-0 md:pl-6 space-y-2">
                      <p className="text-[12px] text-[#787872]">기본 판매가</p>
                      <p className="font-editorial-en text-[28px] text-[#1A1A1A] tabular-nums">
                        {formatKRW(product.basePrice)}
                      </p>
                      <p className="text-[12px] text-[#787872]">
                        상단 옵션 선택에 따라 금액과 구성이 변경됩니다.
                      </p>
                    </div>
                  </div>
                ) : product.refill.available ? (
                  <div className="p-6 sm:p-8 bg-[#FFFFFF] grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-8 space-y-4">
                      <div>
                        <p className="font-editorial-en text-[11px] tracking-[0.2em] uppercase text-[#5B8477]">
                          REFILL STATION COMPATIBLE
                        </p>
                        <p className="mt-1 font-editorial-kr text-[20px] text-[#1A1A1A]">
                          {product.refill.refillName}
                        </p>
                      </div>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px] border-t border-[#E5E4DE] pt-4">
                        <div>
                          <dt className="text-[12px] text-[#787872]">리필 단위</dt>
                          <dd className="text-[#1A1A1A] mt-0.5">{product.refill.unit}</dd>
                        </div>
                        <div>
                          <dt className="text-[12px] text-[#787872]">권장 교체 주기</dt>
                          <dd className="text-[#1A1A1A] mt-0.5">
                            {product.refill.recommendedCycle}
                          </dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-[12px] text-[#787872]">호환 정보</dt>
                          <dd className="text-[#4F4F4B] mt-0.5">
                            {product.refill.compatibility}
                          </dd>
                        </div>
                      </dl>
                      {product.refill.refillIncluded && (
                        <ul className="space-y-1.5 text-[14px] text-[#4F4F4B]">
                          {product.refill.refillIncluded.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check
                                className="h-4 w-4 shrink-0 text-[#5B8477] mt-1"
                                strokeWidth={1.5}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#E5E4DE] pt-5 md:pt-0 md:pl-6 space-y-4">
                      <div>
                        <p className="text-[12px] text-[#787872]">리필 판매가</p>
                        <p className="font-editorial-en text-[28px] text-[#5B8477] tabular-nums">
                          {formatKRW(product.refill.refillPrice ?? 0)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => handleRefillAction("direct")}
                          className="min-h-[48px] w-full bg-[#5B8477] px-4 text-[14px] font-medium text-[#FFFFFF] hover:bg-[#496C61] transition-colors cursor-pointer"
                        >
                          리필 구매하기
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRefillAction("cart")}
                          className="min-h-[48px] w-full border border-[#1A1A1A] bg-[#FFFFFF] px-4 text-[14px] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                        >
                          리필 장바구니 담기
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 sm:p-8 bg-[#FFFFFF] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8 space-y-3">
                      <p className="font-editorial-kr text-[20px] text-[#1A1A1A]">
                        {product.refill.giftOrBundleTitle}
                      </p>
                      <p className="text-[14px] text-[#4F4F4B]">
                        {product.refill.giftOrBundleSummary}
                      </p>
                      {product.refill.giftOrBundleIncluded && (
                        <ul className="space-y-1.5 pt-2 text-[14px] text-[#4F4F4B]">
                          {product.refill.giftOrBundleIncluded.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check
                                className="h-4 w-4 shrink-0 text-[#5B8477] mt-1"
                                strokeWidth={1.5}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#E5E4DE] pt-5 md:pt-0 md:pl-6 space-y-2">
                      <p className="text-[12px] text-[#787872]">선물·묶음 기준가</p>
                      <p className="font-editorial-en text-[28px] text-[#1A1A1A] tabular-nums">
                        {formatKRW(product.refill.giftOrBundlePrice ?? product.basePrice)}
                      </p>
                      <p className="text-[12px] text-[#787872]">
                        상단 구성 선택에서 바로 적용할 수 있습니다.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* 상세 스펙 표 */}
          <Reveal delayMs={60}>
            <div>
              <h3 className="font-editorial-kr text-[20px] text-[#1A1A1A] mb-4">
                상품 상세 사양
              </h3>
              <div className="overflow-x-auto border-t border-[#1A1A1A]">
                <table className="w-full border-collapse text-left text-[14px] sm:text-[15px]">
                  <tbody className="divide-y divide-[#E5E4DE] border-b border-[#E5E4DE]">
                    {product.specs.map((row) => (
                      <tr key={row.label}>
                        <th
                          scope="row"
                          className="w-[34%] sm:w-[26%] bg-[#F7F6F2] px-4 sm:px-6 py-4 font-medium text-[#1A1A1A] align-top"
                        >
                          {row.label}
                        </th>
                        <td className="px-4 sm:px-6 py-4 text-[#4F4F4B] align-top">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* 사용 안전 주의사항 (RQ-016) & 인증·표시 기준 (RQ-027) & 청약철회 (RQ-026) */}
          <Reveal delayMs={80}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 안전 주의사항 */}
              <div className="border border-[#E5E4DE] bg-[#F7F6F2] p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#1A1A1A]">
                  <AlertCircle className="h-4 w-4 text-[#5B8477]" strokeWidth={1.5} />
                  <h3 className="text-[16px] font-medium">사용 안전 및 주의사항</h3>
                </div>
                <div className="space-y-4">
                  {product.safetyNotices.map((notice, idx) => (
                    <div
                      key={idx}
                      className="border-t border-[#E5E4DE] pt-3 text-[14px] leading-[1.7] text-[#4F4F4B] space-y-1"
                    >
                      <p className="font-medium text-[#1A1A1A]">{notice.title}</p>
                      <p>
                        <span className="text-[#787872]">예방: </span>
                        {notice.prevention}
                      </p>
                      <p>
                        <span className="text-[#787872]">대처: </span>
                        {notice.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 안전·표시 기준 & 청약철회 안내 */}
              <div className="border border-[#E5E4DE] bg-[#FFFFFF] p-6 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <h3 className="text-[16px] font-medium text-[#1A1A1A]">
                    안전·표시 안내
                  </h3>
                  <p className="text-[14px] leading-[1.75] text-[#4F4F4B]">
                    {product.complianceNotice}
                  </p>
                </div>

                <div className="border-t border-[#E5E4DE] pt-5 space-y-2.5 text-[14px] leading-[1.7] text-[#4F4F4B]">
                  <h3 className="text-[15px] font-medium text-[#1A1A1A]">
                    청약철회 및 교환·환불 안내
                  </h3>
                  <p>
                    전자상거래 등에서의 소비자보호에 관한 법률에 따라 재화 수령일로부터{" "}
                    <strong className="font-medium text-[#1A1A1A]">7일 이내</strong>{" "}
                    청약철회가 가능합니다.
                  </p>
                  <Link
                    href="/policy"
                    className="inline-flex min-h-[48px] items-center text-[14px] text-[#5B8477] underline underline-offset-4 hover:text-[#496C61]"
                  >
                    교환·환불 절차 및 법적 고지 전문 보기 →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

        </section>

        {/* STAGE 5: 기본 접힘 이야기 영역 (유일한 불교 문화 서사 & 템플스테이 링크 구역) */}
        <StoryDisclosure product={product} />

        {/* 함께 둘러보기 (관련 오브제 3종) */}
        <section className="border-t border-[#E5E4DE] pt-16 md:pt-24">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="font-editorial-en text-[12px] tracking-[0.22em] uppercase text-[#787872]">
                MORE OBJECTS
              </p>
              <h2 className="mt-2 font-editorial-kr text-[24px] sm:text-[28px] text-[#1A1A1A]">
                함께 두면 좋은 찰나의 오브제
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex min-h-[48px] items-center text-[14px] text-[#4F4F4B] hover:text-[#1A1A1A] underline underline-offset-4 shrink-0"
            >
              전체 8종 보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
