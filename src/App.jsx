import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { useWishlistStore } from "./store/useWishlistStore";
import { useCartStore } from "./store/useCartStore";
import { useThemeStore } from "./store/useThemeStore";
import { useProductStore } from "./store/useProductStore";
import QuickViewModal from "./components/QuickViewModal";
import { useQuickViewStore } from "./store/useQuickViewStore";

export default function App() {
  const { product: quickViewProduct, close: closeQuickView } =
    useQuickViewStore();
  const location = useLocation();
  const theme = useThemeStore((s) => s.theme);
  const loadUser = useAuthStore((s) => s.loadUser);
  const loadWishlist = useWishlistStore((s) => s.loadWishlist);
  const loadCart = useCartStore((s) => s.loadCart);
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const initializeApp = async () => {
      await loadUser();

      await Promise.all([fetchProducts(), loadWishlist(), loadCart()]);
    };

    initializeApp();
  }, [loadUser, loadWishlist, loadCart, fetchProducts]);
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/shop"
              element={
                <PageTransition>
                  <Shop />
                </PageTransition>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PageTransition>
                  <ProductDetail />
                </PageTransition>
              }
            />
            <Route
              path="/cart"
              element={
                <PageTransition>
                  <Cart />
                </PageTransition>
              }
            />

            <Route
              path="/checkout"
              element={
                <PageTransition>
                  <Checkout />
                </PageTransition>
              }
            />

            <Route
              path="/wishlist"
              element={
                <PageTransition>
                  <Wishlist />
                </PageTransition>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              }
            />

            <Route
              path="/register"
              element={
                <PageTransition>
                  <Register />
                </PageTransition>
              }
            />

            <Route
              path="/order-success"
              element={
                <PageTransition>
                  <OrderSuccess />
                </PageTransition>
              }
            />

            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <QuickViewModal product={quickViewProduct} onClose={closeQuickView} />
    </div>
  );
}
