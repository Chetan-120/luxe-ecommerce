import ColorSelector from "../ColorSelector";
import SizeSelector from "../SizeSelector";
import StockBadge from "../StockBadge";

export default function ProductVariants({
  colors,
  selectedColor,
  onColorChange,
  sizes,
  selectedSize,
  onSizeChange,
  needsSize,
}) {
  return (
    <section className="mt-10 space-y-10">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-ink">
            Choose Color
          </h3>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {selectedColor?.name}
          </span>
        </div>

        <ColorSelector
          colors={colors}
          selectedColor={selectedColor}
          onChange={onColorChange}
        />

        <div className="mt-5">
          <StockBadge
            stock={selectedColor?.stock ?? 0}
          />
        </div>
      </div>

      {needsSize && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-ink">
              Choose Size
            </h3>

            <button
              type="button"
              className="rounded-full border border-primary px-3 py-1 text-sm font-medium text-primary transition hover:bg-primary/10"
            >
              Size Guide
            </button>
          </div>

          <SizeSelector
            sizes={sizes}
            selectedSize={selectedSize}
            onChange={onSizeChange}
          />
        </div>
      )}
    </section>
  );
}