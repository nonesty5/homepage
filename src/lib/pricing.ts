/**
 * Pricing 계산기 도메인 데이터 + 순수 계산 함수.
 * 원본: tmp/pricemodule/app.js (vanilla JS) 의 PRICING / COMPLEXITY / INDUSTRIES /
 * ADD_ONS / CUSTOM_FLAGS / SETUP_MODES / STEP_FLOW 를 타입 안전하게 이식.
 */

export type BusinessType = "corporate" | "sole";
export type ComplexityKey = "standard" | "special" | "advanced";
export type SetupModeKey = "standard" | "transfer" | "messy" | "recovery";
export type PayrollMode = "none" | "simple" | "fourInsurance";

export interface Tier {
  max: number;
  fee: number;
}

export interface IncludedItem {
  title: string;
  description: string;
}

export interface PricingTable {
  label: string;
  monthlyTiers: Tier[];
  annualTiers: Tier[];
  included: IncludedItem[];
}

export const PRICING: Record<BusinessType, PricingTable> = {
  corporate: {
    label: "법인사업자",
    monthlyTiers: [
      { max: 300_000_000, fee: 150_000 },
      { max: 600_000_000, fee: 180_000 },
      { max: 1_000_000_000, fee: 210_000 },
      { max: 1_500_000_000, fee: 260_000 },
      { max: 2_000_000_000, fee: 280_000 },
      { max: 3_000_000_000, fee: 390_000 },
      { max: 4_000_000_000, fee: 520_000 },
      { max: 5_000_000_000, fee: 650_000 },
    ],
    annualTiers: [
      { max: 100_000_000, fee: 500_000 },
      { max: 300_000_000, fee: 900_000 },
      { max: 600_000_000, fee: 1_200_000 },
      { max: 1_000_000_000, fee: 1_800_000 },
      { max: 1_500_000_000, fee: 2_300_000 },
      { max: 2_000_000_000, fee: 3_000_000 },
      { max: 3_000_000_000, fee: 3_800_000 },
      { max: 4_000_000_000, fee: 4_500_000 },
      { max: 5_000_000_000, fee: 5_000_000 },
    ],
    included: [
      { title: "월 기장 및 장부 검토", description: "기본 기장 입력, 계정 검토, 주요 오류 확인" },
      { title: "부가세 신고 안내", description: "예정·확정 신고에 필요한 일반 범위 대응" },
      { title: "원천세 기본 신고", description: "통상적인 급여/사업소득 관련 기본 신고" },
      { title: "일반 세무 질의응답", description: "반복적이지 않은 통상 상담 범위" },
    ],
  },
  sole: {
    label: "개인사업자",
    monthlyTiers: [
      { max: 100_000_000, fee: 80_000 },
      { max: 300_000_000, fee: 110_000 },
      { max: 600_000_000, fee: 130_000 },
      { max: 1_000_000_000, fee: 150_000 },
      { max: 1_500_000_000, fee: 180_000 },
      { max: 2_000_000_000, fee: 220_000 },
      { max: 3_000_000_000, fee: 330_000 },
    ],
    annualTiers: [
      { max: 100_000_000, fee: 450_000 },
      { max: 300_000_000, fee: 650_000 },
      { max: 600_000_000, fee: 1_000_000 },
      { max: 1_000_000_000, fee: 1_500_000 },
      { max: 1_500_000_000, fee: 2_100_000 },
      { max: 2_000_000_000, fee: 2_700_000 },
      { max: 3_000_000_000, fee: 3_500_000 },
    ],
    included: [
      { title: "월 기장 및 장부 검토", description: "매입·매출·비용 장부 정리와 기본 검토" },
      { title: "부가세 신고 안내", description: "예정·확정 신고에 필요한 일반 범위 대응" },
      { title: "종합소득세 신고 기본 대응", description: "기장 계약 기준의 일반 신고 준비" },
      { title: "일반 세무 질의응답", description: "통상적인 소득세·부가세 문의 대응" },
    ],
  },
};

export interface ComplexityDef {
  label: string;
  description: string;
  monthly: number;
  annual: number;
}

