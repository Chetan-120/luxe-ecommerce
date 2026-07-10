import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Wallet,
} from "lucide-react";

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
        <h2 className="text-xl font-semibold text-ink">
          Delivery & Services
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {services.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-4 transition hover:border-primary"
            >
              <item.icon
                size={22}
                className="text-primary"
              />

              <h3 className="mt-3 font-semibold text-ink">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-muted">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <DeliveryChecker />
        </div>
      </div>
    </section>
  );
}