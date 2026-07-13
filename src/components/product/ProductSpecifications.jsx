import SpecificationTable from "../SpecificationTable";

export default function ProductSpecifications({ specifications }) {
  return (
    <section className="mt-8 sm:mt-10">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              PRODUCT DETAILS
            </p>

            <h2 className="mt-1 text-2xl font-bold text-ink">Specifications</h2>
          </div>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Premium Quality
          </span>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-surface p-4">
            <p className="text-sm text-muted">Warranty</p>
            <h3 className="mt-1 font-semibold">12 Months</h3>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-4">
            <p className="text-sm text-muted">Material</p>
            <h3 className="mt-1 font-semibold">Premium Quality</h3>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-4">
            <p className="text-sm text-muted">Shipping</p>
            <h3 className="mt-1 font-semibold">Free Express</h3>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-4">
            <p className="text-sm text-muted">Country</p>
            <h3 className="mt-1 font-semibold">India</h3>
          </div>
        </div>

        <SpecificationTable specifications={specifications} />
      </div>
    </section>
  );
}
