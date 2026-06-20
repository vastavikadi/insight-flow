"use client";

interface FunnelStep {
  eventType: string;
  count: number;
}

export function FunnelChart({
  data,
}: {
  data: FunnelStep[];
}) {

  const max =
    Math.max(
      ...data.map(
        item =>
          item.count,
      ),
      1,
    );

  return (
    <div
      className="
        rounded-3xl

        border
        border-white/10

        bg-white/5

        p-8
      "
    >
      <h2
        className="
          text-2xl
          font-semibold

          mb-8
        "
      >
        Conversion Funnel
      </h2>

      <div
        className="
          space-y-6
        "
      >
        {data.map(
          step => (
            <div
              key={
                step.eventType
              }
            >
              <div
                className="
                  flex
                  justify-between

                  mb-2
                "
              >
                <span>
                  {
                    step.eventType
                  }
                </span>

                <span>
                  {
                    step.count
                  }
                </span>
              </div>

              <div
                className="
                  h-4

                  bg-zinc-800

                  rounded-full
                "
              >
                <div
                  className="
                    h-4

                    rounded-full

                    bg-violet-500
                  "
                  style={{
                    width: `${
                      (step.count /
                        max) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}