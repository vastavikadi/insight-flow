import { format } from "date-fns";

interface Event {
  eventId: string;

  clickData?: {
    x: number;
    y: number;
  };

  eventType: string;

  timestamp: string;

  pageUrl: string;

  customData?: Record<string, unknown>;
}

export function EventTimeline({ events }: { events: Event[] }) {
  return (
    <div
      className="
        relative
        mt-10
      "
    >
      {events.map((event) => (
        <div
          key={event.eventId}
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
              <div
                className={`inline-flex px-3 py-1 rounded-full text-xs ${getEventStyle(event.eventType)}`}
              >
                {event.eventType}
              </div>

              <span
                className="
                    text-zinc-500
                  "
              >
                {format(new Date(event.timestamp), "HH:mm:ss")}
              </span>
            </div>

            <p
              className="
                  mt-2
                  text-zinc-400
                "
            >
              {event.pageUrl}
            </p>
            {event.eventType === "click" && event.clickData && (
              <div
                className="
        mt-3

        text-sm

        text-zinc-400
      "
              >
                X: {event.clickData.x}
                {" | "}
                Y: {event.clickData.y}
              </div>
            )}
            {event.customData && (
              <div className="mt-4">
                {Object.entries(event.customData).map(([key, value]) => (
                  <div
                    key={key}
                    className="
          flex
          justify-between
          py-1
        "
                  >
                    <span>{key}</span>

                    <span>{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
