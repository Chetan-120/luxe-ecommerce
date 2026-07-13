import ProductCarousel from "./ProductCarousel";
import { useProductStore } from "../store/useProductStore";

export default function FeaturedProducts() {
  const products = useProductStore((s) => s.products);

  return (
    <ProductCarousel
      subtitle="HANDPICKED FOR YOU"
      title="Featured Collection"
      products={products}
    />
  );
}