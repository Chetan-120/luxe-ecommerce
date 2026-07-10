import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, ArrowLeft, Truck, ShieldCheck, RotateCcw } from "lucide-react";

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
import ProductInfo from "../components/product/ProductInfo";
import ProductVariants from "../components/product/ProductVariants";
import ProductPurchase from "../components/product/ProductPurchase";
import ProductDelivery from "../components/product/ProductDelivery";
import ProductSpecifications from "../components/product/ProductSpecifications";
import ProductReviews from "../components/product/ProductReviews";
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

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState({
    name: "Black",
    value: "#111111",
    stock: 12,
  });

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
  const colors = [
    {
      name: "Black",
      value: "#111111",
      stock: 12,
    },
    {
      name: "White",
      value: "#ffffff",
      stock: 8,
    },
    {
      name: "Blue",
      value: "#2563eb",
      stock: 5,
    },
  ];

  const specifications = {
    brand: "LUXE",
    material: "Premium Material",
    warranty: "12 Months",
    country: "India",
    sku: `LUXE-${product.id.toString().padStart(4, "0")}`,
    shipping: "Free Shipping",
  };

  const needsSize = product.category === "Fashion";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-28 pb-36 md:pb-20">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
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
          <ProductInfo
            product={product}
            discount={discount}
            original={original}
          />

          <ProductVariants
            colors={colors}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            sizes={sizes}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
            needsSize={needsSize}
          />
          <ProductPurchase
            qty={qty}
            setQty={setQty}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />

          <ProductDelivery />
        </motion.div>
      </div>
      <ProductSpecifications specifications={specifications} />
      <ProductReviews reviews={reviews} onSubmit={handleReviewSubmit} />

      {recentlyViewed.length > 0 && (
        <ProductCarousel
          subtitle="CONTINUE SHOPPING"
          title="Recently Viewed"
          products={recentlyViewed}
        />
      )}
    </div>
  );
}
