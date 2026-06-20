import { Skeleton } from "@/components/ui/Skeleton";

export function StatsCardSkeleton() {
  return (
    <div
      className="
        rounded-3xl

        border
        border-white/10

        bg-white/5

        p-6
      "
    >
      <Skeleton
        className="
          h-4
          w-24
          mb-4
        "
      />

      <Skeleton
        className="
          h-10
          w-32
        "
      />
    </div>
  );
}
