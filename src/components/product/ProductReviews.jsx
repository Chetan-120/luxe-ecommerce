import { MessageSquare } from "lucide-react";
import ReviewSummary from "../ReviewSummary";
import ReviewCard from "../ReviewCard";
import ReviewForm from "../ReviewForm";

export default function ProductReviews({ reviews, onSubmit }) {
  return (
    <section className="mt-16 sm:mt-20">
      <ReviewSummary reviews={reviews} />

      <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Customer Feedback
          </p>

          <h2 className="mt-2 text-3xl font-display font-bold text-ink">
            Customer Reviews
          </h2>
        </div>

        <div className="rounded-full bg-surface px-4 py-2 flex items-center gap-2 text-sm font-medium text-muted">
          <MessageSquare size={16} />
          <span>
            {reviews.length} Review{reviews.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-surface px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <MessageSquare size={26} className="text-primary" />
            </div>

            <h3 className="text-xl font-semibold text-ink">No Reviews Yet</h3>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-muted">
              Be the first customer to share your experience with this product.
            </p>
          </div>
        )}
      </div>

      <div className="mt-14 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            SHARE YOUR EXPERIENCE
          </p>

          <h3 className="mt-2 text-2xl font-display font-bold text-ink">
            Write a Review
          </h3>

          <p className="mt-2 text-sm text-muted">
            Tell other customers what you liked about this product.
          </p>
        </div>

        <ReviewForm onSubmit={onSubmit} />
      </div>
    </section>
  );
}