export const COMPLEXITY: Record<ComplexityKey, ComplexityDef> = {
  standard: {
    label: "일반 업종",
    description: "일반 서비스업, 자료 정리 양호",
    monthly: 0,
    annual: 0,
  },
  special: {
    label: "특수 업종",
    description: "건설, 의료, 무역, 겸영, 전자상거래",
    monthly: 30_000,
    annual: 150_000,
  },
  advanced: {
    label: "고난도 업종",
    description: "제조원가, 해외거래, 특수거래 검토 빈번",
    monthly: 70_000,
    annual: 400_000,
  },
};

export interface IndustryDef {
  id: string;
  label: string;
  description: string;
  complexity: ComplexityKey;
  keywords: string[];
}

export const INDUSTRIES: IndustryDef[] = [
  { id: "generalService", label: "일반 서비스", description: "컨설팅, 디자인, 광고, IT 외주 등 일반 서비스업", complexity: "standard", keywords: ["일반", "서비스", "컨설팅", "디자인", "광고", "it", "외주", "마케팅"] },
  { id: "retailOffline", label: "도소매(오프라인)", description: "일반 도소매, 오프라인 매장 판매 중심", complexity: "standard", keywords: ["도소매", "오프라인", "매장", "유통", "소매", "판매"] },
  { id: "foodBeverage", label: "음식점·카페", description: "일반 음식점, 카페, 프랜차이즈 가맹점", complexity: "standard", keywords: ["음식점", "카페", "식당", "외식", "프랜차이즈", "커피"] },
  { id: "realEstateRental", label: "부동산 임대", description: "상가, 사무실, 주택 임대업", complexity: "standard", keywords: ["부동산", "임대", "상가", "사무실", "주택"] },
  { id: "academyEducation", label: "학원·교육 서비스", description: "학원, 교습소, 교육 서비스업", complexity: "standard", keywords: ["학원", "교육", "교습소", "강의", "과외"] },
  { id: "onlineCommerce", label: "온라인 쇼핑몰·전자상거래", description: "스마트스토어, 쿠팡, 자사몰, 플랫폼 판매", complexity: "special", keywords: ["온라인", "쇼핑몰", "전자상거래", "스마트스토어", "쿠팡", "이커머스"] },
  { id: "tradeImportExport", label: "무역·수출입", description: "수출입, 통관, 외화거래가 반복되는 업종", complexity: "special", keywords: ["무역", "수출", "수입", "통관", "외화", "수출입"] },
  { id: "constructionInterior", label: "건설·인테리어", description: "공사현장, 하도급, 원가 안분 이슈가 있는 업종", complexity: "special", keywords: ["건설", "인테리어", "공사", "현장", "하도급"] },
  { id: "medicalPharmacy", label: "의료·병원·약국", description: "의료수익, 비급여, 약품 매입 검토가 필요한 업종", complexity: "special", keywords: ["의료", "병원", "약국", "의원", "치과", "한의원"] },
  { id: "logistics", label: "운수·물류", description: "운송·물류 정산과 거래처 정리가 반복되는 업종", complexity: "special", keywords: ["운수", "물류", "배송", "운송", "택배"] },
  { id: "franchiseHQ", label: "프랜차이즈 본사", description: "가맹점 정산, 로열티, 본사 지원금 이슈가 있는 업종", complexity: "special", keywords: ["프랜차이즈", "본사", "가맹", "로열티"] },
  { id: "manufacturingBasic", label: "제조업(단순 가공)", description: "기본 제조 프로세스는 있으나 원가계산이 복잡하지 않은 경우", complexity: "special", keywords: ["제조", "가공", "생산", "공장"] },
  { id: "manufacturingCost", label: "제조업(원가계산 필요)", description: "재공품, 원가배부, 생산수율 검토가 필요한 제조업", complexity: "advanced", keywords: ["제조", "원가", "재공품", "배부", "생산"] },
  { id: "crossBorderHeavy", label: "해외법인·국외거래 비중 큼", description: "국외거래 비중이 크고 해외 이슈가 자주 발생하는 경우", complexity: "advanced", keywords: ["해외", "국외", "외국", "crossborder", "cross border", "해외법인"] },
  { id: "other", label: "기타·잘 모르겠음", description: "우선 일반 업종 기준으로 계산하고 상담 중에 조정합니다", complexity: "standard", keywords: ["기타", "직접", "모르겠음", "잘모르겠음", "etc"] },
];

