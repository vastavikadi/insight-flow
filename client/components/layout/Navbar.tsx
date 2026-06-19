"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CartButton } from "../cart/CartButton";
import { Heart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export function Navbar() {
  const openWishlist = useCartStore((state) => state.openWishlist);
  return (
    <motion.nav
      initial={{
        y: -100,
      }}
      animate={{
        y: 0,
      }}
      className="
        fixed
        top-6
        left-1/2
        -translate-x-1/2
        z-50

        w-[95%]
        max-w-6xl

        backdrop-blur-xl
        bg-white/5

        border
        border-white/10

        rounded-full

        px-8
        py-4
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <Link
          href="/"
          className="
            text-xl
            font-bold
            tracking-widest
          "
        >
          NEXUS
        </Link>

        <div
          className="
            hidden
            md:flex
            items-center
            gap-8
          "
        >
          <Link href="/">Home</Link>

          <Link href="/products">Products</Link>

          <Link href="/about">About</Link>
          <button className="px-4 py-2 rounded-full border border-white/10 text-sm text-zinc-400">
            Ctrl + K
          </button>
        </div>

        <CartButton />
        <button
          onClick={openWishlist}
          className="relative"
        >
          <Heart />
        </button>
      </div>
    </motion.nav>
  );
}
