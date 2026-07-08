import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Watch,
  Headphones,
  Shirt,
  Lamp,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { products } from "../data/products";
import { useScroll, useTransform } from "framer-motion";

const shortcuts = [
  {
    name: "Accessories",
    icon: Watch,
    path: "/shop?cat=Accessories",
    color:
      "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  },
  {
    name: "Electronics",
    icon: Headphones,
    path: "/shop?cat=Electronics",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
  {
    name: "Fashion",
    icon: Shirt,
    path: "/shop?cat=Fashion",
    color: "bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
  },
  {
    name: "Home",
    icon: Lamp,
    path: "/shop?cat=Home",
    color:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
];

export default function HeroSection() {
  const floatProducts = [products[0], products[2], products[4]];
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, -40]);
  const y2 = useTransform(scrollY, [0, 400], [0, -70]);

  return (
    <section className="pt-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ y: y1 }}
          className="relative rounded-3xl overflow-hidden bg-contrast px-6 md:px-12 py-16 md:py-24 min-h-[520px] flex items-center"
        >
          <div className="absolute inset-0">
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-30%] left-[-10%] w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px]" />
            <svg
              className="absolute top-0 right-0 w-1/2 h-full opacity-[0.06]"
              viewBox="0 0 400 400"
            >
              <circle
                cx="350"
                cy="50"
                r="180"
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="350"
                cy="50"
                r="120"
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="350"
                cy="50"
                r="60"
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm">
                <Sparkles size={12} className="text-secondary" /> NEW COLLECTION
                2026
              </span>
              <h1 className="text-white text-4xl md:text-6xl font-display font-bold leading-[1.08] text-balance">
                Premium finds,
                <br />
                <span className="gradient-text">delivered fast.</span>
              </h1>
              <p className="text-white/70 mt-5 text-base md:text-lg max-w-md">
                Curated accessories, fashion, electronics & home essentials —
                handpicked for those who expect more.
              </p>
              <div className="flex items-center gap-4 mt-8 flex-wrap">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-2 bg-white text-contrast px-8 py-3.5 rounded-full font-semibold hover:bg-white/90 transition-colors"
                >
                  Explore Now
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {[12, 32, 47].map((n) => (
                      <img
                        key={n}
                        src={`https://i.pravatar.cc/100?img=${n}`}
                        className="w-8 h-8 rounded-full border-2 border-contrast object-cover"
                      />
                    ))}
                  </div>
                  <div className="text-white/70 text-xs">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className="fill-secondary text-secondary"
                        />
                      ))}
                    </div>
                    25k+ happy customers
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="relative hidden md:block h-[380px]">
              {floatProducts.map((p, i) => {
                const positions = [
                  {
                    top: "0%",
                    left: "10%",
                    rotate: -6,
                    delay: 0.3,
                    size: "w-40",
                  },
                  {
                    top: "18%",
                    left: "52%",
                    rotate: 4,
                    delay: 0.5,
                    size: "w-44",
                  },
                  {
                    top: "52%",
                    left: "22%",
                    rotate: -3,
                    delay: 0.7,
                    size: "w-36",
                  },
                ][i];
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 40, rotate: 0 }}
                    animate={{ opacity: 1, y: 0, rotate: positions.rotate }}
                    transition={{
                      duration: 0.7,
                      delay: positions.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                    className={`absolute ${positions.size} bg-card rounded-2xl p-3 shadow-2xl cursor-pointer`}
                    style={{ top: positions.top, left: positions.left }}
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 3.5 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full aspect-square object-cover rounded-xl"
                      />
                      <p className="text-xs font-semibold mt-2 truncate text-ink">
                        {p.name}
                      </p>
                      <p className="text-primary font-bold text-sm">
                        ₹{p.price.toLocaleString("en-IN")}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-4 gap-3 md:gap-5 mt-6"
        >
          {shortcuts.map((s) => (
            <Link
              key={s.name}
              to={s.path}
              className="flex flex-col items-center gap-2 bg-card border border-border rounded-2xl py-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}
              >
                <s.icon size={20} />
              </div>
              <span className="text-xs md:text-sm font-medium text-center px-1 text-ink">
                {s.name}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
