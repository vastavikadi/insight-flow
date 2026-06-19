"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useCartStore } from "@/store/cart-store";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { useRouter } from "next/navigation";
import { toast } from "react-custom-alert";

export function WishlistDrawer() {
  const router = useRouter();
  const { wishlist, isWishlistOpen, closeWishlist } = useCartStore();
  const removeFromWishlist = useCartStore((state) => state.removeFromWishlist);
  const addItem = useCartStore((state) => state.addItem);

  const alertInfo = () => toast.info("info");

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div
            className="
              fixed
              inset-0
              bg-black/60
              z-50
            "
            onClick={closeWishlist}
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
              right-0
              top-0

              w-105
              h-screen

              bg-zinc-950

              border-l
              border-white/10

              p-6

              z-50
            "
          >
            <h2
              className="
                text-2xl
                font-bold
              "
            >
              Wishlist
            </h2>

            {wishlist.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Heart size={64} />

                <h3
                  className="
        mt-6
        text-xl
        font-semibold
      "
                >
                  Nothing saved yet
                </h3>

                <p
                  className="
        text-zinc-500
        mt-2
      "
                >
                  Save products you love for later.
                </p>
              </div>
            )}

            <div
              className="
                mt-8
                space-y-4
              "
            >
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="
                      flex
                      justify-between

                      rounded-2xl

                      bg-white/5

                      border
                      border-white/10

                      p-4
                    "
                >
                  <div>
                    <h3>{item.name}</h3>

                    <p
                      className="
                          text-zinc-400
                        "
                    >
                      ${item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      addItem({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        price: item.price,
                      });

                      removeFromWishlist(item.id);

                      analytics.addToCart(item.id);

                      analytics.wishlistMovedToCart(item.id);
                    }}
                    className="
      p-2

      rounded-lg

      hover:bg-violet-500/20

      transition
    "
                  >
                    <ShoppingCart size={18} />
                  </button>
                  <button
                    onClick={() => {
                      analytics.wishlistRemoved(item.id);
                      addItem({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        price: item.price,
                      });

                      removeFromWishlist(item.id);

                      analytics.addToCart(item.id);

                      analytics.checkoutStarted();

                      router.push("/checkout");
                    }}
                    className="
    px-3
    py-2

    rounded-lg

    bg-violet-600

    text-sm
  "
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => {
                      removeFromWishlist(item.id);
                      analytics.wishlistRemoved(item.id);
                    }}
                    className="p-2 rounded-lg hover:bg-red-500/20 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
