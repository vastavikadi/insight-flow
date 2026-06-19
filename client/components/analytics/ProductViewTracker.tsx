"use client";

import { useEffect }
from "react";

import { analytics }
from "@/lib/analytics";

export function ProductViewTracker({
  productId,
}: {
  productId: string;
}) {

  useEffect(() => {
    analytics.productOpened(
      productId,
    );
  }, [productId]);

  return null;
}