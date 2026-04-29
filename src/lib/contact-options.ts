export const CONTACT_TYPE_OPTIONS = [
  "전체 진단",
  "세무 기장",
  "세무 조정",
  "세무 자문",
  "기업가치평가",
  "M&A · IPO 자문",
  "회계감사 · 회계자문",
] as const;

export const COMPANY_STAGE_OPTIONS = [
  "매출 성장기",
  "중요한 결정 직전",
  "기타",
] as const;

export const BOTTLENECK_OPTIONS = [
  "현재 병목 진단 필요",
  "예상 수임료 검토",
  "결산 일정 지연",
  "기장 누락 · 계정 오분류",
  "신고 직전 쟁점 발견",
  "세무조사 · 소명 대응",
  "지분 이동 · 승계 · 거래 비교표 필요",
] as const;

export const DESIRED_OUTPUT_OPTIONS = [
  "운영 진단 및 우선순위 메모",
  "기장 견적 상담",
  "월별 재무 보고 체계",
  "세무조정 검토 메모",
  "시나리오별 세부담 비교표",
  "실행 순서안 및 체크리스트",
] as const;

export const TIMELINE_OPTIONS = [
  "이번 주 안",
  "이번 달 안",
  "신고 시즌 전",
  "의사결정 전",
  "일정 협의 가능",
] as const;

export function isKnownContactOption<T extends readonly string[]>(
  value: string,
  options: T
): value is T[number] {
  return (options as readonly string[]).includes(value);
}
