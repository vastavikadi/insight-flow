"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useCartStore } from "@/store/cart-store";

import { CheckoutButton } from "./CheckoutButton";

export function CartDrawer() {
  const { isOpen, closeCart, items } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="
              fixed
              inset-0
              bg-black/60
              z-50
            "
            onClick={closeCart}
          />

          <motion.div
            initial={{
              x: 500,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: 500,
            }}
            className="
              fixed
              top-0
              right-0

              w-105
              h-screen

              bg-zinc-950

              border-l
              border-white/10

              z-50

              p-6
            "
          >
            <h2
              className="
                text-2xl
                font-bold
              "
            >
              Cart
            </h2>

            <div
              className="
    mt-8
    space-y-4
  "
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="
        flex
        items-center
        justify-between

        rounded-2xl

        border
        border-white/10

        bg-white/5

        p-4
      "
                >
                  <div>
                    <h3
                      className="
            font-medium
          "
                    >
                      {item.name}
                    </h3>

                    <p
                      className="
            text-zinc-400
            text-sm
          "
                    >
                      {item.id}
                    </p>
                  </div>

                  <span
                    className="
          font-semibold
          text-violet-400
        "
                  >
                    ${item.price}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="
    mt-8
    border-t
    border-white/10
    pt-6

    flex
    justify-between

    text-lg
    font-semibold
  "
            >
              <span>Total</span>

              <span>${total}</span>
            </div>

            <CheckoutButton />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
