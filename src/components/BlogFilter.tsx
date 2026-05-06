"use client";

import { useState } from "react";
import type { Post } from "@/lib/content";
import PostCard from "./PostCard";
import { Folder } from "lucide-react";

interface BlogFilterProps {
  posts: Post[];
  groups: string[];
}

export default function BlogFilter({ posts, groups }: BlogFilterProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const filteredPosts = activeGroup
    ? posts.filter((post) => post.group === activeGroup)
    : posts;

  return (
    <>
      {groups.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveGroup(null)}
            className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm transition-colors ${
              activeGroup === null
                ? "bg-indigo-500 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
            }`}
          >
            全部
          </button>
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm transition-colors ${
                activeGroup === group
                  ? "bg-indigo-500 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
              }`}
            >
              <Folder size={14} />
              {group}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostCard key={`${post.group || ""}-${post.slug}`} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="mt-12 text-center text-stone-500 dark:text-stone-400">
          该分组下暂无文章
        </p>
      )}
    </>
  );
}
