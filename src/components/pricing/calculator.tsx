"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  ADD_ONS,
  COMPLEXITY,
  CUSTOM_FLAGS,
  DEFAULT_STATE,
  PRICING,
  REVENUE_OPTIONS,
  REVENUE_PRESETS,
  SETUP_MODES,
  STAFF_PRESETS,
  STAFF_RANGE_MAX,
  STEP_FLOW,
  STORAGE_KEY,
  TOTAL_STEPS,
  annualLabel,
  buildInquiryText,
  buildSummaryText,
  calculateEstimate,
  describePayrollMode,
  describeRevenueTier,
  deserializeStateFromParams,
  formatCadenceLabel,
  formatCompactWon,
  formatNumber,
  formatRevenueLabel,
  formatStaffCount,
  formatWon,
  getFilteredIndustries,
  getIndustry,
  getNearestRevenueIndex,
  parseCurrencyInput,
  serializeStateToParams,
  type BusinessType,
  type CalcState,
  type PayrollMode,
  type SetupModeKey,
} from "@/lib/pricing";

/* ─── Reducer ─── */

type Action =
  | { type: "setBusinessType"; value: BusinessType }
  | { type: "setIndustry"; id: string }
  | { type: "setRevenue"; value: number }
  | { type: "setStaff"; value: number }
  | { type: "setPayrollMode"; value: PayrollMode }
  | { type: "setSetupMode"; value: SetupModeKey }
  | { type: "toggleAddOn"; id: string }
  | { type: "toggleFlag"; id: string }
  | { type: "hydrate"; partial: Partial<CalcState> };

function reducer(state: CalcState, action: Action): CalcState {
  switch (action.type) {
    case "setBusinessType":
      return { ...state, businessType: action.value };
    case "setIndustry": {
      const ind = getIndustry(action.id);
      return { ...state, industryId: ind.id, complexity: ind.complexity };
    }
    case "setRevenue":
      return { ...state, revenue: Math.max(0, action.value) };
    case "setStaff":
      return { ...state, staffCount: Math.max(0, Math.min(STAFF_RANGE_MAX, action.value)) };
    case "setPayrollMode":
      return { ...state, payrollMode: action.value };
    case "setSetupMode":
      return { ...state, setupMode: action.value };
    case "toggleAddOn": {
      const set = new Set(state.addOns);
      if (set.has(action.id)) set.delete(action.id);
      else set.add(action.id);
      return { ...state, addOns: [...set] };
    }
    case "toggleFlag": {
      const set = new Set(state.customFlags);
      if (set.has(action.id)) set.delete(action.id);
      else set.add(action.id);
      return { ...state, customFlags: [...set] };
    }
    case "hydrate":
      return { ...state, ...action.partial };
    default:
      return state;
  }
}

/* ─── Component ─── */

