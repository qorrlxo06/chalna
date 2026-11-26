import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-24 text-center space-y-5">
      <p className="text-[14px] font-medium text-accent">404</p>
      <h1 className="text-[26px] sm:text-[30px] font-semibold text-ink">
        찾으시는 페이지를 발견하지 못했습니다.
      </h1>
      <p className="text-[15px] text-muted">
        주소가 변경되었거나 존재하지 않는 경로입니다. 아래 버튼으로 상품 목록으로
        이동할 수 있습니다.
      </p>
      <div className="pt-2 flex justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center justify-center bg-accent px-6 text-[14px] font-medium text-bg hover:bg-accent-hover transition-colors"
        >
          홈으로 돌아가기
        </Link>
        <Link
          href="/products"
          className="inline-flex min-h-[48px] items-center justify-center border border-ink px-6 text-[14px] font-medium text-ink hover:bg-ink hover:text-bg transition-colors"
        >
          상품 보러가기
        </Link>
      </div>
    </div>
  );
}
