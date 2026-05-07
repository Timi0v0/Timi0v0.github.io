import fs from "fs";
import path from "path";

export interface Photo {
  src: string;
  title: string;
  group: string;
}

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
  ".bmp",
  ".avif",
]);

function isImageFile(fileName: string): boolean {
  const ext = path.extname(fileName).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

export function getPhotos(): Photo[] {
  const photosDir = path.join(process.cwd(), "public", "photos");
  const photos: Photo[] = [];

  if (!fs.existsSync(photosDir)) {
    return photos;
  }

  function walk(dir: string, relativeDir: string) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath, path.join(relativeDir, item));
      } else if (isImageFile(item)) {
        const title = path.basename(item, path.extname(item));
        const group = relativeDir.replace(/\\/g, "/") || "未分组";
        photos.push({
          src: `/photos/${relativeDir.replace(/\\/g, "/")}/${item}`.replace(
            /\/+/g,
            "/"
          ),
          title,
          group,
        });
      }
    }
  }

  walk(photosDir, "");
  return photos.sort((a, b) => a.src.localeCompare(b.src));
}

export function getPhotoGroups(photos: Photo[]): string[] {
  const groups = new Set<string>();
  for (const photo of photos) {
    groups.add(photo.group);
  }
  return Array.from(groups).sort();
}
