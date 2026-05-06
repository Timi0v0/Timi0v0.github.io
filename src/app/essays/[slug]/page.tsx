import { notFound } from "next/navigation";
import { getPostBySlug, getPostsByType } from "@/lib/content";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  const posts = getPostsByType("essay");
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props) {
  const post = getPostBySlug("essay", params.slug);
  if (!post) return { title: "Not Found" };
  return { title: post.title };
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 300);
}

export default function EssayPostPage({ params }: Props) {
  const post = getPostBySlug("essay", params.slug);
  if (!post) notFound();

  const readTime = estimateReadTime(post.content);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/essays"
        className="inline-flex items-center gap-1 text-sm text-stone-500 transition-colors hover:text-indigo-500 dark:text-stone-400 dark:hover:text-indigo-400"
      >
        <ArrowLeft size={16} />
        返回随笔列表
      </Link>

      <article className="mt-6">
        <header>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-stone-500 dark:text-stone-400">
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} />
              {readTime} 分钟阅读
            </span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.cover && (
          <div className="mt-6 overflow-hidden rounded-2xl">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-stone mt-8 max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}
