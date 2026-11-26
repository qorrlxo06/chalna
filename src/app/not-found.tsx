import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-28 text-center space-y-6">
      <p className="font-editorial-en text-[13px] tracking-[0.24em] uppercase text-[#5B8477]">
        404 · NOT FOUND
      </p>
      <h1 className="font-editorial-kr text-[28px] sm:text-[34px] text-[#1A1A1A]">
        찾으시는 페이지를 발견하지 못했습니다.
      </h1>
      <p className="text-[15px] text-[#4F4F4B]">
        주소가 변경되었거나 존재하지 않는 경로입니다. 아래 버튼으로 찰나 컬렉션으로
        돌아가실 수 있습니다.
      </p>
      <div className="pt-2 flex justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-[52px] items-center justify-center bg-[#5B8477] px-7 text-[14px] font-medium text-[#FFFFFF] hover:bg-[#496C61] transition-colors"
        >
          홈으로 돌아가기
        </Link>
        <Link
          href="/products"
          className="inline-flex min-h-[52px] items-center justify-center border border-[#1A1A1A] px-7 text-[14px] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFFFFF] transition-colors"
        >
          컬렉션 보기
        </Link>
      </div>
    </div>
  );
}
