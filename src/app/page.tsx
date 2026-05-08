import Link from "next/link";
import fs from "fs";
import path from "path";
import { getRecentPosts } from "@/lib/content";
import PostCard from "@/components/PostCard";
import { Globe, Mail, Camera, TrendingUp } from "lucide-react";

interface SiteConfig {
  name: string;
  bio: string;
  avatar: string;
  socials: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

function getSiteConfig(): SiteConfig {
  const configPath = path.join(process.cwd(), "content", "config.json");
  const raw = fs.readFileSync(configPath, "utf-8");
  return JSON.parse(raw);
}

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={20} />,
  Mail: <Mail size={20} />,
};

export default function Home() {
  const recentBlogs = getRecentPosts("blog", 3);
  const recentEssays = getRecentPosts("essay", 2);
  const config = getSiteConfig();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Hero */}
      <section className="flex flex-col items-center py-16 text-center">
        {config.avatar ? (
          <img
            src={config.avatar}
            alt={config.name}
            className="mb-6 h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="mb-6 h-24 w-24 rounded-full bg-stone-200 dark:bg-stone-700" />
        )}
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">
          {config.name}
        </h1>
        <p className="mt-3 max-w-md text-stone-600 dark:text-stone-400">
          {config.bio}
        </p>
        <div className="mt-6 flex gap-4">
          {config.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-stone-100 p-3 text-stone-600 transition-colors hover:bg-indigo-50 hover:text-indigo-500 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400"
            >
              {iconMap[social.icon] ?? <Globe size={20} />}
            </a>
          ))}
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">
            最近博客
          </h2>
          <Link
            href="/blog"
            className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentBlogs.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Recent Essays */}
      <section className="py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">
            最近随笔
          </h2>
          <Link
            href="/essays"
            className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {recentEssays.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <h2 className="mb-6 text-2xl font-semibold text-stone-900 dark:text-stone-50">
          快速入口
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/photos"
            className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md dark:border-stone-700 dark:bg-stone-800 dark:hover:border-indigo-800"
          >
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400">
              <Camera size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-50">
                照片墙
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                记录生活中的美好瞬间
              </p>
            </div>
          </Link>
          <Link
            href="/fund"
            className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md dark:border-stone-700 dark:bg-stone-800 dark:hover:border-indigo-800"
          >
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-50">
                基金
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                投资理财记录
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
