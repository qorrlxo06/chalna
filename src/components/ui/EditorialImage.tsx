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
  tone?: "white" | "surface";
}

const ASPECT_CLASS: Record<NonNullable<EditorialImageProps["aspectRatio"]>, string> = {
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
};

/**
 * 직각(border-radius: 0) 중립 톤 이미지 프레임.
 * 대표컷은 흰색/밝은 무채색 배경 느낌을 유지하며, 과도한 웜톤 필터를 적용하지 않습니다.
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
  tone = "white",
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);
  const ratioClass = ASPECT_CLASS[aspectRatio];
  const bgClass = tone === "surface" ? "bg-surface" : "bg-bg";

  if (!src || failed) {
    return (
      <div
        className={`relative w-full overflow-hidden border border-line bg-surface flex flex-col items-center justify-center p-6 text-center ${ratioClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <p className="text-[14.5px] text-muted">{aspectRatio}</p>
        <p className="mt-2 text-[15.5px] text-ink max-w-[26ch]">{alt}</p>
        <p className="mt-3 text-[13.5px] text-muted border-t border-line pt-2">
          {replacePath || src || "/public/images/products/slot.png"}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${bgClass} border border-line ${ratioClass} ${className}`}
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
        <span className="pointer-events-none absolute bottom-2 right-2 bg-bg/92 px-2 py-1 text-[12.5px] leading-none text-muted border border-line">
          프로젝트용 AI 연출 시안
        </span>
      )}
    </div>
  );
}
