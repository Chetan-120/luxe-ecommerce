import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, ArrowLeft, Truck, ShieldCheck, RotateCcw } from "lucide-react";

import { getProductById } from "../api/productApi";
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

  console.log("========== PRODUCT DETAIL ==========");
  console.log("Current URL:", window.location.href);
  console.log("Route ID:", id);
  console.log("====================================");
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState({
    name: "Black",
    value: "#111111",
    stock: 12,
  });

  const initialReviews = useMemo(
    () => getReviewsByProduct(id, reviewsData[id] || []),
    [id],
  );

  const [reviews, setReviews] = useState(() => initialReviews);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const addView = useRecentlyViewedStore((s) => s.addView);
  const recentlyViewed = useRecentlyViewedStore((s) => s.items).filter(
    (p) => p._id !== id,
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      addView(product);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="pt-40 text-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

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

  const wishlisted = isWishlisted(product._id);
  const discount = 20;
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
    sku: `LUXE-${product._id.slice(-6).toUpperCase()}`,
    shipping: "Free Shipping",
  };

  const needsSize = product.category === "Fashion";

  const handleAddToCart = () => {
    if (needsSize && !selectedSize) return;
    addItem(
      {
        ...product,
        id: product._id,
      },
      qty,
    );
  };

  const handleBuyNow = () => {
    if (needsSize && !selectedSize) return;
    addItem(
      {
        ...product,
        id: product._id,
      },
      qty,
    );
    navigate("/checkout");
  };

  const handleReviewSubmit = (review) => {
    saveReview(id, review);

    setReviews((current) => [review, ...current]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-28 md:pb-20">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-5 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-14">
        <ProductImageGallery
          product={product}
          wishlisted={wishlisted}
          discount={discount}
          onWishlist={() =>
            toggleWishlist({
              ...product,
              id: product._id,
            })
          }
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
