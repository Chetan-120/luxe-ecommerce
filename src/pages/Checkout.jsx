import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Truck, ArrowLeft } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? 199 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    clearCart();
    navigate("/order-success");
  };

  const inputClass =
    "w-full bg-surface border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary transition-all duration-300";

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center">
        <p className="text-muted">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-24 sm:px-6 md:pt-28">
      <button
        onClick={() => navigate("/cart")}
        className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Cart
      </button>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold">
          Secure Checkout
        </h1>

        <p className="mt-2 text-muted">
          Complete your purchase securely with encrypted payment.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
            ✓ 100% Secure Payment
          </span>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            🚚 Free Returns
          </span>

          <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
            ⚡ Fast Delivery
          </span>
        </div>
      </div>

      <div className="mb-10 overflow-x-auto">
        <div className="flex min-w-max items-center gap-4">
          {["Shipping", "Payment"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  step >= i + 1
                    ? "bg-primary text-white"
                    : "bg-surface text-muted"
                }`}
              >
                {i + 1}
              </div>

              <span
                className={
                  step >= i + 1 ? "font-medium text-ink" : "text-muted"
                }
              >
                {label}
              </span>

              {i === 0 && <div className="mx-2 h-px w-16 bg-border" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-3xl border border-border bg-card p-7 space-y-5 card-shadow"
              >
                <h3 className="font-display font-semibold text-lg flex items-center gap-2 mb-2">
                  <Truck size={19} className="text-primary" /> Shipping Details
                </h3>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`${inputClass} hover:border-primary`}
                />
                <input
                  required
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`${inputClass} hover:border-primary`}
                />
                <input
                  required
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className={`${inputClass} hover:border-primary`}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    required
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={`${inputClass} hover:border-primary`}
                  />
                  <input
                    required
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className={`${inputClass} hover:border-primary`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-2 w-full rounded-full bg-primary py-4 font-semibold text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg active:scale-[0.98]"
                >
                  Continue →
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-3xl border border-border bg-card p-7 space-y-5 card-shadow"
              >
                <h3 className="font-display font-semibold text-lg flex items-center gap-2 mb-2">
                  <CreditCard size={19} className="text-primary" /> Payment
                  Details
                </h3>
                <input
                  required
                  name="card"
                  value={form.card}
                  onChange={handleChange}
                  placeholder="Card Number"
                  className={`${inputClass} hover:border-primary`}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    required
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className={`${inputClass} hover:border-primary`}
                  />
                  <input
                    required
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="CVV"
                    className={`${inputClass} hover:border-primary`}
                  />
                </div>
                <div className="flex gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-border py-4 rounded-full font-semibold hover:border-primary hover:text-primary transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-primary py-4 font-semibold text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg active:scale-[0.98]"
                  >
                    Complete Order
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="h-fit rounded-3xl border border-border bg-card p-6 shadow-lg lg:sticky lg:top-28">
          <h3 className="mb-5 text-xl font-display font-bold">Order Summary</h3>
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 dark:border-green-500/20 dark:bg-green-500/10">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              🔒 Secure SSL Encrypted Checkout
            </p>
          </div>
          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl bg-surface p-3"
              >
                <span className="text-muted">
                  {item.name} × {item.qty}
                </span>
                <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3 text-sm mt-4 pt-4 border-t border-border">
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
        </div>
      </div>
    </div>
  );
}
