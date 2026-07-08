import { products } from "../data/products";
import ProductCarousel from "./ProductCarousel";

export default function FeaturedProducts() {
  return (
    <ProductCarousel
      subtitle="HANDPICKED FOR YOU"
      title="Featured Collection"
      products={products}
    />
  );
}