export interface AddOnDef {
  id: string;
  title: string;
  description: string;
  monthly: number;
  annual: number;
}

export const ADD_ONS: AddOnDef[] = [
  { id: "insuranceAdmin", title: "4대보험 취득·상실 대행", description: "입사·퇴사·보수총액 등 반복적인 4대보험 업무를 직접 처리", monthly: 30_000, annual: 0 },
  { id: "invoiceSupport", title: "세금계산서 발행/전송 대행", description: "정기 발행분을 대신 관리하고 발행 업무를 수행", monthly: 40_000, annual: 0 },
  { id: "monthlyReport", title: "월간 리포트 및 정기 자문", description: "월별 손익 브리핑, 체크리스트, 정기 상담", monthly: 70_000, annual: 0 },
  { id: "backoffice", title: "증빙·자금 백오피스 지원", description: "증빙 취합, 간단한 지출 관리, 반복 행정업무 보조", monthly: 150_000, annual: 0 },
];

export interface CustomFlagDef {
  id: string;
  title: string;
  description: string;
}

export const CUSTOM_FLAGS: CustomFlagDef[] = [
  { id: "externalAudit", title: "외감, IFRS, 연결 또는 관계사 내부거래", description: "외부감사 대응, 연결재무제표, 계열사 거래 검토가 필요한 경우" },
  { id: "crossBorder", title: "해외법인, 국외거래, 외국인 대표자", description: "국외 거래 검토 비중이 높거나 해외 이슈가 큰 경우" },
  { id: "rescueBooks", title: "기장 누락, 수정신고, 기한후신고", description: "기존 장부를 복구하거나 신고 정정이 필요한 경우" },
];

export interface SetupModeDef {
  label: string;
  description: string;
  once: number;
  advisory?: string;
}

export const SETUP_MODES: Record<SetupModeKey, SetupModeDef> = {
  standard: { label: "일반 시작", description: "신규 자료 또는 기존 자료 상태 양호", once: 0 },
  transfer: { label: "기장 이관", description: "기존 세무대리 또는 내부 담당자 자료를 이관받는 경우", once: 150_000 },
  messy: { label: "자료 정리 필요", description: "증빙 정리, 계정 재분류, 누락 확인이 일부 필요한 경우", once: 300_000 },
  recovery: { label: "복구 필요", description: "기초 장부 복구나 과거자료 보완이 필요한 경우", once: 600_000, advisory: "복구 범위는 착수 후 실측 기준으로 조정될 수 있습니다." },
};

export interface StepDef {
  id: number;
  title: string;
  prompt: string;
  locked: string;
}

export const STEP_FLOW: StepDef[] = [
  { id: 1, title: "사업자 형태", prompt: "사업자 형태를 골라주세요.", locked: "법인인지 개인인지 먼저 선택해 주세요." },
  { id: 2, title: "업종", prompt: "업종을 검색하거나 선택해 주세요.", locked: "사업자 형태를 먼저 고르면 업종 질문이 열립니다." },
  { id: 3, title: "연매출", prompt: "연매출 구간을 잡아주세요.", locked: "업종을 고르면 매출 질문이 열립니다." },
  { id: 4, title: "직원 수와 급여 형태", prompt: "직원 수와 급여 형태를 알려주세요.", locked: "연매출을 고르면 직원 질문이 열립니다." },
  { id: 5, title: "초기 세팅 상태", prompt: "초기 세팅 상태를 선택해 주세요.", locked: "직원과 급여 형태를 입력하면 세팅 질문이 열립니다." },
  { id: 6, title: "추가 업무와 별도 협의", prompt: "추가 업무나 별도 협의 사항이 있으면 체크해 주세요.", locked: "세팅 상태를 고르면 마지막 질문이 열립니다." },
];

