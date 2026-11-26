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
    item: "연꽃 무드등 (P01)",
    law: "전기용품 및 생활용품 안전관리법",
    detail:
      "USB 5V 저전압 LED 조명 기구 안전 기준을 준수한 사양입니다. 정격 5V 1A 어댑터 사용 및 발열·물기 주의 사항을 함께 안내합니다.",
  },
  {
    item: "코끼리 말랑이 (P08)",
    law: "어린이제품 안전 특별법 구분 및 사용 연령 표시",
    detail:
      "만 14세 이상 성인·청소년용 데스크 소품입니다(어린이 완구 아님). 입에 넣지 않도록 주의하며 안전한 보관 기준을 안내합니다.",
  },
  {
    item: "풍경 집들이 세트 · 디퓨저 (P05)",
    law: "생활화학제품 및 살생물제의 안전관리에 관한 법률",
    detail:
      "안전확인대상생활화학제품(방향제) 표시 기준에 따라 품목·용도·주요 성분·섭취 및 피부 접촉 시 대처 방법과 어린이·반려동물 주의 문구를 표기합니다.",
  },
  {
    item: "변색 연꽃 찻잔 (P03)",
    law: "식품위생법 (식품용 기구·용기·포장)",
    detail:
      "식품용 기구 안전 기준을 반영한 내열유리 찻잔 및 감온 변색 받침입니다. 부드러운 손세척과 뜨거운 물 화상 주의 사항을 안내합니다.",
  },
  {
    item: "개별 포장 티백 12개입 (P03)",
    law: "식품등의 표시·광고에 관한 법률",
    detail:
      "연잎차·유자 블렌드·캐모마일 원재료명, 내용량, 소비기한 및 보관 방법을 패키지 뒷면에 투명하게 표시합니다.",
  },
];

