"use client";

import { Heart } from "lucide-react";

import { analytics }
from "@/lib/analytics";

import { notify } from "@/lib/notifications";

import {
  useCartStore,
} from "@/store/cart-store";

interface Props {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
}

export function WishlistButton({
  product,
}: Props) {

  const addToWishlist =
    useCartStore(
      state =>
        state.addToWishlist,
    );

  return (
    <button
      onClick={() => {

        addToWishlist({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
        });

        analytics.wishlistAdded(
          product.id,
        );
        notify.wishlistAdded(product.name);
      }}

      className="
        p-3

        rounded-full

        border
        border-white/10

        hover:border-violet-500

        transition
      "
    >
      <Heart />
    </button>
  );
}