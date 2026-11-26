export type ProductCategory = "night" | "unload" | "warmth-air" | "keepsake";

export interface ProductImage {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: "4/5" | "1/1" | "4/3" | "3/4";
  replacePath?: string;
}

export interface OptionChoice {
  id: string;
  label: string;
  sublabel?: string;
  priceDelta: number;
  swatchHex?: string;
  imageSrc?: string;
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

export interface RefillTypeOption {
  id: string;
  label: string;
  spec: string;
  price: number;
}

export interface RefillScentOption {
  id: string;
  label: string;
  sublabel: string;
}

export interface RefillInfo {
  available: boolean;
  refillName?: string;
  refillPrice?: number;
  unit?: string;
  recommendedCycle?: string;
  compatibility?: string;
  refillIncluded?: string[];
  /** 디퓨저 리필처럼 타입·향 필수 선택이 필요한 경우 */
  requiredTypeOptions?: RefillTypeOption[];
  requiredScentOptions?: RefillScentOption[];
  /** 리필 불가 상품의 선물/묶음 탭 안내 */
  giftOrBundleTabLabel?: string;
  giftOrBundleTitle?: string;
  giftOrBundlePrice?: number;
  giftOrBundleSummary?: string;
  giftOrBundleIncluded?: string[];
}

export interface ProductStory {
  summaryLabel: string;
  motifKeyword: string;
  headline: string;
  paragraphs: string[];
  sampleQuotes?: { text: string; origin: string }[];
}

export interface Product {
  /** 내부 식별용 코드 (화면에 직접 렌더링하지 않음) */
  code: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  oneLiner: string;
  basePrice: number;
  /** 목록 카드 가격 문자열 커스텀 (예: 집들이 세트 '48,000원부터') */
  listPriceDisplay?: string;
  /** 목록 카드 보조 가격 안내 (예: '디퓨저 옵션별 가격 상이', '1개 기준') */
  listPriceSubNote?: string;
  /** 상세페이지 단가 기준 라벨 */
  unitLabel: string;
  /** 상세페이지 핵심 기능 중심 헤드라인 */
  detailHeadline: string;
  /** 핵심 특징 설명 (간결) */
  coreDescription: string;
  /** 사용 장면 섹션 헤드라인 & 설명 */
  sceneHeadline: string;
  sceneBody: string;
  /** 구성 안내 보조 강조 문구 (예: 팔찌 1개 구성 안내, 집들이 디퓨저 택1 안내) */
  compositionNotice?: string;
  /** 대표·구성·사용 장면·디테일 이미지 (최소 3장 이상) */
  images: {
    main: ProductImage;
    composition: ProductImage;
    lifestyle: ProductImage;
    details: ProductImage[];
    detailSheetPng: string;
  };
  includedItems: string[];
  optionGroups: OptionGroup[];
  /** 호흡 타이머 기본 펼침 여부 (잠깐, 방석만 true, 나머지 false) */
  timerOpenByDefault?: boolean;
  ritualTitle: string;
  ritualDefaultSeconds: number;
  ritualPresets?: number[];
  ritualSteps: RitualStep[];
  refill: RefillInfo;
  specs: SpecRow[];
  safetyNotices: SafetyNotice[];
  complianceNotice: string;
  story: ProductStory;
}

export const HOUSEWARMING_SCENTS: RefillScentOption[] = [
  {
    id: "woody",
    label: "우디 · 편백 & 베르가못",
    sublabel: "차분한 나무결과 맑은 시트러스 첫향",
  },
  {
    id: "white-tea",
    label: "플로럴 · 화이트티 & 배",
    sublabel: "부드러운 차향과 산뜻한 과실의 여운",
  },
  {
    id: "citrus",
    label: "시트러스 · 유자 & 허브",
    sublabel: "공간을 환기하는 가볍고 산뜻한 향",
  },
];

export const PRODUCTS: Product[] = [
  // 01. 연꽃 무드등 (머무는 밤)
  {
    code: "P01",
    slug: "lotus-lamp",
    name: "연꽃 무드등",
    category: "night",
    categoryLabel: "머무는 밤",
    oneLiner: "반투명 꽃잎 갓 사이로 따뜻한 빛이 퍼지는 USB-C 탁상 조명.",
    basePrice: 36000,
    unitLabel: "1개 기준",
    detailHeadline: "반투명 PC 꽃잎 갓과 세라믹 연잎 받침 조명",
    coreDescription:
      "오므라든 반투명 폴리카보네이트(PC) 꽃잎 갓과 초록빛 세라믹 연잎 받침으로 구성했습니다. USB-C 5V 케이블 스위치로 간편하게 켜고 끄며, 2700K 전구색 LED가 꽃잎을 통과해 눈부심 없이 은은하게 퍼집니다.",
    sceneHeadline: "침대 옆과 책상 한편, 켜고 끄는 동작으로 마무리하는 밤",
    sceneBody:
      "반투명 PC 소재 특유의 매끄럽고 균일한 투광감으로 낮에는 단정한 소품으로, 밤에는 따뜻한 간접등으로 사용합니다. USB-C 케이블의 인라인 스위치로 켜짐과 꺼짐을 바로 전환할 수 있습니다.",
    images: {
      main: {
        src: "/images/products/lotus-lamp-01-main.png",
        alt: "반투명 아이보리 PC 꽃잎 갓과 세라믹 연잎 받침으로 구성된 연꽃 무드등",
        caption: "연꽃 무드등 본체 · 반투명 PC 꽃잎 갓 · 세라믹 연잎 받침",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/lotus-lamp-01-main.png",
        alt: "연꽃 무드등 전체 구성",
        caption: "무드등 본체 · 세라믹 연잎 받침 · USB-C 케이블(스위치 포함)",
        aspectRatio: "1/1",
      },
      lifestyle: {
        src: "/images/products/lotus-lamp-03-lifestyle.png",
        alt: "선반 위에 켜진 연꽃 무드등 사용 장면",
        caption: "2700K 전구색 LED 점등 상태 · USB-C 5V 연결 사용",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/lotus-lamp-02-detail.png",
          alt: "반투명 PC 꽃잎 갓과 유광 세라믹 연잎 받침 근접 장면",
          caption: "반투명 PC 꽃잎 갓과 유광 세라믹 받침 마감",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/lotus-lamp-03-lifestyle.png",
          alt: "따뜻한 전구색 빛이 퍼지는 연꽃 무드등",
          caption: "케이블 스위치로 간편하게 켜고 끄는 USB-C 탁상 조명",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P01_lotus_lamp.png",
    },
    includedItems: [
      "연꽃 무드등 본체 (반투명 PC 꽃잎 갓 · 2700K LED 내장) 1개",
      "세라믹 연잎 받침 1개",
      "USB-C 전원 케이블 (켜짐·꺼짐 스위치 포함, 5V 어댑터 별도) 1개",
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
            sublabel: "따뜻한 전구색이 부드럽게 번지는 기본 톤",
            priceDelta: 0,
            swatchHex: "#F2E2C4",
            imageSrc: "/images/products/lotus-lamp-01-main.png",
          },
          {
            id: "soft-pink",
            label: "연분홍",
            sublabel: "은은한 분홍빛이 감도는 꽃잎 톤",
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
            sublabel: "패브릭 파우치 + 메시지 카드 추가",
            priceDelta: 4000,
            includedOverride: [
              "연꽃 무드등 본체 (반투명 PC 꽃잎 갓 · 2700K LED 내장) 1개",
              "세라믹 연잎 받침 1개",
              "USB-C 전원 케이블 (켜짐·꺼짐 스위치 포함, 5V 어댑터 별도) 1개",
              "선물용 패브릭 파우치 · 메시지 카드 · 동봉 이야기 카드",
            ],
          },
        ],
      },
    ],
    timerOpenByDefault: false,
    ritualTitle: "하루 끝, 불을 켜고 보내는 3분",
    ritualDefaultSeconds: 180,
    ritualPresets: [180, 300],
    ritualSteps: [
      {
        step: "01",
        title: "USB-C 케이블 연결 후 스위치 켜기",
        description:
          "5V 정격 어댑터에 USB-C 케이블을 연결하고 스위치를 눌러 2700K 전구색 불빛을 켭니다.",
      },
      {
        step: "02",
        title: "은은한 빛 아래에서 호흡 고르기",
        description:
          "주 조명을 끄고 반투명 PC 꽃잎 사이로 퍼지는 빛에 시선을 두며 천천히 숨을 고릅니다.",
      },
      {
        step: "03",
        title: "스위치를 끄며 하루 마무리하기",
        description:
          "잠들기 전 케이블 스위치를 눌러 불을 끄고 하루를 단정히 마무리합니다.",
      },
    ],
    refill: {
      available: false,
      giftOrBundleTabLabel: "선물 패키지 구성",
      giftOrBundleTitle: "연꽃 무드등 선물 패키지",
      giftOrBundlePrice: 40000,
      giftOrBundleSummary:
        "선물용 패브릭 파우치와 메시지 카드를 함께 구성해 바로 건넬 수 있습니다.",
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
      { label: "광원·전원", value: "2700K 전구색 LED · USB-C 5V · 케이블 켜짐/꺼짐 스위치" },
      { label: "별도 준비", value: "USB 5V 1A 정격 전원 어댑터 별도" },
      { label: "사용 환경", value: "실내 전용 (물기 없는 평평한 면에 거치)" },
    ],
    safetyNotices: [
      {
        title: "발열 및 장시간 연속 점등 주의",
        prevention: "이불·커튼 등 가연성 직물로 갓을 덮지 말고, 통풍이 되는 평평한 곳에 두세요.",
        action: "본체가 과도하게 뜨거워지거나 이상 냄새가 나면 즉시 USB 전원을 분리하고 사용을 중단하세요.",
      },
      {
        title: "전원(USB 5V) 및 물기 주의",
        prevention: "정격 5V 어댑터만 사용하며, 젖은 손으로 케이블이나 스위치를 만지지 마세요.",
        action: "액체가 닿았을 경우 전원을 즉시 뽑고 완전히 건조될 때까지 재연결하지 마세요.",
      },
    ],
    complianceNotice:
      "전기용품 안전 기준에 맞춘 USB 5V 저전압 LED 조명 사양입니다. 정격 5V 1A 어댑터 사용을 권장하며, 실내 건조한 공간에서 사용해 주세요.",
    story: {
      summaryLabel: "이 상품에 담긴 이야기 펼쳐보기",
      motifKeyword: "청정 (淸淨) · 연꽃",
      headline: "흐린 하루에도, 맑게 피어나는 자리.",
      paragraphs: [
        "진흙 속에서 자라면서도 물들지 않고 맑은 꽃을 피우는 연꽃은 오래전부터 고요한 마음의 상징으로 전해져 왔습니다.",
        "연꽃 무드등은 그 상징을 거창한 말 대신 하루 끝의 작은 불빛으로 옮겼습니다. 소란스러운 하루를 보낸 저녁에도 나만의 고요한 자리를 스스로 밝힐 수 있다는 조용한 위로를 담았습니다.",
      ],
    },
  },

  // 02. 108매듭 실팔찌 (곁에 두는 마음)
  {
    code: "P02",
    slug: "knot-bracelet",
    name: "108매듭 실팔찌",
    category: "keepsake",
    categoryLabel: "곁에 두는 마음",
    oneLiner: "가는 실 108매듭과 작은 원석 세 알, 길이 조절 데일리 팔찌.",
    basePrice: 18000,
    listPriceSubNote: "1개 기준",
    unitLabel: "1개 기준",
    detailHeadline: "108매듭 가는 실과 원석 3알, 길이 조절 팔찌",
    coreDescription:
      "일상복에 자연스럽게 어우러지는 1mm 왁스 코팅 매듭 실에 지름 약 4mm 원석 세 알을 배치했습니다. 색상 옵션 5종 중 원하는 1가지를 선택해 손목 둘레(약 14~20cm)에 맞춰 착용합니다.",
    sceneHeadline: "손목에 맞춰 당겨 조절하는 다섯 가지 차분한 색",
    sceneBody:
      "대표 이미지의 다섯 가지 색상 중 선택한 1개가 기본 구성으로 배송됩니다. 색상별로 원석 조합이 고정되어 있으며, 양쪽 끝 슬라이딩 매듭을 당겨 혼자서도 손쉽게 길이를 맞출 수 있습니다.",
    compositionNotice: "색상 옵션 5종 · 기본 구성 1개 (다섯 색 세트가 아닌 선택 색상 1개 기준 가격입니다)",
    images: {
      main: {
        src: "/images/products/knot-bracelet-01-main.png",
        alt: "버건디, 블랙, 포레스트 그린, 베이지, 브라운 5가지 색상 옵션의 108매듭 실팔찌",
        caption: "색상 옵션 5종 안내 · 기본 구성은 선택한 색상 1개입니다",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/knot-bracelet-01-main.png",
        alt: "108매듭 실팔찌 색상 옵션 5종 전체 비교",
        caption: "버건디 · 블랙 · 포레스트 그린 · 베이지 · 브라운 (택 1)",
        aspectRatio: "1/1",
      },
      lifestyle: {
        src: "/images/products/knot-bracelet-03-lifestyle.png",
        alt: "손목에 버건디 108매듭 실팔찌를 착용하고 슬라이딩 매듭으로 길이를 조절하는 장면",
        caption: "슬라이딩 매듭으로 손목 둘레 약 14~20cm 자유 조절",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/knot-bracelet-02-detail.png",
          alt: "108매듭의 촘촘한 짜임과 4mm 원석 3알, 마감 비즈 디테일",
          caption: "가는 왁스 코팅 매듭과 지름 약 4mm 원석 세 알 디테일",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/knot-bracelet-03-lifestyle.png",
          alt: "착용 시 손목 위에서 가볍게 어우러지는 실팔찌",
          caption: "가볍게 착용하고 당겨 맞추는 길이 조절 구조",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P02_108_knot_bracelet.png",
    },
    includedItems: [
      "108매듭 실팔찌 1개 (선택 색상 · 원석 3알 고정 조합)",
      "전용 종이 받침 카드 1매",
      "동봉 이야기 카드 1매",
    ],
    optionGroups: [
      {
        id: "cord-color",
        name: "색상 선택 (원석 조합 고정 · 1개 기준)",
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
            sublabel: "선택 색상 실팔찌 1개 + 종이 받침 카드",
            priceDelta: 0,
          },
          {
            id: "pair",
            label: "2개 묶음 세트",
            sublabel: "실팔찌 2개 구성 (-2,000원)",
            priceDelta: 16000,
            includedOverride: [
              "108매듭 실팔찌 2개 (개별 종이 받침 카드 2매)",
              "동봉 이야기 카드 2매",
            ],
          },
        ],
      },
    ],
    timerOpenByDefault: false,
    ritualTitle: "손목에 눈길이 닿을 때, 잠시 호흡 고르기",
    ritualDefaultSeconds: 180,
    ritualPresets: [180],
    ritualSteps: [
      {
        step: "01",
        title: "매듭을 넓혀 손목에 착용하기",
        description:
          "슬라이딩 매듭을 양쪽으로 넓혀 손목에 가볍게 걸칩니다.",
      },
      {
        step: "02",
        title: "손목 둘레에 맞게 당겨 조절하기",
        description:
          "끝 매듭을 천천히 당겨 약 14~20cm 사이에서 편안한 길이로 맞춥니다.",
      },
      {
        step: "03",
        title: "바쁜 오후, 원석 세 알을 짚으며 숨 고르기",
        description:
          "마음이 분주할 때 손목 위 원석을 천천히 느끼며 잠깐 호흡을 가다듬습니다.",
      },
    ],
    refill: {
      available: false,
      giftOrBundleTabLabel: "2개 묶음 구성",
      giftOrBundleTitle: "108매듭 실팔찌 2개 묶음 세트",
      giftOrBundlePrice: 34000,
      giftOrBundleSummary:
        "친구나 소중한 사람과 함께 착용하기 좋은 2개 묶음 구성입니다. (단품 2개 대비 2,000원 할인)",
      giftOrBundleIncluded: [
        "108매듭 실팔찌 2개",
        "개별 종이 받침 카드 2매",
        "동봉 이야기 카드 2매",
      ],
    },
    specs: [
      { label: "기본 구성", value: "색상 옵션 5종 중 선택 1개 · 종이 받침 카드 1매 · 이야기 카드" },
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
      summaryLabel: "이 상품에 담긴 이야기 펼쳐보기",
      motifKeyword: "108번뇌 · 마음 돌아보기",
      headline: "백여덟 번의 매듭, 잠시 나를 돌아보는 약속.",
      paragraphs: [
        "불교에서 숫자 108은 일상에서 수시로 일어나는 마음의 흔들림(108번뇌)을 뜻합니다. 큰 구슬의 전통 염주 대신, 매일 입는 옷과 자연스럽게 어우러지는 가는 매듭 실 안에 그 숫자를 조용히 담아냈습니다.",
        "108장 잡념 노트와 같은 숫자를 공유하는 이 팔찌는 무언가를 믿으라는 권유가 아니라, 손목에 눈길이 닿을 때마다 잠시 멈춰 지금 내 마음의 상태를 살펴보자는 작은 약속입니다.",
      ],
    },
  },

  // 03. 변색 연꽃 찻잔·티백 세트 (온기와 환기)
  {
    code: "P03",
    slug: "lotus-tea-set",
    name: "변색 연꽃 찻잔·티백 세트",
    category: "warmth-air",
    categoryLabel: "온기와 환기",
    oneLiner: "따뜻한 차를 따르면 분홍빛으로 변하는 연꽃 받침과 티백 12개.",
    basePrice: 34000,
    unitLabel: "1세트 기준",
    detailHeadline: "따뜻한 차를 따르면 분홍빛으로 변하는 연꽃 받침",
    coreDescription:
      "150mL 내열유리 찻잔, 온도에 반응하는 감온 변색 유리 연꽃 받침, 개별 포장 티백 12개(연잎차·유자 블렌드·캐모마일 각 4개)를 한 상자에 담았습니다. 차는 80~90℃에서 우리길 권장하며, 잔 아래로 온기(약 45℃ 이상)가 전해지면 투명하던 받침이 분홍빛으로 변합니다.",
    sceneHeadline: "실온의 투명한 받침에서 따뜻한 차의 분홍빛까지",
    sceneBody:
      "차를 따르기 전 실온에서는 맑고 투명한 유리 꽃잎 받침이지만, 따뜻한 차를 담으면 온기가 전해지며 분홍빛이 서서히 피어납니다. 차가 식어 가면 다시 원래의 투명한 빛으로 돌아갑니다.",
    compositionNotice: "티백 12개 구성: 연잎차 4개 · 유자 블렌드 4개 · 캐모마일 4개 (권장 음용 온도 80~90℃ / 받침 변색 기준 약 45℃ 이상)",
    images: {
      main: {
        src: "/images/products/lotus-tea-set-01-main.png",
        alt: "티백 12개입 선물 상자와 따뜻한 차가 담긴 투명 유리 찻잔, 분홍빛 연꽃 받침",
        caption: "내열유리 찻잔(150mL) · 감온 변색 연꽃 받침 · 티백 12개 · 선물 상자",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/lotus-tea-set-02-compare.png",
        alt: "실온의 투명한 연꽃 받침(좌)과 따뜻한 차를 담은 분홍빛 연꽃 받침(우) 비교",
        caption: "변색 전(실온 · 투명) vs 변색 후(따뜻한 차 · 분홍빛) 비교",
        aspectRatio: "4/5",
      },
      lifestyle: {
        src: "/images/products/lotus-tea-set-05-steeping.png",
        alt: "유리 찻잔에 티백을 우리는 사용 장면",
        caption: "연잎차 · 유자 블렌드 · 캐모마일 각 4개입 (총 12개)",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/lotus-tea-set-03-clear.png",
          alt: "변색 전 실온 상태의 투명한 유리 연꽃 받침",
          caption: "변색 전 · 실온 상태의 투명한 연꽃 받침",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/lotus-tea-set-04-pink.png",
          alt: "변색 후 따뜻한 차의 온기로 분홍빛이 나타난 유리 연꽃 받침",
          caption: "변색 후 · 약 45℃ 이상 온기 전달 시 분홍빛 발현",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P03_lotus_tea_set.png",
    },
    includedItems: [
      "내열유리 꽃잎 찻잔 (150mL) 1개",
      "감온 변색 유리 연꽃 받침 (지름 약 12cm) 1개",
      "개별 포장 티백 12개 (연잎차 4 · 유자 블렌드 4 · 캐모마일 4)",
      "선물 상자 1개 · 동봉 이야기 카드 1매",
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
              "선물 상자 1개 · 동봉 이야기 카드 1매",
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
    timerOpenByDefault: false,
    ritualTitle: "차를 우리며 온기를 바라보는 3분",
    ritualDefaultSeconds: 180,
    ritualPresets: [180, 300],
    ritualSteps: [
      {
        step: "01",
        title: "세 가지 티백 중 한 포 고르기",
        description:
          "연잎차, 유자 블렌드, 캐모마일 중 오늘 마시고 싶은 차를 골라 투명 유리 찻잔에 넣습니다.",
      },
      {
        step: "02",
        title: "80~90℃ 물 붓고 받침 색 변화 보기",
        description:
          "한 김 식힌 따뜻한 물(80~90℃)을 따르면 잔 아래 받침(약 45℃ 이상 반응)이 분홍빛으로 변합니다.",
      },
      {
        step: "03",
        title: "향과 온기를 느끼며 천천히 마시기",
        description:
          "차가 우러나는 2~3분 동안 향을 맡고, 식어 가며 투명해지는 받침을 보며 쉬어갑니다.",
      },
    ],
    refill: {
      available: true,
      refillName: "찰나 티백 리필 팩 (12개입)",
      refillPrice: 13000,
      unit: "12개입 (연잎차 4 · 유자 블렌드 4 · 캐모마일 4)",
      recommendedCycle: "약 2 ~ 4주 (주 3~5회 음용 기준)",
      compatibility: "변색 연꽃 찻잔·티백 세트 선물 상자 칸에 그대로 채워 사용할 수 있습니다.",
      refillIncluded: [
        "개별 포장 연잎차 티백 4개",
        "개별 포장 유자 블렌드 티백 4개",
        "개별 포장 캐모마일 티백 4개",
      ],
    },
    specs: [
      { label: "구성품", value: "내열유리 찻잔 1개 · 변색 유리 받침 1개 · 티백 12개 · 선물 상자" },
      { label: "용량·크기", value: "찻잔 150mL · 연꽃 받침 지름 약 12 cm" },
      { label: "소재", value: "내열유리 찻잔 · 감온 변색 코팅 유리 받침" },
      { label: "온도 안내", value: "권장 음용·우림 온도 80~90℃ / 받침 감온 변색 기준 약 45℃ 이상" },
      { label: "티백 구성", value: "연잎차 4개 · 유자 블렌드 4개 · 캐모마일 4개 (총 12개)" },
      { label: "세척·관리", value: "부드러운 스펀지 손세척 권장 · 전자레인지/식기세척기/직화 불가" },
    ],
    safetyNotices: [
      {
        title: "뜨거운 물 화상 및 급격한 온도 차 주의",
        prevention: "팔팔 끓는 물(100℃) 대신 한 김 식힌 따뜻한 물(80~90℃)을 사용하세요. 찻잔이 뜨거울 수 있으니 받침과 함께 잡으세요.",
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
      summaryLabel: "이 상품에 담긴 이야기 펼쳐보기",
      motifKeyword: "무상 (無常) · 알아차림",
      headline: "같은 꽃, 온기에 따라 달라지는 다른 빛.",
      paragraphs: [
        "불교의 '무상(無常)'은 모든 것이 한 모습에 영원히 머물지 않고 조건에 따라 끊임없이 변화한다는 뜻입니다. 변색 연꽃 찻잔은 차의 온기에 따라 투명에서 분홍으로, 그리고 식으며 다시 투명해지는 변화로 그 이치를 눈앞에 조용히 보여줍니다.",
        "티백을 우리는 3분 동안 향과 온도에 주의를 기울이는 시간은 지금 이 순간을 느끼는 '알아차림'의 연습이 됩니다. 차가 식기 전의 짧은 순간처럼, 지금의 감정 역시 머물다 흘러간다는 담백한 시선을 전합니다.",
      ],
    },
  },

  // 04. 연꽃 입체 편지지 (곁에 두는 마음)
  {
    code: "P04",
    slug: "lotus-letter",
    name: "연꽃 입체 편지지",
    category: "keepsake",
    categoryLabel: "곁에 두는 마음",
    oneLiner: "접으면 꽃봉오리, 펼치면 편지가 되는 무광 입체 편지지와 봉투.",
    basePrice: 8500,
    unitLabel: "1세트 기준",
    detailHeadline: "꽃봉오리로 접어 전하는 편지",
    coreDescription:
      "무광 160g/㎡ 고급지로 제작한 입체 편지지와 전용 봉투입니다. 꽃잎을 펼쳐 중앙 크림색 필기 영역에 마음을 적은 뒤, 접는 선을 따라 꽃봉오리로 모아 봉투에 담아 전합니다.",
    sceneHeadline: "펼치기 → 쓰기 → 접기, 전하는 순간까지 선물처럼",
    sceneBody:
      "펼쳤을 때 지름 약 16cm의 넉넉한 중앙 크림 면에 글을 적고, 안쪽 꽃잎부터 차례대로 접어 지름 약 7cm의 꽃봉오리로 완성합니다. 받는 이가 꽃잎을 열며 메시지를 마주하게 됩니다.",
    images: {
      main: {
        src: "/images/products/lotus-letter-01-main.png",
        alt: "접은 연꽃 봉오리 형태, 펼친 입체 편지지, 전용 봉투 구성",
        caption: "접은 꽃봉오리(Ø7cm) · 펼친 편지지(Ø16cm) · 전용 봉투(12×12cm)",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/lotus-letter-03-open.png",
        alt: "01 펼치기 — 완전히 펼쳐진 연꽃 입체 편지지의 중앙 크림색 필기 영역",
        caption: "01 펼치기 · 중앙 크림 필기 영역이 드러나는 펼친 형태",
        aspectRatio: "4/5",
      },
      lifestyle: {
        src: "/images/products/lotus-letter-04-writing.png",
        alt: "02 쓰기 — 펼친 연꽃 편지지 중앙 크림 면에 손글씨를 적는 장면",
        caption: "02 쓰기 · 가운데 크림 면에 마음을 적는 시간",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/lotus-letter-04-writing.png",
          alt: "편지지 중앙 필기 영역에 연필로 편지를 쓰는 장면",
          caption: "중앙 필기 영역 · 펼친 지름 약 16cm의 넉넉한 공간",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/lotus-letter-05-folding.png",
          alt: "03 접기 — 두 손으로 꽃잎을 안쪽으로 모아 꽃봉오리로 접는 장면",
          caption: "03 접기 · 접는 선을 따라 봉오리로 모아 전용 봉투에 보관",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P04_lotus_letter.png",
    },
    includedItems: [
      "연꽃 입체 편지지 (무광 160g/㎡) 1매",
      "입체형 전용 봉투 (약 12 × 12cm) 1매",
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
            sublabel: "편지지 3매 + 전용 봉투 3매",
            priceDelta: 13500,
            includedOverride: [
              "연꽃 입체 편지지 (무광 160g/㎡) 3매",
              "입체형 전용 봉투 (약 12 × 12cm) 3매",
              "3단계 접기 안내 · 동봉 이야기 미니 카드 3매",
            ],
          },
        ],
      },
    ],
    timerOpenByDefault: false,
    ritualTitle: "펼치고, 쓰고, 접는 짧은 시간",
    ritualDefaultSeconds: 180,
    ritualPresets: [180],
    ritualSteps: [
      {
        step: "01 펼치기",
        title: "꽃잎을 평평하게 펼치기",
        description:
          "편지지를 책상 위에 완전히 펼쳐 중앙 크림색 필기 영역이 온전히 드러나게 놓습니다.",
      },
      {
        step: "02 쓰기",
        title: "중앙 필기 영역에 마음 적기",
        description:
          "수능, 취업, 생일, 감사 등 건네고 싶은 말을 중앙 크림 면에 천천히 적습니다.",
      },
      {
        step: "03 접기",
        title: "접는 선을 따라 꽃봉오리로 접기",
        description:
          "안쪽 꽃잎부터 접는 선을 따라 천천히 모아 꽃봉오리로 접은 뒤 전용 봉투에 담습니다.",
      },
    ],
    refill: {
      available: true,
      refillName: "연꽃 입체 편지지 추가 팩 (3세트 묶음)",
      refillPrice: 22000,
      unit: "3세트 (편지지 3매 + 봉투 3매)",
      recommendedCycle: "기념일·계절 인사 등 수시 (약 2~3개월)",
      compatibility: "단품과 동일한 규격(펼친 지름 16cm · 봉투 12×12cm)으로 찰나 타 선물과도 함께 동봉할 수 있습니다.",
      refillIncluded: [
        "연꽃 입체 편지지 3매",
        "입체형 전용 봉투 3매",
        "동봉 이야기 미니 카드 3매",
      ],
    },
    specs: [
      { label: "구성품", value: "연꽃 입체 편지지 1매 · 입체형 봉투 1매 (3세트 묶음 선택 가능)" },
      { label: "편지지 크기", value: "펼친 지름 약 16 cm · 접은 지름 약 7 cm" },
      { label: "봉투 크기", value: "약 12 × 12 cm" },
      { label: "소재·평량", value: "무광 고급지 160 g/㎡" },
      { label: "사용 순서", value: "01 펼치기 → 02 중앙 필기 → 03 꽃봉오리 접기" },
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
      summaryLabel: "이 상품에 담긴 이야기 펼쳐보기",
      motifKeyword: "자비 (慈悲) · 상대의 평안을 바라는 마음",
      headline: "당신의 하루가 평안하기를 바라는 마음 한 송이.",
      paragraphs: [
        "불교에서 말하는 자비(慈悲)는 거창한 희생이 아니라, 곁에 있는 이가 기쁘고 평안하기를 바라는 따뜻한 마음에서 시작됩니다.",
        "연꽃 입체 편지지는 글을 쓰고 꽃잎을 하나씩 접어 올리는 시간, 그리고 받는 이가 꽃을 펼치며 문장을 발견하는 순간까지를 한 편의 인사로 엮었습니다. 말로 다 전하지 못한 다정함을 조용히 건네는 도구입니다.",
      ],
    },
  },

  // 05. 풍경 집들이 세트 (온기와 환기)
  {
    code: "P05",
    slug: "housewarming-set",
    name: "풍경 집들이 세트",
    category: "warmth-air",
    categoryLabel: "온기와 환기",
    oneLiner: "황동 물고기 풍경과 디퓨저 택1, 보자기 포장을 담은 집들이 선물.",
    basePrice: 48000,
    listPriceDisplay: "48,000원부터",
    listPriceSubNote: "디퓨저 옵션별 가격 상이",
    unitLabel: "1세트 기준",
    detailHeadline: "풍경 1개와 디퓨저 택1, 보자기 포장까지",
    coreDescription:
      "황동 물고기 풍경, 전용 선물 상자, 세이지 배색 보자기 포장은 공통으로 포함됩니다. 받는 분의 취향에 따라 꽃 리드형(48,000원)과 돌탑형(52,000원) 중 한 가지 디퓨저를 선택해 세트를 완성합니다.",
    sceneHeadline: "꽃을 꽂아 채우거나, 돌을 쌓아 오일을 떨어뜨리는 시간",
    sceneBody:
      "현관이나 창가에 황동 물고기 풍경을 걸어두고, 선택한 디퓨저로 공간의 첫 향을 채웁니다. 디퓨저는 두 종류 중 선택한 1종만 세트에 포함됩니다.",
    compositionNotice: "디퓨저는 두 종류 중 1개만 포함됩니다",
    images: {
      main: {
        src: "/images/products/housewarming-set-01-reed.png",
        alt: "꽃 리드형 디퓨저, 보자기 포장, 황동 물고기 풍경으로 구성된 풍경 집들이 세트",
        caption: "꽃 리드형 구성 · 황동 물고기 풍경 · 선물 상자 · 보자기",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/housewarming-set-06-compare.png",
        alt: "꽃 리드형 세트(좌)와 돌탑형 세트(우) 비교",
        caption: "디퓨저는 두 종류 중 1개만 포함됩니다 (좌: 꽃 리드형 48,000원 / 우: 돌탑형 52,000원)",
        aspectRatio: "4/5",
      },
      lifestyle: {
        src: "/images/products/housewarming-set-05-reed-lifestyle.png",
        alt: "유리병에 연꽃 장식 리드를 꽂는 꽃 리드형 사용 장면",
        caption: "꽃 리드형 · 리필액 100mL + 리드 5개 + 전용 용기",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/housewarming-set-04-stone-lifestyle.png",
          alt: "5단 다공성 스톤 위에 스포이드로 오일을 떨어뜨리는 돌탑형 사용 장면",
          caption: "돌탑형 · 스톤 5개 + 세라믹 받침 + 오일 10mL",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/housewarming-set-03-stone.png",
          alt: "돌탑형 디퓨저와 공통 구성(황동 풍경·보자기) 구성 컷",
          caption: "공통 구성 · 황동 물고기 풍경(약 20cm) · 선물 상자 · 보자기",
          aspectRatio: "1/1",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P05_housewarming_set.png",
    },
    includedItems: [
      "[선택] 꽃 리드형 디퓨저 (리필액 100mL + 리드 5개 + 전용 용기)",
      "[공통] 황동 물고기 풍경 (전체 길이 약 20cm) 1개",
      "[공통] 선물 상자 · 보자기",
      "[공통] 동봉 이야기 카드 1매",
    ],
    optionGroups: [
      {
        id: "diffuser-type",
        name: "디퓨저 선택 (택 1 필수)",
        choices: [
          {
            id: "flower-reed",
            label: "꽃 리드형",
            sublabel: "리필액 100mL + 리드 5개 + 전용 용기",
            priceDelta: 0,
            imageSrc: "/images/products/housewarming-set-01-reed.png",
            includedOverride: [
              "[선택] 꽃 리드형 디퓨저 (리필액 100mL + 리드 5개 + 전용 용기)",
              "[공통] 황동 물고기 풍경 (전체 길이 약 20cm) 1개",
              "[공통] 선물 상자 · 보자기",
              "[공통] 동봉 이야기 카드 1매",
            ],
          },
          {
            id: "stone-tower",
            label: "돌탑형",
            sublabel: "스톤 5개 + 세라믹 받침 + 오일 10mL",
            priceDelta: 4000,
            imageSrc: "/images/products/housewarming-set-03-stone.png",
            includedOverride: [
              "[선택] 돌탑형 디퓨저 (스톤 5개 + 세라믹 받침 + 오일 10mL)",
              "[공통] 황동 물고기 풍경 (전체 길이 약 20cm) 1개",
              "[공통] 선물 상자 · 보자기",
              "[공통] 동봉 이야기 카드 1매",
            ],
          },
        ],
      },
      {
        id: "scent",
        name: "향 선택",
        choices: HOUSEWARMING_SCENTS.map((s) => ({
          id: s.id,
          label: s.label,
          sublabel: s.sublabel,
          priceDelta: 0,
        })),
      },
    ],
    timerOpenByDefault: false,
    ritualTitle: "새 공간을 소리와 향으로 환기하는 3분",
    ritualDefaultSeconds: 180,
    ritualPresets: [180],
    ritualSteps: [
      {
        step: "01",
        title: "현관이나 창가에 황동 풍경 걸기",
        description:
          "문이 열리거나 바람이 스칠 때 들리는 맑은 울림이 공간의 공기를 환기합니다.",
      },
      {
        step: "02",
        title: "리드를 꽂거나 돌을 쌓고 오일 떨어뜨리기",
        description:
          "꽃 리드형은 용기에 리필액을 채우고 리드를 꽂으며, 돌탑형은 스톤 5개를 쌓은 뒤 맨 위 돌에 오일 3~5방울을 떨어뜨립니다.",
      },
      {
        step: "03",
        title: "첫 향과 소리에 잠시 머무르기",
        description:
          "창문을 열어 공기를 바꾸고, 새 공간에 퍼지는 향과 함께 하루를 시작합니다.",
      },
    ],
    refill: {
      available: true,
      refillName: "디퓨저 리필 오일 · 리드 세트",
      refillPrice: 16000,
      unit: "꽃 리드형(리필액 100mL + 리드 5개) / 돌탑형(스포이드 오일 10mL)",
      recommendedCycle: "약 6 ~ 8주 (공간 크기·리드 개수에 따라 상이)",
      compatibility: "집들이 세트 본품의 전용 용기 및 다공성 스톤에 그대로 사용할 수 있습니다.",
      refillIncluded: [
        "꽃 리드형 선택 시: 리필액 100mL + 리드 5개",
        "돌탑형 선택 시: 스포이드 오일 10mL",
      ],
      requiredTypeOptions: [
        {
          id: "flower-reed",
          label: "꽃 리드형",
          spec: "리필액 100mL + 리드 5개",
          price: 16000,
        },
        {
          id: "stone-tower",
          label: "돌탑형",
          spec: "스포이드 오일 10mL",
          price: 16000,
        },
      ],
      requiredScentOptions: HOUSEWARMING_SCENTS,
    },
    specs: [
      { label: "공통 구성", value: "황동 물고기 풍경 1개 · 선물 상자 · 보자기 · 이야기 카드" },
      { label: "선택 A (꽃 리드형)", value: "리필액 100mL + 리드 5개 + 전용 용기 (48,000원)" },
      { label: "선택 B (돌탑형)", value: "스톤 5개 + 세라믹 받침(Ø 약 10cm) + 오일 10mL (52,000원)" },
      { label: "풍경 규격", value: "황동 소재 · 걸이끈 포함 전체 길이 약 20 cm" },
      { label: "리필 안내", value: "꽃 리드형(리필액 100mL + 리드 5개) · 돌탑형(스포이드 오일 10mL) 별도 구매 가능" },
      { label: "포함 기준", value: "디퓨저는 두 종류 중 선택한 1개만 세트에 포함됩니다." },
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
      summaryLabel: "이 상품에 담긴 이야기 펼쳐보기",
      motifKeyword: "깨어 있음 · 새 공간의 평안",
      headline: "바람의 소리와 돌 하나를 올리는 집중, 지금으로 돌아오는 집.",
      paragraphs: [
        "전통 사찰 처마 끝에 매달린 풍경의 물고기(풍탁)는 밤낮으로 눈을 감지 않는 모습에서 '늘 깨어 있음'의 상징으로 전해졌습니다. 문을 열 때마다 맑게 울리는 작은 소리가 분주한 바깥의 마음을 털고 지금 이 공간으로 돌아오는 신호가 되길 바랐습니다.",
        "함께 고를 수 있는 돌탑형 디퓨저는 산길에서 작은 돌을 하나씩 쌓아 올리던 마음에서 착안했습니다. 손끝의 균형에 집중하며 향을 한 방울 더하는 짧은 동작이, 새로운 공간에서의 하루를 차분하게 열어줍니다.",
      ],
    },
  },

  // 06. 108장 잡념 노트 (덜어내는 기록)
  {
    code: "P06",
    slug: "distress-note",
    name: "108장 잡념 노트",
    category: "unload",
    categoryLabel: "덜어내는 기록",
    oneLiner: "생각을 적고 한 장 뜯어 뒷면 점선대로 접는 A6 108장 노트.",
    basePrice: 14000,
    unitLabel: "1권 기준",
    detailHeadline: "적고, 뜯고, 접는 108장",
    coreDescription:
      "무광 검정 표지와 상단 나사 2개로 묶은 A6 108장 노트입니다. 앞면 상단에는 불교 용어와 뜻을 쉽게 풀어 쓴 짧은 글이 인쇄되어 있고, 뒷면에는 점선 종이비행기 접기 가이드가 있어 적은 생각을 접어 내려놓을 수 있습니다.",
    sceneHeadline: "앞면은 짧은 글과 기록 공간, 뒷면은 점선 종이접기 가이드",
    sceneBody:
      "위쪽 절취선을 따라 한 장씩 깔끔하게 뜯어내면 뒷면의 점선 접기 가이드가 나타납니다. 다 쓴 뒤에는 상단 메탈 나사를 풀어 리필 108장 내지 묶음만 교체해 계속 사용할 수 있습니다.",
    compositionNotice: "앞면 상단: 불교 용어와 뜻을 쉽게 풀어 쓴 짧은 글 인쇄 · 뒷면: 종이비행기 점선 가이드 · 리필 108장 내지 묶음 별도 구매 가능",
    images: {
      main: {
        src: "/images/products/distress-note-01-main.png",
        alt: "무광 검정 표지와 상단 메탈 나사 2개가 달린 108장 잡념 노트",
        caption: "무광 검정 A6 표지 · 상단 나사 2개 · 아이보리 내지 108장",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/distress-note-05-plane.png",
        alt: "뜯어낸 내지, 반 접은 단계, 완성된 종이비행기 3단계 비교",
        caption: "적기 → 뜯기 → 뒷면 점선 가이드를 따라 종이비행기 접기",
        aspectRatio: "4/5",
      },
      lifestyle: {
        src: "/images/products/distress-note-02-write.png",
        alt: "108장 잡념 노트의 아이보리 내지 위에 펜으로 생각을 적는 장면",
        caption: "A6 아이보리 무코팅 내지 108장 (80g/㎡)",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/distress-note-03-tear.png",
          alt: "상단 절취선을 따라 한 장을 뜯으며 뒷면 점선 가이드가 드러나는 장면",
          caption: "상단 절취선으로 깔끔하게 뜯기고 드러나는 뒷면 점선 가이드",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/distress-note-04-fold.png",
          alt: "점선을 따라 종이비행기로 접어 적은 내용을 안쪽으로 감추는 장면",
          caption: "적은 글자가 안쪽으로 감춰지는 점선 종이비행기 접기",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P06_distress_note.png",
    },
    includedItems: [
      "108장 잡념 노트 본품 1권 (무광 검정 표지 · 상단 나사 2개 · A6 내지 108장)",
      "앞면 상단: 불교 용어와 뜻을 쉽게 풀어 쓴 짧은 글 인쇄",
      "뒷면: 종이비행기 점선 접기 가이드 인쇄",
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
            label: "리필 내지 (108장 묶음)",
            sublabel: "상단 나사를 풀어 교체하는 리필 108장 내지 묶음",
            priceDelta: -5000,
            imageSrc: "/images/products/distress-note-05-plane.png",
            includedOverride: [
              "교체용 리필 108장 내지 묶음 (A6 · 상단 타공 및 절취선)",
              "앞면 짧은 글 · 뒷면 종이비행기 점선 가이드 인쇄",
            ],
          },
          {
            id: "book-plus-refill",
            label: "본품 + 리필 1팩 세트",
            sublabel: "총 216장 구성 (-1,000원)",
            priceDelta: 8000,
            imageSrc: "/images/products/distress-note-04-fold.png",
            includedOverride: [
              "108장 잡념 노트 본품 1권 (108장)",
              "교체용 리필 108장 내지 묶음",
              "동봉 이야기 카드 1매",
            ],
          },
        ],
      },
    ],
    timerOpenByDefault: false,
    ritualTitle: "적고, 뜯고, 접는 3분",
    ritualDefaultSeconds: 180,
    ritualPresets: [180],
    ritualSteps: [
      {
        step: "01 적기",
        title: "지금 떠오른 생각을 그대로 적기",
        description:
          "앞면 상단의 짧은 글을 가볍게 읽고, 머릿속에 남은 생각이나 고민을 종이에 옮겨 적습니다.",
      },
      {
        step: "02 뜯기",
        title: "상단 절취선을 따라 한 장 뜯기",
        description:
          "기록을 마치면 위쪽 절취선을 따라 한 장을 깔끔하게 뜯어냅니다.",
      },
      {
        step: "03 접기",
        title: "뒷면 점선을 따라 종이비행기로 접기",
        description:
          "적은 글이 안쪽으로 감춰지도록 뒷면 점선 가이드를 따라 접어 내려놓습니다.",
      },
    ],
    refill: {
      available: true,
      refillName: "108장 잡념 노트 리필 내지 (108장 묶음)",
      refillPrice: 9000,
      unit: "1묶음 (A6 아이보리 무코팅 내지 108장)",
      recommendedCycle: "약 3 ~ 4개월 (하루 1장 기준)",
      compatibility: "본품 상단 메탈 나사 2개 규격에 맞게 나사를 풀어 간편하게 교체할 수 있습니다.",
      refillIncluded: [
        "A6 아이보리 무코팅 리필 108장 내지 묶음 (상단 타공·절취선)",
        "앞면 짧은 글 · 뒷면 종이비행기 점선 가이드 인쇄",
      ],
    },
    specs: [
      { label: "구성품", value: "잡념 노트 본품 1권 (내지 108장) · 이야기 카드" },
      { label: "크기", value: "A6 (105 × 148 mm)" },
      { label: "표지·제본", value: "무광 검정 하드 표지 · 상단 메탈 나사 2개 · 상단 절취선" },
      { label: "내지", value: "아이보리 무코팅 종이 80 g/㎡ · 총 108장 (리필 108장 묶음 별도 판매)" },
      { label: "양면 구성", value: "앞면: 상단 짧은 글 + 기록 공간 / 뒷면: 종이비행기 점선 접기 가이드" },
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
      summaryLabel: "이 상품에 담긴 이야기 펼쳐보기",
      motifKeyword: "방하착 (放下着) · 108번뇌",
      headline: "손에 쥔 생각을 잠시 내려놓는 세 번의 동작.",
      paragraphs: [
        "불교의 '방하착(放下着)'은 단단히 붙잡고 있는 집착과 생각을 잠시 내려놓으라는 뜻입니다. 108장 잡념 노트는 108번뇌에서 착안한 108장의 종이 위에 생각을 적고, 뜯고, 접어 다른 모양으로 바꾸는 물리적 동작으로 내려놓음을 경험하게 합니다.",
        "108매듭 실팔찌와 같은 숫자를 공유하며, 장마다 실린 108편의 짧은 글에는 오래된 경전과 선어의 지혜, 그리고 오늘의 언어로 풀어낸 문장을 담백하게 눌러 담았습니다.",
      ],
      sampleQuotes: [
        { text: "지금 붙잡고 있는 생각도 잠시 손에서 내려놓을 수 있습니다.", origin: "선어 '방하착(放下着)' 현대 풀이" },
        { text: "지나간 일은 이미 갔고, 오지 않은 일은 아직 오지 않았습니다.", origin: "초기 경전 '일야현자경' 취지" },
        { text: "구름이 지나가듯 마음의 소란도 머물다 흘러갑니다.", origin: "선가 비유 현대 풀이" },
      ],
    },
  },

  // 07. 잠깐, 방석 (머무는 밤)
  {
    code: "P07",
    slug: "petal-cushion",
    name: "잠깐, 방석",
    category: "night",
    categoryLabel: "머무는 밤",
    oneLiner: "꽃잎 누빔 메모리폼 방석과 옆면 QR 3·5·10분 호흡 안내.",
    basePrice: 29000,
    listPriceSubNote: "1개 기준",
    unitLabel: "1개 기준",
    detailHeadline: "꽃잎 누빔 메모리폼 방석과 QR 호흡 안내",
    coreDescription:
      "지름 약 40cm, 높이 약 10cm의 원형 방석에 꽃잎형 퀼팅과 배색 파이핑을 더했습니다. 속은 메모리폼(폴리우레탄)으로 채워 누르면 부드럽게 받쳐 주고 손을 떼면 천천히 원래 형태로 돌아옵니다.",
    sceneHeadline: "누르기 전의 도톰한 형태, 눌림, 그리고 천천히 돌아오는 메모리폼",
    sceneBody:
      "부드러운 폴리에스터 겉감과 메모리폼 충전재를 일체형으로 마감했습니다. 옆면 CHALNA QR 라벨로 3분·5분·10분 호흡 가이드를 바로 열어 잠시 앉아 숨을 고를 수 있습니다.",
    compositionNotice: "커버 일체형(분리 불가) · 오염 부위 부분 세척 권장 · 옆면 QR 라벨로 3·5·10분 호흡 안내 제공",
    images: {
      main: {
        src: "/images/products/petal-cushion-01-main.png",
        alt: "핑크, 옐로, 세이지 3가지 색상의 꽃잎 퀼팅 메모리폼 방석과 QR 라벨",
        caption: "색상 옵션 3종 (세이지 · 옐로 · 핑크) · 기본 구성 1개",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/petal-cushion-01-main.png",
        alt: "잠깐, 방석 3색 전체 구성",
        caption: "지름 약 40cm × 높이 약 10cm · CHALNA QR 라벨 부착",
        aspectRatio: "1/1",
      },
      lifestyle: {
        src: "/images/products/petal-cushion-03-lifestyle.png",
        alt: "세이지 방석을 손으로 눌러 메모리폼 눌림과 복원감을 보여주는 사용 장면",
        caption: "누르기 전 도톰한 형태 → 눌림 → 천천히 복원되는 메모리폼",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/petal-cushion-02-detail.png",
          alt: "방사형 꽃잎 퀼팅 누빔선과 배색 파이핑, 라벨 근접 장면",
          caption: "방사형 꽃잎 퀼팅과 배색 파이핑 · 커버 일체형 마감",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/petal-cushion-03-lifestyle.png",
          alt: "창가 러그 위에 놓인 세이지 메모리폼 방석",
          caption: "낮은 테이블 앞이나 창가 바닥에 두고 쉬어가는 자리",
          aspectRatio: "4/5",
        },
      ],
      detailSheetPng: "/images/detail-sheets/P07_petal_cushion.png",
    },
    includedItems: [
      "꽃잎 퀼팅 메모리폼 방석 1개 (지름 약 40cm × 높이 약 10cm)",
      "옆면 CHALNA 직조 라벨 · QR 호흡 안내 라벨",
      "동봉 이야기 카드 1매",
    ],
    optionGroups: [
      {
        id: "cushion-color",
        name: "색상 선택 (1개 기준)",
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
            sublabel: "방석 2개 세트 (-4,000원)",
            priceDelta: 25000,
            includedOverride: [
              "꽃잎 퀼팅 메모리폼 방석 2개 (지름 약 40cm × 높이 약 10cm)",
              "CHALNA QR 라벨 (3·5·10분 호흡 안내 연결)",
              "동봉 이야기 카드 2매",
            ],
          },
        ],
      },
    ],
    timerOpenByDefault: true,
    ritualTitle: "앉는 순간 시작하는 3·5·10분 호흡 안내",
    ritualDefaultSeconds: 180,
    ritualPresets: [180, 300, 600],
    ritualSteps: [
      {
        step: "01",
        title: "창가나 낮은 테이블 앞에 방석 놓기",
        description:
          "자주 머무는 공간 한편에 방석을 두고, 허리를 편안하게 세운 자세로 앉습니다.",
      },
      {
        step: "02",
        title: "옆면 QR로 3·5·10분 타이머 열기",
        description:
          "지금 필요한 시간(3분·5분·10분)을 선택하고 호흡 가이드를 시작합니다.",
      },
      {
        step: "03",
        title: "몸의 무게와 숨결에 잠시 머무르기",
        description:
          "메모리폼에 닿는 무게감과 코끝을 지나는 숨결을 느끼며 잠시 쉬어갑니다.",
      },
    ],
    refill: {
      available: false,
      giftOrBundleTabLabel: "2개 묶음 구성",
      giftOrBundleTitle: "잠깐, 방석 2개 묶음 세트",
      giftOrBundlePrice: 54000,
      giftOrBundleSummary:
        "낮은 테이블을 마주 보고 차를 마시거나 함께 앉아 쉬기 좋은 2개 묶음 구성입니다. (단품 2개 대비 4,000원 할인)",
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
      { label: "세탁·관리", value: "커버 일체형(분리 불가) · 오염 부위 부분 세척 권장, 메모리폼 물세탁 금지" },
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
      summaryLabel: "이 상품에 담긴 이야기 펼쳐보기",
      motifKeyword: "좌선 (坐禪) · 알아차림의 자리",
      headline: "앉는 순간, 지금 이 자리로 돌아오는 잠깐의 멈춤.",
      paragraphs: [
        "잠깐, 방석은 한 자리에 앉아 호흡과 마음을 고요히 살피는 좌선(坐禪)의 자리에서 영감을 얻었습니다. 거창한 수련이나 특별한 장소가 없어도, 내 방 바닥에 방석 하나를 펼치는 것만으로 충분한 쉼의 자리가 됩니다.",
        "옆면 라벨의 QR 코드는 지금 앉아 있는 몸의 감각과 호흡에 주의를 기울이는 '알아차림'의 시간을 3분·5분·10분으로 가볍게 열어줍니다.",
      ],
    },
  },

  // 08. 코끼리 말랑이 (덜어내는 기록)
  {
    code: "P08",
    slug: "elephant-squishy",
    name: "코끼리 말랑이",
    category: "unload",
    categoryLabel: "덜어내는 기록",
    oneLiner: "손으로 꾹 눌렀다 놓으면 천천히 돌아오는 저반발 데스크 소품.",
    basePrice: 12000,
    unitLabel: "1개 기준",
    detailHeadline: "꾹 눌렀다 놓으면 천천히 돌아오는 데스크 소품",
    coreDescription:
      "약 8 × 6 × 9cm의 손바닥에 들어오는 크기와 저반발 폴리우레탄(PU) 폼 소재로 제작했습니다. 원형에서 손끝으로 부드럽게 눌렀다가 힘을 풀면 천천히 본래 모양으로 복원됩니다.",
    sceneHeadline: "원형 → 눌림 → 복원, 책상 한편에서 손의 긴장을 푸는 촉감",
    sceneBody:
      "하얀 얼굴과 하늘색 옷, 두 손을 가지런히 모은 오리지널 캐릭터를 전용 종이 상자에 담았습니다. 만 14세 이상을 위한 데스크 소품으로, 공부나 업무 중 잠시 손에 쥐고 쉬어갈 수 있습니다.",
    compositionNotice: "만 14세 이상용 데스크 소품 · 저반발 폴리우레탄 폼 (원형 → 눌림 → 천천히 복원)",
    images: {
      main: {
        src: "/images/products/elephant-squishy-01-main.png",
        alt: "하얀 얼굴과 하늘색 옷, 두 손을 모은 코끼리 말랑이 정면 원형",
        caption: "원형 정면 · 약 8 × 6 × 9 cm · 저반발 폴리우레탄 폼",
        aspectRatio: "1/1",
      },
      composition: {
        src: "/images/products/elephant-squishy-01-main.png",
        alt: "코끼리 말랑이 전체 구성",
        caption: "코끼리 말랑이 1개 · 캐릭터 종이 상자 1개 (만 14세 이상)",
        aspectRatio: "1/1",
      },
      lifestyle: {
        src: "/images/products/elephant-squishy-03-lifestyle.png",
        alt: "손바닥 위에 올려둔 코끼리 말랑이 사용 장면",
        caption: "한 손에 쏙 들어오는 크기의 데스크 소품",
        aspectRatio: "4/5",
      },
      details: [
        {
          src: "/images/products/elephant-squishy-02-detail.png",
          alt: "코끼리 말랑이의 부드러운 저반발 폼 질감과 두 손을 모은 디테일",
          caption: "부드러운 저반발 PU 폼 질감 · 눌림 후 천천히 원래 형태로 복원",
          aspectRatio: "4/5",
        },
        {
          src: "/images/products/elephant-squishy-03-lifestyle.png",
          alt: "책상 앞에서 손에 올려둔 코끼리 말랑이",
          caption: "공부하거나 일하다 잠깐 손의 힘을 푸는 책상 위 소품",
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
            sublabel: "2개 묶음 (-1,500원)",
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
    timerOpenByDefault: false,
    ritualTitle: "꾹 쥐었다가 천천히 놓는 3분",
    ritualDefaultSeconds: 180,
    ritualPresets: [180],
    ritualSteps: [
      {
        step: "01",
        title: "손바닥 위에 올리고 부드럽게 꾹 누르기",
        description:
          "집중이 흐트러지거나 손에 힘이 들어갈 때 말랑이를 부드럽게 눌러 봅니다.",
      },
      {
        step: "02",
        title: "손의 힘을 풀고 천천히 복원되는 모습 보기",
        description:
          "손을 펼치면 눌렸던 형태가 서서히 원래 모양으로 돌아오는 동안 숨을 길게 내쉽니다.",
      },
      {
        step: "03",
        title: "책상 한편에 다시 단정히 세워두기",
        description:
          "가벼워진 손끝으로 다시 책상 앞 일상을 이어갑니다.",
      },
    ],
    refill: {
      available: false,
      giftOrBundleTabLabel: "2개 선물 구성",
      giftOrBundleTitle: "코끼리 말랑이 2개 선물 구성",
      giftOrBundlePrice: 22500,
      giftOrBundleSummary:
        "시험이나 면접을 앞둔 친구·동료에게 가볍게 건네기 좋은 2개 묶음 구성입니다. (단품 2개 대비 1,500원 할인)",
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
      { label: "복원 특성", value: "원형 → 손으로 부드럽게 눌림 → 힘을 풀면 천천히 원형으로 복원" },
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
      summaryLabel: "이 상품에 담긴 이야기 펼쳐보기",
      motifKeyword: "흰 코끼리 · 무상과 방하착",
      headline: "책상 한편에서 건네는 작은 합장의 인사.",
      paragraphs: [
        "불교 설화 속에서 흰 코끼리는 평온과 길함을 상징하는 상서로운 존재로 등장합니다. 두 손을 가지런히 모은 합장의 자세에는 상대와 나 자신을 향한 다정한 존중의 인사를 담았습니다.",
        "말랑한 촉감을 꾹 눌렀다가 힘을 푸는 짧은 행동은 변하는 형태를 바라보는 '무상'과 쥔 힘을 놓는 '방하착'의 감각을 가장 친근하게 경험하도록 담았습니다.",
      ],
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
