import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import MdxContent from "@/components/mdx/mdx-content";

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            ← 블로그 목록
          </Link>
          <div className="mt-8">
            <span className="text-xs font-medium tracking-wider text-neutral-400">
              {post.meta.category}
            </span>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {post.meta.title}
            </h1>
            <p className="mt-4 text-neutral-400">{post.meta.date}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <article className="max-w-3xl mx-auto px-6">
          <MdxContent source={post.content} />
        </article>
      </section>

      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-muted mb-4">
            이 글에 대한 문의사항이 있으시면 연락해 주세요.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-foreground text-white text-sm font-medium tracking-wider hover:bg-neutral-800 transition-colors"
          >
            문의하기
          </Link>
        </div>
      </section>
    </>
  );
}
