import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getOrderById } from "../api/orderApi";

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data.order);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="pt-32 text-center">Loading Order...</div>;
  }

  if (!order) {
    return <div className="pt-32 text-center">Order not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
      <Link
        to="/orders"
        className="inline-flex items-center gap-2 text-primary mb-8"
      >
        <ArrowLeft size={18} />
        Back to Orders
      </Link>

      <h1 className="text-4xl font-display font-bold mb-8">Order Details</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-4">Products</h2>

            {order.items.map((item) => (
              <div
                key={item.product}
                className="flex items-center gap-4 py-3 border-b last:border-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>

                  <p className="text-muted">Qty: {item.quantity}</p>
                </div>

                <div className="font-bold">
                  ₹{item.price.toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-4">Shipping Address</h2>

            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city} - {order.shippingAddress.pincode}
            </p>

            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 h-fit">
          <h2 className="font-semibold mb-5">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Status</span>

              <span className="text-primary font-semibold">
                {order.orderStatus}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Payment</span>

              <span>{order.paymentMethod}</span>
            </div>

            <div className="flex justify-between">
              <span>Items</span>

              <span>₹{order.itemsPrice.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>

              <span>₹{order.shippingPrice.toLocaleString("en-IN")}</span>
            </div>

            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>

              <span className="text-primary">
                ₹{order.totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
