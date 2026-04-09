"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SectionHeading from "@/components/ui/section-heading";

interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
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
        const cats = Array.from(
          new Set(data.posts.map((p: PostMeta) => p.category))
        ) as string[];
        setCategories(["전체", ...cats]);
      });
  }, []);

  const filteredPosts =
    activeCategory === "전체"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured = filteredPosts[0];
  const rest = filteredPosts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-44 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[16rem] font-bold leading-none tracking-tighter select-none">
            BLOG
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-6 uppercase animate-fade-in">
            Blog
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-fade-in">
            인사이트
          </h1>
          <div className="mt-6 h-0.5 w-20 bg-accent-bright animate-line-reveal" />
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed animate-fade-in-delay">
            사업을 운영하며 마주하는 세무 · 회계 · 거래 이슈를 실무 관점에서 정리합니다.
          </p>
        </div>
      </section>

      {/* Category Filter + Posts */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-medium tracking-wider transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-foreground text-white"
                    : "bg-card text-muted hover:bg-neutral-200 border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block mb-12"
            >
              <div className="border border-border hover:border-foreground transition-all duration-300 p-10 md:p-14 hover-lift">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-block px-3 py-1 text-[10px] font-medium tracking-wider bg-foreground text-white uppercase">
                        {featured.category}
                      </span>
                      <span className="text-xs text-subtle">
                        {featured.date}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight group-hover:underline decoration-1 underline-offset-4">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-muted leading-relaxed line-clamp-3">
                      {featured.description}
                    </p>
                    <span className="mt-6 inline-flex items-center text-sm font-medium tracking-wider text-muted group-hover:text-foreground transition-colors">
                      읽기
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </div>
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-full aspect-[4/3] bg-card border border-border flex items-center justify-center">
                      <span className="text-6xl font-bold text-neutral-200 select-none">
                        {featured.title[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Remaining Posts Grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border border-border hover:border-foreground transition-all duration-300 hover-lift"
                >
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-block px-3 py-1 text-[10px] font-medium tracking-wider bg-card text-muted uppercase">
                        {post.category}
                      </span>
                      <span className="text-xs text-subtle">{post.date}</span>
                    </div>
                    <h2 className="text-lg font-bold leading-snug tracking-tight group-hover:underline decoration-1 underline-offset-4">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-muted line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                    <span className="mt-5 inline-flex items-center text-xs font-medium tracking-wider text-muted group-hover:text-foreground transition-colors">
                      읽기
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-muted text-lg">
                해당 카테고리의 글이 없습니다.
              </p>
              <p className="mt-2 text-subtle text-sm">
                다른 카테고리를 선택해 보세요.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
