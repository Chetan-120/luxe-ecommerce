export default function ProductSkeleton() {
  return (
    <div>
      <div className="shimmer bg-surface rounded-2xl aspect-[4/5] border border-border" />
      <div className="mt-3 space-y-2">
        <div className="shimmer h-3 bg-surface rounded w-1/3" />
        <div className="shimmer h-4 bg-surface rounded w-3/4" />
        <div className="shimmer h-4 bg-surface rounded w-1/2" />
      </div>
    </div>
  );
}