export const SITE_INFO = {
  brandKo: "찰나",
  brandHanja: "刹那",
  brandEn: "CHALNA",
  tagline: "하루 중 가장 짧은 쉼",
  description:
    "하루 끝에 켜는 작은 빛, 따뜻한 차 한 잔, 적고 접어 내려놓는 한 장의 기록. 일상 속 3분의 멈춤을 만드는 리추얼 오브제 셀렉션.",
  surveyUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSc-chalna-mvp-demo-survey/viewform",
  templestayUrl: "https://www.templestay.com",
  business: {
    notice: "※ 아래 사업자 정보는 시연용 예시 정보이며, 실제 결제 및 배송은 진행되지 않습니다.",
    companyName: "찰나 스튜디오 (CHALNA Studio)",
    ceo: "윤성민",
    registrationNumber: "000-00-00000 (예시)",
    ecommerceLicense: "제2026-서울중구-0000호 (예시)",
    address: "서울특별시 중구 필동로 1길 30",
    contact: "hello@chalna.example / 02-0000-0000",
  },
} as const;

export const CATEGORIES = [
  {
    id: "all",
    label: "전체 보기",
    enLabel: "ALL OBJECTS",
    description: "하루의 결을 정돈하는 찰나의 여덟 가지 리추얼 오브제.",
  },
  {
    id: "space",
    label: "공간·휴식",
    enLabel: "SPACE & REST",
    description: "머무는 자리에 고요한 빛과 온기, 잠깐의 쉼을 놓는 오브제.",
  },
  {
    id: "tea-note",
    label: "차·기록",
    enLabel: "TEA & NOTE",
    description: "따뜻한 차 한 잔과 손끝의 기록으로 생각을 정리하는 루틴.",
  },
  {
    id: "mind-gift",
    label: "마음·선물",
    enLabel: "MIND & GIFT",
    description: "가까이 두거나 소중한 이에게 평안을 전하는 작은 오브제와 선물.",
  },
  {
    id: "refill",
    label: "리필 스테이션",
    enLabel: "REFILL STATION",
    description: "다 쓴 뒤에도 같은 쉼을 이어갈 수 있는 소모품 리필 라인업.",
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
