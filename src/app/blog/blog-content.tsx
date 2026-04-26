"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimateOnScroll, StaggerChildren } from "@/components/motion";
import { StaggerItem } from "@/components/motion/stagger-item";
import PostStatusBadge from "@/components/blog/post-status-badge";
import { getCategoryStyle } from "@/lib/category-colors";
import type { PostMeta } from "@/lib/posts";

interface BlogContentProps {
  posts: PostMeta[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  const allCategories = Array.from(new Set(posts.map((p) => p.category)));
  const categories = ["전체", ...allCategories];
  const [activeCategory, setActiveCategory] = useState("전체");

  const filtered =
    activeCategory === "전체"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
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
                      <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-card">
                        <Image
                          src={featured.coverImage}
                          alt={featured.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 45vw"
                          className="object-cover object-top"
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
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top"
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

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-lg text-muted">해당 카테고리의 글이 없습니다.</p>
            <p className="mt-2 text-sm text-subtle">다른 카테고리를 선택해 보세요.</p>
          </div>
        )}
      </div>
    </section>
  );
}
