import RatingStars from "./RatingStars";
import {
  getAverageRating,
  getTotalReviews,
  getRatingDistribution,
  getRatingPercentage,
  formatRating,
} from "../utils/rating";

const ReviewSummary = ({ reviews = [] }) => {
  const average = getAverageRating(reviews);
  const total = getTotalReviews(reviews);
  const distribution = getRatingDistribution(reviews);

  return (
    <div className="bg-card border border-border rounded-3xl p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-56 flex flex-col items-center justify-center text-center">
          <h2 className="text-5xl font-bold text-ink">
            {formatRating(average)}
          </h2>

          <div className="mt-3">
            <RatingStars rating={average} size={22} />
          </div>

          <p className="mt-3 text-sm text-muted">
            Based on {total.toLocaleString("en-IN")} Reviews
          </p>
        </div>

        <div className="flex-1 space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-4">
              <span className="w-5 text-sm font-medium text-ink">
                {star}
              </span>

              <div className="flex-1 h-3 rounded-full bg-surface overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${getRatingPercentage(
                      distribution[star],
                      total
                    )}%`,
                  }}
                />
              </div>

              <span className="w-12 text-right text-sm text-muted">
                {distribution[star]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;