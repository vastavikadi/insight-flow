"use client";

import Image from "next/image";
import Link from "next/link";
import { TiltCard } from "@/components/spatial/TiltCard";
import { SpotlightCard } from "@/components/spatial/SpotlightCard";
import { analytics } from "@/lib/analytics";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    tagline: string;
    description: string;
    image: string;
    price: number;
    specs?: string[];
  };

  large?: boolean;
}

export function ProductCard({ product, large = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      onClick={() => analytics.productOpened(product.id)}
    >
      <TiltCard>
        <SpotlightCard>
          <div
            className={`
            relative
            overflow-hidden
            rounded-3xl
            p-8
            ${large ? "h-150" : "h-100"}
          `}
          >
            <div className="relative z-10">
              <p className="text-zinc-400">{product.tagline}</p>

              <h3
                className="
                text-3xl
                font-bold
                mt-2
              "
              >
                {product.name}
              </h3>

              <p
                className="
                text-violet-400
                mt-4
                text-xl
              "
              >
                ${product.price}
              </p>
              {/* <p
              className="
                text-violet-400
                mt-4
                text-xl
              "
            >
              {product.description}
            </p>
            {product.specs && (
              <ul
                className="
                  text-zinc-400
                  mt-4
                  space-y-2
                "
              >
                {product.specs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            )} */}
            </div>

            <div
              className="
              absolute
              bottom-0
              right-0
              left-0
              h-[70%]
            "
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-contain translate-y-10"
              />
            </div>
          </div>
        </SpotlightCard>
      </TiltCard>
    </Link>
  );
}
