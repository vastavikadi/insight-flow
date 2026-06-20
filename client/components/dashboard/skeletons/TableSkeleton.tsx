import { Skeleton } from "@/components/ui/Skeleton";

export function TableSkeleton() {
  return (
    <div
      className="
        rounded-3xl

        border
        border-white/10

        overflow-hidden
      "
    >
      {Array.from({
        length: 8,
      }).map((_, index) => (
        <div
          key={index}
          className="
            p-5

            border-b
            border-white/5
          "
        >
          <Skeleton
            className="
              h-5
              w-full
            "
          />
        </div>
      ))}
    </div>
  );
}
