export default function ColorSelector({
  colors = [],
  selectedColor,
  onChange,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <button
          key={color.name}
          type="button"
          onClick={() => onChange(color)}
          title={color.name}
          className={`relative h-10 w-10 rounded-full border-2 transition-all duration-200 ${
            selectedColor?.name === color.name
              ? "border-primary scale-110"
              : "border-border hover:scale-105"
          }`}
          style={{
            backgroundColor: color.value,
          }}
        >
          {selectedColor?.name === color.name && (
            <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
              ✓
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
