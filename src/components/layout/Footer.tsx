import Link from "next/link";
import { SITE_INFO } from "@/data/site";

export function Footer() {
  const { business, isSurveyReady, surveyUrl, feedbackEmailHref } = SITE_INFO;

  return (
    <footer className="w-full border-t border-line bg-surface text-muted">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 pb-10 border-b border-line items-start">
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-2.5 text-ink">
              <span className="font-editorial-en text-[24px] font-medium tracking-[0.14em] leading-none">
                {SITE_INFO.brandEn}
              </span>
              <span className="font-editorial-kr text-[15.5px] text-muted">
                {SITE_INFO.brandKo}({SITE_INFO.brandHanja})
              </span>
            </div>
            <p className="mt-3 font-editorial-kr text-[18.5px] text-ink">
              {SITE_INFO.tagline}
            </p>
            <p className="mt-2.5 max-w-[42ch] text-[15.5px] leading-[1.72] text-muted">
              불을 켜고, 차를 우리고, 생각을 적는 시간. 일상에 작은 쉼을 더하는
              찰나의 생활 굿즈 8종과 리필 구성을 제안합니다.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[14.5px] font-semibold text-ink mb-3 ui-label">
              컬렉션
            </p>
            <ul className="space-y-1 text-[15.5px]">
              <li>
                <Link
                  href="/products?category=night"
                  className="inline-flex min-h-[42px] items-center hover:text-ink transition-colors"
                >
                  머무는 밤
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=unload"
                  className="inline-flex min-h-[42px] items-center hover:text-ink transition-colors"
                >
                  덜어내는 기록
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=warmth-air"
                  className="inline-flex min-h-[42px] items-center hover:text-ink transition-colors"
                >
                  온기와 환기
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=keepsake"
                  className="inline-flex min-h-[42px] items-center hover:text-ink transition-colors"
                >
                  곁에 두는 마음
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=refill"
                  className="inline-flex min-h-[42px] items-center hover:text-ink transition-colors"
                >
                  리필 스테이션
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-[14.5px] font-semibold text-ink mb-3 ui-label">
              쉼과 고객 안내
            </p>
            <ul className="space-y-1 text-[15.5px]">
              <li>
                <Link
                  href="/pause"
                  className="inline-flex min-h-[42px] items-center text-ink font-medium hover:text-accent transition-colors"
                >
                  잠깐, 호흡 (3·5·10분 호흡 타이머)
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/returns"
                  className="inline-flex min-h-[42px] items-center underline underline-offset-4 decoration-line hover:decoration-ink hover:text-ink transition-colors"
                >
                  청약철회(7일) · 교환·환불 안내
                </Link>
              </li>
              <li>
                <Link
                  href="/policy#compliance"
                  className="inline-flex min-h-[42px] items-center hover:text-ink transition-colors"
                >
                  품목별 안전·표시 기준 안내
                </Link>
              </li>
              <li>
                {isSurveyReady ? (
                  <a
                    href={surveyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center text-accent hover:text-accent-hover transition-colors font-medium"
                  >
                    구매의향·사용성 피드백 설문 참여
                  </a>
                ) : (
                  <a
                    href={feedbackEmailHref}
                    className="inline-flex min-h-[42px] items-center text-accent hover:text-accent-hover transition-colors font-medium"
                  >
                    스토어 피드백 · 문의 보내기
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* 사업자 및 고객센터 정보 */}
        <div className="pt-8 space-y-5 text-[14px] leading-[1.7] text-muted">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-muted shrink-0">상호명</dt>
              <dd className="text-ink">{business.companyName}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-muted shrink-0">대표자</dt>
              <dd className="text-ink">{business.ceo}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-muted shrink-0">사업자등록번호</dt>
              <dd className="text-ink tabular-nums">{business.registrationNumber}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-muted shrink-0">통신판매업신고</dt>
              <dd className="text-ink tabular-nums">{business.ecommerceLicense}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-muted shrink-0">주소</dt>
              <dd className="text-ink">{business.address}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-muted shrink-0">고객센터 / 이메일</dt>
              <dd className="text-ink tabular-nums">{business.contact}</dd>
            </div>
          </dl>

          <div className="pt-4 border-t border-line flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[13.5px] leading-[1.6]">
            <p>{business.notice}</p>
            <p className="shrink-0 tabular-nums">© 2026 CHALNA. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
