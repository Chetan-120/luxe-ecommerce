import { useRef } from "react";

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function ProductCarousel({
  title,
  subtitle,
  products,
  viewAllLink = "/shop",
}) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-end justify-between mb-5">
        <div>
          {subtitle && (
            <span className="text-primary text-xs font-semibold tracking-wide">
              {subtitle}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl font-display font-bold mt-1">
            {title}
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Link
            to={viewAllLink}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
          >
            View All <ArrowRight size={15} />
          </Link>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => scroll(-1)}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-surface hover:border-primary transition-colors"
          >
            <ChevronLeft size={16} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => scroll(1)}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-surface hover:border-primary transition-colors"
          >
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x"
      >
        {products.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            index={i}
            className="min-w-[240px] max-w-[240px] snap-start"
          />
        ))}
      </div>

      <Link
        to={viewAllLink}
        className="md:hidden flex items-center justify-center gap-1 mt-5 text-sm font-medium text-primary"
      >
        View All <ArrowRight size={15} />
      </Link>
    </section>
  );
}
