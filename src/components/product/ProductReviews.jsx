import { MessageSquare } from "lucide-react";
import ReviewSummary from "../ReviewSummary";
import ReviewCard from "../ReviewCard";
import ReviewForm from "../ReviewForm";

export default function ProductReviews({
  reviews,
  onSubmit,
}) {
  return (
    <section className="mt-16 sm:mt-20">
      <ReviewSummary reviews={reviews} />

      <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Customer Feedback
          </p>

          <h2 className="mt-2 text-2xl font-display font-bold text-ink sm:text-3xl">
            Customer Reviews
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted">
          <MessageSquare size={16} />
          <span>
            {reviews.length} Review{reviews.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <MessageSquare
                size={26}
                className="text-primary"
              />
            </div>

            <h3 className="text-xl font-semibold text-ink">
              No Reviews Yet
            </h3>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-muted">
              Be the first customer to share your experience with this
              product.
            </p>
          </div>
        )}
      </div>

      <div className="mt-14">
        <ReviewForm onSubmit={onSubmit} />
      </div>
    </section>
  );
}