import { useRef } from "react";

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function ProductCarousel({
  title,
  subtitle,
  products = [],
  viewAllLink = "/shop",
}) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-5 flex items-end justify-between gap-4">
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
        className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory"
      >
        {products.map((p, i) => (
          <ProductCard
            key={p._id || p.id}
            product={p}
            index={i}
            className="w-[220px] flex-shrink-0 snap-start sm:w-[240px]"
          />
        ))}
      </div>

      <Link
        to={viewAllLink}
        className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-primary md:hidden"
      >
        View All <ArrowRight size={15} />
      </Link>
    </section>
  );
}
