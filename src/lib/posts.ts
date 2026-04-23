import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

const validPostStatuses = [
  "evergreen",
  "proposal",
  "announced",
  "effective",
  "review-needed",
  "archived",
] as const;

export type PostStatus = (typeof validPostStatuses)[number];

export interface PostSourceLink {
  label: string;
  url: string;
  kind?: string;
  note?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  published: boolean;
  author?: string;
  updatedAt?: string;
  lastChecked?: string;
  status?: PostStatus;
  effectiveFrom?: string;
  coverImage?: string;
  sourceLinks: PostSourceLink[];
  relatedSlugs: string[];
  keywords: string[];
}

export interface PostData {
  meta: PostMeta;
  content: string;
}

function toOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isPostStatus(value: unknown): value is PostStatus {
  return (
    typeof value === "string" &&
    validPostStatuses.includes(value as PostStatus)
  );
}

function toSourceLinks(value: unknown): PostSourceLink[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const candidate = item as Record<string, unknown>;
    const label = toOptionalString(candidate.label);
    const url = toOptionalString(candidate.url);

    if (!label || !url) {
      return [];
    }

    return [
      {
        label,
        url,
        kind: toOptionalString(candidate.kind),
        note: toOptionalString(candidate.note),
      },
    ];
  });
}

function parsePostMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: toOptionalString(data.title) ?? "",
    description: toOptionalString(data.description) ?? "",
    date: toOptionalString(data.date) ?? "",
    category: toOptionalString(data.category) ?? "기타",
    published: data.published !== false,
    author: toOptionalString(data.author),
    updatedAt: toOptionalString(data.updatedAt),
    lastChecked: toOptionalString(data.lastChecked),
    status: isPostStatus(data.status) ? data.status : undefined,
    effectiveFrom: toOptionalString(data.effectiveFrom),
    coverImage: toOptionalString(data.coverImage),
    sourceLinks: toSourceLinks(data.sourceLinks),
    relatedSlugs: toStringArray(data.relatedSlugs),
    keywords: toStringArray(data.keywords),
  };
}

function comparePostDates(a: PostMeta, b: PostMeta) {
  if (a.date === b.date) {
    return a.slug.localeCompare(b.slug);
  }

  return a.date > b.date ? -1 : 1;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return parsePostMeta(slug, data as Record<string, unknown>);
    })
    .filter((post) => post.published)
    .sort(comparePostDates);
}

export function getPostBySlug(slug: string): PostData | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const meta = parsePostMeta(slug, data as Record<string, unknown>);

  if (!meta.published) {
    return null;
  }

  return {
    meta,
    content,
  };
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  return ["전체", ...categories];
}

function getKeywordOverlap(currentPost: PostMeta, candidate: PostMeta) {
  const currentKeywords = new Set(currentPost.keywords);

  return candidate.keywords.reduce((count, keyword) => {
    return currentKeywords.has(keyword) ? count + 1 : count;
  }, 0);
}

export function getRelatedPosts(
  currentPost: PostMeta,
  posts: PostMeta[] = getAllPosts(),
  limit = 3
): PostMeta[] {
  const manualOrder = new Map(
    currentPost.relatedSlugs.map((slug, index) => [slug, index])
  );

  return posts
    .filter((post) => post.slug !== currentPost.slug && post.published)
    .map((post) => {
      const manualIndex = manualOrder.get(post.slug);
      const manualScore =
        manualIndex !== undefined ? 1000 - manualIndex * 10 : 0;
      const categoryScore = post.category === currentPost.category ? 100 : 0;
      const keywordScore = getKeywordOverlap(currentPost, post) * 10;

      return {
        post,
        score: manualScore + categoryScore + keywordScore,
      };
    })
    .sort((a, b) => {
      if (a.score === b.score) {
        return comparePostDates(a.post, b.post);
      }

      return b.score - a.score;
    })
    .slice(0, limit)
    .map(({ post }) => post);
}
