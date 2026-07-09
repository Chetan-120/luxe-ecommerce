export default function SizeSelector({
  sizes = [],
  selectedSize,
  onChange,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => onChange(size)}
          className={`h-11 min-w-11 rounded-xl border px-4 text-sm font-semibold transition-all duration-200 ${
            selectedSize === size
              ? "border-primary bg-primary text-white"
              : "border-border bg-card text-ink hover:border-primary"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}