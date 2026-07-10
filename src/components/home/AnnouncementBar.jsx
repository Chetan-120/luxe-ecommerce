import { Sparkles, Truck, ShieldCheck } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <section className="border-b border-border bg-primary text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2 text-xs font-medium sm:text-sm">
        <div className="flex items-center gap-2">
          <Sparkles size={14} />
          New Luxury Collection 2026
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Truck size={14} />
          Free Shipping Above ₹999
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <ShieldCheck size={14} />
          100% Secure Payments
        </div>
      </div>
    </section>
  );
}