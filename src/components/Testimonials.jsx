import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Ananya Sharma",
    role: "Verified Buyer",
    text: "The quality completely exceeded my expectations. Packaging felt premium and delivery was quick.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Rohan Mehta",
    role: "Verified Buyer",
    text: "Absolutely love the design of this store — feels like shopping at a proper boutique online.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Priya Nair",
    role: "Verified Buyer",
    text: "Customer support was excellent and the product matched the photos perfectly. Highly recommend.",
    rating: 4,
    avatar: "https://i.pravatar.cc/100?img=32",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <span className="text-primary text-xs font-semibold tracking-wide">
          TESTIMONIALS
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-bold mt-1">
          What Our Customers Say
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="bg-card border border-border rounded-2xl p-6 relative card-shadow"
          >
            <Quote
              className="text-primary/10 absolute top-4 right-4"
              size={36}
            />
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  size={13}
                  className={
                    idx < r.rating
                      ? "fill-secondary text-secondary"
                      : "text-border"
                  }
                />
              ))}
            </div>
            <p className="text-muted leading-relaxed mb-5 text-sm">{r.text}</p>
            <div className="flex items-center gap-3">
              <img
                src={r.avatar}
                alt={r.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-muted text-xs">{r.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
