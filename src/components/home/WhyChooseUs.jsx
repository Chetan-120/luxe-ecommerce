import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headset,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Your payments and personal information are protected with industry-standard security.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Quick and reliable shipping with live order tracking across India.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description:
      "Enjoy hassle-free returns and exchanges within 30 days of delivery.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Our support team is always available to help whenever you need assistance.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Why Choose LUXE
          </p>

          <h2 className="mt-4 text-3xl font-display font-bold text-ink sm:text-4xl">
            Premium Shopping Experience
          </h2>

          <p className="mt-4 text-muted">
            Every purchase is backed by quality, security and exceptional
            customer service.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <feature.icon size={26} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-ink">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}