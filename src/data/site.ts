const RAW_SURVEY_URL = (process.env.NEXT_PUBLIC_SURVEY_URL ?? "").trim();

export const IS_SURVEY_READY =
  RAW_SURVEY_URL.startsWith("https://") &&
  RAW_SURVEY_URL.includes("/viewform") &&
  !RAW_SURVEY_URL.includes("chalna-mvp-demo-survey");

export const SURVEY_URL = IS_SURVEY_READY ? RAW_SURVEY_URL : "";

export const SITE_INFO = {
  brandKo: "찰나",
  brandHanja: "刹那",
  brandEn: "CHALNA",
  tagline: "하루 중 가장 짧은 쉼",
  description:
    "불을 켜고, 차를 우리고, 생각을 적는 시간. 일상에 작은 쉼을 더하는 찰나의 생활 굿즈 8종을 만나보세요.",
  surveyUrl: SURVEY_URL,
  isSurveyReady: IS_SURVEY_READY,
  feedbackEmailHref:
    "mailto:hello@chalna.kr?subject=%5B%EC%B0%B0%EB%82%98%5D%20%EC%8A%A4%ED%86%A0%EC%96%B4%20%ED%94%BC%EB%93%9C%EB%B0%B1%20%EB%B0%8F%20%EB%AC%B8%EC%9D%98",
  templestayUrl: "https://www.templestay.com",
  business: {
    notice:
      "본 사이트는 교육·연구용 프로젝트 시연 스토어이며, 실제 결제·배송은 진행되지 않습니다. 게시된 상품 이미지는 AI 연출 시안입니다.",
    companyName: "찰나 (CHALNA)",
    ceo: "윤성민",
    registrationNumber: "120-88-02030",
    ecommerceLicense: "제2026-서울중구-0108호",
    address: "서울특별시 중구 필동로 1길 30",
    contact: "02-2260-3114 · hello@chalna.kr (평일 10:00 – 17:00)",
  },
} as const;

export const CATEGORIES = [
  {
    id: "all",
    label: "전체 여덟 가지",
    description: "일상에 작은 쉼을 더하는 생활 굿즈 8종을 한눈에 살펴보세요.",
  },
  {
    id: "night",
    label: "머무는 밤",
    description: "하루의 끝자락, 머무는 자리에 고요한 빛과 편안함을 더합니다.",
  },
  {
    id: "unload",
    label: "덜어내는 기록",
    description: "복잡한 생각과 손끝의 긴장을 가볍게 내려놓는 작은 습관.",
  },
  {
    id: "warmth-air",
    label: "온기와 환기",
    description: "따뜻한 차 한 잔과 맑은 소리, 기분 좋은 향으로 공간을 환기합니다.",
  },
  {
    id: "keepsake",
    label: "곁에 두는 마음",
    description: "늘 곁에 두거나 소중한 이에게 평안을 전하는 작은 마음.",
  },
  {
    id: "refill",
    label: "리필 스테이션",
    description: "다 쓴 뒤에도 같은 쉼을 이어갈 수 있는 전용 소모품 리필.",
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
