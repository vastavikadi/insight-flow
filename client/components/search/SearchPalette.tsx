"use client";

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "cmdk";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { products } from "@/lib/products";
import { analytics } from "@/lib/analytics";

export function SearchPalette() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length < 2) {
      return;
    }

    const timeout = setTimeout(() => {
      analytics.searchPerformed(query);
    }, 800);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();

        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-999
        bg-black/60
        backdrop-blur-md
      "
      onClick={() => setOpen(false)}
    >
      <div
        className="
          max-w-2xl
          mx-auto
          mt-32

          bg-zinc-950

          border
          border-white/10

          rounded-3xl

          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        <Command>
          <CommandInput
            placeholder="Search products..."
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>

            {products
              .filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase()),
              )
              .map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => {
                    analytics.searchPerformed(query);

                    analytics.productOpened(product.id);

                    router.push(`/products/${product.id}`);

                    setOpen(false);
                  }}
                >
                  {product.name}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
