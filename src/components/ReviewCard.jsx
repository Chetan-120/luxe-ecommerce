import { ThumbsUp, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import RatingStars from "./RatingStars";

const ReviewCard = ({ review }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="bg-card border border-border rounded-3xl p-6"
    >
      <div className="flex items-start gap-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg text-ink">
                {review.name}
              </h3>

              <div className="mt-1 flex items-center gap-2">
                <RatingStars rating={review.rating} size={16} />

                {review.verified && (
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                    <BadgeCheck size={14} />
                    Verified Purchase
                  </span>
                )}
              </div>
            </div>

            <span className="text-sm text-muted">
              {new Date(review.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <h4 className="mt-4 text-lg font-semibold text-ink">
            {review.title}
          </h4>

          <p className="mt-2 leading-7 text-muted">
            {review.comment}
          </p>

          <button className="mt-5 flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-ink">
            <ThumbsUp size={16} />
            Helpful ({review.helpful})
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;