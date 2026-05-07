import { getPhotos, getPhotoGroups } from "@/lib/photos";
import PhotoGallery from "@/components/PhotoGallery";

export default function PhotosPage() {
  const photos = getPhotos();
  const groups = getPhotoGroups(photos);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">
        照片墙
      </h1>
      <p className="mt-2 text-stone-600 dark:text-stone-400">
        记录生活中的美好瞬间。
      </p>

      <PhotoGallery photos={photos} groups={groups} />
    </div>
  );
}
