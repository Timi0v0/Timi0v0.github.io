"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Folder } from "lucide-react";
import type { Photo } from "@/lib/photos";

interface PhotoGalleryProps {
  photos: Photo[];
  groups: string[];
}

export default function PhotoGallery({ photos, groups }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const filteredPhotos = activeGroup
    ? photos.filter((p) => p.group === activeGroup)
    : photos;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + filteredPhotos.length) % filteredPhotos.length : null
    );
  const nextPhoto = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % filteredPhotos.length : null
    );

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

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredPhotos.map((photo, index) => (
          <button
            key={photo.src}
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
              <p className="mt-1 text-xs text-stone-300">{photo.group}</p>
            </div>
          </button>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <p className="mt-12 text-center text-stone-500 dark:text-stone-400">
          该分组下暂无照片
        </p>
      )}

      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
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
              src={filteredPhotos[lightboxIndex].src}
              alt={filteredPhotos[lightboxIndex].title}
              className="max-h-[70vh] rounded-lg object-contain"
            />
            <div className="mt-4 text-center text-white">
              <p className="font-medium">{filteredPhotos[lightboxIndex].title}</p>
              <p className="mt-1 text-sm text-stone-300">
                {filteredPhotos[lightboxIndex].group}
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
    </>
  );
}
