export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface Member {
  name: string;
  role: string;
  description: string;
  image?: string;
  career: string[];
}

export interface Client {
  name: string;
  logo?: string;
}

export const services: Service[] = [
  {
    slug: "bookkeeping",
    title: "기장",
    description: "체계적인 장부 기장 서비스로 정확한 재무 관리를 지원합니다.",
    icon: "📋",
    details: [
      "법인 및 개인사업자 장부 기장",
      "매월 재무제표 작성 및 보고",
      "부가가치세 신고 대행",
      "원천세 신고 대행",
    ],
  },
  {
    slug: "tax-advisory",
    title: "세무자문",
    description: "복잡한 세무 이슈에 대한 전문적인 자문 서비스를 제공합니다.",
    icon: "💼",
    details: [
      "법인세 절세 전략 수립",
      "양도소득세 자문",
      "상속·증여세 절세 플랜",
      "세무조사 대응",
    ],
  },
  {
    slug: "audit",
    title: "회계감사",
    description: "외부감사법에 따른 법정 감사 및 임의 감사를 수행합니다.",
    icon: "🔍",
    details: [
      "법정 외부감사",
      "임의감사 및 합의감사",
      "내부회계관리제도 검토",
      "비영리법인 감사",
    ],
  },
  {
    slug: "consulting",
    title: "경영자문",
    description: "기업의 성장과 안정을 위한 맞춤형 경영자문을 제공합니다.",
    icon: "📊",
    details: [
      "사업 타당성 분석",
      "경영 효율화 컨설팅",
      "내부통제 시스템 구축",
      "자금 조달 자문",
    ],
  },
  {
    slug: "valuation",
    title: "가치평가",
    description: "기업 및 자산의 공정가치 평가를 수행합니다.",
    icon: "📈",
    details: [
      "비상장주식 가치평가",
      "세법상 주식평가",
      "M&A 실사 및 가치평가",
      "무형자산 가치평가",
    ],
  },
  {
    slug: "tax-filing",
    title: "세무신고",
    description: "각종 세금 신고를 정확하고 신속하게 처리합니다.",
    icon: "📝",
    details: [
      "법인세 신고",
      "종합소득세 신고",
      "부가가치세 신고",
      "양도소득세 신고",
    ],
  },
];

export const members: Member[] = [
  {
    name: "홍길동",
    role: "대표 공인회계사",
    description: "20년 이상의 회계·세무 경력을 바탕으로 최고의 전문 서비스를 제공합니다.",
    career: [
      "공인회계사 (KICPA)",
      "前 삼일회계법인 근무",
      "前 국세청 세무조사국",
      "서울대학교 경영학과 졸업",
    ],
  },
  {
    name: "김철수",
    role: "공인회계사 / 세무사",
    description: "세무자문 및 기업 컨설팅 전문가로서 고객의 성장을 함께합니다.",
    career: [
      "공인회계사 (KICPA)",
      "세무사",
      "前 안진회계법인 근무",
      "고려대학교 회계학과 졸업",
    ],
  },
  {
    name: "이영희",
    role: "공인회계사",
    description: "회계감사 및 내부통제 분야의 전문 역량을 보유하고 있습니다.",
    career: [
      "공인회계사 (KICPA)",
      "前 EY한영 근무",
      "IFRS 전문가",
      "연세대학교 경영학과 졸업",
    ],
  },
];

export const clients: Client[] = [
  { name: "테크스타트업 A사" },
  { name: "제조업체 B사" },
  { name: "유통기업 C사" },
  { name: "IT서비스 D사" },
  { name: "바이오기업 E사" },
  { name: "건설사 F사" },
  { name: "금융기관 G사" },
  { name: "스타트업 H사" },
];
