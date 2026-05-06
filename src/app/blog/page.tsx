import { getPostsByType, getGroups } from "@/lib/content";
import BlogFilter from "@/components/BlogFilter";

export default function BlogPage() {
  const posts = getPostsByType("blog");
  const groups = getGroups("blog");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">博客</h1>
      <p className="mt-2 text-stone-600 dark:text-stone-400">
        分享技术、学习与思考。
      </p>

      <BlogFilter posts={posts} groups={groups} />
    </div>
  );
}