export const REVENUE_OPTIONS = [
  50_000_000, 100_000_000, 200_000_000, 300_000_000, 500_000_000, 700_000_000,
  1_000_000_000, 1_500_000_000, 2_000_000_000, 3_000_000_000, 5_000_000_000, 10_000_000_000,
];

export const REVENUE_PRESETS = [
  100_000_000, 300_000_000, 500_000_000, 1_000_000_000, 3_000_000_000, 10_000_000_000,
];

export const STAFF_PRESETS = [0, 1, 3, 10, 30];
export const STAFF_RANGE_MAX = 50;
export const TOTAL_STEPS = STEP_FLOW.length;

export interface CalcState {
  businessType: BusinessType;
  industryId: string;
  revenue: number;
  staffCount: number;
  payrollMode: PayrollMode;
  complexity: ComplexityKey;
  setupMode: SetupModeKey;
  addOns: string[];
  customFlags: string[];
}

export const DEFAULT_STATE: CalcState = {
  businessType: "corporate",
  industryId: "generalService",
  revenue: 300_000_000,
  staffCount: 2,
  payrollMode: "fourInsurance",
  complexity: "standard",
  setupMode: "standard",
  addOns: [],
  customFlags: [],
};

export type Cadence = "monthly" | "annual" | "once";

export interface BreakdownItem {
  title: string;
  description: string;
  price: number;
  cadence: Cadence;
}

export interface Estimate {
  monthlyTotal: number;
  annualTotal: number;
  setupFee: number;
  firstYearTotal: number;
  monthlyEquivalent: number;
  breakdown: BreakdownItem[];
  setupAdvisory: string;
  customReasons: string[];
  isCustom: boolean;
  needsRevenue: boolean;
}

interface ResolvedTier {
  fee: number;
  inRange: boolean;
}

export function resolveTier(tiers: Tier[], revenue: number): ResolvedTier {
  if (revenue <= 0) {
    return { fee: 0, inRange: false };
  }
  const found = tiers.find((tier) => revenue <= tier.max);
  if (found) {
    return { fee: found.fee, inRange: true };
  }
  return { fee: tiers[tiers.length - 1].fee, inRange: false };
}

export function describeRevenueTier(tiers: Tier[], revenue: number): string {
  if (revenue <= 0) {
    return "입력 전";
  }
  let lowerBound = 0;
  for (const tier of tiers) {
    if (revenue <= tier.max) {
      if (lowerBound === 0) {
        return `${formatCompactWonFromNumber(tier.max)} 이하`;
      }
      return `${formatCompactWonFromNumber(lowerBound)} 초과 ${formatCompactWonFromNumber(tier.max)} 이하`;
    }
    lowerBound = tier.max;
  }
  return `${formatCompactWonFromNumber(tiers[tiers.length - 1].max)} 초과`;
}

export function getIndustry(industryId: string): IndustryDef {
  return INDUSTRIES.find((i) => i.id === industryId) ?? INDUSTRIES[0];
}

export function calculatePayrollMonthlyFee(state: CalcState): number {
  if (state.payrollMode === "none" || state.staffCount === 0) {
    return 0;
  }
  let base = 10_000;
  if (state.payrollMode === "fourInsurance") {
    base = 20_000;
  }
  const extraBlocks = state.staffCount > 5 ? Math.ceil((state.staffCount - 5) / 5) : 0;
  return base + extraBlocks * 10_000;
}

export function calculateYearEndFee(state: CalcState): number {
  if (state.payrollMode === "none" || state.staffCount === 0) {
    return 0;
  }
  return state.staffCount * 10_000;
}

function sumSelectedAddOns(state: CalcState, field: "monthly" | "annual"): number {
  let total = 0;
  for (const id of state.addOns) {
    const addOn = ADD_ONS.find((item) => item.id === id);
    if (addOn) {
      total += addOn[field];
    }
  }
  return total;
}

export function describePayrollMode(mode: PayrollMode): string {
  if (mode === "simple") return "간단 급여";
  if (mode === "fourInsurance") return "4대보험 포함 급여";
  return "급여 없음";
}

