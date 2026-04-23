"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AnimateOnScroll,
  LineReveal,
  StaggerChildren,
} from "@/components/motion";
import { StaggerItem } from "@/components/motion/stagger-item";
import PostStatusBadge from "@/components/blog/post-status-badge";
import { getCategoryStyle } from "@/lib/category-colors";
import type { PostStatus } from "@/lib/posts";

interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  status?: PostStatus;
  coverImage?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [categories, setCategories] = useState<string[]>(["전체"]);
  const [activeCategory, setActiveCategory] = useState("전체");

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        const nextCategories = Array.from(
          new Set(data.posts.map((post: PostMeta) => post.category))
        ) as string[];
        setCategories(["전체", ...nextCategories]);
      });
  }, []);

  const filteredPosts =
    activeCategory === "전체"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const featured = filteredPosts[0];
  const rest = filteredPosts.slice(1);

  return (
    <>
      <section className="relative overflow-hidden bg-foreground py-32 text-white md:py-44">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 select-none text-[16rem] font-bold leading-none tracking-tighter">
            BLOG
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <AnimateOnScroll variant="fadeIn">
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-neutral-500">
              Blog
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fadeUp" delay={0.1}>
            <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
              인사이트
            </h1>
          </AnimateOnScroll>

          <div className="mt-6">
            <LineReveal className="h-0.5 w-20 bg-accent-bright" delay={0.3} />
          </div>

          <AnimateOnScroll variant="fadeUp" delay={0.4}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-400">
              사업 운영에서 자주 마주치는 세무, 회계, 거래 이슈를 실무 관점으로 정리합니다.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateOnScroll variant="fadeUp">
            <div className="mb-14 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 text-xs font-medium tracking-wider transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-foreground text-white"
                      : "border border-border bg-card text-muted hover:bg-neutral-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimateOnScroll>

          {featured && (
            <AnimateOnScroll variant="fadeUp">
              <Link href={`/blog/${featured.slug}`} className="group mb-12 block">
                <div className="border border-border p-10 transition-all duration-300 hover:border-foreground hover-lift md:p-14">
                  <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span
                          className="inline-block rounded-sm px-3 py-1 text-[10px] font-medium tracking-wider"
                          style={getCategoryStyle(featured.category)}
                        >
                          {featured.category}
                        </span>
                        <PostStatusBadge status={featured.status} />
                        <span className="text-xs text-subtle">{featured.date}</span>
                      </div>

                      <h2 className="text-2xl font-bold leading-tight tracking-tight decoration-1 underline-offset-4 group-hover:underline md:text-3xl">
                        {featured.title}
                      </h2>

                      <p className="mt-4 line-clamp-3 leading-relaxed text-muted">
                        {featured.description}
                      </p>

                      <span className="mt-6 inline-flex items-center text-sm font-medium tracking-wider text-muted transition-colors group-hover:text-foreground">
                        읽기
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </span>
                    </div>

                    <div className="hidden items-center justify-center md:flex">
                      {featured.coverImage ? (
                        <div className="aspect-[4/3] w-full overflow-hidden border border-border bg-card">
                          <img
                            src={featured.coverImage}
                            alt={featured.title}
                            className="h-full w-full object-cover object-top"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[4/3] w-full items-center justify-center border border-border bg-card">
                          <span className="select-none text-6xl font-bold text-neutral-200">
                            {featured.title[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          )}

          {rest.length > 0 && (
            <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block border border-border transition-all duration-300 hover:border-foreground hover-lift"
                  >
                    {post.coverImage && (
                      <div className="aspect-[16/9] overflow-hidden border-b border-border">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    )}

                    <div className="p-8 md:p-10">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span
                          className="inline-block rounded-sm px-3 py-1 text-[10px] font-medium tracking-wider"
                          style={getCategoryStyle(post.category)}
                        >
                          {post.category}
                        </span>
                        <PostStatusBadge status={post.status} />
                        <span className="text-xs text-subtle">{post.date}</span>
                      </div>

                      <h2 className="text-lg font-bold leading-snug tracking-tight decoration-1 underline-offset-4 group-hover:underline">
                        {post.title}
                      </h2>

                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                        {post.description}
                      </p>

                      <span className="mt-5 inline-flex items-center text-xs font-medium tracking-wider text-muted transition-colors group-hover:text-foreground">
                        읽기
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          )}

          {filteredPosts.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-lg text-muted">해당 카테고리의 글이 없습니다.</p>
              <p className="mt-2 text-sm text-subtle">
                다른 카테고리를 선택해 보세요.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
