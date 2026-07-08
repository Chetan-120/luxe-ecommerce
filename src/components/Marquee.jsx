import { Truck, ShieldCheck, RotateCcw, HeadphonesIcon } from "lucide-react";

const perks = [
  { icon: Truck, text: "Free Shipping" },
  { icon: ShieldCheck, text: "Secure Payment" },
  { icon: RotateCcw, text: "30-Day Returns" },
  { icon: HeadphonesIcon, text: "24/7 Support" },
];

export default function Marquee() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {perks.map((p) => (
          <div key={p.text} className="flex items-center gap-3 bg-surface rounded-2xl px-4 py-4">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
              <p.icon size={16} className="text-primary" />
            </div>
            <span className="text-sm font-medium">{p.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}