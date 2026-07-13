import { Truck, ShieldCheck, RotateCcw, Wallet } from "lucide-react";

import DeliveryChecker from "../DeliveryChecker";

const services = [
  {
    icon: Truck,
    title: "Free Delivery",
    subtitle: "Orders above ₹999",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure",
    subtitle: "Safe Payments",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    subtitle: "Within 30 Days",
  },
  {
    icon: Wallet,
    title: "Cash on Delivery",
    subtitle: "Available",
  },
];

export default function ProductDelivery() {
  return (
    <section className="mt-10">
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-ink">Delivery & Services</h2>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
            Fast Delivery
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {services.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <item.icon
                size={22}
                className="text-primary transition-transform duration-300 group-hover:scale-110"
              />

              <h3 className="mt-3 font-semibold text-ink">{item.title}</h3>

              <p className="mt-1 text-sm text-muted">{item.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Estimated Delivery</p>
              <h3 className="text-lg font-semibold text-ink">
                Tomorrow - 2 Days
              </h3>
            </div>

            <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
              In Stock
            </span>
          </div>

          <DeliveryChecker />
          
        </div>
      </div>
    </section>
  );
}
