import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { useSearchParams } from "react-router-dom";

const categories = ["All", "Accessories", "Electronics", "Fashion", "Home"];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("cat") || "All",
  );
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const products = useProductStore((s) => s.products);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "All")
      list = list.filter((p) => p.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, activeCategory, sortBy, searchQuery]);
  console.log("Products State:", products);
  console.log("Filtered State:", filtered);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <div className="mt-6 mb-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <span className="text-primary text-xs font-semibold tracking-wide">
          {searchQuery ? "SEARCH RESULTS" : "FULL CATALOG"}
        </span>
        <h1 className="mt-2 text-3xl font-display font-bold text-ink md:text-5xl">
          {searchQuery ? `Results for "${searchQuery}"` : "Shop All Products"}
        </h1>
      </div>

      <div className="mb-6 flex items-center justify-between rounded-2xl bg-surface p-4 md:hidden">
        <span className="text-muted text-sm">{filtered.length} products</span>
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full text-sm font-medium"
        >
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="sticky top-28 hidden h-fit rounded-3xl border border-border bg-card p-6 shadow-sm lg:block">
          <div>
            <h4 className="font-semibold mb-3 text-sm">Category</h4>
            <div className="space-y-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setActiveCategory(c);
                    setSearchParams(c === "All" ? {} : { cat: c });
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === c
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted hover:bg-surface"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Sort By</h4>
            <div className="space-y-1.5">
              {sortOptions.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSortBy(s.value)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === s.value
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted hover:bg-surface"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={() => {
                setActiveCategory("All");
                setSortBy("featured");
                setSearchParams({});
              }}
              className="w-full rounded-xl border border-border py-3 font-medium transition hover:border-primary hover:text-primary"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between rounded-2xl bg-surface p-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">
                Products
              </p>

              <p className="text-lg font-semibold text-ink">
                {filtered.length} Available
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card py-20 text-center">
              <h3 className="text-2xl font-display font-bold">
                No Products Found
              </h3>

              <p className="mt-3 text-muted">
                Try another category or clear the filters.
              </p>

              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSortBy("featured");
                  setSearchParams({});
                }}
                className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-white"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setFiltersOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto rounded-l-3xl bg-card p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display font-semibold text-lg">Filters</h3>
              <button onClick={() => setFiltersOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <h4 className="font-semibold mb-3 text-sm">Category</h4>
            <div className="space-y-1.5 mb-7">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setActiveCategory(c);
                    setSearchParams(c === "All" ? {} : { cat: c });
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                    activeCategory === c
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <h4 className="font-semibold mb-3 text-sm">Sort By</h4>
            <div className="space-y-1.5">
              {sortOptions.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSortBy(s.value)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                    sortBy === s.value
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setFiltersOpen(false)}
              className="w-full mt-8 bg-primary text-white py-3 rounded-full font-semibold"
            >
              Apply Filters
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
