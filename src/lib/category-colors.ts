/**
 * 세법 카테고리별 컬러 매핑.
 * Tailwind 클래스를 직접 반환하므로 purge 대상에 포함되도록
 * 클래스명을 완전한 문자열로 유지합니다.
 */

export interface CategoryStyle {
  bg: string;
  text: string;
  /** 다크 배경(히어로 등)에서 사용 */
  bgDark: string;
  textDark: string;
}

const STYLES: Record<string, CategoryStyle> = {
  법인세: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    bgDark: "bg-blue-500/20",
    textDark: "text-blue-300",
  },
  소득세: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    bgDark: "bg-emerald-500/20",
    textDark: "text-emerald-300",
  },
  부가가치세: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    bgDark: "bg-amber-500/20",
    textDark: "text-amber-300",
  },
  "상속·증여세": {
    bg: "bg-purple-50",
    text: "text-purple-700",
    bgDark: "bg-purple-500/20",
    textDark: "text-purple-300",
  },
  "원천세·4대보험": {
    bg: "bg-rose-50",
    text: "text-rose-700",
    bgDark: "bg-rose-500/20",
    textDark: "text-rose-300",
  },
  세무일반: {
    bg: "bg-neutral-100",
    text: "text-neutral-600",
    bgDark: "bg-white/10",
    textDark: "text-neutral-300",
  },
  자문철학: {
    bg: "bg-slate-100",
    text: "text-slate-600",
    bgDark: "bg-white/10",
    textDark: "text-slate-300",
  },
};

const FALLBACK: CategoryStyle = {
  bg: "bg-neutral-100",
  text: "text-neutral-600",
  bgDark: "bg-white/10",
  textDark: "text-neutral-300",
};

export function getCategoryStyle(category: string): CategoryStyle {
  return STYLES[category] ?? FALLBACK;
}

export function categoryBadgeClass(category: string, dark = false): string {
  const s = getCategoryStyle(category);
  return dark ? `${s.bgDark} ${s.textDark}` : `${s.bg} ${s.text}`;
}
