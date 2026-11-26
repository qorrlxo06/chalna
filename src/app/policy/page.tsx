import type { Metadata } from "next";
import Link from "next/link";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = {
  title: "이용 안내 및 법적 고지",
  description:
    "찰나(CHALNA) 사업자 정보, 청약철회(수령 후 7일) 및 교환·환불 안내, 품목별 안전·표시 기준 안내.",
};

const COMPLIANCE_ITEMS = [
  {
    item: "연꽃 무드등",
    law: "전기용품 및 생활용품 안전관리법",
    detail:
      "USB 5V 저전압 LED 조명 기구 안전 기준을 준수한 사양입니다. 정격 5V 1A 어댑터 사용 및 발열·물기 주의 사항을 함께 안내합니다.",
  },
  {
    item: "코끼리 말랑이",
    law: "어린이제품 안전 특별법 구분 및 사용 연령 표시",
    detail:
      "만 14세 이상 성인·청소년용 데스크 소품입니다(어린이 완구 아님). 입에 넣지 않도록 주의하며 안전한 보관 기준을 안내합니다.",
  },
  {
    item: "풍경 집들이 세트 · 디퓨저",
    law: "생활화학제품 및 살생물제의 안전관리에 관한 법률",
    detail:
      "안전확인대상생활화학제품(방향제) 표시 기준에 따라 품목·용도·주요 성분·섭취 및 피부 접촉 시 대처 방법과 어린이·반려동물 주의 문구를 표기합니다.",
  },
  {
    item: "변색 연꽃 찻잔",
    law: "식품위생법 (식품용 기구·용기·포장)",
    detail:
      "식품용 기구 안전 기준을 반영한 내열유리 찻잔 및 감온 변색 받침입니다. 부드러운 손세척과 뜨거운 물 화상 주의 사항을 안내합니다.",
  },
  {
    item: "개별 포장 티백 12개입",
    law: "식품등의 표시·광고에 관한 법률",
    detail:
      "연잎차·유자 블렌드·캐모마일 원재료명, 내용량, 소비기한 및 보관 방법을 패키지 뒷면에 투명하게 표시합니다.",
  },
];

export default function PolicyPage() {
  const { business } = SITE_INFO;

  return (
    <div className="w-full bg-bg">
      <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-10 py-12 md:py-18 space-y-14">
        <header className="border-b border-line pb-7 space-y-2.5">
          <h1 className="text-[28px] sm:text-[32px] font-semibold text-ink">
            이용 안내 · 교환·환불 · 법적 고지
          </h1>
          <p className="text-[15px] text-muted max-w-[60ch]">
            찰나(CHALNA) 스토어의 청약철회, 교환·환불 기준 및 품목별 안전·표시 안내입니다.
          </p>
        </header>

        {/* 1. 청약철회 및 교환·환불 */}
        <section id="refund" className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[22px] font-semibold text-ink">
              청약철회(수령 후 7일) 및 교환·환불 안내
            </h2>
            <Link
              href="/policy/returns"
              className="text-[14px] font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              교환·환불 전용 페이지 보기
            </Link>
          </div>

          <div className="overflow-x-auto border-t border-ink">
            <table className="w-full border-collapse text-left text-[14px] sm:text-[15px]">
              <tbody className="divide-y divide-line border-b border-line">
                <tr>
                  <th className="w-[30%] bg-surface px-5 py-4 font-medium text-ink align-top">
                    청약철회 기간
                  </th>
                  <td className="px-5 py-4 text-muted">
                    재화를 공급받은 날로부터 <strong className="text-ink font-medium">7일 이내</strong> 단순 변심에 의한
                    청약철회 및 교환·반품 신청이 가능합니다. 표시·광고 내용과 다르거나
                    계약 내용과 다르게 이행된 경우에는 수령일로부터 3개월 이내(그 사실을
                    안 날로부터 30일 이내) 신청할 수 있습니다.
                  </td>
                </tr>
                <tr>
                  <th className="bg-surface px-5 py-4 font-medium text-ink align-top">
                    교환·환불 절차
                  </th>
                  <td className="px-5 py-4 text-muted">
                    1) 고객센터 접수 → 2) 반품 수거 및 상품 검수(파손·사용 여부 확인) →
                    3) 반품 도착 확인 후 영업일 기준 3일 이내 환불 또는 교환품 발송.
                  </td>
                </tr>
                <tr>
                  <th className="bg-surface px-5 py-4 font-medium text-ink align-top">
                    반품 배송비 기준
                  </th>
                  <td className="px-5 py-4 text-muted">
                    단순 변심에 의한 반품·교환 시 왕복 배송비는 구매자 부담이며, 상품 불량·오배송
                    등 판매자 귀책 사유 시 전액 판매자 부담입니다.
                  </td>
                </tr>
                <tr>
                  <th className="bg-surface px-5 py-4 font-medium text-ink align-top">
                    청약철회 제한 사유
                  </th>
                  <td className="px-5 py-4 text-muted">
                    소비자 귀책으로 상품이 멸실·훼손된 경우, 티백·디퓨저 향액 등 밀봉 포장을
                    개봉해 재판매가 곤란한 소모품, 사용 또는 일부 소비로 가치가 현저히 감소한
                    경우는 교환·환불이 제한될 수 있습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. 품목군별 안전·표시 기준 안내 (상품 코드 P0X 미표기) */}
        <section id="compliance" className="space-y-4">
          <h2 className="text-[22px] font-semibold text-ink">
            품목군별 안전·표시 기준 안내
          </h2>

          <div className="border-t border-ink divide-y divide-line border-b">
            {COMPLIANCE_ITEMS.map((row) => (
              <div
                key={row.item}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-3 text-[14px]"
              >
                <div className="md:col-span-4">
                  <p className="font-semibold text-ink">{row.item}</p>
                  <p className="text-[12px] text-accent mt-0.5">{row.law}</p>
                </div>
                <p className="md:col-span-8 text-muted leading-[1.65]">
                  {row.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 사업자 정보 */}
        <section id="business" className="space-y-4">
          <h2 className="text-[22px] font-semibold text-ink">사업자 정보</h2>

          <div className="border border-line bg-surface p-6 space-y-4">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
              <div>
                <dt className="text-[12px] text-muted">상호명</dt>
                <dd className="text-ink mt-0.5">{business.companyName}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-muted">대표자</dt>
                <dd className="text-ink mt-0.5">{business.ceo}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-muted">사업자등록번호</dt>
                <dd className="text-ink mt-0.5">{business.registrationNumber}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-muted">통신판매업신고번호</dt>
                <dd className="text-ink mt-0.5">{business.ecommerceLicense}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-muted">사업장 소재지</dt>
                <dd className="text-ink mt-0.5">{business.address}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-muted">연락처 및 이메일</dt>
                <dd className="text-ink mt-0.5">{business.contact}</dd>
              </div>
            </dl>
            <p className="border-t border-line pt-3 text-[12px] leading-[1.65] text-muted">
              {business.notice} 게시된 모든 상품 이미지는 프로젝트용 AI 연출 시안입니다.
            </p>
          </div>
        </section>

        <div className="pt-2">
          <Link
            href="/products"
            className="inline-flex min-h-[52px] items-center justify-center border border-ink px-7 text-[14px] font-medium text-ink hover:bg-ink hover:text-bg transition-colors"
          >
            상품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
