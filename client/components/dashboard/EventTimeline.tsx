import { format } from "date-fns";

interface Event {
  eventId: string;

  eventType: string;

  timestamp: string;

  pageUrl: string;

  customData?: Record<
    string,
    unknown
  >;
}

export function EventTimeline({
  events,
}: {
  events: Event[];
}) {
  return (
    <div
      className="
        relative
        mt-10
      "
    >
      {events.map(
        event => (
          <div
            key={
              event.eventId
            }
            className="
              flex
              gap-6
              mb-10
            "
          >
            <div
              className="
                w-4
                h-4

                rounded-full

                bg-violet-500

                mt-2
              "
            />

            <div
              className="
                flex-1

                rounded-2xl

                bg-white/5

                border
                border-white/10

                p-4
              "
            >
              <div
                className="
                  flex
                  justify-between
                "
              >
                <h3
                  className="
                    font-semibold
                  "
                >
                  {
                    event.eventType
                  }
                </h3>

                <span
                  className="
                    text-zinc-500
                  "
                >
                  {format(
                    new Date(
                      event.timestamp,
                    ),
                    "HH:mm:ss",
                  )}
                </span>
              </div>

              <p
                className="
                  mt-2
                  text-zinc-400
                "
              >
                {
                  event.pageUrl
                }
              </p>

              {event.customData && (
                <pre
                  className="
                    mt-4

                    rounded-xl

                    bg-black/40

                    p-3

                    text-xs
                  "
                >
                  {JSON.stringify(
                    event.customData,
                    null,
                    2,
                  )}
                </pre>
              )}
            </div>
          </div>
        ),
      )}
    </div>
  );
}