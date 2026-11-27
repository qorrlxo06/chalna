"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_ITEMS = [
  { href: "/products", category: null, label: "전체 컬렉션" },
  { href: "/products?category=night", category: "night", label: "머무는 밤" },
  { href: "/products?category=unload", category: "unload", label: "덜어내는 기록" },
  { href: "/products?category=warmth-air", category: "warmth-air", label: "온기와 환기" },
  { href: "/products?category=keepsake", category: "keepsake", label: "곁에 두는 마음" },
  { href: "/products?category=refill", category: "refill", label: "리필 스테이션" },
  { href: "/pause", category: "__pause__", label: "잠깐, 호흡" },
  { href: "/policy", category: "__policy__", label: "이용 안내" },
];

function DesktopNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCat = searchParams.get("category");

  return (
    <nav aria-label="주요 메뉴" className="hidden xl:flex items-center gap-5 2xl:gap-6">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.category === "__policy__"
            ? pathname.startsWith("/policy")
            : item.category === "__pause__"
            ? pathname.startsWith("/pause")
            : pathname === "/products" &&
              (item.category === null
                ? !currentCat ||
                  currentCat === "all" ||
                  !["night", "unload", "warmth-air", "keepsake", "refill"].includes(
                    currentCat
                  )
                : currentCat === item.category);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex min-h-[48px] items-center whitespace-nowrap text-[15.5px] ui-label transition-colors border-b-2 ${
              isActive
                ? "border-accent text-ink font-medium"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Header() {
  const { totalCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 md:h-[74px] max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        {/* 브랜드 로고 (v1 세리프 워드마크 복원) */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="inline-flex min-h-[48px] items-center gap-2.5 text-ink hover:opacity-75 transition-opacity shrink-0"
          aria-label="찰나 홈으로 이동"
        >
          <span className="font-editorial-en text-[22px] sm:text-[24px] font-medium tracking-[0.14em] leading-none">
            CHALNA
          </span>
          <span className="h-3.5 w-[1px] bg-line" aria-hidden="true" />
          <span className="font-editorial-kr text-[15.5px] leading-none text-muted">
            찰나
          </span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <Suspense
          fallback={
            <nav aria-label="주요 메뉴" className="hidden xl:flex items-center gap-5 2xl:gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-[48px] items-center whitespace-nowrap text-[15.5px] ui-label text-muted"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          }
        >
          <DesktopNavLinks />
        </Suspense>

        {/* 우측 액션 */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={openCart}
            className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 text-[15.5px] ui-label font-medium text-ink hover:text-accent transition-colors cursor-pointer whitespace-nowrap"
            aria-label={`장바구니 열기, 현재 ${totalCount}개 담김`}
          >
            <ShoppingBag className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
            <span className="hidden sm:inline">장바구니</span>
            <span className="tabular-nums text-accent">({totalCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex xl:hidden min-h-[48px] min-w-[48px] items-center justify-center text-ink hover:text-accent transition-colors cursor-pointer"
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* 모바일·태블릿 내비게이션 드롭다운 */}
      {mobileOpen && (
        <nav
          id="mobile-nav-panel"
          aria-label="모바일 주요 메뉴"
          className="xl:hidden border-t border-line bg-bg"
        >
          <ul className="mx-auto max-w-[1320px] divide-y divide-line px-4 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[52px] items-center text-[16.5px] font-medium text-ink hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
