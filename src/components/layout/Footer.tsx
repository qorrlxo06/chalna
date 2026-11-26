import Link from "next/link";
import { SITE_INFO } from "@/data/site";

export function Footer() {
  const { business } = SITE_INFO;

  return (
    <footer className="w-full border-t border-[#E5E4DE] bg-[#F7F6F2] text-[#4F4F4B]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-14 md:py-20">
        {/* 상단 브랜드 & 링크 3단 그리드 */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 pb-12 border-b border-[#E5E4DE]">
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-2.5 text-[#1A1A1A]">
              <span className="font-editorial-en text-2xl tracking-[0.22em]">
                {SITE_INFO.brandEn}
              </span>
              <span className="font-editorial-kr text-sm text-[#4F4F4B]">
                {SITE_INFO.brandKo}({SITE_INFO.brandHanja})
              </span>
            </div>
            <p className="mt-3 font-editorial-kr text-[17px] text-[#1A1A1A]">
              {SITE_INFO.tagline}
            </p>
            <p className="mt-3 max-w-[40ch] text-[14px] leading-[1.75] text-[#4F4F4B]">
              디자인과 쓰임이 먼저인 일상 오브제와 하루 3분의 짧은 리추얼.
              다 쓴 뒤에도 리필로 이어지는 지속 가능한 쉼을 제안합니다.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-editorial-en text-xs tracking-[0.2em] uppercase text-[#787872] mb-4">
              COLLECTION
            </p>
            <ul className="space-y-1 text-[14px]">
              <li>
                <Link
                  href="/products?category=space"
                  className="inline-flex min-h-[40px] items-center hover:text-[#1A1A1A] transition-colors"
                >
                  공간·휴식
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=tea-note"
                  className="inline-flex min-h-[40px] items-center hover:text-[#1A1A1A] transition-colors"
                >
                  차·기록
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=mind-gift"
                  className="inline-flex min-h-[40px] items-center hover:text-[#1A1A1A] transition-colors"
                >
                  마음·선물
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=refill"
                  className="inline-flex min-h-[40px] items-center hover:text-[#1A1A1A] transition-colors"
                >
                  리필 스테이션
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-editorial-en text-xs tracking-[0.2em] uppercase text-[#787872] mb-4">
              CUSTOMER CARE
            </p>
            <ul className="space-y-1 text-[14px]">
              <li>
                <Link
                  href="/policy"
                  className="inline-flex min-h-[40px] items-center underline underline-offset-4 decoration-[#E5E4DE] hover:decoration-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                >
                  교환·환불 및 이용 안내
                </Link>
              </li>
              <li>
                <Link
                  href="/policy#compliance"
                  className="inline-flex min-h-[40px] items-center hover:text-[#1A1A1A] transition-colors"
                >
                  품목별 안전·표시 안내
                </Link>
              </li>
              <li>
                <a
                  href={SITE_INFO.surveyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center text-[#5B8477] hover:text-[#496C61] transition-colors"
                >
                  고객 의견 남기기 ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 사업자 정보 6항목 및 스토어 고지 */}
        <div className="pt-8 space-y-4 text-[13px] leading-[1.7] text-[#787872]">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5">
            <div>
              <dt className="inline text-[#787872]">상호명: </dt>
              <dd className="inline text-[#4F4F4B]">{business.companyName}</dd>
            </div>
            <div>
              <dt className="inline text-[#787872]">대표자: </dt>
              <dd className="inline text-[#4F4F4B]">{business.ceo}</dd>
            </div>
            <div>
              <dt className="inline text-[#787872]">사업자등록번호: </dt>
              <dd className="inline text-[#4F4F4B]">{business.registrationNumber}</dd>
            </div>
            <div>
              <dt className="inline text-[#787872]">통신판매업신고번호: </dt>
              <dd className="inline text-[#4F4F4B]">{business.ecommerceLicense}</dd>
            </div>
            <div>
              <dt className="inline text-[#787872]">사업장 소재지: </dt>
              <dd className="inline text-[#4F4F4B]">{business.address}</dd>
            </div>
            <div>
              <dt className="inline text-[#787872]">연락처·이메일: </dt>
              <dd className="inline text-[#4F4F4B]">{business.contact}</dd>
            </div>
          </dl>

          <div className="pt-4 border-t border-[#E5E4DE] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[12px]">
            <p>
              {business.notice} 본 스토어의 상품 이미지는 AI 연출 시안이며 개인정보를 수집하지 않습니다.
            </p>
            <p className="font-editorial-en tracking-[0.12em] uppercase shrink-0">
              © 2026 CHALNA STUDIO
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
