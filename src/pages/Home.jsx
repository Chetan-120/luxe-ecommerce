import HeroSection from "../components/HeroSection";
import Marquee from "../components/Marquee";
import FeaturedProducts from "../components/FeaturedProducts";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import { products } from "../data/products";
import ProductCarousel from "../components/ProductCarousel";
import { useRecentlyViewedStore } from "../store/useRecentlyViewedStore";

export default function Home() {
  const trending = [...products].sort((a, b) => b.rating - a.rating);
  const dealsOfDay = [...products].sort((a, b) => a.price - b.price);
  const recentlyViewed = useRecentlyViewedStore((s) => s.items);

  return (
    <div>
      <HeroSection />
      <Marquee />
      <FeaturedProducts />
      <ProductCarousel
        subtitle="TRENDING NOW"
        title="Top Rated Picks"
        products={trending}
      />
      {recentlyViewed.length > 0 && (
        <ProductCarousel
          subtitle="YOUR HISTORY"
          title="Recently Viewed"
          products={recentlyViewed}
        />
      )}
      <Testimonials />
      <Newsletter />
    </div>
  );
}
