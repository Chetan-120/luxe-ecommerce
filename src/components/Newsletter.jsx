import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! Welcome to LUXE.");
    setEmail("");
  };

  return (
    <section className="max-w-5xl mx-auto px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-contrast rounded-3xl px-8 py-14 text-center overflow-hidden"
      >
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-16 -left-16 w-56 h-56 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-16 -right-16 w-56 h-56 bg-secondary/20 rounded-full blur-3xl"
        />
        <Mail className="mx-auto text-secondary mb-4 relative z-10" size={32} />
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white relative z-10">
          Join the Inner Circle
        </h2>
        <p className="text-white/60 mt-2 max-w-md mx-auto relative z-10 text-sm">
          Get early access to new collections, exclusive discounts, and style
          edits.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-7 flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-white/10 border border-white/15 text-white rounded-full px-5 py-3.5 focus:outline-none focus:border-secondary transition-colors text-sm placeholder:text-white/40"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors whitespace-nowrap"
          >
            Subscribe <ArrowRight size={16} />
          </button>
        </form>
      </motion.div>
    </section>
  );
}
