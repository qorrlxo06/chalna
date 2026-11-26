import type { Metadata } from "next";
import Link from "next/link";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = {
  title: "교환·환불 및 청약철회 안내",
  description:
    "찰나(CHALNA) 재화 수령 후 7일 이내 청약철회, 교환·반품 절차 및 배송비 기준 안내.",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="w-full bg-bg">
      <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-10 py-12 md:py-18 space-y-12">
        <header className="border-b border-line pb-7 space-y-2.5">
          <p className="text-[13px] text-muted">이용 안내</p>
          <h1 className="text-[28px] sm:text-[32px] font-semibold text-ink">
            청약철회 및 교환·환불 안내
          </h1>
          <p className="text-[15px] text-muted max-w-[60ch]">
            전자상거래 등에서의 소비자보호에 관한 법률에 따른 교환·반품·환불 절차와
            유의 사항을 안내합니다.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-[20px] font-semibold text-ink">
            1. 청약철회 및 반품 가능 기간
          </h2>
          <div className="overflow-x-auto border-t border-ink">
            <table className="w-full border-collapse text-left text-[14px] sm:text-[15px]">
              <tbody className="divide-y divide-line border-b border-line">
                <tr>
                  <th className="w-[30%] bg-surface px-5 py-4 font-medium text-ink align-top">
                    단순 변심
                  </th>
                  <td className="px-5 py-4 text-muted">
                    재화를 공급받은 날로부터 <strong className="text-ink font-medium">7일 이내</strong>{" "}
                    미개봉·미사용 상태에 한해 청약철회 및 교환·환불 신청이 가능합니다.
                  </td>
                </tr>
                <tr>
                  <th className="bg-surface px-5 py-4 font-medium text-ink align-top">
                    상품 불량·오배송
                  </th>
                  <td className="px-5 py-4 text-muted">
                    표시·광고 내용과 다르거나 계약 내용과 다르게 이행된 경우, 수령일로부터
                    3개월 이내 또는 그 사실을 안 날로부터 30일 이내 신청할 수 있습니다.
                  </td>
                </tr>
                <tr>
                  <th className="bg-surface px-5 py-4 font-medium text-ink align-top">
                    반품 배송비
                  </th>
                  <td className="px-5 py-4 text-muted">
                    단순 변심에 의한 교환·반품 시 왕복 배송비는 구매자 부담이며, 상품 불량·오배송
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

        <section className="space-y-4">
          <h2 className="text-[20px] font-semibold text-ink">
            2. 교환·환불 진행 절차
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-line">
            <div className="border-r border-b border-line p-5 space-y-1.5">
              <p className="text-[13px] font-semibold text-accent">01</p>
              <h3 className="text-[16px] font-semibold text-ink">신청 접수</h3>
              <p className="text-[14px] text-muted">
                수령 후 7일 이내 고객센터 이메일 또는 문의를 통해 교환·반품 사유를 접수합니다.
              </p>
            </div>
            <div className="border-r border-b border-line p-5 space-y-1.5">
              <p className="text-[13px] font-semibold text-accent">02</p>
              <h3 className="text-[16px] font-semibold text-ink">수거 및 검수</h3>
              <p className="text-[14px] text-muted">
                지정 택배 수거 후 제품 파손 여부와 구성품 누락 여부를 확인합니다.
              </p>
            </div>
            <div className="border-r border-b border-line p-5 space-y-1.5">
              <p className="text-[13px] font-semibold text-accent">03</p>
              <h3 className="text-[16px] font-semibold text-ink">환불·교환 완료</h3>
              <p className="text-[14px] text-muted">
                검수 완료 후 영업일 기준 3일 이내 결제 취소·환불 또는 교환품을 발송합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="border border-line bg-surface p-5 text-[13px] leading-[1.65] text-muted">
          {SITE_INFO.business.notice} 게시된 상품 이미지는 프로젝트용 AI 연출 시안입니다.
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/policy"
            className="inline-flex min-h-[48px] items-center justify-center border border-ink px-6 text-[14px] font-medium text-ink hover:bg-ink hover:text-bg transition-colors"
          >
            전체 이용 안내 보기
          </Link>
          <Link
            href="/products"
            className="inline-flex min-h-[48px] items-center justify-center bg-accent px-6 text-[14px] font-medium text-bg hover:bg-accent-hover transition-colors"
          >
            상품 보러가기
          </Link>
        </div>
      </div>
    </div>
  );
}
