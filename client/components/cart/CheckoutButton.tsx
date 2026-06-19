"use client";

import { useRouter }
from "next/navigation";

import { analytics }
from "@/lib/analytics";

export function CheckoutButton() {
  const router =
    useRouter();

  return (
    <button
      onClick={() => {

        analytics.checkoutStarted();

        router.push(
          "/checkout"
        );
      }}

      className="
        w-full
        mt-10

        py-4

        rounded-full

        bg-violet-600
      "
    >
      Checkout
    </button>
  );
}