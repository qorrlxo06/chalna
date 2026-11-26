# 찰나(刹那) 프로젝트 요구사항 추적 매트릭스 (REQUIREMENTS_AUDIT.md)

> 기준 문서:
> - `docs/5조_오구오구_프로젝트헌장_v1.1 (1).docx`
> - `docs/5조_범위기술서_v1.1.md`
> - `docs/5조_요구사항명세서_v1.0 (3).xlsx` (RQ-001 ~ RQ-032, 총 32건)
> - `docs/5조_WBS_v1.1.xlsx`
> - `docs/[프로젝트관리] 찰나 8종 상품 기획서.pdf`
> - `docs/CHALNA_detail_pages/README.txt`, `manifest.json`, `generation_prompts.txt`
> - `docs/상품 이미지/` (실사형 AI 연출 시안 33장 + 세로형 시안 8장 → `public/images/` 이관)

---

## 1. 요구사항 추적 매트릭스 (RQ-001 ~ RQ-032)

| ID | 범위코드 | 유형 / 우선순위 / 상태 | 내용 및 수용 기준 | 구현 파일 / 컴포넌트 | 검증 상태 |
|---|---|---|---|---|---|
| **RQ-001** | RS | 프로젝트관리 / 높음 / 승인 | 유효 설문 응답 50명 이상(비관심층 50% 이상) 확보 | 조사 활동(웹 외 범위). MVP 내 `src/components/DemoCheckoutModal.tsx` 및 `src/components/layout/Footer.tsx`에서 외부 설문 링크(`SITE_INFO.surveyUrl`) 연결 | ✅ 연동 완료 |
| **RQ-002** | RS | 품질 / 높음 / 승인 | 8종 상품별 구매의향 5점 척도 측정 (집들이 옵션별 선호 포함) | `src/components/DemoCheckoutModal.tsx` (선택 상품·옵션·수량·총액 요약 + 외부 구매의향 설문 링크 버튼) | ✅ 검증 완료 |
| **RQ-003** | RS | 프로젝트관리 / 높음 / 승인 | 반 웨스텐도르프 PSM 기반 8종 수용 가격대 및 판매가 확정 | `src/data/products.ts` (8종 기준 판매가·옵션 추가금액·리필가 단일 소스화) | ✅ 검증 완료 |
| **RQ-004** | RS | 품질 / 높음 / 승인 | 포교 수용성 및 MVP 사용성 테스트(5명 이상) — 거부감 20% 이하, 이야기 후 호감 50% 이상 | `src/components/pdp/StoryDisclosure.tsx` (기본 접힘 이야기 영역, 비강요적 어조) + `src/components/DemoCheckoutModal.tsx` 설문 연결 | ✅ 검증 완료 |
| **RQ-005** | PD | 기능 / 높음 / 승인 | 8종 상품 라인업 일관성 — 목록·상세·구성표 불일치 0건 | `src/data/products.ts` SSOT, `src/app/page.tsx`, `src/components/CatalogClient.tsx`, `src/app/products/[slug]/page.tsx` | ✅ 검증 완료 (8/8 일치) |
| **RQ-006** | PD | 기능 / 높음 / 승인 | **2단계 인지 설계 ("디자인 먼저, 의미는 사용 중에")** — 쓰임 설명 불교 용어 0건, 접힌 이야기 영역/QR로 전달 | `src/data/products.ts` (`surface` vs `story` 분리), `src/components/pdp/ProductDetailClient.tsx`, `src/components/pdp/StoryDisclosure.tsx`, `src/app/story/[slug]/page.tsx` | ✅ 자동 감사 통과 (표면 0건) |
| **RQ-007** | PD | 품질 / 높음 / 승인 | 의미 표현 감수 — 희화화·종교 권유 표현 0건 | `src/data/products.ts` (`story` 원고 및 `sourceNote` 감수 기준 반영) | ✅ 검증 완료 |
| **RQ-008** | IT | 기능 / 높음 / 승인 | 연꽃 무드등 사양 (반투명 PC 갓, 세라믹 연잎 받침, 16×16×13cm, 2700K LED, USB 5V, 아이보리/연분홍) | `src/data/products.ts` (`lotus-lamp`), `src/components/pdp/ProductDetailClient.tsx` | ✅ 검증 완료 |
| **RQ-009** | IT | 기능 / 높음 / 승인 | 108매듭 실팔찌 사양 (왁스 코팅 폴리에스터 108매듭, 4mm 원석 3알, 5색상, 손목 14~20cm 조절) | `src/data/products.ts` (`knot-bracelet`), `src/components/pdp/ProductDetailClient.tsx` | ✅ 검증 완료 |
| **RQ-010** | IT | 기능 / 높음 / 승인 | 변색 연꽃 찻잔·티백 세트 구성 (내열유리 150mL, 감온 변색 유리 받침 Ø12cm, 연잎차·유자 블렌드·캐모마일 각 4개=12개, 1인/2인/리필 옵션) | `src/data/products.ts` (`lotus-tea-set`), `src/components/pdp/ProductDetailClient.tsx` | ✅ 검증 완료 |
| **RQ-011** | IT | 기능 / 높음 / 승인 | 연꽃 입체 편지지 구성 (펼친 Ø16cm / 접은 Ø7cm, 봉투 12×12cm, 무광 160g/㎡, 접는 법 3단계, 단품/3세트 & 연분홍/아이보리 옵션) | `src/data/products.ts` (`lotus-letter`), `src/components/pdp/ProductDetailClient.tsx` | ✅ 검증 완료 |
| **RQ-012** | IT | 기능 / 높음 / 승인 | 풍경 집들이 세트 옵션 구성 (황동 물고기 풍경 20cm + 선물 상자 + 보자기 공통, 꽃 리드 80mL vs 돌탑 스톤 5개·10mL 택 1, 향 3종) | `src/data/products.ts` (`housewarming-set`), `src/components/pdp/ProductDetailClient.tsx` | ✅ 검증 완료 |
| **RQ-013** | IT | 기능 / 높음 / 승인 | 108장 잡념 노트 구성 (A6 무광 검정, 상단 나사 2개, 아이보리 80g/㎡ 108장, 앞면 문장·출처 구분, 뒷면 종이비행기 점선 가이드, 본품/리필) | `src/data/products.ts` (`distress-note`), `src/components/pdp/StoryDisclosure.tsx` (108문장 출처 발췌) | ✅ 검증 완료 |
| **RQ-014** | IT | 기능 / 높음 / 승인 | 잠깐 방석 사양 (Ø40×10cm, 폴리에스터 겉감·메모리폼 충전재, 커버 일체형 부분 세척, 세이지/옐로/핑크, CHALNA QR 라벨 3·5·10분 호흡 연결) | `src/data/products.ts` (`petal-cushion`), `src/components/pdp/RitualTimer.tsx`, `src/app/story/[slug]/page.tsx` | ✅ 검증 완료 |
| **RQ-015** | IT | 기능 / 높음 / 승인 | 코끼리 말랑이 사양 (8×6×9cm, 저반발 PU 폼 복원 특성, 캐릭터 종이 상자, 만 14세 이상 데스크 소품) | `src/data/products.ts` (`elephant-squishy`), `src/components/pdp/ProductDetailClient.tsx` | ✅ 검증 완료 |
| **RQ-016** | IT | 비기능 / 높음 / 승인 | **5대 사용 안전 안내** (무드등 발열·전원, 디퓨저 오일 섭취·피부 접촉, 스톤 삼킴, 말랑이 입에 넣기, 찻잔 뜨거운 물 — 각 예방·대처 문구) | `src/data/products.ts` (`safetyNotices`), `src/components/pdp/ProductDetailClient.tsx` (Stage 4) | ✅ 검증 완료 |
| **RQ-017** | RF | 기능 / 높음 / 승인 | **반복 구매(리필) 품목 4종** (티백, 디퓨저 오일·리드, 잡념 노트 내지, 편지지 추가 팩 — 단위·가격·권장 주기·호환 정보 표시) | `src/data/products.ts` (`refill`), `src/components/CatalogClient.tsx` (`리필 스테이션`), `src/components/pdp/ProductDetailClient.tsx` (Stage 4 리필 탭) | ✅ 검증 완료 |
| **RQ-018** | BM | 품질 / 높음 / 승인 | 원가 산정표 및 매출총이익률 30% 이상 (기획·재무 문서 범위) | `src/data/products.ts` (확정 기획 판매가·옵션가 반영) | ✅ 문서 영역 (가격 반영 완료) |
| **RQ-019** | BM | 품질 / 중간 / 승인 | 경쟁 상품 대비 차별화 요소 3개 이상 | `src/app/page.tsx` (브랜드 3가지 약속 섹션: 쓰임 우선 · 하루 3분 리추얼 · 리필 구조) | ✅ 검증 완료 |
| **RQ-020** | WB | 기능 / 높음 / 승인 | **생활 언어 메인·목록** — 메인·목록·PDP Stage 1~4 불교·사찰·경전 직접 용어 **0건** | 전 표면 페이지 및 `src/data/products.ts` 비-스토리 필드 | ✅ 자동 전수 감사 0건 통과 |
| **RQ-021** | WB | 기능 / 높음 / 승인 | **상세페이지 6대 필수 정보 100% 표시** (상품명·한 줄 문구·판매가·구성품·사용법·이미지 3장 이상) | `src/components/pdp/ProductDetailClient.tsx` (8종 모두 7~9개 렌더링 이미지 슬롯 및 6대 항목 100% 표시) | ✅ 전수 HTML 감사 통과 |
| **RQ-022** | WB | 기능 / 중간 / 승인 | **집들이 디퓨저 옵션 실시간 연동** — 선택 시 구성품·이미지·가격 즉시 변경 | `src/components/pdp/ProductDetailClient.tsx` (`selectedOptions` → `unitPrice`, `activeImageSrc`, `currentIncludedItems` 연동) | ✅ 검증 완료 |
| **RQ-023** | WB | 기능 / 높음 / 승인 | **이야기 영역과 QR 연결** — 8종 모두 Stage 5 기본 접힘 `<details>`(56px 이상) + 템플스테이 공식 링크(`https://www.templestay.com`) + QR 페이지(`/story/[slug]`) | `src/components/pdp/StoryDisclosure.tsx`, `src/app/story/[slug]/page.tsx` | ✅ 전수 HTML/HTTP 200 통과 |
| **RQ-024** | WB | 기능 / 높음 / 승인 | **시연용 구매 안내 (개인정보 수집 0건)** — 실제 주문 불가 안내 + 설문 링크, 입력 폼 0개 | `src/components/DemoCheckoutModal.tsx`, `src/components/CartDrawer.tsx` | ✅ 전수 감사 `<input>` 0건 |
| **RQ-025** | WB | 비기능 / 높음 / 승인 | **반응형 화면과 링크 무결성** — 360px 모바일·1440px 데스크톱 가로 스크롤/겹침/깨진 링크 0건 | `src/app/globals.css`, 전 컴포넌트 (`minmax(0, ...)` 그리드, 터치 높이 48px+) | ✅ CDP 360px overflow=0 & 23경로+41이미지 HTTP 200 |
| **RQ-026** | LG | 기능 / 높음 / 승인 | **전자상거래 법적 고지** — 전 페이지 사업자 정보 6항목(예시값 명시) + 청약철회(7일)·교환·환불 안내 페이지 연결 | `src/components/layout/Footer.tsx`, `src/app/policy/page.tsx`, `src/components/pdp/ProductDetailClient.tsx` | ✅ 전 페이지 HTML 감사 통과 |
| **RQ-027** | LG | 품질 / 높음 / 제안 | **인증·표시 기준 확인 반영** — 5대 품목군(무드등 KC, 말랑이 14세 이상, 디퓨저 생활화학제품, 찻잔 식품용 기구, 티백 식품 표시) 안내 반영 | `src/data/products.ts` (`complianceNotice`), `src/app/policy/page.tsx` | ✅ 검증 완료 |
| **RQ-028** | LG | 품질 / 높음 / 승인 | **표현·권리 근거 및 AI 시안 100% 표기** — 근거 없는 효능·천연·정화 표현 0건 | `src/components/ui/EditorialImage.tsx`, `src/components/pdp/StoryDisclosure.tsx`, `src/components/layout/Footer.tsx`, `src/app/policy/page.tsx` | ✅ 자동 금지 표현 감사 통과 |
| **RQ-029** | PM | 프로젝트관리 / 높음 / 승인 | 일정 및 예산(10만 원 이내) 준수 | 무료 오픈소스 프론트엔드 스택(Next.js + Tailwind CSS) — 추가 비용 0원 | ✅ 준수 |
| **RQ-030** | EX | 제외 / - / 승인 | 실제 결제·판매·배송 제외 | 백엔드·결제 모듈·DB·회원인증 미구현, `DemoCheckoutModal` 대체 | ✅ 엄수 |
| **RQ-031** | EX | 제외 / - / 승인 | 실물 시제품 제작 제외 | 생성형 AI 연출 시안 사용 및 전 화면 표기 | ✅ 엄수 |
| **RQ-032** | EX | 제외 / - / 승인 | 별도 모바일 앱 개발 제외 | 360px 반응형 웹 앱으로 대응 | ✅ 엄수 |

