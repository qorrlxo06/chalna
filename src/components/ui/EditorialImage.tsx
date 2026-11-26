"use client";

import { useState } from "react";

interface EditorialImageProps {
  src?: string;
  alt: string;
  aspectRatio?: "4/5" | "1/1" | "4/3" | "3/4" | "16/10";
  replacePath?: string;
  className?: string;
  imgClassName?: string;
  showAiCaption?: boolean;
  priority?: boolean;
}

const ASPECT_CLASS: Record<NonNullable<EditorialImageProps["aspectRatio"]>, string> = {
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
};

/**
 * 직각(border-radius: 0) 에디토리얼 이미지 프레임.
 * 이미지가 없거나 로드 실패 시 비율과 교체 파일 경로를 표기하는 정제된 플레이스홀더로 자동 전환됩니다.
 */
export function EditorialImage({
  src,
  alt,
  aspectRatio = "4/5",
  replacePath,
  className = "",
  imgClassName = "",
  showAiCaption = false,
  priority = false,
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);
  const ratioClass = ASPECT_CLASS[aspectRatio];

  if (!src || failed) {
    return (
      <div
        className={`relative w-full overflow-hidden border border-[#E5E4DE] bg-[#F7F6F2] flex flex-col items-center justify-center p-6 text-center ${ratioClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-8 h-[1px] bg-[#787872] mb-4" aria-hidden="true" />
        <p className="font-editorial-en text-xs tracking-[0.22em] uppercase text-[#787872]">
          EDITORIAL SLOT · {aspectRatio}
        </p>
        <p className="mt-2 text-sm text-[#4F4F4B] max-w-[26ch]">{alt}</p>
        <p className="mt-4 text-[11px] font-mono text-[#787872] border-t border-[#E5E4DE] pt-2">
          {replacePath || src || "/public/images/products/slot.png"}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#F7F6F2] border border-[#E5E4DE] ${ratioClass} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover object-center ${imgClassName}`}
      />
      {showAiCaption && (
        <span className="pointer-events-none absolute bottom-2.5 right-2.5 bg-[#FFFFFF]/88 px-2 py-0.5 text-[11px] tracking-[0.04em] text-[#787872] border border-[#E5E4DE]">
          AI 연출 시안
        </span>
      )}
    </div>
  );
}
