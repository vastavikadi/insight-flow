import { Skeleton } from "@/components/ui/Skeleton";

export function ChartSkeleton() {
  return (
    <div
      className="
        rounded-3xl

        border
        border-white/10

        bg-white/5

        p-6

        h-[450px]
      "
    >
      <Skeleton
        className="
          h-6
          w-48
          mb-8
        "
      />

      <Skeleton
        className="
          h-[320px]
          w-full
        "
      />
    </div>
  );
}