export function annualLabel(businessType: BusinessType): string {
  return businessType === "corporate" ? "법인세 신고/조정료" : "종합소득세 신고료";
}

export function calculateEstimate(state: CalcState): Estimate {
  const pricing = PRICING[state.businessType];
  const monthlyTier = resolveTier(pricing.monthlyTiers, state.revenue);
  const annualTier = resolveTier(pricing.annualTiers, state.revenue);
  const monthlyBase = monthlyTier.fee;
  const annualBase = annualTier.fee;
  const complexity = COMPLEXITY[state.complexity];
  const setupMode = SETUP_MODES[state.setupMode];
  const selectedIndustry = getIndustry(state.industryId);
  const payrollMonthly = calculatePayrollMonthlyFee(state);
  const yearEndFee = calculateYearEndFee(state);
  const addOnMonthly = sumSelectedAddOns(state, "monthly");
  const addOnAnnual = sumSelectedAddOns(state, "annual");
  const customReasons: string[] = [];
  const needsRevenue = state.revenue <= 0;

  if (needsRevenue) {
    customReasons.push("연매출을 입력해 주세요.");
  } else if (!monthlyTier.inRange || !annualTier.inRange) {
    customReasons.push("현재 매출 구간은 공개 보수표 범위를 넘어갑니다.");
  }

  for (const flag of state.customFlags) {
    const match = CUSTOM_FLAGS.find((item) => item.id === flag);
    if (match) {
      customReasons.push(match.title);
    }
  }

  const monthlyTotal = monthlyBase + payrollMonthly + complexity.monthly + addOnMonthly;
  const annualTotal = annualBase + yearEndFee + complexity.annual + addOnAnnual;
  const setupFee = setupMode.once;
  const setupAdvisory = setupMode.advisory ?? "";
  const firstYearTotal = monthlyTotal * 12 + annualTotal + setupFee;
  const monthlyEquivalent = Math.round(firstYearTotal / 12);

  const breakdown: BreakdownItem[] = [
    {
      title: "기본 월 기장료",
      description: `${pricing.label} ${describeRevenueTier(pricing.monthlyTiers, state.revenue)} 기준`,
      price: monthlyBase,
      cadence: "monthly",
    },
  ];

  if (payrollMonthly > 0) {
    breakdown.push({
      title: "급여/직원 수 가산",
      description: `${describePayrollMode(state.payrollMode)} · 직원 ${state.staffCount}명 기준`,
      price: payrollMonthly,
      cadence: "monthly",
    });
  }

  if (complexity.monthly > 0) {
    breakdown.push({
      title: "업종 복잡도 가산",
      description: selectedIndustry.description,
      price: complexity.monthly,
      cadence: "monthly",
    });
  }

  for (const id of state.addOns) {
    const addOn = ADD_ONS.find((item) => item.id === id);
    if (!addOn || addOn.monthly === 0) continue;
    breakdown.push({
      title: addOn.title,
      description: addOn.description,
      price: addOn.monthly,
      cadence: "monthly",
    });
  }

  breakdown.push({
    title: annualLabel(state.businessType),
    description: `${pricing.label} ${describeRevenueTier(pricing.annualTiers, state.revenue)} 기준`,
    price: annualBase,
    cadence: "annual",
  });

  if (yearEndFee > 0) {
    breakdown.push({
      title: "연말정산/지급명세서",
      description: `직원 ${state.staffCount}명 기준`,
      price: yearEndFee,
      cadence: "annual",
    });
  }

  if (complexity.annual > 0) {
    breakdown.push({
      title: "연 신고 난이도 가산",
      description: selectedIndustry.description,
      price: complexity.annual,
      cadence: "annual",
    });
  }

  if (setupFee > 0) {
    breakdown.push({
      title: "초기 세팅비",
      description: `${setupMode.label} · ${setupMode.description}`,
      price: setupFee,
      cadence: "once",
    });
  }

  return {
    monthlyTotal,
    annualTotal,
    setupFee,
    firstYearTotal,
    monthlyEquivalent,
    breakdown,
    setupAdvisory,
    customReasons,
    isCustom: customReasons.length > 0,
    needsRevenue,
  };
}

