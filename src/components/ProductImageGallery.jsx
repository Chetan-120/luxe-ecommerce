import { useEffect, useState } from "react";
import ProductLightbox from "./ProductLightbox";
import ImageZoom from "./ImageZoom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductImageGallery({
  product,
  discount,
  wishlisted,
  onWishlist,
}) {
  const images =
    product.images && product.images.length ? product.images : [product.image];

  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const previousImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
    <div className="sticky top-28 h-fit">
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
            <ImageZoom src={images[activeImage]} alt={product.name} />
          </motion.div>
        </AnimatePresence>
        <button
          onClick={previousImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-card/90 backdrop-blur flex items-center justify-center shadow-md hover:scale-105 transition"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-card/90 backdrop-blur flex items-center justify-center shadow-md hover:scale-105 transition"
        >
          <ChevronRight size={18} />
        </button>
        <span className="absolute top-4 left-4 badge-offer text-xs font-semibold px-3 py-1 rounded-md">
          {discount}% OFF
        </span>

        <button
          onClick={onWishlist}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-card shadow-md flex items-center justify-center"
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

      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              activeImage === index ? "border-primary" : "border-border"
            }`}
          >
            <img
              src={image}
              alt=""
              className="aspect-square w-full object-cover"
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
