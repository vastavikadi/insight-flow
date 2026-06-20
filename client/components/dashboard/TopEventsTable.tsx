interface EventMetric {
  _id: string;
  count: number;
}

export function TopEventsTable({
  data,
}: {
  data: EventMetric[];
}) {
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
      <h2
        className="
          text-2xl
          font-semibold

          mb-6
        "
      >
        Top Events
      </h2>

      <div
        className="
          space-y-4
        "
      >
        {data.map(
          (
            event,
            index,
          ) => (
            <div
              key={event._id}
              className="
                flex
                justify-between

                rounded-xl

                bg-black/20

                p-4
              "
            >
              <div
                className="
                  flex
                  gap-4
                "
              >
                <span
                  className="
                    text-zinc-500
                    w-6
                  "
                >
                  #{index + 1}
                </span>

                <span>
                  {event._id}
                </span>
              </div>

              <span
                className="
                  font-semibold
                "
              >
                {event.count}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}