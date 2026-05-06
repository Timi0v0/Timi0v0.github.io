import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostType = "blog" | "essay";

export interface Post {
  slug: string;
  type: PostType;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  cover?: string;
  content: string;
  contentHtml: string;
}

const contentDir = path.join(process.cwd(), "content");

function getContentDirName(type: PostType): string {
  return type === "essay" ? "essays" : type;
}

export function getAllPosts(type?: PostType): Post[] {
  const types: PostType[] = type ? [type] : ["blog", "essay"];
  const posts: Post[] = [];

  for (const t of types) {
    const dir = path.join(contentDir, getContentDirName(t));
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const post = getPostBySlug(t, slug);
      if (post) posts.push(post);
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(type: PostType, slug: string): Post | null {
  const filePath = path.join(contentDir, getContentDirName(type), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const contentHtml = remark().use(html).processSync(content).toString();

  return {
    slug,
    type,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
    tags: data.tags || [],
    summary: data.summary || "",
    cover: data.cover || undefined,
    content,
    contentHtml,
  };
}

export function getRecentPosts(type: PostType, count: number): Post[] {
  return getAllPosts(type).slice(0, count);
}

export function getPostsByType(type: PostType): Post[] {
  return getAllPosts(type);
}
