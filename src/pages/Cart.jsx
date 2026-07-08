import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useState } from "react";

function CouponInput() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);

  return (
    <div className="mb-4">
      {applied ? (
        <div className="flex items-center justify-between bg-success/10 text-success text-sm font-medium px-3 py-2.5 rounded-lg">
          <span>"{code}" applied</span>
          <button onClick={() => { setApplied(false); setCode(""); }} className="text-xs underline">Remove</button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 bg-surface border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          <button
            onClick={() => code && setApplied(true)}
            className="bg-ink text-white text-sm font-medium px-4 rounded-lg hover:bg-black transition-colors"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? 199 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center max-w-md mx-auto px-6">
        <ShoppingBag size={44} className="mx-auto text-muted mb-4" />
        <h2 className="text-2xl font-display font-bold">Your cart is empty</h2>
        <p className="text-muted mt-2">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/shop"
          className="inline-block mt-7 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Continue Shopping
      </Link>

      <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
        Your Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-4 bg-card border border-border rounded-2xl p-4 card-shadow"
                >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover bg-surface"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-muted text-sm">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted hover:text-primary transition-colors h-fit"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-surface rounded-full px-1 py-1 border border-border">
                      <button
                        onClick={() =>
                          updateQty(item.id, Math.max(1, item.qty - 1))
                        }
                        className="p-1.5 hover:text-primary transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="p-1.5 hover:text-primary transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-display font-bold">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
         className="bg-card border border-border rounded-2xl p-6 h-fit sticky top-28 card-shadow"
         >
          <h3 className="font-display font-bold text-lg mb-4">Order Summary</h3>
          <CouponInput />
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Shipping</span>
              <span>₹{shipping.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-3 border-t border-border">
              <span>Total</span>
              <span className="text-primary">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 bg-primary text-white py-4 rounded-full font-semibold hover:bg-primary-dark transition-colors"
          >
            Proceed to Checkout
          </button>
        </motion.div>
      </div>
    </div>
  );
}
