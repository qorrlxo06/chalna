"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_ITEMS = [
  { href: "/products", category: null, label: "전체 컬렉션" },
  { href: "/products?category=space", category: "space", label: "공간·휴식" },
  { href: "/products?category=tea-note", category: "tea-note", label: "차·기록" },
  { href: "/products?category=mind-gift", category: "mind-gift", label: "마음·선물" },
  { href: "/products?category=refill", category: "refill", label: "리필 스테이션" },
  { href: "/policy", category: "__policy__", label: "이용 안내" },
];

function DesktopNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCat = searchParams.get("category");

  return (
    <nav aria-label="주요 메뉴" className="hidden lg:flex items-center gap-7">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.category === "__policy__"
            ? pathname === "/policy"
            : pathname === "/products" &&
              (item.category === null
                ? !currentCat || currentCat === "all"
                : currentCat === item.category);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex min-h-[48px] items-center text-[14px] tracking-[0.02em] transition-colors ${
              isActive
                ? "text-[#1A1A1A] border-b border-[#1A1A1A]"
                : "text-[#4F4F4B] hover:text-[#1A1A1A]"
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
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E4DE] bg-[#FFFFFF]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 md:h-[72px] max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* 브랜드 로고 */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="inline-flex min-h-[48px] items-center gap-2 sm:gap-2.5 text-[#1A1A1A] hover:opacity-75 transition-opacity shrink-0"
          aria-label="찰나 홈으로 이동"
        >
          <span className="font-editorial-en text-[20px] sm:text-[22px] md:text-[24px] tracking-[0.2em] sm:tracking-[0.22em] font-medium leading-none">
            CHALNA
          </span>
          <span className="h-3.5 w-[1px] bg-[#E5E4DE]" aria-hidden="true" />
          <span className="font-editorial-kr text-[13px] sm:text-[14px] tracking-[0.08em] text-[#4F4F4B]">
            찰나
          </span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <Suspense
          fallback={
            <nav aria-label="주요 메뉴" className="hidden lg:flex items-center gap-7">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-[48px] items-center text-[14px] text-[#4F4F4B]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          }
        >
          <DesktopNavLinks />
        </Suspense>

        {/* 우측 액션 (장바구니 + 모바일 메뉴) */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={openCart}
            className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 text-[14px] text-[#1A1A1A] hover:text-[#5B8477] transition-colors cursor-pointer"
            aria-label={`장바구니 열기, 현재 ${totalCount}개 담김`}
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
            <span className="hidden sm:inline tracking-[0.02em]">장바구니</span>
            <span className="font-editorial-en text-[15px] tabular-nums text-[#5B8477]">
              ({totalCount})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex lg:hidden min-h-[48px] min-w-[48px] items-center justify-center text-[#1A1A1A] hover:text-[#5B8477] transition-colors cursor-pointer"
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

      {/* 모바일 내비게이션 드롭다운 */}
      {mobileOpen && (
        <nav
          id="mobile-nav-panel"
          aria-label="모바일 주요 메뉴"
          className="lg:hidden border-t border-[#E5E4DE] bg-[#FFFFFF]"
        >
          <ul className="mx-auto max-w-[1320px] divide-y divide-[#E5E4DE] px-4 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[52px] items-center justify-between text-[15px] text-[#1A1A1A] hover:text-[#5B8477] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-editorial-en text-xs tracking-[0.15em] text-[#787872]">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
