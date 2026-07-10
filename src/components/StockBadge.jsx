import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function StockBadge({ stock = 0 }) {
  if (stock === 0) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600 dark:bg-red-500/10 dark:text-red-400">
        <AlertCircle size={16} />
        Out of Stock
      </div>
    );
  }

  if (stock <= 5) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
        <AlertCircle size={16} />
        Only {stock} Left
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600 dark:bg-green-500/10 dark:text-green-400">
      <CheckCircle2 size={16} />
      In Stock
    </div>
  );
}