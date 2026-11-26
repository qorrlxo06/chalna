import Link from "next/link";
import { SITE_INFO } from "@/data/site";

export function Footer() {
  const { business, isSurveyReady, surveyUrl } = SITE_INFO;

  return (
    <footer className="w-full border-t border-line bg-surface text-muted">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 pb-10 border-b border-line">
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-2 text-ink">
              <span className="text-[20px] font-semibold tracking-[0.14em]">
                {SITE_INFO.brandEn}
              </span>
              <span className="text-[14px] text-muted">
                {SITE_INFO.brandKo}({SITE_INFO.brandHanja})
              </span>
            </div>
            <p className="mt-2.5 text-[16px] font-medium text-ink">
              {SITE_INFO.tagline}
            </p>
            <p className="mt-2 max-w-[40ch] text-[14px] leading-[1.65] text-muted">
              불을 켜고, 차를 우리고, 생각을 적는 시간. 일상에 작은 쉼을 더하는
              찰나의 생활 굿즈 8종과 리필 구성을 제안합니다.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[13px] font-medium text-ink mb-3">컬렉션</p>
            <ul className="space-y-1 text-[14px]">
              <li>
                <Link
                  href="/products?category=night"
                  className="inline-flex min-h-[40px] items-center hover:text-ink transition-colors"
                >
                  머무는 밤
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=unload"
                  className="inline-flex min-h-[40px] items-center hover:text-ink transition-colors"
                >
                  덜어내는 기록
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=warmth-air"
                  className="inline-flex min-h-[40px] items-center hover:text-ink transition-colors"
                >
                  온기와 환기
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=keepsake"
                  className="inline-flex min-h-[40px] items-center hover:text-ink transition-colors"
                >
                  곁에 두는 마음
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=refill"
                  className="inline-flex min-h-[40px] items-center hover:text-ink transition-colors"
                >
                  리필 스테이션
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-[13px] font-medium text-ink mb-3">고객 안내</p>
            <ul className="space-y-1 text-[14px]">
              <li>
                <Link
                  href="/policy/returns"
                  className="inline-flex min-h-[40px] items-center underline underline-offset-4 decoration-line hover:decoration-ink hover:text-ink transition-colors"
                >
                  청약철회(7일) · 교환·환불 안내
                </Link>
              </li>
              <li>
                <Link
                  href="/policy#compliance"
                  className="inline-flex min-h-[40px] items-center hover:text-ink transition-colors"
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
                    className="inline-flex min-h-[40px] items-center text-accent hover:text-accent-hover transition-colors font-medium"
                  >
                    구매의향·사용성 피드백 설문 참여
                  </a>
                ) : (
                  <span
                    className="inline-flex min-h-[40px] items-center text-muted select-none"
                    aria-disabled="true"
                  >
                    설문 준비 중
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* 사업자 정보 6항목 및 교육용 시연·AI 시안 고지 */}
        <div className="pt-7 space-y-4 text-[13px] leading-[1.65] text-muted">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5">
            <div>
              <dt className="inline text-muted">상호명: </dt>
              <dd className="inline text-ink">{business.companyName}</dd>
            </div>
            <div>
              <dt className="inline text-muted">대표자: </dt>
              <dd className="inline text-ink">{business.ceo}</dd>
            </div>
            <div>
              <dt className="inline text-muted">사업자등록번호: </dt>
              <dd className="inline text-ink">{business.registrationNumber}</dd>
            </div>
            <div>
              <dt className="inline text-muted">통신판매업신고번호: </dt>
              <dd className="inline text-ink">{business.ecommerceLicense}</dd>
            </div>
            <div>
              <dt className="inline text-muted">사업장 소재지: </dt>
              <dd className="inline text-ink">{business.address}</dd>
            </div>
            <div>
              <dt className="inline text-muted">연락처·이메일: </dt>
              <dd className="inline text-ink">{business.contact}</dd>
            </div>
          </dl>

          <div className="pt-4 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[12px]">
            <p>
              {business.notice} 게시된 상품 이미지는 프로젝트용 AI 연출 시안입니다.
            </p>
            <p className="shrink-0">© 2026 CHALNA Studio</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
