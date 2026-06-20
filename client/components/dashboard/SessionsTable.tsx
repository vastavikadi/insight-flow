import Link from "next/link";
import { format } from "date-fns";

interface Session {
  _id: string;
  totalEvents: number;
  firstSeen: string;
  lastSeen: string;
}

interface Props {
  sessions: Session[];
}
function EmptyState() {
  return (
    <div
      className="
        rounded-3xl

        border
        border-white/10

        bg-white/5

        p-12

        text-center
      "
    >
      <h2
        className="
          text-2xl
          font-semibold
        "
      >
        No Sessions Found
      </h2>

      <p
        className="
          mt-3
          text-zinc-400
        "
      >
        Try changing your search criteria.
      </p>
    </div>
  );
}

export function SessionsTable({ sessions }: Props) {
  if (!sessions.length || sessions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className="
        mt-8

        overflow-hidden

        rounded-3xl

        border
        border-white/10

        bg-white/5
      "
    >
      <table className="w-full">
        <thead>
          <tr
            className="
              border-b
              border-white/10
            "
          >
            <th className="p-4 text-left">Session</th>

            <th className="p-4 text-left">Events</th>

            <th className="p-4 text-left">First Seen</th>

            <th className="p-4 text-left">Last Seen</th>

            <th className="p-4 text-left">View</th>
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr
              key={session._id}
              className="
                  border-b
                  border-white/5
                "
            >
              <td className="p-4">
                {session?._id?.slice(0, 12)}
                ...
              </td>

              <td className="p-4">{session.totalEvents}</td>

              <td className="p-4">
                {format(new Date(session.firstSeen), "MMM d, HH:mm")}
              </td>

              <td className="p-4">
                {format(new Date(session.lastSeen), "MMM d, HH:mm")}
              </td>

              <td className="p-4">
                <Link
                  href={`/dashboard/sessions/${session._id}`}
                  className="
                      text-violet-400
                    "
                >
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
