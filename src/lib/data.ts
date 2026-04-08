export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  deliverables: string[]; // 클라이언트가 받는 결과물 (보고서 · 모델 · 신고서 등)
  applicableScenarios: string[]; // 어떤 상황에 적용되는가
  regulations?: string[]; // 관련 법령 · 규정 (적용 가능 시)
}

export interface Member {
  name: string;
  role: string;
  description: string;
  image?: string;
  credentials?: string[]; // 학력 · 자격 · 수상 (위쪽)
  practiceAreas?: string[]; // 전문 영역 — 실제 specialization
  experience: string[]; // 직장 (아래쪽, 날짜 없음)
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

export const services: Service[] = [
  {
    slug: "tax-bookkeeping",
    title: "세무 기장",
    description:
      "법인 및 개인사업자의 일상 회계 처리부터 정기 신고까지 책임지고 관리합니다. 단순 입력 대행이 아니라, 매월 숫자를 함께 읽고 의사결정에 도움이 되는 시사점을 같이 정리합니다.",
    icon: "ledger",
    details: [
      "법인 · 개인사업자 복식부기 장부 작성 및 관리",
      "매월 시산표 · 재무제표 작성 및 경영진 보고",
      "부가가치세 (예정 · 확정) 신고 대행",
      "원천징수세 계산 및 신고 대행",
      "4대 보험 취득 · 상실 신고 지원",
      "전자세금계산서 발행 관리 및 검증",
    ],
    deliverables: [
      "매월 시산표 · 재무제표 (요약 + 상세)",
      "부가가치세 신고서 · 납부 안내",
      "원천세 신고서 · 지급명세서",
      "4대 보험 신고 결과 보고",
      "월간 경영진 미팅 또는 메일 리포트",
    ],
    applicableScenarios: [
      "신규 법인 설립 후 첫 회계 셋업",
      "기존 기장을 다른 채널에서 이관받는 경우",
      "외감대상 진입 직전 · 직후 회계 정비",
      "부가세 신고 누락 · 정정이 필요한 상황",
      "본업에 집중하기 위해 일상 회계 처리를 외부화하려는 경우",
    ],
    regulations: [
      "법인세법 제112조 (장부의 비치 · 기록)",
      "부가가치세법 제48조 · 제49조 (예정 · 확정신고)",
      "소득세법 제160조 (장부의 비치 · 기록)",
      "근로기준법 · 4대 보험 관련 규정",
    ],
  },
  {
    slug: "tax-adjustment",
    title: "세무 조정",
    description:
      "법인세 · 소득세 신고를 위한 세무조정계산서를 정밀하게 작성합니다. 익금 · 손금 항목 검토부터 이월결손금 · 세액공제 · 감면 활용까지, 신고 전 단계에서 절세 여지를 모두 검토합니다.",
    icon: "calculator",
    details: [
      "법인세 세무조정 (중소기업 · 외감 대상 · 일반법인)",
      "종합소득세 세무조정 (사업소득 · 임대소득 · 금융소득 등)",
      "익금산입 · 손금불산입 항목 정밀 검토",
      "이월결손금 · 세액공제 · 세액감면 활용 검토",
      "성실신고확인 대상 사업자 신고 자문",
      "신고 전 정밀 검증 및 신고서 제출 (동성회계법인 명의)",
    ],
    deliverables: [
      "법인세 세무조정계산서 (전자신고용)",
      "익금산입 · 손금불산입 명세서",
      "이월결손금 · 세액공제 · 감면 명세서",
      "신고 전 검토 보고서 (주요 쟁점 정리)",
      "전기 대비 비교 · 차이 분석 메모",
    ],
    applicableScenarios: [
      "정기 법인세 신고 (사업연도 종료 후 3개월 이내)",
      "외감대상 · 성실신고확인대상 정밀 신고",
      "이월결손금 · 세액공제 · 감면 활용 여지가 있는 경우",
      "전기 신고 오류 정정 (수정신고 / 경정청구)",
      "세무조사 직후 후속 신고",
    ],
    regulations: [
      "법인세법 제60조 (신고와 납부)",
      "법인세법 제52조 (부당행위계산의 부인)",
      "법인세법 시행령 제89조 (시가의 범위 · 가지급금 인정이자)",
      "조세특례제한법 (각종 세액공제 · 감면)",
      "국세기본법 제45조 (수정신고) · 제45조의2 (경정청구)",
    ],
  },
  {
    slug: "tax-advisory",
    title: "세무 자문",
    description:
      "거래 · 의사결정 단계에서 발생하는 세무 쟁점을 사전에 검토하고 방향을 제안합니다. 신고를 마치고 나서가 아니라, 의사결정을 내리기 전에 함께 고민하는 자문을 지향합니다.",
    icon: "shield",
    details: [
      "법인세 · 소득세 절세 전략 사전 시뮬레이션",
      "양도소득세 · 상속세 · 증여세 의사결정 자문",
      "가업승계 · 지배구조 개편 세무 플래닝",
      "특수관계자 거래 · 부당행위계산 부인 리스크 검토",
      "세무조사 사전 대비 및 현장 대응 자문",
      "조세불복 (이의신청 · 심사청구 · 심판청구) 검토",
    ],
    deliverables: [
      "세무 검토 보고서 (의사결정 근거 정리)",
      "시나리오별 세부담 비교 워크북",
      "방안 비교표 · 권고 의견서",
      "후속 실행 체크리스트",
      "정식 신고 · 감사로의 연결 안내 (동성회계법인)",
    ],
    applicableScenarios: [
      "양도 · 상속 · 증여 의사결정 전 사전 검토",
      "가업승계 · 지분 정리 단계",
      "특수관계자 거래 · 가지급금 처리",
      "세무조사 사전 대비",
      "이의신청 · 심사청구 · 심판청구 검토",
    ],
    regulations: [
      "상속세 및 증여세법 (전반)",
      "소득세법 제104조 이하 (양도소득세)",
      "법인세법 제52조 (부당행위계산 부인)",
      "국세기본법 제55조 이하 (이의신청 · 심사청구 · 심판청구)",
    ],
  },
  {
    slug: "valuation",
    title: "기업가치평가",
    description:
      "세무 목적의 비상장주식 평가부터 M&A · 투자유치 단계의 공정가치 평가까지. Big4 가치평가본부(VME) 경력을 바탕으로, 거래 · 세무 양 측면에서 방어 가능한 평가 보고서를 제공합니다.",
    icon: "scale",
    details: [
      "세법상 주식 · 자산 평가 (상속세 및 증여세법, 법인세법)",
      "비상장주식 공정가치 평가 (DCF · 시장접근법 · 자산접근법)",
      "무형자산 가치평가 (영업권, 특허권, 브랜드 등)",
      "스톡옵션 · 전환사채 등 주식연계증권 공정가치 평가",
      "합병 · 분할 시 합병비율 및 분할가액 산정",
      "감정평가법인 · 회계법인 평가 보고서 검토 자문",
    ],
    deliverables: [
      "기업가치평가 보고서 (방법론 · 가정 · 결과)",
      "DCF 모델 (Excel 워크북, 가정 변경 가능 구조)",
      "비교회사 분석 · Comparable Transaction 분석",
      "민감도 분석 (할인율 · 성장률 · 운영 가정)",
      "세법상 평가 의견서 (해당 시)",
    ],
    applicableScenarios: [
      "M&A 거래가격 산정 (Sell-side · Buy-side)",
      "투자 유치 라운드 가치평가",
      "상속 · 증여 시 비상장주식 평가 (상증세법)",
      "합병 · 분할 비율 산정",
      "스톡옵션 · 전환사채 공정가치 평가",
      "회계감사 목적의 손상 평가",
    ],
    regulations: [
      "상속세 및 증여세법 제63조 (보충적 평가방법)",
      "상속세 및 증여세법 시행령 제54조 ~ 제56조",
      "법인세법 시행령 제89조 (시가)",
      "K-IFRS 1113호 · 일반기업회계기준 (공정가치 측정)",
    ],
  },
  {
    slug: "transaction-advisory",
    title: "M&A · IPO 자문",
    description:
      "Big4 감사본부와 NH투자증권 IB 본부에서의 경험을 결합해, M&A 재무실사부터 IPO 사전 정비까지 거래 전 과정을 자문합니다. 보고서가 아닌 의사결정을 함께 만드는 자문입니다.",
    icon: "handshake",
    details: [
      "M&A 재무 실사 (Financial Due Diligence)",
      "거래 구조 설계 자문 (주식 양수도 · 영업양수도 · 합병 · 분할)",
      "Sell-side 매각 자문 / Buy-side 인수 자문",
      "IPO 사전 진단 (회계 · 내부통제 · 지배구조)",
      "K-IFRS 전환 준비 및 지정감사 대응 자문",
      "Pre-IPO 가치평가 및 자본구조 설계",
    ],
    deliverables: [
      "재무 실사 보고서 (FDD Report)",
      "Quality of Earnings 분석",
      "Net Debt · Working Capital 정상화 분석",
      "거래 구조 비교 (세무 · 회계 · 법률 함의 정리)",
      "IPO 사전 진단 보고서 (회계 · 내부통제 항목별)",
      "협상 단계 자료 · Q&A 지원",
    ],
    applicableScenarios: [
      "비상장사 매도 (Sell-side advisory)",
      "비상장사 인수 (Buy-side due diligence)",
      "합병 · 분할 시 거래 구조 설계",
      "IPO 준비 전 회계 정비 (Pre-IPO)",
      "K-IFRS 전환 (외감 → 상장 단계)",
      "지정감사 직전 사전 점검",
    ],
    regulations: [
      "자본시장과 금융투자업에 관한 법률",
      "주식회사 등의 외부감사에 관한 법률 (외감법)",
      "K-IFRS · 일반기업회계기준",
      "상법 제522조의3 (소규모합병) · 제530조의2 이하 (분할)",
    ],
  },
];

export const members: Member[] = [
  {
    name: "박민상",
    role: "공인회계사 · Founder",
    description:
      "법인 · 개인사업자의 세무 기장 · 세무 조정 · 세무 신고를 직접 수행하면서, 기업가치평가 · M&A · IPO 자문까지 함께 다루는 공인회계사입니다. 삼정회계법인 감사본부, NH투자증권 IB, 한영회계법인 가치평가본부(VME)에서 쌓은 융합형 경력을 바탕으로, 일상 세무에서 거래 자문까지 한 사람이 일관되게 책임지는 부티크를 지향합니다.",
    credentials: [
      "공인회계사 (KICPA, 2017)",
      "성균관대학교 경영학과 졸업",
      "한국공인회계사회 기본 실무 연수 최우수 수료 · 기본 실무 평가 전국 수석",
    ],
    practiceAreas: [
      "법인세 세무 조정 (외감대상 · 비외감대상 · 성실신고확인대상)",
      "비상장주식 가치평가 (상증세법 보충적 평가법 · 공정가치)",
      "M&A 재무실사 (Sell-side · Buy-side, FDD)",
      "K-IFRS 전환 · IPO 사전 회계 정비",
      "DCF · 시장접근법 · 자산접근법 가치평가 모델링",
      "조선 · 중공업 산업 (NH투자증권 Heavy Industry부)",
      "ICT · 소프트웨어 산업 (삼정 정보통신사업1본부)",
    ],
    experience: [
      "現 동성회계법인 / 메리디안 택스 어드바이저리 Founder",
      "前 한영회계법인 VME (Valuation, Modeling & Economics Services)",
      "前 NH투자증권 IB1사업부 Heavy Industry부",
      "前 삼정회계법인 정보통신사업1본부 감사팀",
    ],
  },
  {
    name: "함께하실 분을 모십니다",
    role: "Advisor (TBD)",
    description:
      "메리디안 택스 어드바이저리는 세무 · 회계 · 자본시장 · 가치평가 분야에서 함께 일할 동료 공인회계사 · 세무사 · 자문 전문가를 찾고 있습니다. 1인 자문이 아닌, 신뢰할 수 있는 동료들과의 협업을 통해 고객의 의사결정에 더 깊이 관여하고자 합니다.",
    experience: [
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
      "법인 설립 직후의 정기 세무 처리부터 투자 유치 · IPO 준비까지. 일상 세무도, 거래 자문도 같은 사람이 책임지는 게 가장 효율적인 분들을 위한 자문입니다.",
    needs: [
      "법인 설립 초기 세무 기장 · 세무 신고",
      "투자 유치를 위한 가치평가 · 사업계획서",
      "스톡옵션 · 전환사채 설계 및 회계 · 세무 처리",
      "Pre-IPO 회계 · 내부통제 사전 정리",
      "M&A · Exit 시 셀러측 자문",
    ],
    fitServices: ["tax-bookkeeping", "tax-adjustment", "valuation", "transaction-advisory"],
  },
  {
    slug: "owners",
    title: "사업가 / 오너",
    englishLabel: "Business Owners",
    description:
      "성장기를 지나 안정기에 접어든 비상장 법인의 오너분들을 위한 자문입니다. 매월 세무 기장 · 세무 조정의 정기 업무는 물론, 회사의 가치 · 승계 · 지배구조 · 절세 전략까지 함께 설계합니다.",
    needs: [
      "법인 세무 기장 · 법인세 세무 조정 · 신고",
      "비상장 주식 가치평가 (세법 · 공정가치)",
      "가업 승계 및 지분 이전 시나리오",
      "지주회사 전환 · 지배구조 개편 검토",
      "M&A · 매각 시 거래 구조 자문",
    ],
    fitServices: ["tax-bookkeeping", "tax-adjustment", "tax-advisory", "valuation"],
  },
  {
    slug: "investors",
    title: "개인 자산가",
    englishLabel: "Private Investors",
    description:
      "보유 자산의 구조, 양도 · 상속 · 증여 단계에서 발생하는 세무 쟁점을 미리 검토하고 싶은 분들을 위한 자문입니다. 단발성 신고가 아닌, 자산 전체를 두고 보는 관점에서 함께 설계합니다.",
    needs: [
      "양도소득세 · 상속세 · 증여세 사전 시뮬레이션",
      "종합소득세 신고 자문",
      "비상장 주식 평가 (상증세법 기준)",
      "자산 보유 구조 (개인 · 법인) 비교 검토",
      "세무조사 대비 자문",
    ],
    fitServices: ["tax-advisory", "tax-adjustment", "valuation"],
  },
];

