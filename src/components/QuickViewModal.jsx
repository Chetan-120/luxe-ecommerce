import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Star, ShoppingBag, Heart, Minus, Plus, Zap } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";

export default function QuickViewModal({ product, onClose }) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isWishlisted } = useWishlistStore();

  if (!product) return null;
  const wishlisted = isWishlisted(product._id);
  const discount = 20;
  const original = Math.round(product.price * (1 + discount / 100));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card rounded-3xl overflow-hidden max-w-3xl w-full max-h-[85vh] overflow-y-auto relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-card shadow-md flex items-center justify-center"
          >
            <X size={18} />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-square bg-surface">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 badge-offer text-xs font-semibold px-2.5 py-1 rounded-md">
                {discount}% OFF
              </span>
            </div>

            <div className="p-6 md:p-8">
              <span className="text-primary text-xs font-semibold tracking-wide">
                {product.category.toUpperCase()}
              </span>
              <h2 className="text-2xl font-display font-bold mt-2">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-3">
                <span className="flex items-center gap-1 bg-success text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.rating} <Star size={11} className="fill-white" />
                </span>
                <span className="text-muted text-sm">
                  128 reviews · 1.2k sold
                </span>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <span className="text-2xl font-display font-bold">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-muted line-through text-sm">
                  ₹{original.toLocaleString("en-IN")}
                </span>
                <span className="text-success text-sm font-semibold">
                  {discount}% off
                </span>
              </div>

              <p className="text-muted text-sm mt-4 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-3 mt-6">
                <div className="flex items-center bg-surface rounded-full px-2 py-2 border border-border">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-2 hover:text-primary transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-7 text-center text-sm font-medium">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="p-2 hover:text-primary transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() =>
                    toggleWishlist({
                      ...product,
                      id: product._id,
                    })
                  }
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors shrink-0"
                >
                  <Heart
                    size={17}
                    className={
                      wishlisted ? "fill-primary text-primary" : "text-ink"
                    }
                  />
                </button>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={() => {
                    addItem(
                      {
                        ...product,
                        id: product._id,
                      },
                      qty,
                    );
                    onClose();
                  }}
                  className="w-full border-2 border-primary text-primary py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
                >
                  <ShoppingBag size={17} /> Add to Cart
                </button>
                <Link
                  to={`/product/${product._id}`}
                  onClick={onClose}
                  className="w-full bg-primary text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
