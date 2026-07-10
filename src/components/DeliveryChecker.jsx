import { useState } from "react";
import { Truck, CircleCheck, CircleX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const serviceablePincodes = [
  "560001",
  "560002",
  "560003",
  "560004",
  "560005",
  "560006",
  "560007",
  "560008",
  "560037",
  "560066",
  "560068",
  "560076",
  "560078",
  "560083",
  "560087",
  "560100",
];

export default function DeliveryChecker() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState(null);

  const checkDelivery = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setResult({
        available: false,
        message: "Please enter a valid 6-digit PIN Code.",
      });
      return;
    }

    if (!serviceablePincodes.includes(pincode)) {
      setResult({
        available: false,
        message: "Delivery is currently unavailable in your area.",
      });
      return;
    }

    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 2);

    setResult({
      available: true,
      message: delivery.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    });
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <Truck className="text-primary" size={22} />
        <h3 className="text-lg font-semibold text-ink">Delivery Information</h3>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter PIN Code"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-ink outline-none transition focus:border-primary"
        />

        <button
          onClick={checkDelivery}
          className="w-full rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 sm:w-auto"
        >
          Check
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-5 rounded-2xl p-4 ${
              result.available
                ? "bg-green-50 dark:bg-green-500/10"
                : "bg-red-50 dark:bg-red-500/10"
            }`}
          >
            <div className="flex items-center gap-3">
              {result.available ? (
                <CircleCheck className="text-green-600" size={22} />
              ) : (
                <CircleX className="text-red-600" size={22} />
              )}

              <div>
                <p className="font-semibold text-ink">
                  {result.available ? "Delivery Available" : "Unavailable"}
                </p>

                <p className="text-sm text-muted">
                  {result.available
                    ? `Estimated Delivery: ${result.message}`
                    : result.message}
                </p>
              </div>
            </div>

            {result.available && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Free Delivery
                </span>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Cash on Delivery
                </span>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Easy Returns
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
