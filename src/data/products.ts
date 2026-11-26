export type ProductCategory = "space" | "tea-note" | "mind-gift";

export interface ProductImage {
  src: string;
  alt: string;
  caption?: string;
  /** 실제 사진 미확보 슬롯용 에디토리얼 플레이스홀더 메타 */
  aspectRatio?: "4/5" | "1/1" | "4/3" | "3/4";
  replacePath?: string;
}

export interface OptionChoice {
  id: string;
  label: string;
  sublabel?: string;
  priceDelta: number;
  swatchHex?: string;
  /** 선택 시 갤러리 메인 이미지 자동 교체 */
  imageSrc?: string;
  /** 선택 시 동적으로 바뀌는 구성품 설명 (집들이 세트 등 RQ-022) */
  includedOverride?: string[];
}

export interface OptionGroup {
  id: string;
  name: string;
  choices: OptionChoice[];
}

export interface RitualStep {
  step: string;
  title: string;
  description: string;
  durationSec?: number;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface SafetyNotice {
  title: string;
  prevention: string;
  action: string;
}

export interface RefillInfo {
  available: boolean;
  refillName?: string;
  refillPrice?: number;
  unit?: string;
  recommendedCycle?: string;
  compatibility?: string;
  refillIncluded?: string[];
  /** 리필 불가 상품의 경우 선물/묶음 탭에 표시할 내용 */
  giftOrBundleTabLabel?: string;
  giftOrBundleTitle?: string;
  giftOrBundlePrice?: number;
  giftOrBundleSummary?: string;
  giftOrBundleIncluded?: string[];
}

export interface ProductStory {
  /** Stage 5 기본 접힘 영역 전용 (불교적 의미·은유적 비강요 서사, RQ-006/007/023) */
  summaryLabel: string;
  motifKeyword: string;
  headline: string;
  paragraphs: string[];
  deliveryChannels: string;
  sourceNote: string;
  sampleQuotes?: { text: string; origin: string }[];
}

export interface Product {
  code: string;
  slug: string;
  name: string;
  enName: string;
  category: ProductCategory;
  categoryLabel: string;
  /** 생활 언어 한 줄 문구 (불교 용어 0건, RQ-020/021) */
  oneLiner: string;
  basePrice: number;
  /** Stage 1: 결핍 공감 카피 (불교 용어 0건) */
  empathyHeadline: string;
  empathyBody: string;
  /** Stage 2: 디자인·소재 룩북 카피 (불교 용어 0건) */
  editorialHeadline: string;
  editorialBody: string;
  /** 대표·갤러리·디테일 이미지 (최소 3장 이상, RQ-021) */
  images: {
    main: ProductImage;
    composition: ProductImage;
    lifestyle: ProductImage;
    details: ProductImage[];
    detailSheetPng: string;
  };
  /** 기본 구성품 목록 (옵션 선택 시 override 가능) */
  includedItems: string[];
  optionGroups: OptionGroup[];
  /** Stage 3: 3분 리추얼 단계 및 타이머 기본 시간(초) */
  ritualTitle: string;
  ritualDefaultSeconds: number;
  ritualPresets?: number[];
  ritualSteps: RitualStep[];
  /** Stage 4: 리필 또는 선물/묶음 정보 (RQ-017) */
  refill: RefillInfo;
  /** Stage 4: 상세 스펙 (RQ-008~015) */
  specs: SpecRow[];
  /** Stage 4: 사용 안전 주의사항 (RQ-016) */
  safetyNotices: SafetyNotice[];
  /** Stage 4: 인증·표시 기준 확인 안내 (RQ-027) */
  complianceNotice: string;
  /** Stage 5: 접힌 이야기 영역 (RQ-006, RQ-007, RQ-023) */
  story: ProductStory;
}

export const PRODUCTS: Product[] = [
  // 01. 연꽃 무드등
  {
    code: "P01",
    slug: "lotus-lamp",
    name: "연꽃 무드등",
    enName: "LOTUS AMBIENT LAMP",
    category: "space",
    categoryLabel: "공간·휴식",
    oneLiner: "어지러운 하루 끝에도, 나만의 빛을 피우는 시간.",
    basePrice: 36000,
    empathyHeadline: "형광등을 끄고 바로 잠들기엔, 아직 정리되지 않은 하루가 남았을 때.",
    empathyBody:
      "퇴근 후에도 화면 속 밝은 빛에 머무르다 보면 하루가 끝났다는 감각이 흐려집니다. 침대 옆이나 책상 한편에 두는 작은 조명 하나로, 분주한 낮과 조용한 밤 사이의 경계를 부드럽게 만들어 보세요.",
    editorialHeadline: "오므라든 반투명 꽃잎 사이로 스며 나오는 2700K의 온기.",
    editorialBody:
      "섬세한 결이 살아 있는 반투명 꽃잎 갓을 초록빛 세라믹 연잎 받침 위에 단정히 올렸습니다. 불을 켜는 순간 2700K 전구색 빛이 겹겹의 꽃잎을 통과해 눈부심 없이 은은하게 번집니다.",
    images: {
      main: {
        src: "/images/products/lotus-lamp-01-main.png",
        alt: "반투명 아이보리 꽃잎 갓과 세라믹 연잎 받침으로 구성된 연꽃 무드등 정면",
        caption: "연꽃 무드등 — 아이보리 꽃잎 갓 · 세라믹 연잎 받침",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/lotus-lamp-01-main.png",
        alt: "연꽃 무드등 전체 구성 컷",
        caption: "FULL COMPOSITION · 무드등 본체, 연잎 받침, USB-C 케이블",
        aspectRatio: "1/1",
      },
      lifestyle: {
        src: "/images/products/lotus-lamp-03-lifestyle.png",
        alt: "창가 원목 선반 위에 켜진 연꽃 무드등 연출 컷",
        caption: "EVENING RITUAL · 침대 옆과 책상 한편의 따뜻한 마무리",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/lotus-lamp-02-detail.png",
          alt: "연꽃 무드등의 반투명 꽃잎 결과 유광 세라믹 연잎 받침 디테일",
          caption: "01 TEXTURE · 은은한 빛을 머금는 반투명 꽃잎 갓과 세라믹 받침",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/lotus-lamp-03-lifestyle.png",
          alt: "따뜻한 전구색으로 공간을 비추는 연꽃 무드등 실사용 컷",
          caption: "02 WARM GLOW · 2700K 전구색 LED와 USB 5V 케이블 스위치",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P01_lotus_lamp.png",
    },
    includedItems: [
      "연꽃 무드등 본체 (반투명 꽃잎 갓 · 2700K LED 내장) 1개",
      "세라믹 연잎 받침 1개",
      "USB-C 전원 케이블 (스위치 포함, 전원 어댑터 별도) 1개",
      "동봉 이야기 카드 1매",
    ],
    optionGroups: [
      {
        id: "petal-color",
        name: "꽃잎 색상",
        choices: [
          {
            id: "ivory",
            label: "아이보리",
            sublabel: "따뜻한 전구색이 가장 부드럽게 번지는 기본 톤",
            priceDelta: 0,
            swatchHex: "#F2E2C4",
            imageSrc: "/images/products/lotus-lamp-01-main.png",
          },
          {
            id: "soft-pink",
            label: "연분홍",
            sublabel: "은은한 분홍빛이 감도는 화사한 꽃잎 톤",
            priceDelta: 2000,
            swatchHex: "#ECC5C8",
            imageSrc: "/images/products/lotus-lamp-02-detail.png",
          },
        ],
      },
      {
        id: "edition",
        name: "구성 선택",
        choices: [
          {
            id: "single",
            label: "단품 구성",
            sublabel: "본체 + 연잎 받침 + USB-C 케이블",
            priceDelta: 0,
          },
          {
            id: "gift-wrap",
            label: "선물 패키지 포함",
            sublabel: "전용 패브릭 파우치 + 메시지 카드 추가",
            priceDelta: 4000,
            includedOverride: [
              "연꽃 무드등 본체 (반투명 꽃잎 갓 · 2700K LED 내장) 1개",
              "세라믹 연잎 받침 1개",
              "USB-C 전원 케이블 (스위치 포함, 어댑터 별도) 1개",
              "선물용 패브릭 파우치 · 메시지 카드 · 동봉 이야기 카드",
            ],
          },
        ],
      },
    ],
    ritualTitle: "하루 끝, 불을 켜고 보내는 3분",
    ritualDefaultSeconds: 180,
    ritualPresets: [180, 300],
    ritualSteps: [
      {
        step: "STEP 01",
        title: "방의 주 조명을 끄고 꽃잎에 불 켜기",
        description:
          "스마트폰 화면을 덮고 케이블 스위치를 눌러 2700K의 따뜻한 빛만 남겨 둡니다.",
      },
      {
        step: "STEP 02",
        title: "빛의 결을 바라보며 호흡 고르기",
        description:
          "꽃잎 사이로 퍼지는 은은한 그림자에 시선을 두고, 숨을 천천히 들이마시고 내쉽니다.",
      },
      {
        step: "STEP 03",
        title: "오늘의 분주함을 빛과 함께 닫기",
        description:
          "3분의 타이머가 끝나면 스위치를 끄며 하루를 단정히 마무리합니다.",
      },
    ],
    refill: {
      available: false,
      giftOrBundleTabLabel: "선물 패키지 구성",
      giftOrBundleTitle: "연꽃 무드등 선물 패키지",
      giftOrBundlePrice: 40000,
      giftOrBundleSummary:
        "이사나 자취를 시작한 지인에게 저녁의 고요함을 선물할 수 있도록 패브릭 파우치와 메시지 카드를 함께 담았습니다.",
      giftOrBundleIncluded: [
        "연꽃 무드등 본체 + 세라믹 연잎 받침",
        "USB-C 케이블 (스위치 내장)",
        "선물용 패브릭 파우치 + 메시지 카드",
        "동봉 이야기 카드",
      ],
    },
    specs: [
      { label: "구성품", value: "무드등 본체 · 세라믹 연잎 받침 · USB-C 케이블 · 이야기 카드" },
      { label: "크기", value: "약 16 × 16 × 13 cm" },
      { label: "소재", value: "반투명 폴리카보네이트(PC) 갓 · 세라믹 받침" },
      { label: "광원 및 전원", value: "2700K 전구색 LED · USB 5V · 케이블 스위치" },
      { label: "별도 준비", value: "USB 5V 1A 정격 전원 어댑터 별도" },
      { label: "사용 환경", value: "실내 전용 (습기·물기 없는 평평한 면에 거치)" },
    ],
    safetyNotices: [
      {
        title: "발열 및 장시간 연속 점등 주의",
        prevention: "이불·커튼 등 가연성 직물로 갓을 덮지 말고, 통풍이 되는 평평한 곳에 두세요.",
        action: "본체가 과도하게 뜨거워지거나 이상 냄새가 나면 즉시 USB 전원을 분리하고 사용을 중단하세요.",
      },
      {
        title: "전원(USB 5V) 및 물기 주의",
        prevention: "규격에 맞는 5V 정격 어댑터만 사용하며, 젖은 손으로 케이블이나 스위치를 만지지 마세요.",
        action: "액체가 닿았을 경우 전원을 즉시 뽑고 완전히 건조될 때까지 재연결하지 마세요.",
      },
    ],
    complianceNotice:
      "전기용품 안전 기준에 맞춘 USB 5V 저전압 LED 조명 사양입니다. 정격 5V 1A 어댑터 사용을 권장하며, 실내 건조한 공간에서 사용해 주세요.",
    story: {
      summaryLabel: "이 오브제에 담긴 찰나의 이야기 펼쳐보기",
      motifKeyword: "청정 (淸淨) · 연꽃",
      headline: "흐린 하루에도, 맑게 피어나는 자리.",
      paragraphs: [
        "진흙 속에서 자라면서도 물들지 않고 맑은 꽃을 피우는 연꽃은 오래전부터 고요한 마음의 상징으로 전해져 왔습니다.",
        "연꽃 무드등은 그 상징을 거창한 말 대신 하루 끝의 작은 불빛으로 옮겼습니다. 소란스러운 하루를 보낸 저녁에도 나만의 고요한 자리를 스스로 밝힐 수 있다는 조용한 위로를 담았습니다.",
      ],
      deliveryChannels: "",
      sourceNote: "",
    },
  },

  // 02. 108매듭 실팔찌
  {
    code: "P02",
    slug: "knot-bracelet",
    name: "108매듭 실팔찌",
    enName: "108 KNOT CORD BRACELET",
    category: "mind-gift",
    categoryLabel: "마음·선물",
    oneLiner: "백여덟 번의 매듭, 나를 돌아보는 작은 약속.",
    basePrice: 18000,
    empathyHeadline: "바쁜 오후, 마음이 조급해질 때마다 잠시 시선을 멈출 기준점이 필요할 때.",
    empathyBody:
      "해야 할 일에 쫓기다 보면 내 호흡이 얼마나 빨라졌는지조차 놓치기 쉽습니다. 키보드 위, 커피잔을 든 손목에 가볍게 얹힌 가는 실팔찌가 시선이 닿는 찰나마다 잠시 숨을 고르는 신호가 되어 줍니다.",
    editorialHeadline: "가느다란 매듭 실에 작은 원석 세 알을 얹은 데일리 액세서리.",
    editorialBody:
      "무겁고 눈에 띄는 장식 대신 일상복 어디에나 스며드는 얇은 왁스 코팅 매듭 실로 엮었습니다. 다섯 가지 차분한 컬러와 색상별 고정 원석 세 알, 그리고 손목에 맞게 당겨 조절하는 슬라이딩 매듭으로 편안한 착용감을 갖췄습니다.",
    images: {
      main: {
        src: "/images/products/knot-bracelet-01-main.png",
        alt: "버건디, 블랙, 포레스트 그린, 베이지, 브라운 5가지 색상의 108매듭 실팔찌",
        caption: "108매듭 실팔찌 — 5가지 차분한 컬러와 4mm 원석 포인트",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/knot-bracelet-01-main.png",
        alt: "108매듭 실팔찌 5종 전체 구성 컷",
        caption: "FULL LINEUP · 5 COLORS (버건디 · 블랙 · 포레스트 그린 · 베이지 · 브라운)",
        aspectRatio: "1/1",
      },
      lifestyle: {
        src: "/images/products/knot-bracelet-03-lifestyle.png",
        alt: "손목에 버건디 108매듭 실팔찌를 착용하고 슬라이딩 매듭으로 길이를 조절하는 모습",
        caption: "DAILY FIT · 손목 둘레 약 14~20cm 길이 조절 슬라이딩 매듭",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/knot-bracelet-02-detail.png",
          alt: "108매듭의 촘촘한 짜임과 4mm 원석 3알, 금속 마감 비즈 확대 디테일",
          caption: "01 CRAFT · 하나씩 엮은 가는 매듭과 지름 약 4mm 원석 세 알",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/knot-bracelet-03-lifestyle.png",
          alt: "실제 착용 시 손목 위에서 가볍게 어우러지는 실팔찌 컷",
          caption: "02 ADJUST · 혼자서도 간편하게 길이를 맞추는 매듭 구조",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P02_108_knot_bracelet.png",
    },
    includedItems: [
      "108매듭 실팔찌 (선택 색상 1개 · 원석 3알 고정 조합)",
      "전용 종이 받침 카드 1매",
      "동봉 이야기 카드 1매",
    ],
    optionGroups: [
      {
        id: "cord-color",
        name: "실 색상 (원석 조합 고정)",
        choices: [
          {
            id: "burgundy",
            label: "버건디",
            sublabel: "앰버 톤 원석 3알 + 골드 마감",
            priceDelta: 0,
            swatchHex: "#8B322C",
            imageSrc: "/images/products/knot-bracelet-03-lifestyle.png",
          },
          {
            id: "black",
            label: "블랙",
            sublabel: "퍼플·아이스블루 원석 3알 + 실버 마감",
            priceDelta: 0,
            swatchHex: "#242424",
            imageSrc: "/images/products/knot-bracelet-01-main.png",
          },
          {
            id: "forest-green",
            label: "포레스트 그린",
            sublabel: "아쿠아 블루 원석 3알 + 실버 마감",
            priceDelta: 0,
            swatchHex: "#314B3C",
            imageSrc: "/images/products/knot-bracelet-02-detail.png",
          },
          {
            id: "beige",
            label: "베이지",
            sublabel: "로즈 톤 원석 3알 + 골드 마감",
            priceDelta: 0,
            swatchHex: "#D6BFA3",
            imageSrc: "/images/products/knot-bracelet-01-main.png",
          },
          {
            id: "brown",
            label: "브라운",
            sublabel: "모스 그린 원석 3알 + 골드 마감",
            priceDelta: 0,
            swatchHex: "#7A4C2E",
            imageSrc: "/images/products/knot-bracelet-01-main.png",
          },
        ],
      },
      {
        id: "bundle",
        name: "구성 선택",
        choices: [
          {
            id: "single",
            label: "단품 (1개)",
            sublabel: "실팔찌 1개 + 종이 받침 카드",
            priceDelta: 0,
          },
          {
            id: "pair",
            label: "우정·커플 2개 세트",
            sublabel: "2개 묶음 할인 적용 (-2,000원)",
            priceDelta: 16000,
            includedOverride: [
              "108매듭 실팔찌 2개 (선물용 개별 종이 받침 카드 2매)",
              "동봉 이야기 카드 2매",
            ],
          },
        ],
      },
    ],
    ritualTitle: "손목에 눈길이 닿을 때, 3분 멈춤",
    ritualDefaultSeconds: 180,
    ritualPresets: [180],
    ritualSteps: [
      {
        step: "STEP 01",
        title: "내 손목에 맞게 매듭 조절하기",
        description:
          "아침에 집을 나서기 전, 조이지 않고 편안하게 움직이는 길이(약 14~20cm)로 슬라이딩 매듭을 맞춥니다.",
      },
      {
        step: "STEP 02",
        title: "손목의 원석 세 알을 천천히 짚어보기",
        description:
          "하루 중 마음이 복잡해질 때 팔찌의 작은 원석을 손끝으로 느끼며 지금 하던 일을 잠시 내려놓습니다.",
      },
      {
        step: "STEP 03",
        title: "세 번의 깊은 호흡으로 돌아오기",
        description:
          "어깨의 힘을 풀고 숨을 세 번 고른 뒤, 다시 나의 속도로 다음 일을 이어갑니다.",
      },
    ],
    refill: {
      available: false,
      giftOrBundleTabLabel: "2개 우정·선물 세트",
      giftOrBundleTitle: "108매듭 실팔찌 2개 세트",
      giftOrBundlePrice: 34000,
      giftOrBundleSummary:
        "시험을 앞둔 친구나 마음을 나누고 싶은 사람과 함께 착용할 수 있는 2개 선물 구성입니다. (단품 2개 대비 2,000원 혜택)",
      giftOrBundleIncluded: [
        "108매듭 실팔찌 2개",
        "개별 종이 받침 카드 2매",
        "동봉 이야기 카드 2매",
      ],
    },
    specs: [
      { label: "구성품", value: "108매듭 실팔찌 1개 · 종이 받침 카드 1매 · 이야기 카드" },
      { label: "소재", value: "왁스 코팅 폴리에스터 매듭 실(약 1mm) · 원석 비즈 · 금속 비즈" },
      { label: "원석 규격", value: "지름 약 4mm 포인트 3알 (색상별 조합 고정)" },
      { label: "착용 길이", value: "손목 둘레 약 14 ~ 20 cm (슬라이딩 길이 조절)" },
      { label: "색상 옵션", value: "버건디 · 블랙 · 포레스트 그린 · 베이지 · 브라운" },
      { label: "참고 사항", value: "원석 특성상 결·무늬·명도가 개체마다 조금씩 다를 수 있습니다." },
    ],
    safetyNotices: [
      {
        title: "피부 민감 반응 및 물기 관리",
        prevention: "샤워·수영·사우나 시 변색과 실 늘어남 방지를 위해 가급적 벗어 두세요.",
        action: "착용 중 피부 발진이나 가려움이 느껴지면 즉시 착용을 중단하세요.",
      },
      {
        title: "어린이·반려동물 삼킴 주의",
        prevention: "작은 원석과 마감 비즈가 포함되어 있으므로 영유아와 반려동물의 손이 닿지 않는 곳에 보관하세요.",
        action: "파손으로 부품이 분리된 경우 즉시 수거하여 안전하게 폐기해 주세요.",
      },
    ],
    complianceNotice:
      "패션 액세서리 취급 기준에 따라 소재·치수 및 관리 방법을 안내합니다. 만 14세 이상 착용을 권장합니다.",
    story: {
      summaryLabel: "이 오브제에 담긴 찰나의 이야기 펼쳐보기",
      motifKeyword: "108번뇌 · 마음 돌아보기",
      headline: "백여덟 번의 매듭, 잠시 나를 돌아보는 약속.",
      paragraphs: [
        "불교에서 숫자 108은 일상에서 수시로 일어나는 마음의 흔들림(108번뇌)을 뜻합니다. 큰 구슬의 전통 염주 대신, 매일 입는 옷과 자연스럽게 어우러지는 가는 매듭 실 안에 그 숫자를 조용히 담아냈습니다.",
        "108장 잡념 노트와 같은 숫자를 공유하는 이 팔찌는 무언가를 믿으라는 권유가 아니라, 손목에 눈길이 닿을 때마다 잠시 멈춰 지금 내 마음의 상태를 살펴보자는 작은 약속입니다.",
      ],
      deliveryChannels: "",
      sourceNote: "",
    },
  },

  // 03. 변색 연꽃 찻잔·티백 세트
  {
    code: "P03",
    slug: "lotus-tea-set",
    name: "변색 연꽃 찻잔·티백 세트",
    enName: "THERMOCHROMIC LOTUS TEA SET",
    category: "tea-note",
    categoryLabel: "차·기록",
    oneLiner: "온기에 피어나고, 식으며 달라지는 꽃.",
    basePrice: 34000,
    empathyHeadline: "커피 한 잔도 급하게 마셔 버리는 오후, 천천히 온기를 느낄 3분이 필요할 때.",
    empathyBody:
      "모니터를 보며 습관처럼 마시는 음료 대신, 차가 우러나는 색과 잔 아래로 번지는 온기를 바라보는 짧은 휴식을 제안합니다. 실온에서는 투명하던 유리 꽃잎 받침이 따뜻한 차를 따르면 은은한 분홍빛으로 피어납니다.",
    editorialHeadline: "투명한 꽃잎 받침에 분홍빛이 물드는 순간, 세 가지 차의 향기.",
    editorialBody:
      "150mL 내열유리 찻잔과 감온 변색 유리 연꽃 받침, 그리고 개별 포장 티백 12개(연잎차·유자 블렌드·캐모마일 각 4개)를 단정한 선물 상자에 담았습니다. 차가 식어 가면 꽃잎도 서서히 본래의 투명함으로 돌아갑니다.",
    images: {
      main: {
        src: "/images/products/lotus-tea-set-01-main.png",
        alt: "세이지 그린 티백 선물 상자 12개입과 따뜻한 차가 담긴 투명 유리 찻잔, 분홍빛으로 변한 연꽃 받침",
        caption: "변색 연꽃 찻잔·티백 세트 — 찻잔 150mL · 변색 받침 · 티백 12개",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/lotus-tea-set-02-compare.png",
        alt: "실온의 투명 연꽃 받침과 따뜻한 차를 담은 분홍 연꽃 받침 비교 및 티백 12개입 상자",
        caption: "COLOR CHANGE · 실온(투명)과 따뜻한 차(분홍)의 온도 변화 비교",
        aspectRatio: "4/5",
      },
      lifestyle: {
        src: "/images/products/lotus-tea-set-05-steeping.png",
        alt: "따뜻한 햇살 아래 유리 찻잔에 티백을 우리는 모습과 분홍빛 연꽃 받침",
        caption: "TEA MOMENT · 연잎차 · 유자 블렌드 · 캐모마일 각 4개입",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/lotus-tea-set-03-clear.png",
          alt: "변색 전 실온 상태의 투명한 유리 연꽃 받침과 티백 선물 상자",
          caption: "01 BEFORE (실온) · 맑고 투명한 유리 꽃잎 받침",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/lotus-tea-set-04-pink.png",
          alt: "변색 후 따뜻한 차의 온기로 분홍빛이 감도는 유리 연꽃 받침",
          caption: "02 AFTER (따뜻한 차) · 잔 아래로 전해진 온기에 물드는 분홍빛",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P03_lotus_tea_set.png",
    },
    includedItems: [
      "내열유리 꽃잎 찻잔 (150mL) 1개",
      "감온 변색 유리 연꽃 받침 (지름 약 12cm) 1개",
      "개별 포장 티백 12개 (연잎차 4 · 유자 블렌드 4 · 캐모마일 4)",
      "CHALNA 티 모먼츠 선물 상자 1개 · 동봉 이야기 카드 1매",
    ],
    optionGroups: [
      {
        id: "tea-set-size",
        name: "세트 구성",
        choices: [
          {
            id: "1p-set",
            label: "1인 풀세트",
            sublabel: "찻잔·변색 받침 각 1개 + 티백 12개 + 선물 상자",
            priceDelta: 0,
            imageSrc: "/images/products/lotus-tea-set-01-main.png",
          },
          {
            id: "2p-set",
            label: "2인 티타임 세트",
            sublabel: "찻잔·변색 받침 각 2개 + 티백 12개 + 선물 상자",
            priceDelta: 16000,
            imageSrc: "/images/products/lotus-tea-set-02-compare.png",
            includedOverride: [
              "내열유리 꽃잎 찻잔 (150mL) 2개",
              "감온 변색 유리 연꽃 받침 (지름 약 12cm) 2개",
              "개별 포장 티백 12개 (연잎차 4 · 유자 블렌드 4 · 캐모마일 4)",
              "CHALNA 티 모먼츠 선물 상자 1개 · 동봉 이야기 카드 1매",
            ],
          },
          {
            id: "tea-refill-only",
            label: "티백 리필 팩 (12개입)",
            sublabel: "찻잔 미포함 · 연잎차·유자 블렌드·캐모마일 각 4개",
            priceDelta: -21000,
            imageSrc: "/images/products/lotus-tea-set-05-steeping.png",
            includedOverride: [
              "개별 포장 티백 리필 12개 (연잎차 4 · 유자 블렌드 4 · 캐모마일 4)",
              "리필 전용 종이 슬리브",
            ],
          },
        ],
      },
    ],
    ritualTitle: "차를 우리며 온기를 바라보는 3분",
    ritualDefaultSeconds: 180,
    ritualPresets: [180, 300],
    ritualSteps: [
      {
        step: "STEP 01",
        title: "오늘의 기분에 맞는 차 한 포 고르기",
        description:
          "연잎차, 유자 블렌드, 캐모마일 중 지금 가장 당기는 향을 골라 투명 유리 찻잔에 넣습니다.",
      },
      {
        step: "STEP 02",
        title: "따뜻한 물을 따르고 꽃잎 빛의 변화 보기",
        description:
          "약 80~90℃의 따뜻한 물을 부으면 잔 아래 연꽃 받침이 서서히 분홍빛으로 물드는 변화를 감상합니다.",
      },
      {
        step: "STEP 03",
        title: "향과 온기에 머무르며 천천히 마시기",
        description:
          "찻잔을 감싼 손끝의 온기와 올라오는 김을 느끼며, 차가 식어 가는 속도만큼 호흡을 늦춰 봅니다.",
      },
    ],
    refill: {
      available: true,
      refillName: "찰나 티백 리필 팩 (12개입)",
      refillPrice: 13000,
      unit: "12개입 (연잎차 4 · 유자 블렌드 4 · 캐모마일 4)",
      recommendedCycle: "약 2 ~ 4주 (주 3~5회 음용 기준)",
      compatibility: "변색 연꽃 찻잔·티백 세트 선물 상자 칸 규격 100% 호환",
      refillIncluded: [
        "개별 포장 연잎차 티백 4개",
        "개별 포장 유자 블렌드 티백 4개",
        "개별 포장 캐모마일 티백 4개",
      ],
    },
    specs: [
      { label: "구성품", value: "내열유리 찻잔 1개 · 변색 유리 받침 1개 · 티백 12개 · 선물 상자" },
      { label: "용량 및 크기", value: "찻잔 150mL · 연꽃 받침 지름 약 12 cm" },
      { label: "소재", value: "내열유리 찻잔 · 감온 변색 코팅 유리 받침" },
      { label: "변색 특성", value: "실온에서 투명 · 따뜻한 차(약 45℃ 이상 온기 전달 시) 분홍빛 발현" },
      { label: "티백 구성", value: "연잎차 4개 · 유자 블렌드 4개 · 캐모마일 4개 (총 12개)" },
      { label: "세척 및 관리", value: "부드러운 스펀지 손세척 권장 · 전자레인지/식기세척기/직화 불가" },
    ],
    safetyNotices: [
      {
        title: "뜨거운 물 화상 및 급격한 온도 차 주의",
        prevention: "팔팔 끓는 물(100℃)을 바로 붓지 말고 한 김 식힌 따뜻한 물(80~90℃)을 사용하세요. 찻잔이 뜨거울 수 있으니 받침과 함께 잡으세요.",
        action: "유리에 금이 가거나 깨진 경우 즉시 사용을 중단하고, 뜨거운 물에 덴 경우 흐르는 찬물로 식힌 뒤 필요시 진료를 받으세요.",
      },
      {
        title: "감온 코팅 보호 및 식품 알레르기 확인",
        prevention: "변색 받침은 거친 수세미·식기세척기·장시간 물에 담가두기를 피하고, 허브·과실 원재료에 민감한 경우 성분을 먼저 확인하세요.",
        action: "음용 중 불편함이 느껴지면 섭취를 중단하세요.",
      },
    ],
    complianceNotice:
      "식품용 기구 안전 기준을 준수한 내열유리 찻잔 및 개별 포장 침출차 구성입니다. 원재료·소비기한·보관 방법은 패키지 뒷면 표시사항을 확인해 주세요.",
    story: {
      summaryLabel: "이 오브제에 담긴 찰나의 이야기 펼쳐보기",
      motifKeyword: "무상 (無常) · 알아차림",
      headline: "같은 꽃, 온기에 따라 달라지는 다른 빛.",
      paragraphs: [
        "불교의 '무상(無常)'은 모든 것이 한 모습에 영원히 머물지 않고 조건에 따라 끊임없이 변화한다는 뜻입니다. 변색 연꽃 찻잔은 차의 온기에 따라 투명에서 분홍으로, 그리고 식으며 다시 투명해지는 변화로 그 이치를 눈앞에 조용히 보여줍니다.",
        "티백을 우리는 3분 동안 향과 온도에 주의를 기울이는 시간은 지금 이 순간을 느끼는 '알아차림'의 연습이 됩니다. 차가 식기 전의 짧은 순간처럼, 지금의 감정 역시 머물다 흘러간다는 담백한 시선을 전합니다.",
      ],
      deliveryChannels: "",
      sourceNote: "",
    },
  },

  // 04. 연꽃 입체 편지지
  {
    code: "P04",
    slug: "lotus-letter",
    name: "연꽃 입체 편지지",
    enName: "FOLDING LOTUS LETTER",
    category: "mind-gift",
    categoryLabel: "마음·선물",
    oneLiner: "네 하루가 평안하기를, 마음 한 송이를 보냅니다.",
    basePrice: 8500,
    empathyHeadline: "짧은 메신저 대신, 오래 간직할 수 있는 진심을 건네고 싶은 날.",
    empathyBody:
      "고마움이나 응원처럼 말로 다 전하기 어려운 마음은 종이 위에 적을 때 비로소 온전해집니다. 접으면 단정한 꽃봉오리가 되고, 받는 이가 꽃잎을 하나씩 펼칠 때 가운데 숨겨둔 문장이 드러나는 입체 편지지입니다.",
    editorialHeadline: "열어보는 손길까지 선물의 일부가 되는 무광 160g/㎡ 종이꽃.",
    editorialBody:
      "손끝에 부드럽게 닿는 160g/㎡ 무광 종이에 은은한 연분홍 그라데이션과 잎맥 결을 정교하게 담았습니다. 펼친 지름 약 16cm의 넉넉한 중앙 크림 면에 마음을 적은 뒤, 접는 선을 따라 봉오리 형태로 모아 전용 봉투에 담아 전합니다.",
    images: {
      main: {
        src: "/images/products/lotus-letter-01-main.png",
        alt: "접은 연꽃 봉오리 형태, 펼친 입체 편지지, CHALNA 금박 봉투 구성",
        caption: "연꽃 입체 편지지 — 접은 봉오리 · 펼친 편지지 · 전용 봉투",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/lotus-letter-02-lookbook.png",
        alt: "따뜻한 자연광 아래 놓인 연꽃 입체 편지지와 전용 봉투",
        caption: "FULL COMPOSITION · 무광 160g/㎡ 입체 편지지와 전용 봉투",
        aspectRatio: "4/5",
      },
      lifestyle: {
        src: "/images/products/lotus-letter-04-writing.png",
        alt: "펼쳐진 연꽃 입체 편지지의 중앙 크림 면에 연필로 메시지를 적는 손",
        caption: "HANDWRITING · 펼친 중앙 크림 면에 천천히 적는 진심",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/lotus-letter-03-open.png",
          alt: "완전히 펼쳤을 때 드러나는 중앙 필기 영역과 꽃잎 결 디테일",
          caption: "01 OPEN · 펼친 지름 약 16cm의 정갈한 필기 공간",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/lotus-letter-05-folding.png",
          alt: "두 손으로 꽃잎을 안쪽으로 천천히 모아 접는 3단계 과정",
          caption: "02 FOLD · 접는 선을 따라 꽃봉오리로 모아 닫는 순간",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P04_lotus_letter.png",
    },
    includedItems: [
      "연꽃 입체 편지지 (무광 160g/㎡) 1매",
      "CHALNA 입체형 전용 봉투 (약 12 × 12cm) 1매",
      "3단계 접기 안내 · 동봉 이야기 미니 카드 1매",
    ],
    optionGroups: [
      {
        id: "letter-color",
        name: "꽃잎 색상",
        choices: [
          {
            id: "soft-pink",
            label: "연분홍",
            sublabel: "꽃잎 끝으로 맑게 물드는 기본 연분홍",
            priceDelta: 0,
            swatchHex: "#E8A6B2",
            imageSrc: "/images/products/lotus-letter-01-main.png",
          },
          {
            id: "ivory",
            label: "아이보리",
            sublabel: "단정하고 차분한 크림 아이보리",
            priceDelta: 0,
            swatchHex: "#EFE9DC",
            imageSrc: "/images/products/lotus-letter-02-lookbook.png",
          },
        ],
      },
      {
        id: "letter-pack",
        name: "수량 구성",
        choices: [
          {
            id: "single",
            label: "단품 (1세트)",
            sublabel: "편지지 1매 + 전용 봉투 1매",
            priceDelta: 0,
          },
          {
            id: "pack-3",
            label: "추가 팩 (3세트 묶음)",
            sublabel: "편지지 3매 + 전용 봉투 3매 (반복 구매 추천)",
            priceDelta: 13500,
            includedOverride: [
              "연꽃 입체 편지지 (무광 160g/㎡) 3매",
              "CHALNA 입체형 전용 봉투 (약 12 × 12cm) 3매",
              "3단계 접기 안내 · 동봉 이야기 미니 카드 3매",
            ],
          },
        ],
      },
    ],
    ritualTitle: "펼치고, 쓰고, 다시 접는 3분",
    ritualDefaultSeconds: 180,
    ritualPresets: [180],
    ritualSteps: [
      {
        step: "STEP 01 · 펼치기",
        title: "꽃잎을 활짝 펼쳐 자리 만들기",
        description:
          "편지지를 책상 위에 평평하게 펼쳐 중앙의 크림색 필기 면이 온전히 드러나게 놓습니다.",
      },
      {
        step: "STEP 02 · 쓰기",
        title: "상대의 평안을 떠올리며 마음 적기",
        description:
          "수능, 취업, 생일, 감사 등 건네고 싶은 한 문장을 천천히 눌러 적습니다.",
      },
      {
        step: "STEP 03 · 접기",
        title: "접는 선을 따라 꽃봉오리로 모아 담기",
        description:
          "안쪽 꽃잎부터 바깥 꽃잎 순으로 접는 선을 따라 천천히 모아 접어 전용 봉투에 넣습니다.",
      },
    ],
    refill: {
      available: true,
      refillName: "연꽃 입체 편지지 추가 팩 (3세트 묶음)",
      refillPrice: 22000,
      unit: "3세트 (편지지 3매 + 봉투 3매)",
      recommendedCycle: "기념일·계절 인사 등 수시 (약 2~3개월)",
      compatibility: "단품과 동일 규격(펼친 지름 16cm · 봉투 12×12cm) · 찰나 타 선물 세트 동봉 가능",
      refillIncluded: [
        "연꽃 입체 편지지 3매 (연분홍 / 아이보리 선택)",
        "CHALNA 입체형 전용 봉투 3매",
        "동봉 이야기 미니 카드 3매",
      ],
    },
    specs: [
      { label: "구성품", value: "연꽃 입체 편지지 1매 · 입체형 봉투 1매 (3세트 묶음 선택 가능)" },
      { label: "편지지 크기", value: "펼친 지름 약 16 cm · 접은 지름 약 7 cm" },
      { label: "봉투 크기", value: "약 12 × 12 cm" },
      { label: "소재 및 평량", value: "무광 고급지 160 g/㎡" },
      { label: "접는 법", value: "3단계 가이드 (01 펼치기 → 02 쓰기 → 03 접기)" },
      { label: "보관 안내", value: "직사광선과 습기를 피해 평평하게 보관해 주세요." },
    ],
    safetyNotices: [
      {
        title: "종이 가장자리 및 습기 주의",
        prevention: "접는 선을 무리한 힘으로 구기지 말고 손가락으로 가볍게 눌러 접어 주세요.",
        action: "습기에 닿으면 종이가 울 수 있으니 건조한 곳에 보관해 주세요.",
      },
    ],
    complianceNotice:
      "무광 고급지 160 g/㎡ 규격의 입체 편지지와 전용 봉투로 구성되어 있으며, 직사광선과 습기를 피해 보관해 주세요.",
    story: {
      summaryLabel: "이 오브제에 담긴 찰나의 이야기 펼쳐보기",
      motifKeyword: "자비 (慈悲) · 상대의 평안을 바라는 마음",
      headline: "당신의 하루가 평안하기를 바라는 마음 한 송이.",
      paragraphs: [
        "불교에서 말하는 자비(慈悲)는 거창한 희생이 아니라, 곁에 있는 이가 기쁘고 평안하기를 바라는 따뜻한 마음에서 시작됩니다.",
        "연꽃 입체 편지지는 글을 쓰고 꽃잎을 하나씩 접어 올리는 시간, 그리고 받는 이가 꽃을 펼치며 문장을 발견하는 순간까지를 한 편의 인사로 엮었습니다. 말로 다 전하지 못한 다정함을 조용히 건네는 도구입니다.",
      ],
      deliveryChannels: "",
      sourceNote: "",
    },
  },

  // 05. 풍경 집들이 세트
  {
    code: "P05",
    slug: "housewarming-set",
    name: "풍경 집들이 세트",
    enName: "HOUSEWARMING CHIME & DIFFUSER SET",
    category: "space",
    categoryLabel: "공간·휴식",
    oneLiner: "향으로 채우고, 소리로 환기하는 집.",
    basePrice: 48000,
    empathyHeadline: "새로운 공간의 첫날, 오래 남는 취향과 평안을 건네고 싶을 때.",
    empathyBody:
      "이사나 독립을 축하하는 자리, 흔한 소모품 대신 현관에 걸어두는 맑은 풍경 소리와 공간에 스며드는 향을 보자기에 정성껏 묶어 전합니다. 받는 사람의 공간 취향에 맞춰 두 가지 디퓨저 방식 중 하나를 직접 고를 수 있습니다.",
    editorialHeadline: "황동 물고기 풍경과 보자기 포장은 공통으로, 디퓨저는 취향에 맞게 택 1.",
    editorialBody:
      "문을 열 때마다 맑게 울리는 황동 물고기 풍경과 세이지·분홍 배색 보자기 포장이 기본 구성에 포함됩니다. 은은하게 오래 퍼지는 '꽃 리드 디퓨저' 또는 다공성 스톤을 직접 쌓고 오일을 떨어뜨리는 '돌탑 스톤 디퓨저' 중 하나를 선택해 세트를 완성하세요.",
    images: {
      main: {
        src: "/images/products/housewarming-set-01-reed.png",
        alt: "꽃 리드 디퓨저, 세이지·분홍 보자기 선물 포장, 황동 물고기 풍경으로 구성된 풍경 집들이 세트 옵션 A",
        caption: "OPTION A · 꽃 리드 디퓨저 + 황동 물고기 풍경 + 보자기 포장",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/housewarming-set-06-compare.png",
        alt: "꽃 리드 디퓨저 세트(좌)와 돌탑 스톤 디퓨저 세트(우) 나란히 비교한 연출 컷",
        caption: "DIFFUSER CHOICE · 선택한 디퓨저 1종만 세트에 포함됩니다",
        aspectRatio: "4/5",
      },
      lifestyle: {
        src: "/images/products/housewarming-set-05-reed-lifestyle.png",
        alt: "따뜻한 햇살 아래 유리병에 연꽃 장식 리드를 꽂는 모습과 보자기·황동 풍경",
        caption: "OPTION A RITUAL · 리드를 꽂아 공간을 은은한 향으로 채우는 시간",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/housewarming-set-04-stone-lifestyle.png",
          alt: "5단 다공성 돌탑 스톤 위에 스포이드로 향 오일을 떨어뜨리는 모습과 황동 물고기 풍경",
          caption: "01 OPTION B · 돌을 차곡히 쌓고 스포이드로 오일을 더하는 돌탑 스톤 디퓨저",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/housewarming-set-03-stone.png",
          alt: "돌탑 스톤 디퓨저, 세라믹 받침, 오일 10mL, 보자기, 황동 물고기 풍경 구성 컷",
          caption: "02 COMMON & PACK · 황동 물고기 풍경(약 20cm) · 선물 상자 · 보자기 공통 포함",
          aspectRatio: "1/1",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P05_housewarming_set.png",
    },
    includedItems: [
      "[공통] 황동 물고기 풍경 (걸이끈 포함 전체 길이 약 20cm) 1개",
      "[공통] 전용 선물 상자 · 세이지 배색 보자기 포장",
      "[선택 A] 꽃 리드 디퓨저 (향액 80mL · 연꽃 장식 리드 3개 · 기본 리드 2개)",
      "동봉 이야기 카드 1매",
    ],
    optionGroups: [
      {
        id: "diffuser-type",
        name: "디퓨저 타입 (택 1 필수)",
        choices: [
          {
            id: "flower-reed",
            label: "A. 꽃 리드 디퓨저",
            sublabel: "향액 80mL · 연꽃 장식 리드 3개 + 기본 리드 2개",
            priceDelta: 0,
            imageSrc: "/images/products/housewarming-set-01-reed.png",
            includedOverride: [
              "[공통] 황동 물고기 풍경 (전체 길이 약 20cm) 1개",
              "[공통] 전용 선물 상자 · 세이지 배색 보자기 포장",
              "[선택 A] 꽃 리드 디퓨저 (향액 80mL · 연꽃 장식 리드 3개 · 기본 리드 2개)",
              "동봉 이야기 카드 1매",
            ],
          },
          {
            id: "stone-tower",
            label: "B. 돌탑 스톤 디퓨저",
            sublabel: "다공성 스톤 5개 · 세라믹 받침(Ø10cm) · 스포이드 오일 10mL",
            priceDelta: 4000,
            imageSrc: "/images/products/housewarming-set-03-stone.png",
            includedOverride: [
              "[공통] 황동 물고기 풍경 (전체 길이 약 20cm) 1개",
              "[공통] 전용 선물 상자 · 세이지 배색 보자기 포장",
              "[선택 B] 돌탑 스톤 디퓨저 (다공성 스톤 5개 · 세라믹 받침 Ø10cm · 스포이드 향 오일 10mL)",
              "동봉 이야기 카드 1매",
            ],
          },
        ],
      },
      {
        id: "scent",
        name: "향 선택",
        choices: [
          {
            id: "woody",
            label: "우디 · 편백 & 베르가못",
            sublabel: "차분한 숲의 나무결과 맑은 시트러스 첫향",
            priceDelta: 0,
          },
          {
            id: "white-tea",
            label: "플로럴 · 화이트티 & 배",
            sublabel: "부드러운 차향과 산뜻한 과실의 여운",
            priceDelta: 0,
          },
          {
            id: "citrus",
            label: "시트러스 · 유자 & 허브",
            sublabel: "공간을 환기하는 가볍고 산뜻한 향",
            priceDelta: 0,
          },
        ],
      },
    ],
    ritualTitle: "새 공간을 소리와 향으로 환기하는 3분",
    ritualDefaultSeconds: 180,
    ritualPresets: [180],
    ritualSteps: [
      {
        step: "STEP 01",
        title: "현관이나 창가에 황동 풍경 걸기",
        description:
          "문이 열리거나 바람이 스칠 때 들리는 맑은 금속 울림이 공간의 공기를 환기합니다.",
      },
      {
        step: "STEP 02",
        title: "리드를 꽂거나, 돌을 차곡히 쌓고 오일 떨어뜨리기",
        description:
          "꽃 리드형은 리드 개수로 발향 세기를 맞추고, 돌탑형은 다섯 개의 돌을 균형 있게 쌓은 뒤 맨 위 돌에 오일 3~5방울을 천천히 떨어뜨립니다.",
      },
      {
        step: "STEP 03",
        title: "첫 향과 소리에 잠시 머무르기",
        description:
          "창문을 열어 공기를 바꾸고, 새 공간에 스며드는 향을 맡으며 평안한 시작을 맞이합니다.",
      },
    ],
    refill: {
      available: true,
      refillName: "디퓨저 리필 오일 · 리드 세트",
      refillPrice: 16000,
      unit: "꽃 리드용 리필액 100mL + 리드 5개 / 돌탑용 에센셜 오일 10mL 택 1",
      recommendedCycle: "약 6 ~ 8주 (공간 크기·리드 개수에 따라 상이)",
      compatibility: "집들이 세트 A(꽃 리드) · B(돌탑 스톤) 용기 및 스톤 100% 호환",
      refillIncluded: [
        "선택 타입 전용 리필 향액 (100mL) 또는 스포이드 향 오일 (10mL)",
        "교체용 기본 리드 스틱 5개 (꽃 리드형 선택 시)",
      ],
    },
    specs: [
      { label: "공통 구성", value: "황동 물고기 풍경 1개 · 선물 상자 · 세이지 배색 보자기" },
      { label: "선택 구성 A", value: "꽃 리드 디퓨저 — 향액 80mL · 연꽃 장식 리드 3개 · 기본 리드 2개" },
      { label: "선택 구성 B", value: "돌탑 스톤 디퓨저 — 다공성 스톤 5개 · 세라믹 받침(Ø 약 10cm) · 오일 10mL" },
      { label: "풍경 규격", value: "황동 소재 · 걸이끈 포함 전체 길이 약 20 cm" },
      { label: "리필 호환", value: "향액 100mL · 리드 스틱 · 스포이드 오일 10mL 추가 구매 가능" },
      { label: "안내 사항", value: "선택한 디퓨저 1종만 세트에 포함됩니다." },
    ],
    safetyNotices: [
      {
        title: "디퓨저 향액·오일 섭취 및 피부 접촉 주의",
        prevention: "방향 용도 외에 사용하지 말고, 화기 근처나 직사광선 아래에 두지 마세요. 피부·눈에 직접 닿지 않게 주의하고 가구 도장면에 흘리지 마세요.",
        action: "섭취 시 구토를 유도하지 말고 즉시 의료기관의 진료를 받으세요. 피부·눈 접촉 시 흐르는 물로 충분히 씻어 내세요.",
      },
      {
        title: "돌탑 스톤 삼킴 및 전도 주의 (어린이·반려동물)",
        prevention: "다공성 스톤과 유리병은 어린이와 반려동물의 손이 닿지 않는 안정적인 평면에 두세요. 5단 적층 시 흔들림이 없는 위치를 권장합니다.",
        action: "스톤을 입에 넣거나 삼켰을 경우 즉시 응급 처치 및 의료기관에 방문하세요.",
      },
    ],
    complianceNotice:
      "생활화학제품(방향제) 안전 표시 기준에 따라 주요 성분, 용도 및 취급 시 주의사항을 패키지 라벨에 상세히 표기하고 있습니다.",
    story: {
      summaryLabel: "이 오브제에 담긴 찰나의 이야기 펼쳐보기",
      motifKeyword: "깨어 있음 · 새 공간의 평안",
      headline: "바람의 소리와 돌 하나를 올리는 집중, 지금으로 돌아오는 집.",
      paragraphs: [
        "전통 사찰 처마 끝에 매달린 풍경의 물고기(풍탁)는 밤낮으로 눈을 감지 않는 모습에서 '늘 깨어 있음'의 상징으로 전해졌습니다. 문을 열 때마다 맑게 울리는 작은 소리가 분주한 바깥의 마음을 털고 지금 이 공간으로 돌아오는 신호가 되길 바랐습니다.",
        "함께 고를 수 있는 돌탑 스톤 디퓨저는 산길에서 작은 돌을 하나씩 쌓아 올리던 마음에서 착안했습니다. 손끝의 균형에 집중하며 향을 한 방울 더하는 짧은 동작이, 새로운 공간에서의 하루를 차분하게 열어줍니다.",
      ],
      deliveryChannels: "",
      sourceNote: "",
    },
  },

  // 06. 108장 잡념 노트
  {
    code: "P06",
    slug: "distress-note",
    name: "108장 잡념 노트",
    enName: "108 SHEETS DISTRESS NOTE",
    category: "tea-note",
    categoryLabel: "차·기록",
    oneLiner: "108장의 생각, 접으며 달라지는 마음.",
    basePrice: 14000,
    empathyHeadline: "머릿속을 맴도는 복잡한 생각들이 자꾸만 같은 자리를 맴돌 때.",
    empathyBody:
      "지워지지 않는 고민은 머릿속에 오래 둘수록 무거워집니다. A6 한 장에 떠오른 생각을 그대로 적고, 위에서 시원하게 뜯어낸 뒤, 뒷면의 점선을 따라 종이비행기로 접어 보세요. 구겨 버리는 대신 다른 모양으로 바꾸며 생각을 가볍게 내려놓는 루틴입니다.",
    editorialHeadline: "무광 검정 표지와 상단 나사 제본, 앞면은 기록·뒷면은 점선 종이접기 가이드.",
    editorialBody:
      "거친 손글씨 타이틀 'distress note'가 새겨진 무광 검정 표지에 상단 메탈 나사 2개로 108장의 아이보리 무코팅 내지(80g/㎡)를 묶었습니다. 앞면 상단에는 마음을 잠시 멈추게 하는 짧은 문장 한 줄이, 뒷면에는 종이비행기 점선 접기 가이드가 담겨 있습니다.",
    images: {
      main: {
        src: "/images/products/distress-note-01-main.png",
        alt: "무광 검정 표지와 상단 메탈 나사 2개, 화이트 손글씨 'distress note · 108 sheets'가 새겨진 108장 잡념 노트",
        caption: "108장 잡념 노트 — A6 무광 검정 표지 · 상단 메탈 나사 제본",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/distress-note-05-plane.png",
        alt: "뜯어낸 내지, 점선을 따라 반 접은 단계, 완성된 종이비행기 3단계 플랫레이",
        caption: "FOLD & LET GO · 적기 → 뜯기 → 점선 따라 종이비행기 접기",
        aspectRatio: "4/5",
      },
      lifestyle: {
        src: "/images/products/distress-note-02-write.png",
        alt: "108장 잡념 노트의 아이보리 내지 위에 펜으로 생각을 적는 모습",
        caption: "STEP 01 WRITE · A6 아이보리 무코팅 내지 108장",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/distress-note-03-tear.png",
          alt: "상단 절취선을 따라 한 장을 뜯어내며 뒷면의 점선 종이비행기 가이드가 드러나는 장면",
          caption: "01 TEAR · 상단 절취선으로 깔끔하게 뜯기고 드러나는 뒷면 점선 가이드",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/distress-note-04-fold.png",
          alt: "뜯어낸 노트를 두 손으로 점선에 맞춰 종이비행기로 접는 모습",
          caption: "02 FOLD · 적은 글자가 안쪽으로 감춰지며 완성되는 종이비행기",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P06_distress_note.png",
    },
    includedItems: [
      "108장 잡념 노트 본품 1권 (무광 검정 표지 · 상단 나사 2개 · A6 내지 108장)",
      "앞면 108편의 짧은 문장 · 뒷면 종이비행기 점선 접기 가이드 인쇄",
      "동봉 이야기 카드 1매",
    ],
    optionGroups: [
      {
        id: "note-type",
        name: "구성 선택",
        choices: [
          {
            id: "full-book",
            label: "본품 (표지 + 108장 내지)",
            sublabel: "무광 검정 나사 제본 커버 포함",
            priceDelta: 0,
            imageSrc: "/images/products/distress-note-01-main.png",
          },
          {
            id: "refill-pad",
            label: "리필 내지 (108장 교체용)",
            sublabel: "상단 나사를 풀어 바로 교체하는 리필 내지 108장",
            priceDelta: -5000,
            imageSrc: "/images/products/distress-note-05-plane.png",
            includedOverride: [
              "108장 잡념 노트 교체용 리필 내지 1묶음 (108장 · 상단 타공 및 절취선)",
              "뒷면 종이비행기 점선 가이드 인쇄",
            ],
          },
          {
            id: "book-plus-refill",
            label: "본품 + 리필 1팩 세트",
            sublabel: "총 216장 구성 (-1,000원 혜택)",
            priceDelta: 8000,
            imageSrc: "/images/products/distress-note-04-fold.png",
            includedOverride: [
              "108장 잡념 노트 본품 1권 (108장)",
              "교체용 리필 내지 1묶음 (108장)",
              "동봉 이야기 카드 1매",
            ],
          },
        ],
      },
    ],
    ritualTitle: "적고, 뜯고, 접어 보내는 3분",
    ritualDefaultSeconds: 180,
    ritualPresets: [180],
    ritualSteps: [
      {
        step: "STEP 01 · 적기",
        title: "지금 머릿속을 차지한 생각 꺼내 적기",
        description:
          "잘 쓰려고 애쓰지 않아도 됩니다. 앞면 상단의 짧은 문장을 한 번 읽고, 떠오른 고민이나 감정을 그대로 옮겨 적습니다.",
      },
      {
        step: "STEP 02 · 뜯기",
        title: "상단 절취선을 따라 한 장 뜯어내기",
        description:
          "기록이 끝나면 노트 위쪽의 절취선을 따라 천천히 뜯어내며 생각과 나의 거리를 만듭니다.",
      },
      {
        step: "STEP 03 · 접기",
        title: "뒷면 점선을 따라 종이비행기로 접기",
        description:
          "적은 글이 안쪽으로 숨겨지도록 뒷면 점선 가이드를 따라 접어, 생각을 새로운 형태로 바꾸어 내려놓습니다.",
      },
    ],
    refill: {
      available: true,
      refillName: "108장 잡념 노트 리필 내지 (108장)",
      refillPrice: 9000,
      unit: "1묶음 (A6 아이보리 무코팅 내지 108장)",
      recommendedCycle: "약 3 ~ 4개월 (하루 1장 기준)",
      compatibility: "본품 상단 메탈 나사 2개 규격과 100% 호환 (동전이나 드라이버로 간편 교체)",
      refillIncluded: [
        "A6 아이보리 무코팅 리필 내지 108장 (상단 타공·절취선 가공)",
        "앞면 108편의 짧은 문장 · 뒷면 종이비행기 점선 가이드",
      ],
    },
    specs: [
      { label: "구성품", value: "DISTRESS NOTE 본품 1권 (내지 108장) · 이야기 카드" },
      { label: "크기", value: "A6 (105 × 148 mm)" },
      { label: "표지 및 제본", value: "무광 검정 하드 표지 · 상단 메탈 나사 2개 · 상단 절취선" },
      { label: "내지", value: "아이보리 무코팅 종이 80 g/㎡ · 총 108장" },
      { label: "양면 구성", value: "앞면: 상단 짧은 문장 1편 + 기록 공간 / 뒷면: 종이비행기 점선 가이드" },
      { label: "사용 안내", value: "종이비행기는 실내에서 가볍게 즐기고 사용 후 회수해 주세요." },
    ],
    safetyNotices: [
      {
        title: "금속 나사 부품 및 종이 날림 주의",
        prevention: "리필 교체 시 분리한 상단 금속 나사를 어린이·반려동물이 삼키지 않도록 주의하세요.",
        action: "접은 종이비행기를 사람이나 눈을 향해 날리지 말고, 실내 사용 후 회수해 분리배출해 주세요.",
      },
    ],
    complianceNotice:
      "A6 무코팅 내지 108장으로 구성된 문구류입니다. 각 장의 문장은 출처가 확인된 고전 문구와 찰나 오리지널 문장으로 구성되어 있습니다.",
    story: {
      summaryLabel: "이 오브제에 담긴 찰나의 이야기 펼쳐보기",
      motifKeyword: "방하착 (放下着) · 108번뇌",
      headline: "손에 쥔 생각을 잠시 내려놓는 세 번의 동작.",
      paragraphs: [
        "불교의 '방하착(放下着)'은 단단히 붙잡고 있는 집착과 생각을 잠시 내려놓으라는 뜻입니다. 108장 잡념 노트는 108번뇌에서 착안한 108장의 종이 위에 생각을 적고, 뜯고, 접어 다른 모양으로 바꾸는 물리적 동작으로 내려놓음을 경험하게 합니다.",
        "108매듭 실팔찌와 같은 숫자를 공유하며, 장마다 실린 108편의 문장에는 오래된 경전과 선어의 지혜, 그리고 오늘의 언어로 풀어낸 짧은 문장을 담백하게 눌러 담았습니다.",
      ],
      deliveryChannels: "",
      sourceNote: "",
      sampleQuotes: [
        { text: "지금 붙잡고 있는 생각도 잠시 손에서 내려놓을 수 있습니다.", origin: "선어 '방하착(放下着)' 현대 풀이" },
        { text: "지나간 일은 이미 갔고, 오지 않은 일은 아직 오지 않았습니다.", origin: "초기 경전 '일야현자경' 취지" },
        { text: "구름이 지나가듯 마음의 소란도 머물다 흘러갑니다.", origin: "선가 비유 현대 풀이" },
      ],
    },
  },

  // 07. 잠깐 방석
  {
    code: "P07",
    slug: "petal-cushion",
    name: "잠깐 방석",
    enName: "PETAL QUILTED MEMORY FOAM CUSHION",
    category: "space",
    categoryLabel: "공간·휴식",
    oneLiner: "앉을 자리 하나, 나를 위한 찰나.",
    basePrice: 29000,
    empathyHeadline: "집 안에 돌아와도 온전히 나만을 위해 잠시 앉아 숨 돌릴 자리가 없을 때.",
    empathyBody:
      "침대에 눕기엔 이르고 책상 의자에 앉아 있긴 피곤한 저녁, 낮은 테이블 앞이나 창가 바닥에 꽃잎 모양의 방석 하나를 놓아보세요. 앉는 순간 부드럽게 몸을 받쳐 주는 메모리폼과 옆면 라벨의 QR로 3분·5분·10분 호흡 안내를 바로 열 수 있습니다.",
    editorialHeadline: "연잎을 닮은 방사형 누빔과 배색 파이핑, 천천히 복원되는 메모리폼.",
    editorialBody:
      "지름 약 40cm, 높이 약 10cm의 도톰한 원형 방석에 꽃잎 결을 닮은 퀼팅과 배색 테두리를 더했습니다. 부드러운 폴리에스터 겉감 안쪽을 밀도 높은 메모리폼(폴리우레탄)으로 채워 눌렀다 놓으면 천천히 원래 형태로 돌아옵니다.",
    images: {
      main: {
        src: "/images/products/petal-cushion-01-main.png",
        alt: "핑크, 옐로, 세이지 3가지 색상의 꽃잎 퀼팅 메모리폼 방석과 CHALNA QR 라벨",
        caption: "잠깐 방석 — 핑크 · 옐로 · 세이지 (CHALNA QR 라벨 부착)",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/petal-cushion-01-main.png",
        alt: "잠깐 방석 3색 전체 구성 컷",
        caption: "THREE COLORS · 세이지 · 옐로 · 핑크 배색 파이핑 디테일",
        aspectRatio: "1/1",
      },
      lifestyle: {
        src: "/images/products/petal-cushion-03-lifestyle.png",
        alt: "창가 러그 위에 놓인 세이지 꽃잎 퀼팅 방석을 손으로 부드럽게 눌러 메모리폼 탄성을 보여주는 컷",
        caption: "MEMORY FOAM · 눌렀다 놓으면 천천히 돌아오는 도톰한 쿠션감",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/petal-cushion-02-detail.png",
          alt: "방사형 꽃잎 누빔선과 배색 파이핑, CHALNA 직조 라벨 근접 컷",
          caption: "01 QUILTING · 잎맥을 닮은 방사형 누빔과 단정한 배색 파이핑",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/petal-cushion-03-lifestyle.png",
          alt: "낮은 공간에 두기 좋은 지름 40cm 높이 10cm 세이지 방석",
          caption: "02 QR RITUAL · 옆면 CHALNA QR 라벨로 여는 3·5·10분 호흡 안내",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P07_petal_cushion.png",
    },
    includedItems: [
      "꽃잎 퀼팅 메모리폼 방석 (지름 약 40cm × 높이 약 10cm) 1개",
      "옆면 CHALNA 직조 라벨 · 호흡 안내 및 이야기 페이지 연결 QR 라벨",
      "동봉 이야기 카드 1매",
    ],
    optionGroups: [
      {
        id: "cushion-color",
        name: "색상 선택",
        choices: [
          {
            id: "sage",
            label: "세이지 (연두)",
            sublabel: "세이지 겉감 + 연분홍 배색 파이핑",
            priceDelta: 0,
            swatchHex: "#9CAF98",
            imageSrc: "/images/products/petal-cushion-03-lifestyle.png",
          },
          {
            id: "yellow",
            label: "옐로 (버터 옐로)",
            sublabel: "버터 옐로 겉감 + 차콜 그레이 배색 파이핑",
            priceDelta: 0,
            swatchHex: "#E6D08E",
            imageSrc: "/images/products/petal-cushion-02-detail.png",
          },
          {
            id: "pink",
            label: "핑크 (연분홍)",
            sublabel: "연분홍 겉감 + 버건디 배색 파이핑",
            priceDelta: 0,
            swatchHex: "#D9A3AB",
            imageSrc: "/images/products/petal-cushion-01-main.png",
          },
        ],
      },
      {
        id: "cushion-pack",
        name: "수량 구성",
        choices: [
          {
            id: "single",
            label: "단품 (1개)",
            sublabel: "방석 1개 + QR 라벨 (3·5·10분 호흡 안내)",
            priceDelta: 0,
          },
          {
            id: "duo",
            label: "2개 묶음 구성",
            sublabel: "거실·티테이블용 2개 세트 (-4,000원 혜택)",
            priceDelta: 25000,
            includedOverride: [
              "꽃잎 퀼팅 메모리폼 방석 2개 (지름 약 40cm × 높이 약 10cm)",
              "CHALNA QR 라벨 (3·5·10분 호흡 안내 및 이야기 페이지 연결)",
              "동봉 이야기 카드 2매",
            ],
          },
        ],
      },
    ],
    ritualTitle: "앉는 순간 시작하는 3·5·10분 호흡",
    ritualDefaultSeconds: 180,
    ritualPresets: [180, 300, 600],
    ritualSteps: [
      {
        step: "STEP 01",
        title: "창가나 낮은 테이블 앞에 방석 놓기",
        description:
          "자주 머무는 공간 한편에 방석을 두고, 허리를 편안하게 세운 자세로 앉습니다.",
      },
      {
        step: "STEP 02",
        title: "옆면 QR 라벨로 3·5·10분 타이머 열기",
        description:
          "지금 나에게 필요한 시간(3분·5분·10분)을 선택하고 화면을 내려놓습니다.",
      },
      {
        step: "STEP 03",
        title: "몸의 무게와 숨결에 잠시 머무르기",
        description:
          "방석에 닿은 무게감과 코끝을 지나는 숨결을 느끼며 하루의 속도를 잠깐 늦춥니다.",
      },
    ],
    refill: {
      available: false,
      giftOrBundleTabLabel: "2개 묶음 구성",
      giftOrBundleTitle: "잠깐 방석 2개 묶음 세트",
      giftOrBundlePrice: 54000,
      giftOrBundleSummary:
        "낮은 테이블을 마주 보고 차를 마시거나 함께 쉬기 좋은 2개 묶음 구성입니다. (단품 2개 대비 4,000원 혜택)",
      giftOrBundleIncluded: [
        "꽃잎 퀼팅 메모리폼 방석 2개",
        "CHALNA QR 라벨 (3·5·10분 호흡 안내 공통 제공)",
        "동봉 이야기 카드 2매",
      ],
    },
    specs: [
      { label: "구성품", value: "방석 1개 · CHALNA QR 라벨 · 이야기 카드" },
      { label: "크기", value: "지름 약 40 cm · 높이 약 10 cm" },
      { label: "겉감 소재", value: "폴리에스터 100%" },
      { label: "충전재", value: "메모리폼 (폴리우레탄 폼)" },
      { label: "커버 세탁 여부", value: "커버 일체형(분리 불가) · 오염 부위 부분 세척 권장, 메모리폼 물세탁 금지" },
      { label: "QR 연계", value: "옆면 라벨 QR 스캔 시 3·5·10분 호흡 안내 및 이야기 페이지 연결" },
    ],
    safetyNotices: [
      {
        title: "메모리폼 세탁 및 화기 주의",
        prevention: "메모리폼은 물세탁·건조기 사용 시 변형될 수 있으므로 오염 부위만 중성세제로 가볍게 닦아 그늘에서 건조하세요. 난방기구·화기 가까이에 두지 마세요.",
        action: "커버가 젖었을 경우 마른 수건으로 물기를 눌러 제거한 뒤 통풍이 잘되는 곳에서 완전히 말려주세요.",
      },
    ],
    complianceNotice:
      "겉감(폴리에스터 100%)과 충전재(폴리우레탄 메모리폼) 일체형 방석입니다. 형태 유지를 위해 물세탁 대신 오염 부위 부분 세척을 권장합니다.",
    story: {
      summaryLabel: "이 오브제에 담긴 찰나의 이야기 펼쳐보기",
      motifKeyword: "좌선 (坐禪) · 알아차림의 자리",
      headline: "앉는 순간, 지금 이 자리로 돌아오는 잠깐의 멈춤.",
      paragraphs: [
        "잠깐 방석은 한 자리에 앉아 호흡과 마음을 고요히 살피는 좌선(坐禪)의 자리에서 영감을 얻었습니다. 거창한 수련이나 특별한 장소가 없어도, 내 방 바닥에 방석 하나를 펼치는 것만으로 충분한 쉼의 자리가 됩니다.",
        "옆면 라벨의 QR 코드는 지금 앉아 있는 몸의 감각과 호흡에 주의를 기울이는 '알아차림'의 시간을 3분·5분·10분으로 가볍게 열어줍니다.",
      ],
      deliveryChannels: "",
      sourceNote: "",
    },
  },

  // 08. 코끼리 말랑이
  {
    code: "P08",
    slug: "elephant-squishy",
    name: "코끼리 말랑이",
    enName: "WHITE ELEPHANT DESK SQUISHY",
    category: "mind-gift",
    categoryLabel: "마음·선물",
    oneLiner: "꾹 쥐었다면, 이제 잠깐 놓아주세요.",
    basePrice: 12000,
    empathyHeadline: "공부나 업무 중 긴장이 쌓여 어깨와 손끝에 힘이 들어갈 때.",
    empathyBody:
      "긴장된 순간엔 나도 모르게 주먹을 쥐거나 턱에 힘을 주게 됩니다. 책상 한편에 놓인 작은 흰 코끼리를 손바닥에 올려 꾹 눌렀다가 천천히 놓아보세요. 형태가 서서히 돌아오는 몇 초 동안 쥔 손의 긴장도 함께 풀립니다.",
    editorialHeadline: "하얀 얼굴과 두 손을 모은 다정한 인사, 천천히 복원되는 저반발 폼.",
    editorialBody:
      "약 8 × 6 × 9cm의 손바닥에 쏙 들어오는 크기로, 부드러운 다공성 저반발 폴리우레탄 폼을 적용했습니다. 발그레한 볼과 하늘색 옷, 두 손을 가지런히 모은 오리지널 캐릭터를 전용 캐릭터 종이 상자에 담아 전합니다.",
    images: {
      main: {
        src: "/images/products/elephant-squishy-01-main.png",
        alt: "하얀 얼굴과 큰 귀, 하늘색 옷을 입고 두 손을 모은 찰나 오리지널 코끼리 말랑이 정면",
        caption: "코끼리 말랑이 — 8 × 6 × 9 cm · 저반발 폴리우레탄 폼",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/elephant-squishy-01-main.png",
        alt: "코끼리 말랑이 전체 정면 구성 컷",
        caption: "DESK OBJECT · 14세 이상용 데스크 소품 · 캐릭터 종이 상자 포함",
        aspectRatio: "1/1",
      },
      lifestyle: {
        src: "/images/products/elephant-squishy-03-lifestyle.png",
        alt: "햇살 드는 책상 앞에서 손바닥 위에 올려둔 코끼리 말랑이",
        caption: "IN YOUR PALM · 공부하다 잠깐, 일하다 잠깐 손에 쥐는 휴식",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/elephant-squishy-02-detail.png",
          alt: "코끼리 말랑이의 부드러운 저반발 폼 질감과 발그레한 볼, 두 손을 모은 디테일",
          caption: "01 TEXTURE · 꾹 누르면 천천히 원래 모습으로 돌아오는 저반발 폼",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/elephant-squishy-03-lifestyle.png",
          alt: "한 손에 쏙 들어오는 크기감의 코끼리 말랑이 실사용 연출 컷",
          caption: "02 GREETING · 책상 한편에서 다정하게 인사를 건네는 작은 오브제",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P08_elephant_squishy.png",
    },
    includedItems: [
      "코끼리 말랑이 데스크 소품 (기본 하늘색 1종) 1개",
      "캐릭터 전용 종이 상자 1개",
      "동봉 이야기 카드 1매",
    ],
    optionGroups: [
      {
        id: "squishy-pack",
        name: "구성 선택",
        choices: [
          {
            id: "single",
            label: "단품 (기본 하늘색 1개)",
            sublabel: "코끼리 말랑이 1개 + 캐릭터 종이 상자",
            priceDelta: 0,
            swatchHex: "#69ACE5",
            imageSrc: "/images/products/elephant-squishy-01-main.png",
          },
          {
            id: "gift-duo",
            label: "2개 선물 구성",
            sublabel: "응원 선물용 2개 묶음 (-1,500원 혜택)",
            priceDelta: 10500,
            swatchHex: "#69ACE5",
            imageSrc: "/images/products/elephant-squishy-03-lifestyle.png",
            includedOverride: [
              "코끼리 말랑이 데스크 소품 (기본 하늘색) 2개",
              "캐릭터 전용 종이 상자 2개",
              "동봉 이야기 카드 2매",
            ],
          },
        ],
      },
    ],
    ritualTitle: "꾹 쥐었다가 천천히 놓는 3분",
    ritualDefaultSeconds: 180,
    ritualPresets: [180],
    ritualSteps: [
      {
        step: "STEP 01",
        title: "손바닥 위에 올리고 부드럽게 꾹 쥐기",
        description:
          "생각이 막히거나 긴장될 때 말랑이의 볼을 손끝으로 부드럽게 눌러 봅니다.",
      },
      {
        step: "STEP 02",
        title: "손의 힘을 풀며 돌아오는 모습 바라보기",
        description:
          "손을 펼치면 눌렸던 형태가 천천히 부풀어 오르는 몇 초 동안 숨을 길게 내쉽니다.",
      },
      {
        step: "STEP 03",
        title: "책상 한편에 다시 단정히 세워두기",
        description:
          "두 손을 모은 작은 인사를 마주하고, 가벼워진 손끝으로 다시 책상 앞 일상을 이어갑니다.",
      },
    ],
    refill: {
      available: false,
      giftOrBundleTabLabel: "2개 응원 선물 구성",
      giftOrBundleTitle: "코끼리 말랑이 2개 선물 구성",
      giftOrBundlePrice: 22500,
      giftOrBundleSummary:
        "시험·면접을 앞둔 친구나 동료의 책상에 작은 응원을 건네기 좋은 2개 묶음 구성입니다. (단품 2개 대비 1,500원 혜택)",
      giftOrBundleIncluded: [
        "코끼리 말랑이 2개",
        "캐릭터 전용 종이 상자 2개",
        "동봉 이야기 카드 2매",
      ],
    },
    specs: [
      { label: "구성품", value: "코끼리 말랑이 1개 · 캐릭터 종이 상자 1개 · 이야기 카드" },
      { label: "크기", value: "약 8 × 6 × 9 cm" },
      { label: "소재", value: "저반발 폴리우레탄(PU) 폼" },
      { label: "복원 특성", value: "손으로 부드럽게 눌렀다 놓으면 천천히 원형으로 복원" },
      { label: "사용 연령", value: "만 14세 이상용 데스크 소품 (어린이 완구 아님)" },
      { label: "색상", value: "기본 하늘색 1종 (찰나 오리지널 캐릭터)" },
    ],
    safetyNotices: [
      {
        title: "입에 넣기 및 14세 미만 사용 주의",
        prevention: "본 제품은 만 14세 이상을 위한 데스크 소품입니다. 절대 입에 넣거나 물지 마시고, 영유아 및 반려동물의 손이 닿지 않는 곳에 보관하세요.",
        action: "소재 일부를 삼킨 경우 즉시 의료기관의 진료를 받으세요.",
      },
      {
        title: "과도한 인장 및 찢어짐 주의",
        prevention: "귀·모자 등 돌출 부위를 강하게 잡아당기거나 날카로운 물건으로 긁지 마세요.",
        action: "표면이 찢어져 내부 폼이 노출된 경우 사용을 중단하고 폐기해 주세요.",
      },
    ],
    complianceNotice:
      "만 14세 이상을 위한 저반발 폴리우레탄 폼 데스크 소품입니다. 어린이 완구용이 아니므로 사용 연령과 주의사항을 반드시 확인해 주세요.",
    story: {
      summaryLabel: "이 오브제에 담긴 찰나의 이야기 펼쳐보기",
      motifKeyword: "흰 코끼리 · 무상과 방하착",
      headline: "책상 한편에서 건네는 작은 합장의 인사.",
      paragraphs: [
        "불교 설화 속에서 흰 코끼리는 평온과 길함을 상징하는 상서로운 존재로 등장합니다. 두 손을 가지런히 모은 합장의 자세에는 상대와 나 자신을 향한 다정한 존중의 인사를 담았습니다.",
        "말랑한 촉감을 꾹 눌렀다가 힘을 푸는 짧은 행동은 변하는 형태를 바라보는 '무상'과 쥔 힘을 놓는 '방하착'의 감각을 가장 친근하게 경험하도록 담았습니다.",
      ],
      deliveryChannels: "",
      sourceNote: "",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRefillProducts(): Product[] {
  return PRODUCTS.filter((p) => p.refill.available);
}

export function formatKRW(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}
