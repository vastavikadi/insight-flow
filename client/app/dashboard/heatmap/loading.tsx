import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div
      className="
        p-8
      "
    >
      <Skeleton
        className="
          h-12
          w-64

          mb-8
        "
      />

      <Skeleton
        className="
          h-[800px]
          w-full
        "
      />
    </div>
  );
}
