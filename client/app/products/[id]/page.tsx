import Image from "next/image";

import { notFound } from "next/navigation";

import { products } from "@/lib/products";
import { ProductViewTracker } from "@/components/analytics/ProductViewTracker";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { WishlistButton } from "@/components/products/WishlistButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

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
      <ProductViewTracker productId={product.id} />
      <div
        className="
          max-w-7xl
          mx-auto

          grid
          lg:grid-cols-2
          gap-16
        "
      >
        <div
          className="
            relative
            h-150

            rounded-3xl

            bg-white/5
          "
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="
              object-contain
            "
          />
        </div>

        <div>
          <p
            className="
              text-violet-400
            "
          >
            {product.tagline}
          </p>

          <h1
            className="
              text-6xl
              font-bold
              mt-4
            "
          >
            {product.name}
          </h1>

          <p
            className="
              text-zinc-400
              mt-8
            "
          >
            {product.description}
          </p>

          <p
            className="
              text-4xl
              font-bold
              mt-8
            "
          >
            ${product.price}
          </p>

          <div className="flex items-center gap-4 mt-10">
            <AddToCartButton product={product} />

            <WishlistButton
              product={{
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
              }}
            />
          </div>

          <div
            className="
              mt-16
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-6
              "
            >
              Specifications
            </h2>

            <ul
              className="
                space-y-4
              "
            >
              {product.specs.map((spec) => (
                <li
                  key={spec}
                  className="
                      text-zinc-400
                    "
                >
                  • {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
