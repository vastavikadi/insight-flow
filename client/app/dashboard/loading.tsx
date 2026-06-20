import { ChartSkeleton } from "@/components/dashboard/skeletons/ChartSkeleton";

import { StatsCardSkeleton } from "@/components/dashboard/skeletons/StatsCardSkeleton";

export default function Loading() {
  return (
    <div
      className="
        p-8
      "
    >
      <div
        className="
          grid

          md:grid-cols-4

          gap-6

          mb-8
        "
      >
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </div>

      <ChartSkeleton />
    </div>
  );
}
