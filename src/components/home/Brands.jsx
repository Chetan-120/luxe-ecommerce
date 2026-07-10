import { motion } from "framer-motion";

const brands = [
  "LUXE",
  "AURORA",
  "NOVA",
  "VERTEX",
  "PRIME",
  "MONARCH",
];

export default function Brands() {
  return (
    <section className="border-y border-border bg-card py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Trusted By Premium Brands
          </p>

          <h2 className="mt-4 text-3xl font-display font-bold text-ink sm:text-4xl">
            Our Brand Partners
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex h-24 items-center justify-center rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <span className="font-display text-lg font-bold tracking-[0.25em] text-muted transition-colors group-hover:text-primary">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mx-auto max-w-2xl text-muted">
            Partnering with premium brands to bring you quality, innovation,
            and timeless style in every collection.
          </p>
        </div>
      </div>
    </section>
  );
}