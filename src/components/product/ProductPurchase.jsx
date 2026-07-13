import { Minus, Plus, ShoppingBag, Zap } from "lucide-react";

export default function ProductPurchase({
  qty,
  setQty,
  onAddToCart,
  onBuyNow,
}) {
  return (
    <section className="mt-8 space-y-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div>
        <h3 className="mb-4 text-base font-semibold text-ink">Quantity</h3>

        <div className="flex w-fit items-center rounded-2xl border border-border bg-surface px-2 py-2 shadow-md">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="rounded-xl p-3 transition duration-200 hover:bg-primary/10 active:scale-95"
          >
            <Minus size={16} />
          </button>

          <span className="w-14 text-center text-xl font-bold text-ink">
            {qty}
          </span>

          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="rounded-xl p-3 transition duration-200 hover:bg-primary/10 active:scale-95"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="hidden gap-4 lg:flex">
        <button
          type="button"
          onClick={onAddToCart}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-white py-4 font-semibold text-primary transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white hover:shadow-xl dark:bg-transparent"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>

        <button
          type="button"
          onClick={onBuyNow}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
        >
          <Zap size={18} className="fill-white" />
          Buy Now
        </button>
      </div>

      <div className="fixed bottom-4 left-0 right-0 z-50 md:hidden">
        <div className="mx-auto w-full max-w-md px-3">
          <div className="flex gap-2 rounded-2xl border border-border bg-bg/95 p-2 shadow-2xl backdrop-blur-xl">
            <button
              type="button"
              onClick={onAddToCart}
              className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary px-3 py-3 text-sm font-semibold text-primary transition-all active:scale-95"
            >
              <ShoppingBag className="h-4 w-4 flex-shrink-0" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={onBuyNow}
              className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-white transition-all active:scale-95"
            >
              <Zap className="h-4 w-4 flex-shrink-0 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
