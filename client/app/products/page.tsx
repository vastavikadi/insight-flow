import { products } from "@/lib/products";

import { ProductCard } from "@/components/products/ProductCard";

export default function ProductsPage() {
  return (
    <main
      className="
        min-h-screen
        bg-black
        text-white
        px-8
        py-32
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
        "
      >
        <h1
          className="
            text-6xl
            font-bold
            mb-16
          "
        >
          Products
        </h1>

        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
