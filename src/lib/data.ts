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
  placeholder?: boolean;
}

export interface Persona {
  slug: string;
  title: string;
  englishLabel: string;
  description: string;
  needs: string[];
  fitServices: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export const services: Service[] = [
  {
    slug: "valuation",
    title: "기업가치평가",
    description:
      "M&A, 투자 유치, 상속·증여 등 다양한 목적의 비상장기업 및 자산 가치평가를 수행합니다. Big4 가치평가본부(VME) 경력을 바탕으로, 거래·세무 양 측면에서 모두 방어 가능한 평가 보고서를 제공합니다.",
    icon: "scale",
    details: [
      "비상장주식 공정가치 평가 (DCF · 시장접근법 · 자산접근법)",
      "세법상 주식 · 자산 평가 (상속세 및 증여세법, 법인세법)",
      "무형자산 가치평가 (영업권, 특허권, 브랜드 등)",
      "스톡옵션 · 전환사채 등 주식연계증권 공정가치 평가",
      "합병 · 분할 시 합병비율 및 분할가액 산정 지원",
      "감정평가법인 · 회계법인 평가 보고서 검토 자문",
    ],
  },
  {
    slug: "ma-advisory",
    title: "M&A 자문",
    description:
      "Big4 감사 + 증권사 IB 양쪽 경험을 결합한 시각으로 M&A 거래 전 과정을 자문합니다. 단순 실사가 아닌, 거래 구조와 협상 포인트까지 함께 고민하는 자문을 제공합니다.",
    icon: "handshake",
    details: [
      "재무 실사 (Financial Due Diligence) 수행 및 리포트",
      "거래가격 협상 지원 (Quality of Earnings, Net Debt 분석)",
      "거래 구조 설계 자문 (주식 양수도 · 영업양수도 · 합병)",
      "Sell-side 매각 자문 (셀러용 자료 작성, 바이어 대응)",
      "Buy-side 인수 자문 (타겟 발굴 검토부터 PMI까지)",
      "Earn-out · 진술 및 보장 조항 재무 검토",
    ],
  },
  {
    slug: "ipo-readiness",
    title: "IPO 준비 자문",
    description:
      "상장을 준비하는 기업이 사전에 점검해야 할 회계·내부통제 이슈를 식별하고 정리합니다. 본격적인 지정감사 전 단계에서 리스크를 줄이는 것이 핵심입니다.",
    icon: "trending",
    details: [
      "상장 적격성 사전 진단 (재무 · 비재무 항목)",
      "K-IFRS 전환 준비 및 회계정책 정비",
      "내부회계관리제도 설계 · 운영 가이드",
      "지정감사 대응 전략 수립",
      "주관사 · 거래소 실사 대응 지원",
      "Pre-IPO 단계 가치평가 및 자본구조 설계",
    ],
  },
  {
    slug: "financial-modeling",
    title: "재무 모델링 · 사업계획",
    description:
      "투자 유치, 자금 조달, 의사결정 시뮬레이션을 위한 재무 모델을 직접 설계합니다. 발표용 슬라이드가 아닌, 실제 의사결정에 쓸 수 있는 살아 있는 모델을 만들어드립니다.",
    icon: "chart",
    details: [
      "투자 유치용 사업계획서 (Business Plan) 작성 자문",
      "5개년 재무 전망 모델 (P&L · BS · CF) 구축",
      "민감도 · 시나리오 분석 (Best · Base · Worst)",
      "자금 조달 전략 수립 (Equity · Debt · 보증)",
      "프로젝트 타당성 분석 (Feasibility Study)",
      "KPI · 단위경제 (Unit Economics) 모델링",
    ],
  },
  {
    slug: "tax-advisory",
    title: "세무 · 자산 자문",
    description:
      "사업가와 자산가의 의사결정 단계에서 발생하는 세무 쟁점을 사전에 검토하고 절세 방향을 제안합니다. 실제 신고는 동성회계법인을 통해 정식으로 수행됩니다.",
    icon: "shield",
    details: [
      "법인세 · 소득세 절세 전략 사전 검토",
      "양도소득세 · 상속세 · 증여세 시뮬레이션",
      "가업승계 · 지배구조 개편 세무 플래닝",
      "특수관계자 거래 · 부당행위계산 부인 리스크 검토",
      "세무조사 사전 대비 자문",
      "법정 신고 · 감사 업무 연결 (동성회계법인 협업)",
    ],
  },
];

export const members: Member[] = [
  {
    name: "박민상",
    role: "Founder & Principal · 공인회계사",
    description:
      "삼정회계법인 감사본부, NH투자증권 IB, 한영회계법인 가치평가본부(VME)를 두루 거치며 감사 · 자본시장 · 기업가치평가 전 영역에서 실무를 쌓았습니다. 회계법인과 증권사를 아우르는 융합형 경험을 바탕으로, 스타트업 · 사업가 · 자산가의 재무 의사결정에 가장 가까이 있는 자문가가 되고자 메리디안 어드바이저리를 시작했습니다.",
    career: [
      "공인회계사 (KICPA, 2017년 합격)",
      "現 동성회계법인 / 메리디안 어드바이저리 Founder",
      "前 한영회계법인 VME (Valuation, Modeling & Economics Services) (2023.09 ~ 2025.09)",
      "前 NH투자증권 IB1사업부 Heavy Industry부 (2021.11 ~ 2023.08)",
      "前 삼정회계법인 정보통신사업1본부 감사팀 (2017.09 ~ 2021.11)",
      "성균관대학교 경영학과 졸업",
      "한국공인회계사회 기본 실무 연수 최우수 수료 · 삼정회계법인 종합평가 전국 수석",
    ],
  },
  {
    name: "함께하실 분을 모십니다",
    role: "Advisor (TBD)",
    description:
      "메리디안 어드바이저리는 회계 · 세무 · 자본시장 · 가치평가 분야에서 함께 일할 동료 공인회계사 · 세무사 · 자문 전문가를 찾고 있습니다. 1인 자문이 아닌, 신뢰할 수 있는 동료들과의 협업을 통해 고객의 의사결정에 더 깊이 관여하고자 합니다.",
    career: [
      "회계 · 세무 · 가치평가 · 자본시장 백그라운드 환영",
      "관심 있으신 분은 Contact 페이지로 연락 부탁드립니다",
    ],
    placeholder: true,
  },
];

export const personas: Persona[] = [
  {
    slug: "startups",
    title: "스타트업 / 창업가",
    englishLabel: "Startups & Founders",
    description:
      "초기 단계부터 시리즈 후속 라운드, IPO 준비까지. 투자자 앞에서 설명할 수 있는 숫자와, 실제 의사결정에 쓸 수 있는 모델이 모두 필요한 분들을 위한 자문입니다.",
    needs: [
      "투자 유치를 위한 가치평가 · 사업계획서",
      "5개년 재무 모델과 시나리오 분석",
      "스톡옵션 · 전환사채 설계 및 회계 처리",
      "Pre-IPO 회계 · 내부통제 사전 정리",
      "M&A · Exit 시 셀러측 자문",
    ],
    fitServices: ["valuation", "financial-modeling", "ipo-readiness", "ma-advisory"],
  },
  {
    slug: "owners",
    title: "사업가 / 오너",
    englishLabel: "Business Owners",
    description:
      "성장기를 지나 안정기에 접어든 비상장 법인의 오너분들을 위한 자문입니다. 회사의 가치, 가업 승계, 지배구조 정리, 절세 전략을 함께 설계합니다.",
    needs: [
      "비상장 주식 가치평가 (세법 · 공정가치)",
      "가업 승계 및 지분 이전 시나리오",
      "지주회사 전환 · 지배구조 개편 검토",
      "특수관계자 거래 리스크 사전 점검",
      "M&A · 매각 시 거래 구조 자문",
    ],
    fitServices: ["valuation", "tax-advisory", "ma-advisory"],
  },
  {
    slug: "investors",
    title: "개인 자산가",
    englishLabel: "Private Investors",
    description:
      "보유 자산의 구조, 양도 · 상속 · 증여 단계에서 발생하는 세무 쟁점을 미리 검토하고 싶은 분들을 위한 자문입니다. 단발성 신고가 아닌, 자산 전체를 두고 보는 관점에서 함께 설계합니다.",
    needs: [
      "양도소득세 · 상속세 · 증여세 사전 시뮬레이션",
      "비상장 주식 평가 (상증세법 기준)",
      "자산 보유 구조 (개인 · 법인) 비교 검토",
      "스타트업 · 비상장 투자 의사결정 자문",
      "세무조사 대비 자문",
    ],
    fitServices: ["tax-advisory", "valuation"],
  },
];

export const stats: Stat[] = [
  { value: "Big4", label: "삼정 · 한영 감사 + VME 경력" },
  { value: "IB", label: "NH투자증권 IB 본부 경력" },
  { value: "KICPA", label: "공인회계사 (2017)" },
  { value: "1:1", label: "Founder 직접 자문" },
];
