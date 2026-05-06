"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  src: string;
  title: string;
  description: string;
}

const photos: Photo[] = [
  {
    src: "/photos/example.jpg",
    title: "示例照片 1",
    description: "这是一张示例照片，描述照片背后的故事。",
  },
  {
    src: "/photos/example.jpg",
    title: "示例照片 2",
    description: "另一张示例照片，展示不同的场景。",
  },
  {
    src: "/photos/example.jpg",
    title: "示例照片 3",
    description: "第三张示例照片，记录生活中的美好瞬间。",
  },
  {
    src: "/photos/example.jpg",
    title: "示例照片 4",
    description: "更多照片等待上传。",
  },
  {
    src: "/photos/example.jpg",
    title: "示例照片 5",
    description: "照片墙的占位示例。",
  },
  {
    src: "/photos/example.jpg",
    title: "示例照片 6",
    description: "后续可以替换为真实照片。",
  },
];

export default function PhotosPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + photos.length) % photos.length : null
    );
  const nextPhoto = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % photos.length : null
    );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">
        照片墙
      </h1>
      <p className="mt-2 text-stone-600 dark:text-stone-400">
        记录生活中的美好瞬间。
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-stone-700 dark:bg-stone-800"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-sm font-medium text-white">{photo.title}</p>
              <p className="mt-1 text-xs text-stone-300">{photo.description}</p>
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            className="max-h-[80vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].title}
              className="max-h-[70vh] rounded-lg object-contain"
            />
            <div className="mt-4 text-center text-white">
              <p className="font-medium">{photos[lightboxIndex].title}</p>
              <p className="mt-1 text-sm text-stone-300">
                {photos[lightboxIndex].description}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
