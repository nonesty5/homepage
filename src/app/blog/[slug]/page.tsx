import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyUrlButton from "@/components/blog/copy-url-button";
import PostStatusBadge from "@/components/blog/post-status-badge";
import MdxContent from "@/components/mdx/mdx-content";
import {
  formatContentDate,
  getAbsoluteAssetUrl,
  getPostStatusCopy,
  getPostUrl,
  getSourceKindLabel,
} from "@/lib/content-system";
import { getCategoryStyle } from "@/lib/category-colors";
import { siteConfig } from "@/lib/constants";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

function toIsoDate(value?: string) {
  return value ? `${value}T00:00:00+09:00` : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }

  const articleUrl = getPostUrl(post.meta.slug);
  const image = getAbsoluteAssetUrl(post.meta.coverImage);
  const modifiedTime = toIsoDate(
    post.meta.updatedAt ?? post.meta.lastChecked ?? post.meta.date
  );
  const publishedTime = toIsoDate(post.meta.date);

  return {
    title: post.meta.title,
    description: post.meta.description,
    authors: [{ name: post.meta.author ?? siteConfig.founder }],
    keywords: post.meta.keywords,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: "article",
      url: articleUrl,
      title: post.meta.title,
      description: post.meta.description,
      publishedTime,
      modifiedTime,
      authors: [post.meta.author ?? siteConfig.founder],
      tags: post.meta.keywords,
      images: image ? [{ url: image, alt: post.meta.title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: post.meta.title,
      description: post.meta.description,
      images: image ? [image] : undefined,
    },
  };
}

