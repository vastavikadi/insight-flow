"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SessionSort() {
  const router = useRouter();

  const searchParams = useSearchParams();

  return (
    <select
      defaultValue={searchParams.get("sortBy") ?? "lastSeen"}
      className="
        rounded-xl

        bg-white/5

        border
        border-white/10

        px-4
        py-3
      "
      onChange={(e) => {
        const params = new URLSearchParams(searchParams);

        params.set("sortBy", e.target.value);

        router.push(`?${params}`);
      }}
    >
      <option value="lastSeen" className="bg-black text-white">
        Last Seen
      </option>

      <option value="firstSeen" className="bg-black text-white">
        First Seen
      </option>

      <option value="totalEvents" className="bg-black text-white">
        Total Events
      </option>
    </select>
  );
}
