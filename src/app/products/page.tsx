import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogClient } from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "컬렉션",
  description:
    "공간·휴식, 차·기록, 마음·선물, 리필 스테이션 — 찰나의 8가지 리추얼 오브제를 살펴보세요.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-20 text-[15px] text-[#787872]">
          컬렉션을 불러오는 중입니다...
        </div>
      }
    >
      <CatalogClient />
    </Suspense>
  );
}