/* ─── Formatters ─── */

const currencyFormatter = new Intl.NumberFormat("ko-KR");

export function formatNumber(n: number): string {
  return currencyFormatter.format(Math.round(n));
}

export function formatWon(n: number): string {
  return `${formatNumber(n)}원`;
}

function trimTrailingZero(value: string): string {
  return value.replace(/\.0$/, "");
}

export function formatCompactWon(amount: number): string {
  if (!amount) return "0원";
  const manValue = amount / 10_000;
  if (Number.isInteger(manValue)) {
    return `${currencyFormatter.format(manValue)}만원`;
  }
  return `${trimTrailingZero(manValue.toFixed(1))}만원`;
}

export function formatCompactWonFromNumber(amount: number): string {
  if (amount >= 100_000_000) {
    return `${trimTrailingZero((amount / 100_000_000).toFixed(1))}억`;
  }
  return formatCompactWon(amount);
}

export function formatRevenueLabel(amount: number): string {
  if (!amount) return "0";
  if (amount >= 100_000_000) {
    return `${trimTrailingZero((amount / 100_000_000).toFixed(amount % 100_000_000 === 0 ? 0 : 1))}억`;
  }
  if (amount >= 10_000_000) {
    return `${trimTrailingZero((amount / 10_000_000).toFixed(amount % 10_000_000 === 0 ? 0 : 1))}천만`;
  }
  return formatCompactWonFromNumber(amount);
}

export function formatStaffCount(count: number): string {
  if (count === 0) return "직원 없음";
  return `${formatNumber(count)}명`;
}

export function parseCurrencyInput(value: string): number {
  const normalized = String(value).replace(/[^\d]/g, "");
  return Number(normalized || 0);
}

export function normalizeSearchToken(value: string): string {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();
}

export function getFilteredIndustries(query: string): IndustryDef[] {
  const normalized = normalizeSearchToken(query);
  if (!normalized) return INDUSTRIES;
  return INDUSTRIES.filter((industry) => {
    const haystack = normalizeSearchToken(
      [industry.label, industry.description, ...industry.keywords, COMPLEXITY[industry.complexity].label].join(" "),
    );
    return haystack.includes(normalized);
  });
}

export function getNearestRevenueIndex(value: number): number {
  if (value <= REVENUE_OPTIONS[0]) return 0;
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  REVENUE_OPTIONS.forEach((option, index) => {
    const distance = Math.abs(option - value);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });
  return bestIndex;
}

export function formatCadenceLabel(cadence: Cadence): string {
  if (cadence === "monthly") return "월 ";
  if (cadence === "annual") return "연 ";
  if (cadence === "once") return "초기 ";
  return "";
}

/* ─── Summary builders ─── */

export function buildSummaryText(state: CalcState, estimate: Estimate): string {
  const pricing = PRICING[state.businessType];
  const industry = getIndustry(state.industryId);
  const lines: string[] = [];
  lines.push(`[${pricing.label} 수임료 견적 요약]`);
  lines.push(`업종: ${industry.label} (${COMPLEXITY[state.complexity].label})`);
  lines.push(`연매출: ${formatRevenueLabel(state.revenue)}`);
  lines.push(`직원: ${formatStaffCount(state.staffCount)} · ${describePayrollMode(state.payrollMode)}`);
  lines.push(`초기 세팅: ${SETUP_MODES[state.setupMode].label}`);

  if (state.addOns.length > 0) {
    const titles = state.addOns
      .map((id) => ADD_ONS.find((a) => a.id === id)?.title)
      .filter(Boolean)
      .join(", ");
    lines.push(`추가 업무: ${titles}`);
  }
  if (state.customFlags.length > 0) {
    const titles = state.customFlags
      .map((id) => CUSTOM_FLAGS.find((f) => f.id === id)?.title)
      .filter(Boolean)
      .join(", ");
    lines.push(`별도 협의 사유: ${titles}`);
  }

  lines.push("");
  if (estimate.needsRevenue) {
    lines.push("연매출 입력 후 계산 가능합니다.");
  } else {
    lines.push(`예상 월 기장료: ${formatWon(estimate.monthlyTotal)} (VAT 별도)`);
    lines.push(`연 신고/조정료: ${formatWon(estimate.annualTotal)}`);
    if (estimate.setupFee > 0) {
      lines.push(`초기 세팅비: ${formatWon(estimate.setupFee)}`);
    }
    lines.push(`첫 해 총 예상액: ${formatWon(estimate.firstYearTotal)}`);
    lines.push(`월 환산 총액: ${formatWon(estimate.monthlyEquivalent)}`);
  }
  if (estimate.isCustom) {
    lines.push("");
    lines.push("※ 별도 협의 사유 있음 — 최종 금액은 상담 후 확정");
  }
  return lines.join("\n");
}

