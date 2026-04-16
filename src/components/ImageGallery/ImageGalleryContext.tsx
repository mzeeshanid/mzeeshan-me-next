import { createContext, useContext, useState } from "react";
import { ImageGalleryDialog } from "./ImageGalleryDialog";

type GalleryImage = { src: string; alt?: string };

type ImageGalleryContextType = {
  images: GalleryImage[];
  openAt: (index: number) => void;
};

const ImageGalleryContext = createContext<ImageGalleryContextType | null>(null);

export const useImageGallery = () => {
  const ctx = useContext(ImageGalleryContext);
  if (!ctx) throw new Error("useImageGallery must be used inside provider");
  return ctx;
};

export const ImageGalleryProvider: React.FC<{
  images: GalleryImage[];
  children: React.ReactNode;
}> = ({ images, children }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ImageGalleryContext.Provider
      value={{ images, openAt: (i) => setActiveIndex(i) }}
    >
      {children}

      <ImageGalleryDialog
        images={images}
        open={activeIndex !== null}
        startIndex={activeIndex ?? 0}
        onClose={() => setActiveIndex(null)}
      />
    </ImageGalleryContext.Provider>
  );
};
