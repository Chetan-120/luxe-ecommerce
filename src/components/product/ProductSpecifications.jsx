import SpecificationTable from "../SpecificationTable";

export default function ProductSpecifications({ specifications }) {
  return (
    <section className="mt-8 sm:mt-10">
      <div className="rounded-3xl border border-border bg-card p-4 sm:p-6">
        <h2 className="mb-5 text-lg font-semibold text-ink sm:text-xl">
          Product Specifications
        </h2>

        <SpecificationTable specifications={specifications} />
      </div>
    </section>
  );
}