export default function PricingCalculator() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  const [currentStep, setCurrentStep] = useState(1);
  const [unlockedStep, setUnlockedStep] = useState(1);
  const [industryQuery, setIndustryQuery] = useState(getIndustry(DEFAULT_STATE.industryId).label);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [revenueDirectOpen, setRevenueDirectOpen] = useState(false);
  const [ctaMessage, setCtaMessage] = useState<{ text: string; tone: "neutral" | "success" | "error" } | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const cardRefs = useRef<Record<number, HTMLElement | null>>({});
  const industryShellRef = useRef<HTMLDivElement | null>(null);
  const industryInputRef = useRef<HTMLInputElement | null>(null);
  const revenueInputRef = useRef<HTMLInputElement | null>(null);
  const ctaTimerRef = useRef<number | null>(null);

  const estimate = useMemo(() => calculateEstimate(state), [state]);
  const selectedIndustry = useMemo(() => getIndustry(state.industryId), [state.industryId]);
  const filteredIndustries = useMemo(() => getFilteredIndustries(industryQuery).slice(0, 8), [industryQuery]);

  /* ─ Hydrate from URL or localStorage on mount. */
  useEffect(() => {
    let partial: Partial<CalcState> | null = null;
    try {
      const search = window.location.search;
      if (search) {
        const fromUrl = deserializeStateFromParams(new URLSearchParams(search));
        if (Object.keys(fromUrl).length > 0) partial = fromUrl;
      }
      if (!partial) {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) partial = JSON.parse(stored) as Partial<CalcState>;
      }
    } catch {
      /* ignore */
    }
    if (partial) {
      const merged: CalcState = { ...DEFAULT_STATE, ...partial };
      dispatch({ type: "hydrate", partial });
      // Mount-only sync from window APIs (URL/localStorage). The rule below
      // does not model "external system → React" sync, so disable just here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentStep(TOTAL_STEPS);
      setUnlockedStep(TOTAL_STEPS);
      setIndustryQuery(getIndustry(merged.industryId).label);
      if (!REVENUE_OPTIONS.includes(merged.revenue)) {
        setRevenueDirectOpen(true);
      }
    }
    setHydrated(true);
  }, []);

  /* ─ Persist to localStorage + URL on state change ─ */
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
    const timer = window.setTimeout(() => {
      try {
        const params = serializeStateToParams(state);
        const next = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, "", next);
      } catch {
        /* ignore */
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [state, hydrated]);

  /* ─ Outside click closes industry dropdown ─ */
  useEffect(() => {
    if (!industryDropdownOpen) return;
    function onDocClick(event: MouseEvent) {
      const target = event.target as Node;
      if (industryShellRef.current && !industryShellRef.current.contains(target)) {
        setIndustryQuery(getIndustry(state.industryId).label);
        setIndustryDropdownOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [industryDropdownOpen, state.industryId]);

  /* ─ CTA flash message timer ─ */
  useEffect(() => {
    if (!ctaMessage) return;
    if (ctaTimerRef.current) window.clearTimeout(ctaTimerRef.current);
    ctaTimerRef.current = window.setTimeout(() => setCtaMessage(null), 2400);
    return () => {
      if (ctaTimerRef.current) window.clearTimeout(ctaTimerRef.current);
    };
  }, [ctaMessage]);

  /* ─ Helpers ─ */

  const advanceToStep = useCallback((step: number) => {
    const next = Math.min(TOTAL_STEPS, Math.max(1, step));
    setCurrentStep(next);
    setUnlockedStep((prev) => Math.max(prev, next));
    window.requestAnimationFrame(() => {
      const card = cardRefs.current[next];
      if (card && typeof card.scrollIntoView === "function") {
        card.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, []);

  const buildShareUrl = useCallback(() => {
    const params = serializeStateToParams(state);
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }, [state]);

  const onSelectIndustry = useCallback(
    (id: string, advance = false) => {
      dispatch({ type: "setIndustry", id });
      setIndustryDropdownOpen(false);
      if (advance) advanceToStep(3);
    },
    [advanceToStep],
  );

  const onCopySummary = useCallback(async () => {
    const text = buildSummaryText(state, estimate);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
      setCtaMessage({ text: "요약을 복사했습니다.", tone: "success" });
    } catch {
      setCtaMessage({ text: "요약 복사에 실패했습니다.", tone: "error" });
    }
  }, [state, estimate]);

  const onCopyInquiry = useCallback(async () => {
    const text = buildInquiryText(state, estimate);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
      setCtaMessage({ text: "문의 내용을 복사했습니다.", tone: "success" });
    } catch {
      setCtaMessage({ text: "문의 내용 복사에 실패했습니다.", tone: "error" });
    }
  }, [state, estimate]);

  const onShareLink = useCallback(async () => {
    const url = buildShareUrl();
    const payload = { title: "수임료 계산기 견적", text: buildSummaryText(state, estimate), url };
    try {
      if (typeof navigator.share === "function") {
        await navigator.share(payload);
        setCtaMessage({ text: "공유 패널을 열었습니다.", tone: "success" });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setCtaMessage({ text: "공유 링크를 복사했습니다.", tone: "success" });
      } else {
        fallbackCopy(url);
        setCtaMessage({ text: "공유 링크를 복사했습니다.", tone: "success" });
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setCtaMessage({ text: "공유 링크 생성에 실패했습니다.", tone: "error" });
    }
  }, [state, estimate, buildShareUrl]);

  /* ─ Per-step summary text ─ */
  const stepSummaries = useMemo(() => {
    return {
      1: PRICING[state.businessType].label,
      2: `${selectedIndustry.label} · ${COMPLEXITY[state.complexity].label}`,
      3: state.revenue > 0 ? formatRevenueLabel(state.revenue) : "연매출 미입력",
      4: `${formatStaffCount(state.staffCount)} · ${describePayrollMode(state.payrollMode)}`,
      5: SETUP_MODES[state.setupMode].label,
      6: `${state.addOns.length > 0 ? `추가 업무 ${state.addOns.length}개` : "추가 업무 없음"} · ${
        state.customFlags.length > 0 ? `별도 협의 ${state.customFlags.length}개` : "별도 협의 없음"
      }`,
    } as Record<number, string>;
  }, [state, selectedIndustry]);

  /* ─ Render ─ */

  const currentStepMeta = STEP_FLOW[Math.max(currentStep - 1, 0)];
  const progressPercent = (currentStep / TOTAL_STEPS) * 100;
  const monthlyTier = describeRevenueTier(PRICING[state.businessType].monthlyTiers, state.revenue);
  const revenueIndex = getNearestRevenueIndex(state.revenue);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      {/* ─── Wizard ─── */}
      <section className="lg:col-span-7 xl:col-span-7">
        <div className="flex items-start justify-between mb-6 gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-2">
              Estimator Flow
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              질문 순서대로 답하면 됩니다
            </h2>
            <p className="mt-2 text-sm text-muted">
              {currentStep} / {TOTAL_STEPS} · {currentStepMeta.prompt}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 mt-1">
            <div className="relative w-32 md:w-40 h-1 bg-border rounded-full overflow-hidden">
              <span
                className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs text-subtle tracking-wider">
              {currentStep} / {TOTAL_STEPS}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {STEP_FLOW.map((step) => {
            const isAllUnlocked = unlockedStep >= TOTAL_STEPS;
            const isActive = !isAllUnlocked && step.id === currentStep;
            const isUnlocked = step.id <= unlockedStep;
            const isComplete = !isAllUnlocked && step.id < currentStep;

            return (
              <article
                key={step.id}
                ref={(el) => {
                  cardRefs.current[step.id] = el;
                }}
                data-step={step.id}
                className={`bg-card border transition-all duration-300 ${
                  isActive
                    ? "border-foreground shadow-card"
                    : isUnlocked
                      ? "border-border"
                      : "border-border opacity-60"
                }`}
              >
                <div className="flex items-start justify-between p-5 md:p-6 pb-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <span
                      className={`text-xs font-semibold tracking-[0.2em] tabular-nums ${
                        isComplete ? "text-accent" : isActive ? "text-foreground" : "text-subtle"
                      }`}
                    >
                      {String(step.id).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base md:text-lg font-bold tracking-tight">
                        {step.title}
                      </h3>
                      {!isUnlocked ? (
                        <p className="mt-1 text-xs md:text-sm text-muted truncate">
                          {step.locked}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs md:text-sm text-muted truncate">
                          {stepSummaries[step.id]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {isUnlocked && (
                  <div className="px-5 md:px-6 pb-6 md:pb-7 border-t border-border pt-5 md:pt-6 space-y-5">
                    {/* ─ Step 1: Business type ─ */}
                    {step.id === 1 && (
                      <>
                        <p className="text-xs text-muted leading-relaxed">
                          기본 요율이 달라집니다. 지금 선택값으로 바로 넘어가도 됩니다.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(["corporate", "sole"] as const).map((type) => {
                            const isSelected = state.businessType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => {
                                  dispatch({ type: "setBusinessType", value: type });
                                  if (currentStep === 1) advanceToStep(2);
                                }}
                                className={`text-left px-4 py-4 border transition-all ${
                                  isSelected
                                    ? "border-foreground bg-surface"
                                    : "border-border hover:border-strong"
                                }`}
                                aria-pressed={isSelected}
                              >
                                <strong className="block text-sm font-bold">
                                  {PRICING[type].label}
                                </strong>
                                <span className="block mt-1 text-xs text-muted leading-relaxed">
                                  {type === "corporate"
                                    ? "법인세 신고/조정료와 월 기장료를 함께 계산합니다."
                                    : "종합소득세 신고료와 월 기장료를 기준으로 계산합니다."}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <NextButton onClick={() => advanceToStep(2)} label="다음 질문" />
                      </>
                    )}

                    {/* ─ Step 2: Industry search ─ */}
                    {step.id === 2 && (
                      <>
                        <p className="text-xs text-muted leading-relaxed">
                          검색하거나 목록에서 선택하세요. 내부적으로 일반 · 특수 · 고난도 업종으로 자동 매핑됩니다.
                        </p>
                        <div ref={industryShellRef} className="relative">
                          <div className="flex items-center border border-border bg-card focus-within:border-foreground transition-colors">
                            <input
                              ref={industryInputRef}
                              type="text"
                              autoComplete="off"
                              placeholder="예: 온라인 쇼핑몰, 건설, 카페, 무역"
                              role="combobox"
                              aria-autocomplete="list"
                              aria-expanded={industryDropdownOpen}
                              aria-controls="industryResults"
                              value={industryQuery}
                              onFocus={() => {
                                setIndustryDropdownOpen(true);
                                if (!industryQuery) setIndustryQuery(selectedIndustry.label);
                              }}
                              onChange={(e) => {
                                setIndustryQuery(e.target.value);
                                setIndustryDropdownOpen(true);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const [first] = filteredIndustries;
                                  if (first) onSelectIndustry(first.id, currentStep === 2);
                                } else if (e.key === "Escape") {
                                  setIndustryQuery(selectedIndustry.label);
                                  setIndustryDropdownOpen(false);
                                }
                              }}
                              className="flex-1 px-4 py-3 text-sm bg-transparent outline-none"
                            />
                            {industryQuery &&
                              industryQuery.toLowerCase() !== selectedIndustry.label.toLowerCase() && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIndustryQuery("");
                                    setIndustryDropdownOpen(true);
                                    industryInputRef.current?.focus();
                                  }}
                                  className="text-xs text-muted hover:text-foreground px-3"
                                >
                                  지우기
                                </button>
                              )}
                          </div>

                          {industryDropdownOpen && (
                            <div
                              id="industryResults"
                              role="listbox"
                              className="absolute left-0 right-0 top-full mt-1 z-20 bg-card border border-border max-h-80 overflow-y-auto shadow-card"
                            >
                              {filteredIndustries.length === 0 ? (
                                <button
                                  type="button"
                                  onClick={() => onSelectIndustry("other", currentStep === 2)}
                                  className="w-full text-left px-4 py-3 hover:bg-surface transition-colors"
                                >
                                  <strong className="block text-sm">기타·잘 모르겠음</strong>
                                  <span className="block text-xs text-muted mt-0.5">
                                    일반 업종 기준으로 먼저 계산하고, 상담 중에 조정합니다.
                                  </span>
                                </button>
                              ) : (
                                filteredIndustries.map((industry) => {
                                  const isSelected = industry.id === selectedIndustry.id;
                                  return (
                                    <button
                                      key={industry.id}
                                      type="button"
                                      role="option"
                                      aria-selected={isSelected}
                                      onClick={() => onSelectIndustry(industry.id, currentStep === 2)}
                                      className={`w-full text-left px-4 py-3 border-b border-border last:border-b-0 transition-colors ${
                                        isSelected ? "bg-surface" : "hover:bg-surface"
                                      }`}
                                    >
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                          <strong className="block text-sm">
                                            {industry.label}
                                          </strong>
                                          <span className="block text-xs text-muted mt-0.5 leading-relaxed">
                                            {industry.description}
                                          </span>
                                        </div>
                                        <span className="flex-shrink-0 text-[0.65rem] uppercase tracking-wider text-subtle">
                                          {COMPLEXITY[industry.complexity].label}
                                        </span>
                                      </div>
                                    </button>
                                  );
                                })
                              )}
                            </div>
                          )}
                        </div>

                        <div className="bg-surface border border-border px-4 py-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[0.65rem] uppercase tracking-[0.15em] px-2 py-0.5 border border-border bg-card text-muted">
                              {COMPLEXITY[selectedIndustry.complexity].label}
                            </span>
                            <strong className="text-sm">{selectedIndustry.label}</strong>
                          </div>
                          <p className="text-xs text-muted leading-relaxed">
                            {selectedIndustry.description}
                          </p>
                        </div>

                        <NextButton onClick={() => advanceToStep(3)} label="다음 질문" />
                      </>
                    )}

                    {/* ─ Step 3: Revenue ─ */}
                    {step.id === 3 && (
                      <>
                        <p className="text-xs text-muted leading-relaxed">
                          자주 쓰는 구간은 슬라이더로, 더 정확한 숫자가 있으면 직접 입력으로 바꿔도 됩니다.
                        </p>

                        <div className="bg-surface border border-border p-4 md:p-5">
                          <div className="flex items-baseline justify-between mb-3">
                            <span className="text-xs text-muted uppercase tracking-wider">
                              현재 선택한 연매출
                            </span>
                            <strong className="text-2xl font-bold tabular-nums">
                              {state.revenue > 0 ? formatRevenueLabel(state.revenue) : "미입력"}
                            </strong>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={REVENUE_OPTIONS.length - 1}
                            step={1}
                            value={revenueIndex}
                            onChange={(e) => {
                              const idx = Number(e.target.value);
                              dispatch({ type: "setRevenue", value: REVENUE_OPTIONS[idx] ?? REVENUE_OPTIONS[0] });
                            }}
                            className="w-full accent-foreground"
                            aria-label="연매출 슬라이더"
                          />
                          <div className="flex justify-between text-[0.65rem] text-subtle mt-1 uppercase tracking-wider">
                            <span>5천만</span>
                            <span>3억</span>
                            <span>10억</span>
                            <span>100억</span>
                          </div>
                          <p className="mt-3 text-xs text-muted leading-relaxed">
                            {state.revenue > 0
                              ? `${monthlyTier} 구간 기준으로 계산합니다.`
                              : "연매출을 넣으면 즉시 계산됩니다."}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {REVENUE_PRESETS.map((amount) => {
                            const isActive = state.revenue === amount;
                            return (
                              <button
                                key={amount}
                                type="button"
                                onClick={() => dispatch({ type: "setRevenue", value: amount })}
                                className={`text-xs px-3 py-1.5 border transition-colors ${
                                  isActive
                                    ? "border-foreground bg-foreground text-white"
                                    : "border-border hover:border-strong text-muted"
                                }`}
                              >
                                {formatRevenueLabel(amount)}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setRevenueDirectOpen((open) => !open);
                            window.requestAnimationFrame(() => revenueInputRef.current?.focus());
                          }}
                          className="text-xs text-muted hover:text-foreground underline underline-offset-4"
                        >
                          {revenueDirectOpen ? "슬라이더로 입력하기" : "정확한 숫자 직접 입력"}
                        </button>

                        {revenueDirectOpen && (
                          <div className="flex items-center border border-border bg-card focus-within:border-foreground">
                            <input
                              ref={revenueInputRef}
                              type="text"
                              inputMode="numeric"
                              autoComplete="off"
                              value={state.revenue > 0 ? formatNumber(state.revenue) : ""}
                              onChange={(e) =>
                                dispatch({ type: "setRevenue", value: parseCurrencyInput(e.target.value) })
                              }
                              className="flex-1 px-4 py-3 text-sm bg-transparent outline-none tabular-nums"
                              placeholder="0"
                            />
                            <span className="px-4 text-sm text-muted">원</span>
                          </div>
                        )}

                        <NextButton
                          onClick={() => advanceToStep(4)}
                          label="다음 질문"
                          disabled={state.revenue <= 0}
                        />
                      </>
                    )}

                    {/* ─ Step 4: Staff + payroll ─ */}
                    {step.id === 4 && (
                      <>
                        <p className="text-xs text-muted leading-relaxed">
                          월 업무량과 연말정산 범위에 영향을 주는 핵심 항목만 따로 묻습니다.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-surface border border-border p-4 md:p-5">
                            <div className="flex items-baseline justify-between mb-3">
                              <span className="text-xs text-muted uppercase tracking-wider">
                                직원 수
                              </span>
                              <strong className="text-2xl font-bold tabular-nums">
                                {formatStaffCount(state.staffCount)}
                              </strong>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={STAFF_RANGE_MAX}
                              step={1}
                              value={state.staffCount}
                              onChange={(e) => dispatch({ type: "setStaff", value: Number(e.target.value) })}
                              className="w-full accent-foreground"
                              aria-label="직원 수 슬라이더"
                            />
                            <div className="flex justify-between text-[0.65rem] text-subtle mt-1 uppercase tracking-wider">
                              <span>0</span>
                              <span>5</span>
                              <span>10</span>
                              <span>30+</span>
                            </div>
                            <p className="mt-3 text-xs text-muted leading-relaxed">
                              대표 제외, 원천세 신고 대상 인원 기준입니다.
                            </p>
                          </div>

                          <div>
                            <div className="mb-2">
                              <p className="text-xs text-muted uppercase tracking-wider">
                                급여 형태
                              </p>
                            </div>
                            <div className="space-y-2">
                              {(["none", "simple", "fourInsurance"] as const).map((mode) => {
                                const isSelected = state.payrollMode === mode;
                                const labels = {
                                  none: { title: "급여 없음", desc: "원천세와 연말정산이 없는 경우" },
                                  simple: { title: "간단 급여", desc: "급여 지급은 있으나 4대보험 업무는 단순한 경우" },
                                  fourInsurance: {
                                    title: "4대보험 포함",
                                    desc: "입퇴사, 보수총액, 4대보험 연계 업무까지 포함",
                                  },
                                };
                                return (
                                  <button
                                    key={mode}
                                    type="button"
                                    onClick={() => dispatch({ type: "setPayrollMode", value: mode })}
                                    className={`w-full text-left px-3 py-3 border transition-colors ${
                                      isSelected
                                        ? "border-foreground bg-surface"
                                        : "border-border hover:border-strong"
                                    }`}
                                    aria-pressed={isSelected}
                                  >
                                    <strong className="block text-sm">{labels[mode].title}</strong>
                                    <span className="block text-xs text-muted mt-0.5 leading-relaxed">
                                      {labels[mode].desc}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {STAFF_PRESETS.map((count) => {
                            const isActive = state.staffCount === count;
                            return (
                              <button
                                key={count}
                                type="button"
                                onClick={() => dispatch({ type: "setStaff", value: count })}
                                className={`text-xs px-3 py-1.5 border transition-colors ${
                                  isActive
                                    ? "border-foreground bg-foreground text-white"
                                    : "border-border hover:border-strong text-muted"
                                }`}
                              >
                                {count >= 30 ? "30명+" : `${count}명`}
                              </button>
                            );
                          })}
                        </div>

                        <NextButton onClick={() => advanceToStep(5)} label="다음 질문" />
                      </>
                    )}

                    {/* ─ Step 5: Setup mode ─ */}
                    {step.id === 5 && (
                      <>
                        <p className="text-xs text-muted leading-relaxed">
                          첫 해 1회성 세팅비만 반영합니다. 월 기장료 구조는 그대로 유지됩니다.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(Object.keys(SETUP_MODES) as SetupModeKey[]).map((key) => {
                            const mode = SETUP_MODES[key];
                            const isSelected = state.setupMode === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => {
                                  dispatch({ type: "setSetupMode", value: key });
                                  if (currentStep === 5) advanceToStep(6);
                                }}
                                className={`text-left px-4 py-4 border transition-colors ${
                                  isSelected
                                    ? "border-foreground bg-surface"
                                    : "border-border hover:border-strong"
                                }`}
                                aria-pressed={isSelected}
                              >
                                <div className="flex items-baseline justify-between gap-2">
                                  <strong className="text-sm">{mode.label}</strong>
                                  <span className="text-xs text-muted tabular-nums">
                                    {mode.once > 0 ? `+${formatCompactWon(mode.once)}` : "0원"}
                                  </span>
                                </div>
                                <span className="block text-xs text-muted mt-1 leading-relaxed">
                                  {mode.description}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <NextButton onClick={() => advanceToStep(6)} label="마지막 질문" />
                      </>
                    )}

                    {/* ─ Step 6: Add-ons + flags ─ */}
                    {step.id === 6 && (
                      <>
                        <p className="text-xs text-muted leading-relaxed">
                          반복성 있는 추가 대행업무만 체크하세요. 복잡한 예외는 별도 협의 상태로만 표시합니다.
                        </p>

                        <div>
                          <p className="text-[0.7rem] uppercase tracking-[0.15em] text-muted mb-2">
                            추가 대행업무
                          </p>
                          <div className="grid grid-cols-1 gap-2">
                            {ADD_ONS.map((addon) => {
                              const isSelected = state.addOns.includes(addon.id);
                              return (
                                <button
                                  key={addon.id}
                                  type="button"
                                  onClick={() => dispatch({ type: "toggleAddOn", id: addon.id })}
                                  className={`text-left px-4 py-3 border transition-colors flex items-start gap-3 ${
                                    isSelected
                                      ? "border-foreground bg-surface"
                                      : "border-border hover:border-strong"
                                  }`}
                                  aria-pressed={isSelected}
                                >
                                  <span
                                    className={`mt-0.5 w-4 h-4 border flex items-center justify-center text-[10px] flex-shrink-0 ${
                                      isSelected ? "bg-foreground border-foreground text-white" : "border-border"
                                    }`}
                                  >
                                    {isSelected ? "✓" : ""}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <strong className="block text-sm">{addon.title}</strong>
                                    <span className="block text-xs text-muted mt-0.5 leading-relaxed">
                                      {addon.description}
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted tabular-nums flex-shrink-0">
                                    월 {formatCompactWon(addon.monthly)}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <p className="text-[0.7rem] uppercase tracking-[0.15em] text-muted mb-2">
                            별도 협의가 필요한 경우
                          </p>
                          <div className="grid grid-cols-1 gap-2">
                            {CUSTOM_FLAGS.map((flag) => {
                              const isSelected = state.customFlags.includes(flag.id);
                              return (
                                <button
                                  key={flag.id}
                                  type="button"
                                  onClick={() => dispatch({ type: "toggleFlag", id: flag.id })}
                                  className={`text-left px-4 py-3 border transition-colors flex items-start gap-3 ${
                                    isSelected
                                      ? "border-foreground bg-surface"
                                      : "border-border hover:border-strong"
                                  }`}
                                  aria-pressed={isSelected}
                                >
                                  <span
                                    className={`mt-0.5 w-4 h-4 border flex items-center justify-center text-[10px] flex-shrink-0 ${
                                      isSelected ? "bg-foreground border-foreground text-white" : "border-border"
                                    }`}
                                  >
                                    {isSelected ? "✓" : ""}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <strong className="block text-sm">{flag.title}</strong>
                                    <span className="block text-xs text-muted mt-0.5 leading-relaxed">
                                      {flag.description}
                                    </span>
                                  </div>
                                  <span className="text-[0.65rem] uppercase tracking-wider text-subtle flex-shrink-0">
                                    별도 협의
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <NextButton
                          onClick={() => {
                            setUnlockedStep(TOTAL_STEPS);
                            setCurrentStep(TOTAL_STEPS);
                            const panel = document.getElementById("pricingResultPanel");
                            panel?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          label="견적 보기"
                        />
                      </>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-6 bg-surface border border-border p-4 md:p-5">
          <strong className="block text-xs uppercase tracking-[0.15em] text-muted mb-2">
            기본 가정
          </strong>
          <p className="text-xs text-muted leading-relaxed">
            자료는 기한 내에 전달되고, 장부가 완전히 누락되어 있지 않으며, 월 단위 자료 전달과
            통상적인 질의응답 범위를 전제로 계산합니다.
          </p>
        </div>
      </section>

      {/* ─── Result panel ─── */}
      <aside
        id="pricingResultPanel"
        className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24 self-start"
      >
        <div className="bg-card border border-border">
          <div className="px-5 md:px-6 pt-6 pb-5 border-b border-border">
            <span
              className={`inline-block text-[0.65rem] uppercase tracking-[0.15em] px-2 py-1 border ${
                estimate.isCustom || estimate.needsRevenue
                  ? "border-accent-bright text-accent bg-surface"
                  : "border-border text-muted"
              }`}
            >
              {estimate.needsRevenue
                ? "연매출 입력 필요"
                : estimate.isCustom
                  ? "별도 협의 조건 있음"
                  : "즉시 계산 가능"}
            </span>
            <h2 className="mt-3 text-2xl md:text-[1.625rem] font-bold tracking-tight">
              {estimate.needsRevenue
                ? "입력이 필요합니다"
                : estimate.isCustom
                  ? "예상 시작가와 상담 포인트"
                  : "예상 보수"}
            </h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {estimate.needsRevenue
                ? "연매출을 넣으면 월 기장료와 연 신고료가 바로 계산됩니다."
                : estimate.isCustom
                  ? "체크한 조건은 표준 계산 범위를 넘어가므로, 아래 금액은 시작가 기준입니다."
                  : "질문형 입력 기준으로 정리한 공개용 추정치입니다."}
            </p>
          </div>

          {/* Total card */}
          <div className="px-5 md:px-6 py-6 border-b border-border">
            <span className="text-[0.7rem] uppercase tracking-[0.15em] text-muted">
              {estimate.needsRevenue
                ? "연매출 입력 후 계산"
                : estimate.isCustom
                  ? "예상 월 기장료 시작가"
                  : "예상 월 기장료"}
            </span>
            <strong className="block mt-2 text-4xl md:text-5xl font-bold tracking-tighter tabular-nums">
              {estimate.needsRevenue ? "-" : formatCompactWon(estimate.monthlyTotal)}
            </strong>
            <p className="mt-2 text-xs text-muted">
              {estimate.needsRevenue ? "연매출을 입력하면 계산됩니다" : `${formatWon(estimate.monthlyTotal)} / VAT 별도`}
            </p>
          </div>

          {/* Mini metric grid */}
          <div className="grid grid-cols-2 border-b border-border">
            <MiniMetric
              label="연 신고/조정료"
              value={estimate.needsRevenue ? "-" : formatWon(estimate.annualTotal)}
              borderRight
            />
            <MiniMetric
              label="초기 세팅비"
              value={
                estimate.needsRevenue
                  ? "-"
                  : estimate.setupFee > 0
                    ? formatWon(estimate.setupFee)
                    : "해당 없음"
              }
              note={estimate.needsRevenue ? undefined : estimate.setupAdvisory || undefined}
            />
            <MiniMetric
              label="첫 해 총 예상액"
              value={estimate.needsRevenue ? "-" : formatWon(estimate.firstYearTotal)}
              borderRight
              borderTop
            />
            <MiniMetric
              label="월 환산 총액"
              value={estimate.needsRevenue ? "-" : formatWon(estimate.monthlyEquivalent)}
              borderTop
            />
            <div className="col-span-2 border-t border-border px-4 py-3 bg-surface">
              <span className="text-[0.65rem] uppercase tracking-[0.15em] text-muted">산정 기준</span>
              <strong className="block text-sm mt-1 leading-snug">
                {PRICING[state.businessType].label} · {selectedIndustry.label} (
                {COMPLEXITY[state.complexity].label})
              </strong>
            </div>
          </div>

          {/* CTA */}
          <div className="px-5 md:px-6 py-5 border-b border-border">
            <strong className="block text-sm">
              이 견적을 바로 전달하거나 상담으로 이어갈 수 있습니다.
            </strong>
            <p
              className={`mt-1 text-xs leading-relaxed ${
                ctaMessage?.tone === "success"
                  ? "text-accent"
                  : ctaMessage?.tone === "error"
                    ? "text-red-700"
                    : "text-muted"
              }`}
            >
              {ctaMessage?.text ??
                "공유 링크 복사 또는 문의 내용 복사로 지금 상태를 바로 전달할 수 있습니다."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onShareLink}
                className="text-xs font-medium tracking-wider uppercase px-4 py-2.5 bg-foreground text-white hover:bg-strong transition-colors"
              >
                견적 링크 복사
              </button>
              <button
                type="button"
                onClick={onCopyInquiry}
                className="text-xs font-medium tracking-wider uppercase px-4 py-2.5 border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
              >
                문의 내용 복사
              </button>
              <a
                href="/contact"
                className="text-xs font-medium tracking-wider uppercase px-4 py-2.5 border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
              >
                상담 신청
              </a>
            </div>
          </div>

          {/* Breakdown */}
          <div className="px-5 md:px-6 py-5 border-b border-border">
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-sm font-bold tracking-tight uppercase tracking-[0.1em]">
                산정 내역
              </h3>
              <button
                type="button"
                onClick={onCopySummary}
                className="text-[0.7rem] uppercase tracking-wider text-muted hover:text-foreground"
              >
                요약 복사
              </button>
            </div>
            {estimate.needsRevenue ? (
              <p className="text-sm text-muted">
                연매출을 입력하면 월 기장료, 연 신고료, 첫 해 총액을 바로 계산합니다.
              </p>
            ) : (
              <ul className="space-y-3">
                {estimate.breakdown.map((item, i) => (
                  <li
                    key={`${item.title}-${i}`}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <div className="min-w-0">
                      <strong className="block">{item.title}</strong>
                      <span className="block text-xs text-muted mt-0.5 leading-relaxed">
                        {item.description}
                      </span>
                    </div>
                    <span className="flex-shrink-0 tabular-nums text-right">
                      <span className="text-xs text-muted">{formatCadenceLabel(item.cadence)}</span>
                      {formatCompactWon(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Included */}
          <div className="px-5 md:px-6 py-5 border-b border-border">
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] mb-3">
              이 금액에 포함된 기본 범위
            </h3>
            <ul className="space-y-2">
              {PRICING[state.businessType].included.map((item) => (
                <li key={item.title} className="text-sm">
                  <strong className="block">{item.title}</strong>
                  <span className="block text-xs text-muted mt-0.5 leading-relaxed">
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          <div className="px-5 md:px-6 py-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] mb-3">설명 및 전제</h3>
            <ul className="space-y-2 text-xs text-muted leading-relaxed">
              <li>
                <strong className="text-foreground">업종 매핑.</strong> {selectedIndustry.label}는{" "}
                {COMPLEXITY[state.complexity].label} 기준으로 계산했습니다.
              </li>
              <li>
                <strong className="text-foreground">단가 기준.</strong> 내부 단가표와 기존 보수표에서
                공개 가능한 항목만 남겨 단순화한 추정치입니다.
              </li>
              <li>
                <strong className="text-foreground">부가세.</strong> 표시 금액은 모두 부가세 별도입니다.
              </li>
              <li>
                <strong className="text-foreground">자료 상태.</strong> 자료 누락이 크지 않고 월 단위
                전달이 이루어진다는 가정을 둡니다.
              </li>
              <li>
                <strong className="text-foreground">공유 가능.</strong> 현재 입력값은 링크에 저장되므로
                같은 조건을 다른 사람에게 그대로 전달할 수 있습니다.
              </li>
              {estimate.isCustom && !estimate.needsRevenue && (
                <li>
                  <strong className="text-foreground">별도 협의 사유.</strong>{" "}
                  {estimate.customReasons.join(", ")}
                </li>
              )}
              {!estimate.isCustom && !estimate.needsRevenue && (
                <li>
                  <strong className="text-foreground">별도 협의로 넘어가는 경우.</strong> 외감, 연결,
                  해외거래, 수정신고, 매출 구간 초과는 상담 후 확정합니다.
                </li>
              )}
              {estimate.setupFee > 0 && (
                <li>
                  <strong className="text-foreground">초기 세팅비.</strong>{" "}
                  {SETUP_MODES[state.setupMode].label} 상태가 반영된 1회성 세팅비{" "}
                  {formatWon(estimate.setupFee)}이 첫 해 총액에 포함됩니다.
                </li>
              )}
              {estimate.setupAdvisory && (
                <li>
                  <strong className="text-foreground">복구 범위 안내.</strong> {estimate.setupAdvisory}
                </li>
              )}
              <li className="pt-2 text-subtle">
                {annualLabel(state.businessType)} 기준으로 연 신고료를 산정합니다.
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ─── Subcomponents ─── */

function NextButton({
  onClick,
  label,
  disabled = false,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="text-xs font-medium tracking-wider uppercase px-5 py-2.5 bg-foreground text-white hover:bg-strong transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {label} →
      </button>
    </div>
  );
}

function MiniMetric({
  label,
  value,
  note,
  borderRight = false,
  borderTop = false,
}: {
  label: string;
  value: string;
  note?: string;
  borderRight?: boolean;
  borderTop?: boolean;
}) {
  return (
    <div
      className={`px-4 py-4 ${borderRight ? "border-r border-border" : ""} ${
        borderTop ? "border-t border-border" : ""
      }`}
    >
      <span className="text-[0.65rem] uppercase tracking-[0.15em] text-muted">{label}</span>
      <strong className="block text-sm md:text-base mt-1 tabular-nums">{value}</strong>
      {note && <p className="text-[0.65rem] text-subtle mt-1 leading-relaxed">{note}</p>}
    </div>
  );
}

function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}
