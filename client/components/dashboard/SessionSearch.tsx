"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
export function SessionSearch() {
  const router = useRouter();

  const searchParams = useSearchParams();

  return (
    <div
      className="
        relative
        max-w-md
      "
    >
      <Search
        size={18}
        className="
          absolute
          left-4
          top-3.5
          text-zinc-500
        "
      />

      <input
        defaultValue={searchParams.get("search") ?? ""}
        placeholder="Search session..."
        className="
          w-full

          rounded-xl

          border
          border-white/10

          bg-white/5

          pl-11
          pr-4
          py-3
        "
        onChange={useDebouncedCallback((e) => {
          const params = new URLSearchParams(searchParams);

          params.set("search", e.target.value);

          params.set("page", "1");

          router.push(`?${params.toString()}`);
        }, 400)}
      />
    </div>
  );
}
