import { Star } from "lucide-react";
import { motion } from "framer-motion";

const RatingStars = ({
  rating = 0,
  size = 18,
  interactive = false,
  value = 0,
  onChange = () => {},
}) => {
  const currentRating = interactive ? value : rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = currentRating >= star;
        const half =
          !filled &&
          currentRating >= star - 0.5 &&
          currentRating < star;

        return (
          <motion.button
            key={star}
            type="button"
            whileHover={interactive ? { scale: 1.15 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            disabled={!interactive}
            onClick={() => interactive && onChange(star)}
            className={`relative ${
              interactive ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <Star
              size={size}
              className="text-border"
              strokeWidth={1.8}
            />

            {(filled || half) && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  width: filled ? "100%" : "50%",
                }}
              >
                <Star
                  size={size}
                  className="fill-yellow-400 text-yellow-400"
                  strokeWidth={1.8}
                />
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default RatingStars;