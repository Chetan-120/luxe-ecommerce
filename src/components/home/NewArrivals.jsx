import ProductCarousel from "../ProductCarousel";
import { products } from "../../data/products";

export default function NewArrivals() {
  const newArrivals = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 8);

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Just Arrived
            </p>

            <h2 className="mt-3 text-3xl font-display font-bold text-ink sm:text-4xl">
              New Arrivals
            </h2>

            <p className="mt-3 max-w-2xl text-muted">
              Fresh additions carefully selected to keep your collection ahead of the trends.
            </p>
          </div>
        </div>

        <ProductCarousel
          products={newArrivals}
        />
      </div>
    </section>
  );
}