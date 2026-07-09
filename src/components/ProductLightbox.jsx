import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

export default function ProductLightbox({
  open,
  images,
  current,
  setCurrent,
  onClose,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;

      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") {
        setCurrent((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }

      if (e.key === "ArrowLeft") {
        setCurrent((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [open, images.length]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/90 backdrop-blur flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: .95 }}
          animate={{ scale: 1 }}
          exit={{ scale: .95 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl px-8"
        >
          <button
            onClick={onClose}
            className="absolute right-0 -top-14 text-white"
          >
            <X size={34} />
          </button>

          <img
            src={images[current]}
            alt=""
            className="w-full max-h-[80vh] object-contain rounded-2xl"
          />

          <button
            onClick={() =>
              setCurrent((prev) =>
                prev === 0
                  ? images.length - 1
                  : prev - 1
              )
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white"
          >
            <ChevronLeft size={40} />
          </button>

          <button
            onClick={() =>
              setCurrent((prev) =>
                prev === images.length - 1
                  ? 0
                  : prev + 1
              )
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white"
          >
            <ChevronRight size={40} />
          </button>

          <div className="flex justify-center gap-3 mt-6">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`overflow-hidden rounded-lg border-2 ${
                  current === index
                    ? "border-white"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  className="w-20 h-20 object-cover"
                  alt=""
                />
              </button>
            ))}
          </div>

          <p className="text-center text-white mt-4">
            {current + 1} / {images.length}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}