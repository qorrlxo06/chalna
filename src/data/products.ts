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

export interface StoryMedia {
  type: "image" | "video";
  src: string;
  caption?: string;
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
  /** 스토리 전용 이미지·영상 조건부 슬롯 (값이 있을 때만 렌더링, 현재 비워둠) */
  storyMedia?: StoryMedia;
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
      motifKeyword: "처염상정 (處染常淨) · 연등 공양",
      headline: "진흙 속에서 가장 맑게 피어나는 꽃, 하루 끝에 스스로 켜는 작은 등불.",
      paragraphs: [
        "연꽃은 수정처럼 맑은 시냇물이 아니라, 오히려 탁하고 깊은 진흙 연못에서 가장 크고 단단한 꽃을 피워냅니다. 불교에서는 이 모습을 '처염상정(處染常淨)'이라 부르며, 탁한 세상(오탁악세) 한가운데서 살아가면서도 본래의 맑은 마음을 잃지 않는 사람의 모습에 빗대어 왔습니다. 흥미로운 점은 진흙을 부정하거나 없애려 하지 않는다는 것입니다. 고단하고 복잡한 현실의 흙이 있어야 비로소 맑은 꽃이 자라날 뿌리를 내릴 수 있다는 따뜻한 통찰이 담겨 있습니다.",
        "여기에 불교의 오래된 전통인 '연등(등불 공양)'의 이야기가 겹쳐집니다. 경전 속 '빈자일등(貧者一燈)' 설화에서, 왕이 수천 개의 화려한 기름등을 켜 올렸지만 밤바람에 모두 꺼져 버린 반면, 가난한 여인 난타가 온 마음을 모아 정성껏 밝힌 작은 등불 하나만큼은 새벽까지 꺼지지 않고 어둠을 지켰다고 전해집니다. 불빛의 크기가 아니라, 지금 내 마음을 밝히겠다는 고요한 정성이 어둠을 이긴다는 뜻입니다.",
        "연꽃 무드등은 이 두 가지 오래된 상징을 하루 끝의 작은 스위치 동작으로 옮겨 놓았습니다. 반투명 꽃잎 사이로 2700K의 따뜻한 전구색 빛이 천천히 퍼질 때, 소란스러웠던 낮의 먼지는 방 한편으로 가라앉습니다.",
        "거창한 의식이 아니어도 괜찮습니다. 오늘 하루가 다소 흐렸더라도, 침대 옆에서 불을 켜고 끄는 짧은 찰나만큼은 누구에게도 물들지 않는 나만의 고요한 자리를 스스로 밝혀 보길 바랐습니다.",
      ],
    },
    storyMedia: undefined,
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
      motifKeyword: "백팔번뇌 (百八煩惱) · 마음의 닻",
      headline: "왜 하필 108일까 — 수천 년 전부터 헤아려 온 마음의 흔들림.",
      paragraphs: [
        "불교에서 자주 등장하는 숫자 '108'은 사실 무척 정교한 마음의 계산법에서 비롯되었습니다. 인간에게는 눈·귀·코·혀·몸·뜻이라는 여섯 감각 기관(육근, 六根)이 있고, 이 감각이 바깥의 여섯 대상(색·소리·향기·맛·촉감·생각, 육진)을 만날 때마다 '좋다·싫다·그저 그렇다'는 세 가지 반응이 일어납니다(6 × 3 = 18).",
        "여기에 그 마음이 즐겁고 괴로운 두 갈래의 집착으로 번지면 36가지가 되고, 이 모든 흔들림이 지나간 과거·지금의 현재·아직 오지 않은 미래라는 삼세(三世)에 걸쳐 반복된다고 보아 36 × 3 = 108가지, 곧 '백팔번뇌(百八煩惱)'라는 숫자가 완성됩니다. 수천 년 전 사람들이 인간의 걱정을 108가지 경우의 수로 쪼개어 헤아렸다는 사실은, 흔들리는 마음이 결코 나 혼자만의 결함이 아니라는 묘한 안도감을 줍니다.",
        "전통적으로는 이 108개의 번뇌를 하나씩 알아차리며 넘기기 위해 108염주를 손에 쥐었습니다. 108매듭 실팔찌는 무거운 나무 구슬 대신, 매일 입는 셔츠나 니트 소매 아래 자연스럽게 스며드는 가는 실 위에 백여덟 번의 매듭을 촘촘히 엮고, 균형을 잡아 주는 작은 원석 세 알을 얹었습니다.",
        "회의가 길어지거나 지하철 안에서 생각이 끝없이 꼬리를 물 때, 손목 위 작은 원석과 매듭에 시선이 닿는 그 한순간이 흩어진 마음을 지금 여기로 붙잡아 주는 가벼운 닻이 되어 줍니다.",
      ],
    },
    storyMedia: undefined,
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
      motifKeyword: "무상 (無常) · 알아차림 (Sati)",
      headline: "머물지 않고 변하기에 피어나는 빛, 지금 한 모금에 깨어 있는 시간.",
      paragraphs: [
        "불교의 핵심 가르침인 '무상(無常)'을 흔히 쓸쓸하거나 허무한 말로 오해하곤 하지만, 본래 뜻은 전혀 다릅니다. 세상의 모든 것은 조건이 만나 생겨나고 조건이 바뀌면 자연스레 모습을 바꾼다는 이치입니다. 영원히 고정된 것이 없기에, 꽉 막혀 보이는 오늘의 답답함 역시 결코 영원히 머물지 않고 흘러가며 새로워질 수 있다는 희망의 언어이기도 합니다.",
        "변색 연꽃 찻잔은 바로 이 무상의 풍경을 눈앞의 작은 식탁 위로 불러왔습니다. 실온에서는 맑고 투명한 유리 꽃잎이었던 받침이, 따뜻한 찻물의 온기(약 45℃ 이상)를 만나는 순간 서서히 분홍빛으로 물듭니다. 그리고 시간이 지나 차가 식어 가면 연꽃은 미련 없이 다시 원래의 투명한 빛으로 돌아갑니다. 같은 꽃이지만 조건에 따라 매 순간 다른 얼굴을 보여 주는 셈입니다.",
        "옛 선승들이 제자에게 차를 권하며 건넸던 유명한 한마디가 있습니다. '차 한 잔 마시고 가게(끽다거, 喫茶去).' 거창한 철학보다, 지금 손에 쥔 찻잔의 온기와 코끝에 번지는 연잎·유자·캐모마일의 향기, 목을 넘어가는 따뜻한 감각에 온전히 깨어 있는 것—그것이 바로 초기 불교 수행의 핵심인 '알아차림(사티, Sati)'입니다.",
        "스마트폰을 잠시 엎어 두고 티백이 우러나는 3분 동안 잔 아래로 번지는 분홍빛을 바라보는 일. 변하고 흘러가는 온기 속에서 지금 이 순간을 온전히 맛보는 가장 다정한 휴식입니다.",
      ],
    },
    storyMedia: undefined,
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
      motifKeyword: "자비 (慈悲) · 염화미소 (拈華微笑)",
      headline: "말보다 먼저 통하는 꽃 한 송이, 당신의 평안을 바라는 접힘과 펼침.",
      paragraphs: [
        "불교에서 가장 널리 알려진 단어 '자비(慈悲)'는 사실 두 가지 따뜻한 마음이 만나 이루어진 말입니다. 상대방에게 기쁨과 평안을 건네고 싶은 마음인 '자(慈, 자애)'와, 상대방이 겪는 아픔과 무거움을 함께 덜어 주고 싶은 마음인 '비(悲, 연민)'. 거창한 희생이 아니라, 소중한 이의 안부를 진심으로 묻는 가장 가까운 다정함에서 자비는 시작됩니다.",
        "여기에는 불교 사상 가장 아름다운 장면으로 꼽히는 '염화미소(拈華微笑)'의 설화가 맞닿아 있습니다. 어느 날 영축산에서 수많은 제자들이 모인 가운데, 부처님이 긴 설법 대신 말없이 연꽃 한 송이를 들어 보였습니다. 모두가 의아해하던 그 고요한 순간, 제자 마하가섭 존자만이 조용히 미소로 화답했고, 부처님은 말로 다 담을 수 없는 마음이 오롯이 전해졌음을 기뻐하셨습니다.",
        "연꽃 입체 편지지는 그 말없는 교감의 순간을 종이 한 장의 움직임으로 옮겼습니다. 편지지를 완전히 펼쳐 중앙의 크림 면에 마음을 적은 뒤, 안쪽 꽃잎부터 한 장씩 접어 꽃봉오리를 완성하는 시간에는 보내는 이의 정성이 고스란히 스며듭니다.",
        "그리고 봉투에서 꺼낸 작은 꽃봉오리를 받는 이가 손끝으로 천천히 펼쳐 올리는 찰나, 꽃잎이 열리며 글자가 모습을 드러냅니다. 길게 설명하지 않아도 마음이 닿는, 오늘날의 작은 염화미소입니다.",
      ],
    },
    storyMedia: undefined,
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
      motifKeyword: "물고기 풍경 (정진) · 돌탑 공덕 · 향 공양",
      headline: "늘 깨어 있는 물고기, 균형을 쌓는 돌탑, 새 공간을 정돈하는 첫 향기.",
      paragraphs: [
        "오래된 사찰의 처마 끝에 매달린 풍경(풍탁)을 자세히 올려다보면, 대부분 맑은 종 아래에 작은 물고기 모양이 달려 있습니다. 왜 하필 물고기였을까요? 물고기는 눈꺼풀이 없어 잠을 잘 때조차 눈을 감지 않는다고 믿었기 때문입니다. 바람이 불어 물고기가 흔들리며 맑은 쇳소리를 낼 때마다, 수행자들은 습관적인 멍함과 게으름에서 깨어나 지금 이 순간으로 돌아오라는 '정진(精進)'의 신호로 들었습니다.",
        "함께 고를 수 있는 돌탑형 디퓨저에는 산길 어귀마다 돌 하나를 얹어 작은 탑을 쌓던 오래된 풍경이 담겨 있습니다. 불교에서 탑을 쌓는 행위는 큰 소원을 억지로 빌기보다, 작은 돌 하나의 무게중심을 맞추는 그 짧은 순간에 온 마음을 모으는 공덕과 집중의 연습이었습니다. 다섯 개의 다공성 스톤을 차분히 포개어 올리는 손끝의 균형이 새로운 공간의 첫 리듬을 잡아 줍니다.",
        "여기에 공간을 맑히고 마음을 차분히 가라앉히는 전통 '향 공양(香供養)'의 의미를 현대의 디퓨저로 풀어냈습니다. 예로부터 향은 보이지 않는 공기를 부드럽게 바꾸어 머무는 이의 마음을 단정히 정돈해 주는 매개였습니다.",
        "현관문이 열릴 때 울리는 황동 물고기의 청아한 소리, 그리고 꽃 리드나 돌탑 위로 은은하게 번지는 첫 향기. 누군가의 새로운 출발을 축하할 때, 그 집이 오래도록 깨어 있고 평안하길 바라는 가장 정갈한 축복을 보자기 안에 담았습니다.",
      ],
    },
    storyMedia: undefined,
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
      motifKeyword: "방하착 (放下着) · 108번뇌 · 조주 선사 일화",
      headline: "아무것도 없다면 그것마저 내려놓아라 — 적고, 뜯고, 접어 보내는 방하착.",
      paragraphs: [
        "선불교 역사상 가장 유쾌하면서도 날카로운 문답 가운데 '방하착(放下着, 내려놓아라)'의 일화가 있습니다. 어느 날 엄양 선사가 스승 조주 선사를 찾아가 물었습니다. '한 물건도 가져오지 않았을 때는 어찌해야 합니까?' 조주 선사가 곧바로 답했습니다. '내려놓아라(방하착)!' 엄양 선사가 당황해 되물었습니다. '이미 한 물건도 없는데 도대체 무엇을 내려놓으라는 말씀입니까?' 그러자 조주 선사가 한마디를 툭 던졌습니다. '그렇다면 지고 가거라!'",
        "우리가 괴로운 이유는 실제로 무거운 짐을 들어서만이 아니라, '나는 괜찮아', '이 생각만은 꼭 붙잡아야 해'라며 머릿속의 생각조차 꼭 쥐고 놓지 않기 때문입니다. 108장 잡념 노트는 108가지 마음의 소란(백팔번뇌)을 머릿속에서 맴돌게 두는 대신, 종이 위에 꺼내어 눈으로 직접 바라보게 합니다.",
        "장마다 앞면 상단에는 오래된 경전과 선어의 지혜를 오늘의 언어로 담백하게 풀어낸 108편의 짧은 글을 실었습니다. 그 아래 여백에 지금 마음을 무겁게 하는 생각을 솔직하게 적어 내려간 뒤, 상단 절취선을 따라 종이를 뜯어내면 뒷면의 종이비행기 점선 가이드가 나타납니다.",
        "적어 둔 문장이 종이 안쪽으로 감춰지도록 점선을 따라 접어 올리는 물리적인 손동작은, 말로만 '잊어야지' 되뇌는 것보다 훨씬 선명한 마침표가 되어 줍니다. 쥐고 있던 생각을 다른 모양으로 바꾸어 가볍게 놓아 보내는 나만의 방하착 의식입니다.",
      ],
      sampleQuotes: [
        { text: "지금 붙잡고 있는 생각도 잠시 손에서 내려놓을 수 있습니다.", origin: "선어 '방하착(放下着)' 현대 풀이" },
        { text: "지나간 일은 이미 갔고, 오지 않은 일은 아직 오지 않았습니다.", origin: "초기 경전 '일야현자경' 취지" },
        { text: "구름이 지나가듯 마음의 소란도 머물다 흘러갑니다.", origin: "선가 비유 현대 풀이" },
      ],
    },
    storyMedia: undefined,
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
      motifKeyword: "좌선 (坐禪) · 지관 (止觀) · 일상의 작은 법당",
      headline: "깊은 산속 선방이 아니어도 — 방석 하나를 펼치는 순간 열리는 나만의 쉼터.",
      paragraphs: [
        "오랜 세월 수행자들은 한 자리에 고요히 앉아 허리를 세우는 '좌선(坐禪)'을 통해 마음의 중심을 길러 왔습니다. 불교에서는 이 앉음의 과정을 흔히 '지관(止觀)'이라는 두 글자로 설명합니다. 바깥을 향해 쉬지 않고 달려가던 마음을 잠시 멈추어 고요히 가라앉히는 것이 '지(止)'이고, 그렇게 잦아든 고요 속에서 지금 나의 숨결과 마음의 움직임을 있는 그대로 맑게 비추어 보는 것이 '관(觀)'입니다.",
        "흙탕물이 담긴 유리컵을 억지로 흔들어 맑게 만들 수 없듯, 컵을 탁자 위에 가만히 내려놓아야 비로소 흙이 가라앉고 맑은 물이 드러납니다. 좌선과 지관은 무언가 대단한 경지를 억지로 끌어올리는 일이 아니라, 분주하게 흔들리던 마음의 컵을 잠시 바닥에 내려놓는 가장 정직한 휴식법이었습니다.",
        "'잠깐, 방석'은 치열한 산중 선방의 좌복을 현대인의 원룸 바닥과 창가, 낮은 테이블 앞으로 부드럽게 옮겨 놓았습니다. 몸의 무게를 천천히 받아내는 메모리폼과 연꽃잎처럼 방사형으로 뻗은 퀼팅은, 특별한 장소로 떠나지 않아도 지금 이 방 한 뼘이 곧 나만의 작은 법당이자 쉼의 자리가 될 수 있음을 말해 줍니다.",
        "방석 옆면에 달린 CHALNA QR 라벨을 열면 3분·5분·10분 호흡 타이머로 바로 이어집니다. 앉는 순간부터 일어나는 순간까지, 잠깐 멈추고(止) 숨을 바라보는(觀) 가장 가벼운 일상 수행을 시작해 보세요.",
      ],
    },
    storyMedia: undefined,
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
      motifKeyword: "흰 코끼리 (백상) · 합장 (合掌) · 무상과 방하착",
      headline: "지혜의 흰 코끼리가 두 손을 모은 이유 — 꾹 눌렸다 돌아오는 유쾌한 위로.",
      paragraphs: [
        "불교의 탄생 설화에는 잊히지 않는 신비로운 꿈 이야기가 전해집니다. 부처님의 어머니 마야부인이 여섯 개의 상아를 가진 눈부신 '흰 코끼리(백상, 白象)'가 옆구리로 들어오는 태몽을 꾸고 붓다를 잉태했다는 이야기입니다. 고대 인도에서 흰 코끼리는 어지러운 상황에서도 결코 당황하거나 흔들리지 않는 단단한 지혜, 그리고 곁에 두는 것만으로 복과 평온을 부르는 상서로움의 상징이었습니다.",
        "코끼리 말랑이가 두 손을 가슴 앞에 가지런히 모으고 있는 자세는 불교의 인사인 '합장(合掌)'에서 왔습니다. 합장은 단순히 공손한 예절을 넘어, 흩어져 있던 열 손가락을 하나로 모아 마음을 집중하고 '당신 안에도 나와 똑같이 존귀한 마음이 깃들어 있다'며 서로를 깊이 존중하는 따뜻한 인사입니다. 바쁜 책상 위에서 이 작은 코끼리는 모니터 너머로 지친 나를 향해 늘 조용히 인사를 건네고 있습니다.",
        "손바닥에 올려 꾹 눌렀을 때 부드럽게 모양이 바뀌었다가, 힘을 풀면 천천히 본래의 동그란 모습으로 되돌아오는 저반발 촉감에도 숨은 은유가 있습니다. 고정되지 않고 변화하는 '무상(無常)'의 유연함과, 꽉 쥐었던 손의 긴장을 스르르 푸는 '방하착(放下着)'의 감각을 말 대신 손끝으로 체험하게 한 것입니다.",
        "시험이나 마감 앞에서 어깨가 잔뜩 굳어 있을 때, 책상 한편의 흰 코끼리를 한 번 꾹 쥐었다가 천천히 놓아 보세요. 눌렸던 형태가 제자리로 돌아오는 몇 초 동안, 팽팽했던 하루의 긴장도 함께 느슨해집니다.",
      ],
    },
    storyMedia: undefined,
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
