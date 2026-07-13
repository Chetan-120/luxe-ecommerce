import ProductCarousel from "../ProductCarousel";
import { useProductStore } from "../../store/useProductStore";

export default function TrendingProducts() {
  const products = useProductStore((s) => s.products);
  const trendingProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Trending Now
            </p>

            <h2 className="mt-3 text-3xl font-display font-bold text-ink sm:text-4xl">
              Most Loved Products
            </h2>

            <p className="mt-3 max-w-2xl text-muted">
              Explore the products our customers love the most.
            </p>
          </div>
        </div>

        <ProductCarousel products={trendingProducts} />
      </div>
    </section>
  );
}
