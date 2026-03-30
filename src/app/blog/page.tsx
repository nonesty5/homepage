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

  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm tracking-[0.3em] text-neutral-400 mb-4">
            BLOG
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            인사이트
          </h1>
          <p className="mt-6 text-lg text-neutral-300 max-w-xl">
            세무·회계 관련 최신 정보와 전문 지식을 공유합니다.
          </p>
        </div>
      </section>

      {/* Category Filter + Posts */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-foreground text-white"
                    : "bg-card text-muted hover:bg-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-border hover:border-foreground transition-colors"
              >
                <div className="p-8">
                  <span className="text-xs font-medium tracking-wider text-muted">
                    {post.category}
                  </span>
                  <h2 className="mt-3 text-lg font-bold leading-snug group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted line-clamp-2">
                    {post.description}
                  </p>
                  <p className="mt-4 text-xs text-muted">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-center text-muted py-16">
              해당 카테고리의 글이 없습니다.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