function estimateReadingTime(content: string): number {
  const charCount = content.replace(/\s/g, "").length;
  const minutes = Math.ceil(charCount / 400);
  return Math.max(1, minutes);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = estimateReadingTime(post.content);
  const relatedPosts = getRelatedPosts(post.meta, getAllPosts(), 3);
  const statusCopy = getPostStatusCopy(post.meta.status);
  const articleUrl = getPostUrl(post.meta.slug);
  const coverImageUrl = getAbsoluteAssetUrl(post.meta.coverImage);

  const articleMeta = [
    { label: "작성자", value: post.meta.author ?? siteConfig.founder },
    { label: "발행일", value: formatContentDate(post.meta.date) ?? post.meta.date },
    post.meta.updatedAt
      ? {
          label: "업데이트",
          value: formatContentDate(post.meta.updatedAt) ?? post.meta.updatedAt,
        }
      : null,
    post.meta.lastChecked
      ? {
          label: "검토 기준일",
          value:
            formatContentDate(post.meta.lastChecked) ?? post.meta.lastChecked,
        }
      : null,
    statusCopy ? { label: "법적 상태", value: statusCopy.label } : null,
    post.meta.effectiveFrom
      ? {
          label: "적용 시점",
          value:
            formatContentDate(post.meta.effectiveFrom) ??
            post.meta.effectiveFrom,
        }
      : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: toIsoDate(post.meta.date),
    dateModified: toIsoDate(
      post.meta.updatedAt ?? post.meta.lastChecked ?? post.meta.date
    ),
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    image: coverImageUrl ? [coverImageUrl] : undefined,
    author: {
      "@type": "Person",
      name: post.meta.author ?? siteConfig.founder,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: post.meta.keywords.length > 0 ? post.meta.keywords.join(", ") : undefined,
    citation:
      post.meta.sourceLinks.length > 0
        ? post.meta.sourceLinks.map((source) => source.url)
        : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="bg-foreground py-32 text-white md:py-40">
        <div className="mx-auto max-w-3xl px-6">
          <nav className="mb-10 flex items-center gap-2 text-sm text-neutral-500 animate-fade-in">
            <Link href="/" className="transition-colors hover:text-neutral-300">
              HOME
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="transition-colors hover:text-neutral-300"
            >
              BLOG
            </Link>
            <span>/</span>
            <span className="line-clamp-1 text-neutral-300">{post.meta.title}</span>
          </nav>

          <div className="animate-fade-in">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className="inline-block rounded-sm px-3 py-1 text-[10px] font-medium tracking-wider"
                style={getCategoryStyle(post.meta.category, true)}
              >
                {post.meta.category}
              </span>
              <PostStatusBadge status={post.meta.status} />
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {post.meta.title}
            </h1>

            <div className="mt-6 h-0.5 w-16 bg-accent-bright animate-line-reveal" />

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <span>{formatContentDate(post.meta.date) ?? post.meta.date}</span>
              <span className="h-1 w-1 rounded-full bg-neutral-600" />
              <span>{readingTime}분 소요</span>
              {post.meta.updatedAt && (
                <>
                  <span className="h-1 w-1 rounded-full bg-neutral-600" />
                  <span>
                    업데이트{" "}
                    {formatContentDate(post.meta.updatedAt) ?? post.meta.updatedAt}
                  </span>
                </>
              )}
            </div>

            {statusCopy && post.meta.status !== "evergreen" && (
              <div
                className={`mt-8 rounded-2xl border px-5 py-4 ${statusCopy.panelClassName}`}
              >
                <p className="text-xs font-semibold tracking-[0.24em]">
                  STATUS
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  {statusCopy.description}
                </p>
              </div>
            )}

            <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {articleMeta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <dt className="text-[11px] font-medium tracking-[0.24em] text-neutral-400">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-white">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {post.meta.coverImage && (
        <section className="pt-12 md:pt-16">
          <div className="mx-auto max-w-3xl px-6">
            <img
              src={post.meta.coverImage}
              alt={post.meta.title}
              className="w-full rounded-lg border border-border"
            />
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <article className="prose mx-auto max-w-3xl px-6">
          <MdxContent source={post.content} />
        </article>
      </section>

      {post.meta.sourceLinks.length > 0 && (
        <section className="pb-12">
          <div className="mx-auto max-w-3xl px-6">
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-medium tracking-[0.28em] text-subtle">
                    SOURCES
                  </p>
                  <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground">
                    검토에 사용한 근거
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  공식 자료와 원문 링크를 함께 남깁니다.
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {post.meta.sourceLinks.map((source) => {
                  const kindLabel = getSourceKindLabel(source.kind);

                  return (
                    <li
                      key={`${source.label}-${source.url}`}
                      className="rounded-2xl border border-border bg-white p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent"
                        >
                          {source.label}
                        </a>
                        {kindLabel && (
                          <span className="rounded-full bg-card px-2.5 py-1 text-[10px] font-medium tracking-wider text-subtle">
                            {kindLabel}
                          </span>
                        )}
                      </div>
                      {source.note && (
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {source.note}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium tracking-wider text-muted transition-colors hover:text-foreground"
            >
              <span className="mr-2">&larr;</span>
              블로그 목록으로
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider text-subtle">
                Share
              </span>
              <CopyUrlButton />
            </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="bg-card py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h3 className="mb-10 text-center text-lg font-bold tracking-tight">
              관련 글
            </h3>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group border border-border bg-white transition-all duration-300 hover:border-foreground hover-lift"
                >
                  <div className="p-8">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span
                        className="inline-block rounded-sm px-2.5 py-1 text-[10px] font-medium tracking-wider"
                        style={getCategoryStyle(relatedPost.category)}
                      >
                        {relatedPost.category}
                      </span>
                      <PostStatusBadge status={relatedPost.status} />
                      <span className="text-xs text-subtle">
                        {relatedPost.date}
                      </span>
                    </div>
                    <h4 className="font-bold leading-snug decoration-1 underline-offset-4 group-hover:underline">
                      {relatedPost.title}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {relatedPost.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-foreground py-16 text-white md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-6 leading-relaxed text-neutral-400">
            글 내용이 현재 상황에 바로 적용되는지 확인이 필요하면 상담으로 이어서 보겠습니다.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center bg-white px-8 py-4 text-sm font-medium tracking-wider text-foreground transition-all duration-300 hover:bg-neutral-200"
          >
            문의하기
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