export function buildInquiryText(state: CalcState, estimate: Estimate): string {
  const pricing = PRICING[state.businessType];
  const lines: string[] = [];
  lines.push("안녕하세요. 수임료 계산기에서 다음 조건으로 견적을 확인했습니다.");
  lines.push("");
  lines.push(buildSummaryText(state, estimate));
  lines.push("");
  lines.push(`상담 가능한 시간을 알려주시면 ${pricing.label} 기준으로 자세히 안내드리겠습니다.`);
  return lines.join("\n");
}

/* ─── State serialization for URL/localStorage ─── */

export const STORAGE_KEY = "meridian-pricing-state-v1";
export const STATE_QUERY_KEYS = [
  "type",
  "industry",
  "revenue",
  "staff",
  "payroll",
  "complexity",
  "setup",
  "addons",
  "flags",
] as const;

export function serializeStateToParams(state: CalcState): URLSearchParams {
  const params = new URLSearchParams();
  params.set("type", state.businessType);
  params.set("industry", state.industryId);
  params.set("revenue", String(state.revenue));
  params.set("staff", String(state.staffCount));
  params.set("payroll", state.payrollMode);
  params.set("complexity", state.complexity);
  params.set("setup", state.setupMode);
  if (state.addOns.length > 0) params.set("addons", state.addOns.join(","));
  if (state.customFlags.length > 0) params.set("flags", state.customFlags.join(","));
  return params;
}

function isBusinessType(value: string): value is BusinessType {
  return value === "corporate" || value === "sole";
}
function isComplexity(value: string): value is ComplexityKey {
  return value === "standard" || value === "special" || value === "advanced";
}
function isSetupMode(value: string): value is SetupModeKey {
  return value === "standard" || value === "transfer" || value === "messy" || value === "recovery";
}
function isPayrollMode(value: string): value is PayrollMode {
  return value === "none" || value === "simple" || value === "fourInsurance";
}

export function deserializeStateFromParams(params: URLSearchParams): Partial<CalcState> {
  const out: Partial<CalcState> = {};
  const type = params.get("type");
  if (type && isBusinessType(type)) out.businessType = type;
  const industry = params.get("industry");
  if (industry && INDUSTRIES.some((i) => i.id === industry)) out.industryId = industry;
  const revenue = params.get("revenue");
  if (revenue !== null) {
    const n = Number(revenue);
    if (Number.isFinite(n) && n >= 0) out.revenue = n;
  }
  const staff = params.get("staff");
  if (staff !== null) {
    const n = Number(staff);
    if (Number.isFinite(n) && n >= 0) out.staffCount = Math.min(STAFF_RANGE_MAX, Math.floor(n));
  }
  const payroll = params.get("payroll");
  if (payroll && isPayrollMode(payroll)) out.payrollMode = payroll;
  const complexity = params.get("complexity");
  if (complexity && isComplexity(complexity)) out.complexity = complexity;
  const setup = params.get("setup");
  if (setup && isSetupMode(setup)) out.setupMode = setup;
  const addons = params.get("addons");
  if (addons !== null) {
    out.addOns = addons.split(",").filter((id) => ADD_ONS.some((a) => a.id === id));
  }
  const flags = params.get("flags");
  if (flags !== null) {
    out.customFlags = flags.split(",").filter((id) => CUSTOM_FLAGS.some((f) => f.id === id));
  }
  return out;
}
