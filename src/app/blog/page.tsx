import { getPostsByType } from "@/lib/content";
import PostCard from "@/components/PostCard";

export default function BlogPage() {
  const posts = getPostsByType("blog");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">博客</h1>
      <p className="mt-2 text-stone-600 dark:text-stone-400">分享技术、学习与思考。</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
