import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Verified Customer",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review:
      "Absolutely premium quality. The product exceeded my expectations and the delivery was incredibly fast.",
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "Fashion Enthusiast",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    review:
      "LUXE has become my favorite shopping destination. Beautiful products, smooth experience and excellent support.",
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    role: "Tech Lover",
    image: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    review:
      "The website feels premium, the checkout is smooth and the products are exactly as shown.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Testimonials
          </p>

          <h2 className="mt-4 text-3xl font-display font-bold text-ink sm:text-4xl">
            Loved by Thousands of Customers
          </h2>

          <p className="mt-4 text-muted">
            Hear what our customers say about their experience shopping with
            LUXE.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-ink">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-muted">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-5 leading-7 text-muted">
                "{testimonial.review}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}