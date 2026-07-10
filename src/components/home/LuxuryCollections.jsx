import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const collections = [
  {
    title: "Luxury Accessories",
    subtitle: "Premium craftsmanship for every occasion.",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200",
    link: "/shop?cat=Accessories",
  },
  {
    title: "Modern Fashion",
    subtitle: "Designed for those who appreciate elegance.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200",
    link: "/shop?cat=Fashion",
  },
  {
    title: "Smart Electronics",
    subtitle: "Technology that complements your lifestyle.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200",
    link: "/shop?cat=Electronics",
  },
];

export default function LuxuryCollections() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Curated Collections
          </p>

          <h2 className="mt-3 text-3xl font-display font-bold text-ink sm:text-4xl">
            Luxury Collections
          </h2>

          <p className="mt-3 max-w-2xl text-muted">
            Discover carefully curated collections tailored for every lifestyle.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group overflow-hidden rounded-3xl"
            >
              <div className="relative h-[420px] overflow-hidden rounded-3xl">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-display font-bold">
                    {collection.title}
                  </h3>

                  <p className="mt-3 text-white/80">
                    {collection.subtitle}
                  </p>

                  <Link
                    to={collection.link}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:gap-3"
                  >
                    Explore
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}