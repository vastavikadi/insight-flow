import Link from "next/link";
import { format } from "date-fns";

interface Session {
  sessionId: string;
  totalEvents: number;
  firstSeen: string;
  lastSeen: string;
}

interface Props {
  sessions: Session[];
}

export function SessionsTable({
  sessions,
}: Props) {
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
            <th className="p-4 text-left">
              Session
            </th>

            <th className="p-4 text-left">
              Events
            </th>

            <th className="p-4 text-left">
              First Seen
            </th>

            <th className="p-4 text-left">
              Last Seen
            </th>

            <th className="p-4 text-left">
              View
            </th>
          </tr>
        </thead>

        <tbody>
          {sessions.map(
            session => (
              <tr
                key={
                  session.sessionId
                }
                className="
                  border-b
                  border-white/5
                "
              >
                <td className="p-4">
                  {session.sessionId.slice(
                    0,
                    12,
                  )}
                  ...
                </td>

                <td className="p-4">
                  {
                    session.totalEvents
                  }
                </td>

                <td className="p-4">
                  {format(
                    new Date(
                      session.firstSeen,
                    ),
                    "MMM d, HH:mm",
                  )}
                </td>

                <td className="p-4">
                  {format(
                    new Date(
                      session.lastSeen,
                    ),
                    "MMM d, HH:mm",
                  )}
                </td>

                <td className="p-4">
                  <Link
                    href={`/dashboard/sessions/${session.sessionId}`}
                    className="
                      text-violet-400
                    "
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}