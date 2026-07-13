import { useEffect, useState } from "react";
import ProductLightbox from "./ProductLightbox";
import ImageZoom from "./ImageZoom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

export default function ProductImageGallery({
  product,
  discount,
  wishlisted,
  onWishlist,
}) {
  const images =
    product.images && product.images.length ? product.images : [product.image];

  const [activeImage, setActiveImage] = useState(0);
  const totalImages = images.length;
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const previousImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const selectImage = (index) => {
    setActiveImage(index);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") previousImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  return (
    <div className="relative md:sticky md:top-28 h-fit">
      <div className="relative rounded-3xl overflow-hidden border border-border bg-surface">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxOpen(true)}
            className="cursor-zoom-in"
          >
            <div className="relative">
              <div className="aspect-[4/5] lg:aspect-square overflow-hidden">
                <ImageZoom src={images[activeImage]} alt={product.name} />
              </div>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeImage === index ? "w-8 bg-white" : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
                <ChevronUp size={12} />
                Tap to Zoom
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={previousImage}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full  backdrop-blur flex items-center justify-center shadow-md hover:scale-105 transition"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-1h-12 w-12 rounded-full  backdrop-blur flex items-center justify-center shadow-md hover:scale-105 transition"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="rounded-full bg-primary px-3 py-1.5 text-white shadow-lg text-xs font-semibold">
            {discount}% OFF
          </span>

          <span className="rounded-full bg-black/50 backdrop-blur-xl px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {activeImage + 1} / {totalImages}
          </span>
        </div>
        <button
          onClick={onWishlist}
          className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl hover:scale-110 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={wishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className={`w-5 h-5 ${wishlisted ? "text-primary" : "text-ink"}`}
          >
            <path d="M12 21s-7-4.35-9.33-8.28C.86 9.7 2.34 5.5 6.3 4.36c2.22-.64 4.15.29 5.7 2.02 1.55-1.73 3.48-2.66 5.7-2.02 3.96 1.14 5.44 5.34 3.63 8.36C19 16.65 12 21 12 21z" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => selectImage(index)}
            className={`w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              activeImage === index ? "border-primary" : "border-border"
            }`}
          >
            <img
              src={image}
              alt=""
              className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </button>
        ))}
      </div>
      <ProductLightbox
        open={lightboxOpen}
        images={images}
        current={activeImage}
        setCurrent={setActiveImage}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
