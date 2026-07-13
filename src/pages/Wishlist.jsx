import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlistStore } from "../store/useWishlistStore";
import { useCartStore } from "../store/useCartStore";

export default function Wishlist() {
  const items = useWishlistStore((s) => s.items);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const addItem = useCartStore((s) => s.addItem);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <Heart className="mb-5 h-16 w-16 text-primary" />

        <h1 className="text-3xl font-display font-bold">
          Your Wishlist is Empty
        </h1>

        <p className="mt-3 text-muted">
          Save products you love and buy them later.
        </p>

        <Link
          to="/shop"
          className="mt-8 rounded-full bg-primary px-8 py-3 font-semibold text-white"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            My Wishlist
          </h1>

          <p className="mt-2 text-muted">
            {items.length} item{items.length > 1 ? "s" : ""} saved
          </p>
        </div>

        <Heart
          className="hidden h-10 w-10 text-primary md:block"
          fill="currentColor"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map((product) => (
          <div
            key={product._id || product.id}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <Link to={`/product/${product._id || product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="p-4 md:p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {product.category}
              </p>

              <h2 className="mt-2 font-semibold text-ink">{product.name}</h2>

              <p className="mt-4 text-xl md:text-2xl font-display font-bold text-primary">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    addItem(product);
                    toggleWishlist(product);
                  }}
                  className="flex w-full sm:flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <ShoppingBag size={17} />
                  Move to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="flex h-12 w-full sm:w-12 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          to="/shop"
          className="inline-flex items-center rounded-full border border-border px-8 py-3 font-semibold transition-all duration-300 hover:border-primary hover:text-primary"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
