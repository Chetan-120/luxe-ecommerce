import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { useOrderStore } from "../store/useOrderStore";

export default function Orders() {
  const orders = useOrderStore((s) => s.orders);
  const loading = useOrderStore((s) => s.loading);
  const loadOrders = useOrderStore((s) => s.loadOrders);

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="pt-32 text-center">
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="pt-32 text-center">
        <Package
          size={60}
          className="mx-auto text-primary mb-4"
        />

        <h1 className="text-3xl font-bold">
          No Orders Yet
        </h1>

        <p className="text-muted mt-3">
          Your orders will appear here.
        </p>

        <Link
          to="/shop"
          className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-full"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
      <h1 className="text-4xl font-display font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-border rounded-2xl p-6 bg-card"
          >
            <div className="flex justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-muted">
                  Order ID
                </p>

                <p className="font-semibold">
                  {order._id}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted">
                  Total
                </p>

                <p className="font-bold text-primary">
                  ₹{order.totalPrice.toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted">
                  Status
                </p>

                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                  {order.orderStatus}
                </span>
              </div>

              <div>
                <p className="text-sm text-muted">
                  Date
                </p>

                <p>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to={`/orders/${order._id}`}
                className="text-primary font-semibold"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}