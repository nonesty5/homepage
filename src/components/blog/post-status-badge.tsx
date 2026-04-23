import type { PostStatus } from "@/lib/posts";
import {
  getPostStatusCopy,
  shouldShowStatusBadge,
} from "@/lib/content-system";

interface Props {
  status?: PostStatus;
  className?: string;
}

export default function PostStatusBadge({ status, className = "" }: Props) {
  if (!shouldShowStatusBadge(status)) {
    return null;
  }

  const copy = getPostStatusCopy(status);
  if (!copy) {
    return null;
  }

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-wider",
        copy.badgeClassName,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {copy.label}
    </span>
  );
}
