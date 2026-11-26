import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogClient } from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "전체 여덟 가지",
  description:
    "머무는 밤, 덜어내는 기록, 온기와 환기, 곁에 두는 마음, 리필 스테이션 — 찰나의 생활 굿즈 8종을 만나보세요.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-16 text-[15px] text-muted">
          상품 목록을 불러오는 중입니다.
        </div>
      }
    >
      <CatalogClient />
    </Suspense>
  );
}
