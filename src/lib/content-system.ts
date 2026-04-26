import { siteConfig } from "@/lib/constants";

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
