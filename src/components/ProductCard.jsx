import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ShoppingBag, Heart, Check } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { useQuickViewStore } from "../store/useQuickViewStore";

export default function ProductCard({ product, index = 0, className = "" }) {
  console.log("ProductCard Product:", product);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product._id);
  const discount = 20;
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [added, setAdded] = useState(false);
  const openQuickView = useQuickViewStore((s) => s.open);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const handleAdd = (e) => {
    e.preventDefault();
    addItem({
      ...product,
      id: product._id,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className={`group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${className}`}
    >
      <Link
        to={`/product/${product._id}`}
        onClick={() => console.log("Navigating with _id:", product._id)}
      >
        <div className="relative overflow-hidden aspect-[4/5] bg-surface">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <motion.span
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: index * 0.06 + 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className="absolute top-3 left-3 badge-offer text-xs font-semibold px-2.5 py-1 rounded-md"
          >
            {discount}% OFF
          </motion.span>

          <span className="absolute top-12 left-3 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
            In Stock
          </span>

          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist({
                ...product,
                id: product._id,
              });
            }}
            className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-md"
          >
            <motion.span
              animate={wishlisted ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                size={15}
                className={
                  wishlisted ? "fill-primary text-primary" : "text-ink"
                }
              />
            </motion.span>
          </motion.button>
          <button
            onClick={(e) => {
              e.preventDefault();
              openQuickView({
                ...product,
                id: product._id,
              });
            }}
            className="absolute bottom-3 left-3 rounded-full bg-card px-3 py-2 text-xs font-semibold shadow-md transition-all duration-300 hover:bg-ink hover:text-white md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
          >
            Quick View
          </button>

          <button
            onClick={handleAdd}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-card shadow-md transition-all duration-300 hover:bg-primary hover:text-white md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
          >
            <motion.div
              animate={{ y: added ? -30 : 0, opacity: added ? 0 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <ShoppingBag size={16} />
            </motion.div>
            {added && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center bg-green-600 text-white"
              >
                <Check size={16} />
              </motion.div>
            )}
          </button>
        </div>

        <div className="p-5">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
            {product.category}
          </span>
          <h3 className="mt-1 min-h-[48px] text-sm font-semibold leading-6 text-ink md:text-base">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 mt-2">
            <span className="flex items-center gap-0.5 bg-success text-white text-xs font-semibold px-1.5 py-0.5 rounded">
              {product.rating} <Star size={10} className="fill-white" />
            </span>
            <span className="text-muted text-xs">1.2k sold</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="font-display font-bold text-lg">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-muted text-sm line-through">
              ₹
              {Math.round(product.price * (1 + discount / 100)).toLocaleString(
                "en-IN",
              )}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
