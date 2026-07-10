const DEFAULT_SPECS = {
  brand: "LUXE",
  material: "Premium Quality",
  warranty: "1 Year",
  country: "India",
  shipping: "Free Shipping",
};

export default function SpecificationTable({
  specifications = {},
}) {
  const specs = {
    ...DEFAULT_SPECS,
    ...specifications,
  };

  return (
    <div className="divide-y divide-border">
      {Object.entries(specs).map(([key, value]) => (
        <div
          key={key}
          className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="text-sm font-medium capitalize tracking-wide text-muted">
            {key.replace(/([A-Z])/g, " $1")}
          </span>

          <span className="text-sm font-semibold text-ink sm:text-right">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}