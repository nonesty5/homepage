import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import MdxContent from "@/components/mdx/mdx-content";
import { getCategoryStyle } from "@/lib/category-colors";
import CopyUrlButton from "@/components/blog/copy-url-button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

function estimateReadingTime(content: string): number {
  // Rough estimate: ~200 chars per minute for Korean text
  const charCount = content.replace(/\s/g, "").length;
  const minutes = Math.ceil(charCount / 400);
  return Math.max(1, minutes);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const readingTime = estimateReadingTime(post.content);

  // Get related posts: same category first, then recent
  const allPosts = getAllPosts();
  const sameCategory = allPosts.filter(
    (p) => p.slug !== slug && p.category === post.meta.category
  );
  const otherCategory = allPosts.filter(
    (p) => p.slug !== slug && p.category !== post.meta.category
  );
  const otherPosts = [...sameCategory, ...otherCategory].slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-40 bg-foreground text-white">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb / Back Navigation */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-10 animate-fade-in">
            <Link href="/" className="hover:text-neutral-300 transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-neutral-300 transition-colors"
            >
              BLOG
            </Link>
            <span>/</span>
            <span className="text-neutral-300 line-clamp-1">
              {post.meta.title}
            </span>
          </nav>

          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block px-3 py-1 text-[10px] font-medium tracking-wider rounded-sm" style={getCategoryStyle(post.meta.category, true)}>
                {post.meta.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {post.meta.title}
            </h1>
            <div className="mt-6 h-0.5 w-16 bg-accent-bright animate-line-reveal" />
            <div className="mt-6 flex items-center gap-4 text-sm text-neutral-500">
              <span>{post.meta.date}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-600" />
              <span>{readingTime}분 소요</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.meta.coverImage && (
        <section className="pt-12 md:pt-16">
          <div className="max-w-3xl mx-auto px-6">
            <img
              src={post.meta.coverImage}
              alt={post.meta.title}
              className="w-full rounded-lg border border-border"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <article className="max-w-3xl mx-auto px-6 prose">
          <MdxContent source={post.content} />
        </article>
      </section>

      {/* Share / Back Section */}
      <section className="py-12 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium tracking-wider text-muted hover:text-foreground transition-colors"
            >
              <span className="mr-2">&larr;</span>
              블로그 목록으로
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-xs text-subtle tracking-wider uppercase">
                Share
              </span>
              <CopyUrlButton />
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="py-20 md:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-lg font-bold tracking-tight mb-10 text-center">
              다른 글 읽기
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group border border-border bg-white hover:border-foreground transition-all duration-300 hover-lift"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-2.5 py-1 text-[10px] font-medium tracking-wider rounded-sm" style={getCategoryStyle(p.category)}>
                        {p.category}
                      </span>
                      <span className="text-xs text-subtle">{p.date}</span>
                    </div>
                    <h4 className="font-bold leading-snug group-hover:underline decoration-1 underline-offset-4">
                      {p.title}
                    </h4>
                    <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-20 bg-foreground text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-neutral-400 mb-6 leading-relaxed">
            이 글에 대한 문의사항이 있으시면 연락해 주세요.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center px-8 py-4 bg-white text-foreground text-sm font-medium tracking-wider transition-all duration-300 hover:bg-neutral-200"
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
