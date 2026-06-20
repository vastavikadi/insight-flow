"use client";
import { exportSessions } from "@/lib/dashboard-api";

interface Props {
  sessions: any[];
}

export function ExportSessionsButton({ sessions }: Props) {
  const exportCsv = () => {
    const headers = ["Session ID", "Total Events", "First Seen", "Last Seen"];

    const rows = sessions.map((session) =>
      [
        session._id,
        session.totalEvents,
        session.firstSeen,
        session.lastSeen,
      ].join(","),
    );

    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "sessions.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportCsv}
      className="
        px-4
        py-3

        rounded-xl

        bg-violet-600

        hover:bg-violet-500

        transition
      "
    >
      Export Visible Sessions
    </button>
  );
}

export function ExportAllSessionsButton() {
  const exportAllCsv = async () => {
    try {
      const responseJson = await exportSessions();

      const sessions = responseJson.data;

      const headers = ["Session ID", "Total Events", "First Seen", "Last Seen"];

      const rows = sessions.map(
        (session: {
          _id: string;
          totalEvents: number;
          firstSeen: string;
          lastSeen: string;
        }) =>
          [
            session._id,
            session.totalEvents,
            session.firstSeen,
            session.lastSeen,
          ].join(","),
      );
      const csv = [headers.join(","), ...rows].join("\n");

      const blob = new Blob([csv], {
        type: "text/csv",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = "sessions.csv";

      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting sessions:", error);
    }
  };

  return (
    <button
      onClick={exportAllCsv}
      className="
        px-4
        py-3

        rounded-xl

        bg-violet-600

        hover:bg-violet-500

        transition
      "
    >
      Export All Sessions
    </button>
  );
}
