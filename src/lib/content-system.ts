import type { PostStatus } from "@/lib/posts";
import { siteConfig } from "@/lib/constants";

export interface PostStatusCopy {
  label: string;
  description: string;
  badgeClassName: string;
  panelClassName: string;
}

const postStatusCopy: Record<PostStatus, PostStatusCopy> = {
  evergreen: {
    label: "상시 유효",
    description: "시의성보다 원리 중심으로 읽어도 되는 글입니다.",
    badgeClassName:
      "border-emerald-400/30 bg-emerald-500/10 text-emerald-100",
    panelClassName:
      "border-emerald-400/30 bg-emerald-500/10 text-emerald-50",
  },
  proposal: {
    label: "개정안",
    description:
      "시행 전 단계의 내용입니다. 실제 적용 전에는 최신 법령과 공고를 다시 확인해야 합니다.",
    badgeClassName: "border-amber-400/30 bg-amber-500/10 text-amber-100",
    panelClassName: "border-amber-400/30 bg-amber-500/10 text-amber-50",
  },
  announced: {
    label: "발표",
    description:
      "정부나 기관 발표를 기준으로 정리한 글입니다. 시행 여부와 세부 문구는 후속 고시로 달라질 수 있습니다.",
    badgeClassName: "border-sky-400/30 bg-sky-500/10 text-sky-100",
    panelClassName: "border-sky-400/30 bg-sky-500/10 text-sky-50",
  },
  effective: {
    label: "시행 중",
    description: "현재 시행 중인 기준으로 정리한 글입니다.",
    badgeClassName: "border-violet-400/30 bg-violet-500/10 text-violet-100",
    panelClassName: "border-violet-400/30 bg-violet-500/10 text-violet-50",
  },
  "review-needed": {
    label: "재검토 필요",
    description:
      "내용 재검토가 필요한 글입니다. 실무 적용 전에 반드시 최신 근거를 다시 확인해야 합니다.",
    badgeClassName: "border-rose-400/30 bg-rose-500/10 text-rose-100",
    panelClassName: "border-rose-400/30 bg-rose-500/10 text-rose-50",
  },
  archived: {
    label: "보관",
    description:
      "현재 기준이 아니라 과거 맥락을 남겨두기 위한 글입니다. 최신 판단 기준으로 직접 쓰면 안 됩니다.",
    badgeClassName: "border-neutral-500/40 bg-neutral-500/10 text-neutral-200",
    panelClassName:
      "border-neutral-500/40 bg-neutral-500/10 text-neutral-100",
  },
};

export function getPostStatusCopy(status?: PostStatus) {
  if (!status) {
    return undefined;
  }

  return postStatusCopy[status];
}

export function shouldShowStatusBadge(status?: PostStatus) {
  return false;
}

export function formatContentDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const [year, month, day] = value.split("-").map(Number);
  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day)
  ) {
    return value;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function getPostUrl(slug: string) {
  return new URL(`/blog/${slug}`, siteConfig.url).toString();
}

export function getAbsoluteAssetUrl(path?: string) {
  if (!path) {
    return undefined;
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return new URL(path, siteConfig.url).toString();
}

export function getSourceKindLabel(kind?: string) {
  switch (kind) {
    case "law":
      return "법령";
    case "guidance":
      return "행정안내";
    case "news":
      return "보도자료";
    case "internal":
      return "내부정리";
    default:
      return undefined;
  }
}
