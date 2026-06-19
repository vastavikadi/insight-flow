"use client";

import { InsightFlow } from "../../tracker-sdk/src";

let tracker: InsightFlow | null = null;

export function getTracker() {
  if (!tracker) {
    tracker = new InsightFlow({
      apiUrl:
        "http://localhost:5000/api/events/bulk",
      debug: true,
    });
  }

  return tracker;
}