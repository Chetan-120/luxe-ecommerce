import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  const orderId =
    "#" +
    Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 pt-36 pb-16 text-center">

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 12,
        }}
      >
        <CheckCircle
          className="h-24 w-24 text-green-500"
          strokeWidth={1.5}
        />
      </motion.div>

      <h1 className="mt-8 text-4xl font-display font-bold">
        Order Placed Successfully!
      </h1>

      <p className="mt-4 max-w-md text-muted">
        Thank you for shopping with LUXE.
        Your order has been confirmed and is being prepared.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card px-8 py-5">
        <p className="text-sm text-muted">
          Order ID
        </p>

        <p className="mt-2 text-2xl font-bold text-primary">
          {orderId}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">

        <Link
          to="/shop"
          className="rounded-full bg-primary px-8 py-3 font-semibold text-white transition hover:bg-primary-dark"
        >
          Continue Shopping
        </Link>

        <Link
          to="/"
          className="flex items-center gap-2 rounded-full border border-border px-8 py-3 font-semibold transition hover:border-primary hover:text-primary"
        >
          <ShoppingBag size={18} />
          Back Home
        </Link>

      </div>

    </div>
  );
}