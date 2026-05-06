import Link from "next/link";
import { Post } from "@/lib/content";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/${post.type === "blog" ? "blog" : "essays"}/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md dark:border-stone-700 dark:bg-stone-800 dark:hover:border-indigo-800"
    >
      {post.cover && (
        <div className="mb-4 overflow-hidden rounded-xl">
          <img
            src={post.cover}
            alt={post.title}
            className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
        <span>{post.date}</span>
        {post.tags.length > 0 && (
          <>
            <span>·</span>
            <span>{post.tags.join(", ")}</span>
          </>
        )}
      </div>
      <h3 className="mt-2 text-lg font-semibold text-stone-900 transition-colors group-hover:text-indigo-500 dark:text-stone-50 dark:group-hover:text-indigo-400">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-stone-600 dark:text-stone-400">
        {post.summary}
      </p>
    </Link>
  );
}
