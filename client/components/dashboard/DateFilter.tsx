"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function DateRangeFilter() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const currentRange = searchParams.get("range") ?? "7d";

  const updateRange = (range: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("range", range);

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <div
      className="
        flex
        gap-2
      "
    >
      {["7d", "30d", "90d"].map((range) => (
        <button
          key={range}
          onClick={() => updateRange(range)}
          className={`
            px-4
            py-2

            rounded-xl

            transition

            ${currentRange === range ? "bg-violet-600" : "bg-white/5"}
          `}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