export default function PolicyPage() {
  const { business } = SITE_INFO;

  return (
    <div className="w-full bg-[#FFFFFF]">
      <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-10 py-14 md:py-24 space-y-16">
        {/* 헤더 */}
        <header className="border-b border-[#E5E4DE] pb-8 space-y-3">
          <p className="font-editorial-en text-[12px] tracking-[0.24em] uppercase text-[#5B8477]">
            CUSTOMER CARE &amp; LEGAL NOTICE
          </p>
          <h1 className="font-editorial-kr text-[30px] sm:text-[38px] text-[#1A1A1A]">
            이용 안내 · 교환·환불 · 법적 고지
          </h1>
          <p className="text-[15px] text-[#4F4F4B] max-w-[60ch]">
            찰나(CHALNA) 스토어의 청약철회, 교환·환불 기준 및 품목별 안전·표시 안내입니다.
          </p>
        </header>

        {/* 1. 청약철회(수령 후 7일) 및 교환·환불 절차 */}
        <section id="refund" className="space-y-5">
          <p className="font-editorial-en text-[11px] tracking-[0.22em] uppercase text-[#787872]">
            01 · WITHDRAWAL &amp; REFUND POLICY
          </p>
          <h2 className="font-editorial-kr text-[24px] text-[#1A1A1A]">
            청약철회(수령 후 7일) 및 교환·환불 안내
          </h2>

          <div className="overflow-x-auto border-t border-[#1A1A1A]">
            <table className="w-full border-collapse text-left text-[14px] sm:text-[15px]">
              <tbody className="divide-y divide-[#E5E4DE] border-b border-[#E5E4DE]">
                <tr>
                  <th className="w-[30%] bg-[#F7F6F2] px-5 py-4 font-medium text-[#1A1A1A] align-top">
                    청약철회 기간
                  </th>
                  <td className="px-5 py-4 text-[#4F4F4B]">
                    재화를 공급받은 날로부터 <strong>7일 이내</strong> 단순 변심에 의한
                    청약철회 및 교환·반품 신청이 가능합니다. 표시·광고 내용과 다르거나
                    계약 내용과 다르게 이행된 경우에는 수령일로부터 3개월 이내(그 사실을
                    안 날로부터 30일 이내) 신청할 수 있습니다.
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#F7F6F2] px-5 py-4 font-medium text-[#1A1A1A] align-top">
                    교환·환불 절차
                  </th>
                  <td className="px-5 py-4 text-[#4F4F4B]">
                    ① 고객센터(이메일/문의) 접수 → ② 반품 수거 및 상품 검수(파손·사용 여부
                    확인) → ③ 반품 도착 확인 후 영업일 기준 3일 이내 환불 또는 교환품 발송.
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#F7F6F2] px-5 py-4 font-medium text-[#1A1A1A] align-top">
                    반품 배송비 기준
                  </th>
                  <td className="px-5 py-4 text-[#4F4F4B]">
                    단순 변심에 의한 반품·교환 시 왕복 배송비는 구매자 부담이며, 상품 불량·오배송
                    등 판매자 귀책 사유 시 전액 판매자 부담입니다.
                  </td>
                </tr>
                <tr>
                  <th className="bg-[#F7F6F2] px-5 py-4 font-medium text-[#1A1A1A] align-top">
                    청약철회 제한 사유
                  </th>
                  <td className="px-5 py-4 text-[#4F4F4B]">
                    소비자 귀책으로 상품이 멸실·훼손된 경우, 티백·디퓨저 향액 등 밀봉 포장을
                    개봉해 재판매가 곤란한 소모품, 사용 또는 일부 소비로 가치가 현저히 감소한
                    경우는 교환·환불이 제한될 수 있습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. 5대 품목군 안전·표시 기준 안내 */}
        <section id="compliance" className="space-y-5">
          <p className="font-editorial-en text-[11px] tracking-[0.22em] uppercase text-[#787872]">
            02 · SAFETY &amp; LABELING GUIDE
          </p>
          <h2 className="font-editorial-kr text-[24px] text-[#1A1A1A]">
            품목군별 안전·표시 기준 안내
          </h2>

          <div className="border-t border-[#1A1A1A] divide-y divide-[#E5E4DE] border-b">
            {COMPLIANCE_ITEMS.map((row) => (
              <div
                key={row.item}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-3 text-[14px]"
              >
                <div className="md:col-span-4">
                  <p className="font-medium text-[#1A1A1A]">{row.item}</p>
                  <p className="text-[12px] text-[#5B8477] mt-0.5">{row.law}</p>
                </div>
                <p className="md:col-span-8 text-[#4F4F4B] leading-[1.75]">
                  {row.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 사업자 정보 6항목 */}
        <section id="business" className="space-y-5">
          <p className="font-editorial-en text-[11px] tracking-[0.22em] uppercase text-[#787872]">
            03 · BUSINESS INFORMATION
          </p>
          <h2 className="font-editorial-kr text-[24px] text-[#1A1A1A]">
            사업자 정보
          </h2>

          <div className="border border-[#E5E4DE] bg-[#F7F6F2] p-6 space-y-4">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
              <div>
                <dt className="text-[12px] text-[#787872]">상호명</dt>
                <dd className="text-[#1A1A1A] mt-0.5">{business.companyName}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-[#787872]">대표자</dt>
                <dd className="text-[#1A1A1A] mt-0.5">{business.ceo}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-[#787872]">사업자등록번호</dt>
                <dd className="text-[#1A1A1A] mt-0.5">{business.registrationNumber}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-[#787872]">통신판매업신고번호</dt>
                <dd className="text-[#1A1A1A] mt-0.5">{business.ecommerceLicense}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-[#787872]">사업장 소재지</dt>
                <dd className="text-[#1A1A1A] mt-0.5">{business.address}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-[#787872]">연락처 및 이메일</dt>
                <dd className="text-[#1A1A1A] mt-0.5">{business.contact}</dd>
              </div>
            </dl>
            <p className="border-t border-[#E5E4DE] pt-3 text-[12px] leading-[1.7] text-[#787872]">
              {business.notice} 본 스토어의 모든 상품 이미지는 AI 연출 시안이며, 이름·연락처·결제정보 등 개인정보를 일절 수집하지 않습니다.
            </p>
          </div>
        </section>

        <div className="pt-4">
          <Link
            href="/products"
            className="inline-flex min-h-[52px] items-center justify-center border border-[#1A1A1A] px-7 text-[14px] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFFFFF] transition-colors"
          >
            컬렉션으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
