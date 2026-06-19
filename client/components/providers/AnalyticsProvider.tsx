"use client";

import { useEffect } from "react";

import { getTracker } from "@/lib/tracker";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const tracker = getTracker();
    tracker.init();

    return () => {
      void tracker.destroy();
    };
  }, []);

  return children;
}
