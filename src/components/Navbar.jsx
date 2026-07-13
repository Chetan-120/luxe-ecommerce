import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/90 backdrop-blur-xl shadow-lg"
          : "bg-bg"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 transition-transform hover:scale-105"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white shadow-lg">
            L
          </span>
          <div className="hidden sm:block">
            <h1 className="font-display text-2xl font-bold tracking-tight">
              LUXE
            </h1>

            <p className="text-[11px] text-muted">Premium Store</p>
          </div>
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden flex-1 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 transition-all focus-within:border-primary lg:flex max-w-lg"
        >
          <Search size={17} className="text-muted shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search premium products..."
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
            className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary sm:flex"
          >
            <Heart size={16} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="relative flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Category pill strip */}
      <div className="border-y border-border bg-card">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 no-scrollbar sm:px-6 lg:px-8">
          {categories.map((c) => (
            <NavLink
              key={c.name}
              to={c.path}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-lg"
                    : "bg-surface hover:bg-primary hover:text-white"
                }`
              }
            >
              {c.name}
            </NavLink>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-card shadow-xl md:hidden"
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
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
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
