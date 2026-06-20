import { ChartSkeleton } from "@/components/dashboard/skeletons/ChartSkeleton";

export default function Loading() {
  return (
    <div
      className="
        p-8

        space-y-8
      "
    >
      <div
        className="
          grid

          lg:grid-cols-2

          gap-6
        "
      >
        <ChartSkeleton />
        <ChartSkeleton />
      </div>

      <ChartSkeleton />

      <ChartSkeleton />
    </div>
  );
}
