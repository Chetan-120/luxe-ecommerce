import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Truck, CheckCircle2, ArrowLeft } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [placed, setPlaced] = useState(false);
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
    setPlaced(true);
    clearCart();
    setTimeout(() => navigate("/"), 3500);
  };

  const inputClass =
    "w-full bg-surface border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary transition-all duration-300";

  if (placed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <CheckCircle2 size={80} className="text-success mx-auto mb-6" />
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: Math.cos((i / 8) * Math.PI * 2) * 70,
                  y: Math.sin((i / 8) * Math.PI * 2) * 70,
                  scale: 0,
                }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary"
              />
            ))}
          </motion.div>
          <h1 className="text-3xl font-display font-bold">
            Order Placed Successfully!
          </h1>
          <p className="text-muted mt-3">
            Thank you for shopping with LUXE. Redirecting you home...
          </p>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center">
        <p className="text-muted">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
      <button
        onClick={() => navigate("/cart")}
        className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Cart
      </button>

      <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
        Checkout
      </h1>

      <div className="flex items-center gap-4 mb-9">
        {["Shipping", "Payment"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= i + 1
                  ? "bg-primary text-white"
                  : "bg-surface text-muted"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={step >= i + 1 ? "text-ink font-medium" : "text-muted"}
            >
              {label}
            </span>
            {i === 0 && <div className="w-16 h-[1px] bg-border mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <form onSubmit={handlePlaceOrder} className="md:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card border border-border rounded-2xl p-6 space-y-4 card-shadow"
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
                  className={inputClass}
                />
                <input
                  required
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={inputClass}
                />
                <input
                  required
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={inputClass}
                  />
                  <input
                    required
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className={inputClass}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-primary text-white py-4 rounded-full font-semibold hover:bg-primary-dark transition-all duration-300 mt-2"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card border border-border rounded-2xl p-6 space-y-4 card-shadow"
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
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className={inputClass}
                  />
                  <input
                    required
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="CVV"
                    className={inputClass}
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
                    className="flex-1 bg-primary text-white py-4 rounded-full font-semibold hover:bg-primary-dark transition-all duration-300"
                  >
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="bg-card border border-border rounded-2xl p-6 h-fit sticky top-28 card-shadow">
          <h3 className="font-display font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
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