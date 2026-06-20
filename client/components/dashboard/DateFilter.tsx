"use client";

import { useRouter } from "next/navigation";

export function DateFilter() {
  const router =
    useRouter();

  return (
    <div
      className="
        flex
        gap-3
      "
    >
      <button
        onClick={() =>
          router.push(
            "?range=7d",
          )
        }
      >
        7 Days
      </button>

      <button
        onClick={() =>
          router.push(
            "?range=30d",
          )
        }
      >
        30 Days
      </button>

      <button
        onClick={() =>
          router.push(
            "?range=90d",
          )
        }
      >
        90 Days
      </button>
    </div>
  );
}