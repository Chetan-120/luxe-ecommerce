import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
  <footer className="bg-bg border-t border-border mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-9">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white font-display font-bold text-sm">L</span>
            <span className="text-xl font-display font-bold">LUXE</span>
          </div>
          <p className="text-muted text-sm leading-relaxed max-w-xs">
            Curated premium essentials, crafted for those who value timeless design.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Shop</h4>
          <ul className="space-y-2.5 text-muted text-sm">
            <li><Link to="/shop" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            <li><Link to="/shop" className="hover:text-primary transition-colors">Best Sellers</Link></li>
            <li><Link to="/shop" className="hover:text-primary transition-colors">Collections</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Support</h4>
          <ul className="space-y-2.5 text-muted text-sm">
            <li className="hover:text-primary cursor-pointer transition-colors">Shipping</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Returns</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Follow Us</h4>
          <div className="flex gap-3">
            <a className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all cursor-pointer"><Instagram size={16} /></a>
            <a className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all cursor-pointer"><Twitter size={16} /></a>
            <a className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all cursor-pointer"><Youtube size={16} /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-muted text-xs py-5 border-t border-border">© 2026 LUXE. All rights reserved.</div>
    </footer>
  );
}