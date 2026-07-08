import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, MapPin, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import ThemeToggle from "./ThemeToggle";

const categories = [
  { name: "All", path: "/shop" },
  { name: "Accessories", path: "/shop?cat=Accessories" },
  { name: "Fashion", path: "/shop?cat=Fashion" },
  { name: "Electronics", path: "/shop?cat=Electronics" },
  { name: "Home", path: "/shop?cat=Home" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim())
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
  };
  const items = useCartStore((s) => s.items);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const navigate = useNavigate();
  const count = items.reduce((a, i) => a + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-bg transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4 gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-display font-bold text-lg">
            L
          </span>
          <span className="text-xl font-display font-bold tracking-tight hidden sm:block">
            LUXE
          </span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2 flex-1 max-w-md bg-surface rounded-full px-4 py-2.5"
        >
          <Search size={17} className="text-muted shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-muted"
          />
        </form>

        <div className="hidden lg:flex items-center gap-1.5 text-sm text-muted shrink-0">
          <MapPin size={15} />
          Bengaluru
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />

          <button
            onClick={() => navigate("/wishlist")}
            className="relative w-9 h-9 rounded-full hidden sm:flex items-center justify-center bg-surface hover:bg-surface2 transition-colors"
          >
            <Heart size={16} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="relative flex items-center gap-2 bg-contrast text-white px-4 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Cart</span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Category pill strip */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex gap-2 py-3 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <Link key={c.name} to={c.path} className="pill pill-inactive">
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-bg border-t border-border"
          >
            <div className="px-6 py-4">
              <form
                onSubmit={(e) => {
                  handleSearch(e);
                  setOpen(false);
                }}
                className="flex items-center gap-2 bg-surface rounded-full px-4 py-2.5 mb-4"
              >
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="bg-transparent outline-none text-sm w-full placeholder:text-muted"
                />
              </form>
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium"
              >
                Shop All
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium"
              >
                Wishlist
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
