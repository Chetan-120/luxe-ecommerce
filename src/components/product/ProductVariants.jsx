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
          <h3 className="text-lg font-semibold text-ink">Choose Color</h3>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Selected: {selectedColor?.name}
          </span>
        </div>

        <ColorSelector
          colors={colors}
          selectedColor={selectedColor}
          onChange={onColorChange}
        />

        <div className="mt-4 flex items-center">
          <StockBadge stock={selectedColor?.stock ?? 0} />
        </div>
      </div>

      {needsSize && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-ink">Choose Size</h3>

            <button
              type="button"
              className="rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white"
            >
              Size Guide
            </button>
          </div>

          <p className="mb-3 text-sm text-muted">
            Selected Size:
            <span className="ml-2 font-semibold text-ink">{selectedSize}</span>
          </p>

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
