import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostType = "blog" | "essay";

export interface Post {
  slug: string;
  type: PostType;
  group?: string;
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

function walkMarkdownFiles(dir: string, callback: (filePath: string) => void) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkMarkdownFiles(fullPath, callback);
    } else if (item.endsWith(".md")) {
      callback(fullPath);
    }
  }
}

function parsePost(filePath: string, type: PostType): Post | null {
  const baseDir = path.join(contentDir, getContentDirName(type));
  const relativePath = path.relative(baseDir, filePath);
  const dirName = path.dirname(relativePath);
  const group =
    dirName === "."
      ? undefined
      : dirName.replace(/\\/g, "/");
  const slug = path.basename(relativePath, ".md");

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const contentHtml = remark().use(html).processSync(content).toString();

  return {
    slug,
    type,
    group,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
    tags: data.tags || [],
    summary: data.summary || "",
    cover: data.cover || undefined,
    content,
    contentHtml,
  };
}

export function getAllPosts(type?: PostType): Post[] {
  const types: PostType[] = type ? [type] : ["blog", "essay"];
  const posts: Post[] = [];

  for (const t of types) {
    const dir = path.join(contentDir, getContentDirName(t));
    walkMarkdownFiles(dir, (filePath) => {
      const post = parsePost(filePath, t);
      if (post) posts.push(post);
    });
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(type: PostType, slug: string): Post | null {
  const dir = path.join(contentDir, getContentDirName(type));
  let found: Post | null = null;

  walkMarkdownFiles(dir, (filePath) => {
    const post = parsePost(filePath, type);
    if (post && post.slug === slug) {
      found = post;
    }
  });

  return found;
}

export function getRecentPosts(type: PostType, count: number): Post[] {
  return getAllPosts(type).slice(0, count);
}

export function getPostsByType(type: PostType): Post[] {
  return getAllPosts(type);
}

export function getGroups(type: PostType): string[] {
  const dir = path.join(contentDir, getContentDirName(type));
  const groups = new Set<string>();

  walkMarkdownFiles(dir, (filePath) => {
    const baseDir = path.join(contentDir, getContentDirName(type));
    const relativePath = path.relative(baseDir, filePath);
    const dirName = path.dirname(relativePath);
    if (dirName !== ".") {
      groups.add(dirName.replace(/\\/g, "/"));
    }
  });

  return Array.from(groups).sort();
}

export function getPostsByGroup(type: PostType, group: string): Post[] {
  return getAllPosts(type).filter((post) => post.group === group);
}
