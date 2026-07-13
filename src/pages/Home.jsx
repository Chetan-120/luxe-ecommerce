import HeroSection from "../components/HeroSection";
import AnnouncementBar from "../components/home/AnnouncementBar";
import TrendingProducts from "../components/home/TrendingProducts";
import NewArrivals from "../components/home/NewArrivals";
import LuxuryCollections from "../components/home/LuxuryCollections";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Brands from "../components/home/Brands";

import FeaturedProducts from "../components/FeaturedProducts";
import { products } from "../data/products";
import ProductCarousel from "../components/ProductCarousel";
import { useRecentlyViewedStore } from "../store/useRecentlyViewedStore";

export default function Home() {
  
  const recentlyViewed = useRecentlyViewedStore((s) => s.items);

  return (
    <>
      <AnnouncementBar />

      <HeroSection />

      <LuxuryCollections />

      <TrendingProducts />

      <FeaturedProducts />

      <NewArrivals />

      <Brands />

      {recentlyViewed.length > 0 && (
        <ProductCarousel
          subtitle="RECENTLY VIEWED"
          title="Continue Shopping"
          products={recentlyViewed}
        />
      )}

      <WhyChooseUs />

      <Testimonials />
    </>
  );
}
