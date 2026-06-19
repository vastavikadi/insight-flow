"use client";

import { ProductCard } from "./ProductCard";
import { products } from "@/lib/products";

export function BentoShowcase() {
  return (
    <section
      className="
        max-w-7xl
        mx-auto
        px-6
        py-16
      "
    >
      <div className="mb-20">
        <h2
          className="
            text-5xl
            font-bold
          "
        >
          Featured Products
        </h2>

        <p
          className="
            text-zinc-400
            mt-4
          "
        >
          Precision engineered
          for the future.
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
        "
      >
        <div className="lg:col-span-2">
          <ProductCard
            product={products[0]}
            large
          />
        </div>

        <ProductCard
          product={products[1]}
        />

        <ProductCard
          product={products[2]}
        />

        <ProductCard
          product={products[3]}
        />

        <div className="lg:col-span-2">
          <ProductCard
            product={products[4]}
          />
        </div>
      </div>
    </section>
  );
}