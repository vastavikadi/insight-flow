"use client";

import { analytics } from "@/lib/analytics";
import { notify } from "@/lib/notifications";
import { useCartStore } from "@/store/cart-store";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
}

export function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const addItem = useCartStore(
    (state) => state.addItem,
  );
  const openCart = useCartStore((state) => state.openCart);

  return (
    <button
      onClick={() => {
        addItem({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
        });

        analytics.addToCart(
          product.id,
        );
notify.cartAdded(product.name,);

        openCart();
      }}
      className="
        mt-10
        px-8
        py-4
        rounded-full
        bg-violet-600
        hover:bg-violet-500
        transition
        active:scale-95"
    >
      Add To Cart
    </button>
  );
}