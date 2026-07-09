import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ShoppingBag,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
} from "lucide-react";

import { products } from "../data/products";
import reviewsData from "../data/reviews";

import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { useRecentlyViewedStore } from "../store/useRecentlyViewedStore";

import ProductCarousel from "../components/ProductCarousel";
import ReviewSummary from "../components/ReviewSummary";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import ProductImageGallery from "../components/ProductImageGallery";
import { getReviewsByProduct, saveReview } from "../utils/reviewStorage";

const sizes = ["S", "M", "L", "XL"];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useMemo(
    () => products.find((p) => p.id === Number(id)),
    [id],
  );
  const [qty, setQty] = useState(1);

  const [selectedSize, setSelectedSize] = useState(null);
  const initialReviews = useMemo(
    () => getReviewsByProduct(Number(id), reviewsData[Number(id)] || []),
    [id],
  );

  const [reviews, setReviews] = useState(() => initialReviews);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const addView = useRecentlyViewedStore((s) => s.addView);
  const recentlyViewed = useRecentlyViewedStore((s) => s.items).filter(
    (p) => p.id !== Number(id),
  );

  useEffect(() => {
    if (product) addView(product);
  }, [product]);

  if (!product) {
    return (
      <div className="pt-40 text-center">
        <p className="text-muted">Product not found.</p>
        <Link to="/shop" className="text-primary font-medium">
          Back to Shop
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const discount = 15 + (product.id % 3) * 5;
  const original = Math.round(product.price * (1 + discount / 100));
  const needsSize = product.category === "Fashion";
  const images = product.images || [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const handleAddToCart = () => {
    if (needsSize && !selectedSize) return;
    addItem(product, qty);
  };

  const handleBuyNow = () => {
    if (needsSize && !selectedSize) return;
    addItem(product, qty);
    navigate("/checkout");
  };

  const handleReviewSubmit = (review) => {
    saveReview(Number(id), review);

    setReviews((current) => [review, ...current]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-28 md:pb-20">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-14">
        <ProductImageGallery
          product={product}
          wishlisted={wishlisted}
          discount={discount}
          onWishlist={() => toggleWishlist(product)}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-primary text-xs font-semibold tracking-wide">
            {product.category.toUpperCase()}
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-bold mt-2 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mt-3">
            <span className="flex items-center gap-1 bg-success text-white text-xs font-semibold px-2 py-1 rounded">
              {product.rating} <Star size={11} className="fill-white" />
            </span>
            <span className="text-muted text-sm">128 reviews · 1.2k sold</span>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <span className="text-3xl font-display font-bold">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-muted line-through">
              ₹{original.toLocaleString("en-IN")}
            </span>
            <span className="text-success text-sm font-semibold">
              {discount}% off
            </span>
          </div>
          <p className="text-muted text-xs mt-1">inclusive of all taxes</p>

          <p className="text-muted mt-5 leading-relaxed max-w-md">
            {product.description}
          </p>

          {needsSize && (
            <div className="mt-7">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold">Select Size</h4>
                <button className="text-xs text-primary font-medium">
                  Size Chart
                </button>
              </div>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-11 h-11 rounded-full border text-sm font-semibold transition-colors ${
                      selectedSize === s
                        ? "bg-contrast text-white border-contrast"
                        : "border-border hover:border-contrast"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {needsSize && !selectedSize && (
                <p className="text-xs text-primary mt-2">
                  Please select a size
                </p>
              )}
            </div>
          )}

          <div className="flex items-center gap-3 mt-8">
            <div className="flex items-center bg-surface rounded-full px-2 py-2 border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-2.5 hover:text-primary transition-colors"
              >
                <Minus size={15} />
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="p-2.5 hover:text-primary transition-colors"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Desktop CTA row */}
          <div className="hidden md:flex items-center gap-4 mt-5">
            <button
              onClick={handleAddToCart}
              className="flex-1 border-2 border-primary text-primary py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-primary text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
            >
              <Zap size={18} className="fill-white" /> Buy Now
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-9 pt-7 border-t border-border">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                <Truck size={17} className="text-primary" />
              </div>
              <span className="text-xs text-muted">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                <ShieldCheck size={17} className="text-primary" />
              </div>
              <span className="text-xs text-muted">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                <RotateCcw size={17} className="text-primary" />
              </div>
              <span className="text-xs text-muted">30-Day Returns</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-bg border-t border-border p-3 flex gap-3 z-40">
        <button
          onClick={handleAddToCart}
          className="flex-1 border-2 border-primary text-primary py-3.5 rounded-full font-semibold flex items-center justify-center gap-2"
        >
          <ShoppingBag size={17} /> Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-primary text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2"
        >
          <Zap size={17} className="fill-white" /> Buy Now
        </button>
      </div>

      <section className="mt-24">
        <ReviewSummary reviews={reviews} />

        <div className="mt-10">
          <h2 className="text-3xl font-display font-bold text-ink">
            Customer Reviews
          </h2>

          <p className="mt-2 text-muted">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <div className="bg-card border border-border rounded-3xl p-10 text-center">
              <h3 className="text-xl font-semibold text-ink">No Reviews Yet</h3>

              <p className="mt-2 text-muted">
                Be the first person to review this product.
              </p>
            </div>
          )}
        </div>

        <div className="mt-14">
          <ReviewForm onSubmit={handleReviewSubmit} />
        </div>
      </section>

      {recentlyViewed.length > 0 && (
        <div className="mt-24 -mx-6">
          <ProductCarousel
            subtitle="YOUR HISTORY"
            title="Recently Viewed"
            products={recentlyViewed}
          />
        </div>
      )}
    </div>
  );
}
