"use client";

import { InsightFlow } from "../../tracker-sdk/src";

let tracker: InsightFlow | null = null;

export function getTracker() {
  if (!tracker) {
    tracker = new InsightFlow({
      apiUrl: process.env.NEXT_PUBLIC_API_URL + "/events/bulk",
      debug: false,
    });
  }

  return tracker;
}