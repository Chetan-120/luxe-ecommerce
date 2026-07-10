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
      className="rounded-3xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
        />

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-ink sm:text-lg">
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

          <h4 className="mt-4 text-base font-semibold text-ink sm:text-lg">
            {review.title}
          </h4>

          <p className="mt-2 text-sm leading-7 text-muted sm:text-base">
            {review.comment}
          </p>

          <button className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-95">
            <ThumbsUp size={16} />
            Helpful ({review.helpful})
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
