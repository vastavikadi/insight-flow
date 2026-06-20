"use client";

interface HeatPoint {
  clickData?: {
    x: number;
    y: number;
  };
}

export function HeatmapCanvas({
  points,
}: {
  points: HeatPoint[];
}) {
  return (
    <div
      className="
        relative

        w-full

        h-[800px]

        rounded-3xl

        border
        border-white/10

        bg-zinc-950

        overflow-hidden
      "
    >
      {points.map(
        (point, index) => {

          if (
            !point.clickData
          ) {
            return null;
          }

          return (
            <div
              key={index}
              className="
                absolute

                w-5
                h-5

                rounded-full

                bg-red-500/40

                blur-[2px]
              "
              style={{
                left:
                  point.clickData.x,

                top:
                  point.clickData.y,
              }}
            />
          );
        },
      )}
    </div>
  );
}