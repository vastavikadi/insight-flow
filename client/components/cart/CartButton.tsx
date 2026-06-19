"use client";

import { ShoppingBag } from "lucide-react";

import { useCartStore } from "@/store/cart-store";

import { analytics } from "@/lib/analytics";

export function CartButton() {
  const openCart = useCartStore((state) => state.openCart);

  return (
    <button
      onClick={() => {
        analytics.cartOpened();

        openCart();
      }}
      className="
        relative
      "
    >
      <ShoppingBag />
    </button>
  );
}
