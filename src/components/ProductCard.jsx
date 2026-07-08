import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ShoppingBag, Heart, Check } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { useQuickViewStore } from "../store/useQuickViewStore";

export default function ProductCard({ product, index = 0, className = "" }) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);
  const discount = 15 + (product.id % 3) * 5;
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
    addItem(product);
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
      className={`tilt-card group card-shadow card-shadow-hover bg-card rounded-2xl overflow-hidden border border-border ${className}`}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden aspect-[4/5] bg-surface">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card flex items-center justify-center shadow-md"
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
              openQuickView(product);
            }}
            className="absolute bottom-3 left-3 bg-card text-xs font-semibold px-3 py-2 rounded-full shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-ink hover:text-white"
          >
            Quick View
          </button>

          <button
            onClick={handleAdd}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white overflow-hidden"
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
                className="absolute inset-0 flex items-center justify-center bg-success text-white"
              >
                <Check size={16} />
              </motion.div>
            )}
          </button>
        </div>

        <div className="p-4">
          <span className="text-xs text-muted font-medium">
            {product.category}
          </span>
          <h3 className="font-semibold text-ink mt-0.5 truncate">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 mt-2">
            <span className="flex items-center gap-0.5 bg-success text-white text-xs font-semibold px-1.5 py-0.5 rounded">
              {product.rating} <Star size={10} className="fill-white" />
            </span>
            <span className="text-muted text-xs">1.2k sold</span>
          </div>

          <div className="flex items-center gap-2 mt-3">
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
