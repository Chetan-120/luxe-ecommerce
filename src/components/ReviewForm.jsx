import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import RatingStars from "./RatingStars";

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !title.trim() || !comment.trim()) {
      toast.error("Please complete all fields.");
      return;
    }

    const review = {
      id: Date.now(),
      name: "You",
      avatar: "https://i.pravatar.cc/100",
      rating,
      title,
      comment,
      date: new Date().toISOString(),
      verified: false,
      helpful: 0,
    };

    onSubmit(review);

    setRating(0);
    setTitle("");
    setComment("");

    toast.success("Review submitted successfully.");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-3xl p-6 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-ink">
          Write a Review
        </h2>

        <p className="mt-2 text-muted">
          Share your experience with this product.
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-ink">
          Rating
        </label>

        <RatingStars
          interactive
          value={rating}
          onChange={setRating}
          size={28}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-ink">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Review title"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-ink outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-ink">
          Review
        </label>

        <textarea
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-ink outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
      >
        <Send size={18} />
        Submit Review
      </button>
    </motion.form>
  );
};

export default ReviewForm;