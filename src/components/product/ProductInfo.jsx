import { Star } from "lucide-react";

export default function ProductInfo({ product, discount, original }) {
  return (
    <>
      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
        {product.category.toUpperCase()}
      </span>
      <p className="mt-4 text-sm font-medium uppercase tracking-widest text-muted">
        LUXE Premium Collection
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
        {product.name}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          {product.rating}
          <Star size={11} className="fill-white" />
        </span>

        <div className="flex items-center gap-2 text-sm text-muted">
          <span>⭐ 4.9</span>
          <span>•</span>
          <span>1,284 Reviews</span>
          <span>•</span>
          <span>2.8k Sold</span>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-end gap-4">
        <span className="font-display text-5xl font-bold text-ink">
          ₹{product.price.toLocaleString("en-IN")}
        </span>

        <span className="text-lg text-muted line-through">
          ₹{original.toLocaleString("en-IN")}
        </span>

        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600 dark:bg-red-500/10 dark:text-red-400">
          {discount}% OFF
        </span>
      </div>

      <div className="mt-2 space-y-2">
        <p className="text-sm text-muted">
          Inclusive of all taxes • Free Delivery Available
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
            🚚 Free Shipping
          </span>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            🔒 Secure Payment
          </span>

          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
            ↩️ 30-Day Returns
          </span>
        </div>
        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <h3 className="text-sm font-semibold text-primary">
            Available Offers
          </h3>

          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>✔ Extra 10% OFF on prepaid orders</li>
            <li>✔ Free shipping on all orders</li>
            <li>✔ EMI available on selected cards</li>
            <li>✔ 30-Day hassle-free returns</li>
          </ul>
        </div>
      </div>
    </>
  );
}