---

## 2. 프론트엔드 디자인·기능 추가 요구사항 검증 현황

| 항목 ID | 요구사항 | 구현 파일 / 컴포넌트 | 검증 상태 |
|---|---|---|---|
| **UI-01** | 에디토리얼 룩북 무드 (Aesop/Nonfiction/29CM 아틀리에 — 배너 슬라이더·할인 배지·4열 빽빽한 카드·둥근 버튼·드롭 섀도우 전면 배제) | `src/app/globals.css`, 전 페이지 | ✅ 1440px/360px 스크린샷 시각 검수 완료 |
| **UI-02** | 컬러 토큰 (`#FFFFFF`, `#F7F6F2`, `#1A1A1A`, `#4F4F4B`, `#787872`, `#5B8477`, Hover `#496C61`, `#E5E4DE 1px solid`) | `src/app/globals.css`, 전 컴포넌트 | ✅ 검증 완료 |
| **UI-03** | 직각 조형 시스템 (`border-radius: 0` 전역 적용) | `src/app/globals.css` (`*, *::before, *::after { border-radius: 0 !important; }`) | ✅ 검증 완료 |
| **UI-04** | 타이포그래피 페어링 (`Cormorant Garamond` + `Gowun Batang` + `Pretendard`, 본문 16px/모바일 15px, `line-height: 1.75`, `word-break: keep-all`) | `src/app/layout.tsx`, `src/app/globals.css` | ✅ 검증 완료 |
| **UI-05** | 여백 & 비대칭 2단 룩북 그리드 (`1.15fr : 0.85fr`, 섹션 수직 여백) | `src/app/globals.css`, `src/app/page.tsx`, `src/components/pdp/ProductDetailClient.tsx` | ✅ 검증 완료 |
| **UI-06** | 마이크로 인터랙션 (`useReveal` IntersectionObserver 훅, `0.85s cubic-bezier(0.22, 1, 0.36, 1)`, `prefers-reduced-motion` 존중, 카드 호버 `scale(1.03)`) | `src/hooks/useReveal.ts`, `src/components/ui/Reveal.tsx`, `src/components/ProductCard.tsx` | ✅ 검증 완료 |
| **UI-07** | PDP 5단계 + 스티키 섹션 내비게이션(스크롤 스파이) + 실제 작동하는 3분 호흡 타이머 + 풀세트 vs 리필/선물 탭 스위처 | `src/components/pdp/StickySectionNav.tsx`, `src/components/pdp/RitualTimer.tsx`, `src/components/pdp/ProductDetailClient.tsx` | ✅ 검증 완료 |
| **UI-08** | 클라이언트 장바구니(`localStorage` 연동) + 네이티브 `<dialog>` 드로어 & 시연용 결제·설문 모달(`DemoCheckoutModal`) | `src/context/CartContext.tsx`, `src/components/CartDrawer.tsx`, `src/components/DemoCheckoutModal.tsx` | ✅ 검증 완료 |
| **UI-09** | 깨지지 않는 직각 에디토리얼 플레이스홀더(비율·교체 파일 경로 표기) | `src/components/ui/EditorialImage.tsx` | ✅ 검증 완료 |

---

## 3. 자동 검수 로그 요약
- **TypeScript (`npm run typecheck`)**: 오류 0건
- **Production Build (`npm run build`)**: 22/22 정적 페이지(SSG/Static) 정상 빌드
- **HTTP 응답 전수 점검**: 23개 라우트 + 41개 정적 이미지 100% `HTTP 200`
- **2단계 인지 설계 전수 감사**: `/`, `/products`, `/policy` 및 8종 PDP Stage 1~4에서 불교·사찰·경전 직접 용어 **0건** 확인
- **개인정보 입력 폼 감사**: 전체 HTML `<input>` / `<textarea>` / `<select>` **0건**
- **360px 모바일 뷰포트 CDP 실측**: `/`, `/products?category=refill`, `/products/housewarming-set`, `/products/petal-cushion`, `/policy` 모두 `scrollWidth === 360` (`overflow = 0`), Stage 5 `<summary>` 실측 높이 `84.5px` (기준 56px 이상 충족)
