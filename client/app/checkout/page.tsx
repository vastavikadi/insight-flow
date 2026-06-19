"use client";

import { analytics } from "@/lib/analytics";
import { notify } from "@/lib/notifications";
import { useCartStore } from "@/store/cart-store";

export default function Checkout() {
  const { items, clearCart } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const completePurchase = () => {
    const orderId = `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    analytics.purchaseCompleted(orderId, items, total);

    clearCart();
notify.purchaseCompleted(orderId);
  };

  return (
    <main
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          w-full
          max-w-xl

          rounded-3xl

          bg-white/5
          border
          border-white/10

          p-8
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            mb-8
          "
        >
          Checkout
        </h1>

        <div
          className="
            space-y-4
            mb-8
          "
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="
                  flex
                  justify-between
                "
            >
              <span>{item.name}</span>

              <span>${item.price}</span>
            </div>
          ))}
        </div>

        <div
          className="
            border-t
            border-white/10

            pt-6

            flex
            justify-between

            text-xl
            font-semibold
          "
        >
          <span>Total</span>

          <span>${total}</span>
        </div>

        <button
          onClick={completePurchase}
          className="
            w-full

            mt-8

            py-4

            rounded-full

            bg-green-600

            hover:bg-green-500

            transition
          "
        >
          Complete Purchase
        </button>
      </div>
    </main>
  );
}
