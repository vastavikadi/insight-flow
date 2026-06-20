import { DashboardLayout }
from "@/components/dashboard/DashboardLayout";

import { SessionsTable }
from "@/components/dashboard/SessionsTable";

import { getSessions }
from "@/lib/dashboard-api";

export default async function SessionsPage() {

  const response =
    await getSessions();

  const sessions =
    response.data ??
    response.sessions ??
    [];

  return (
    <DashboardLayout>
      <h1
        className="
          text-4xl
          font-bold
        "
      >
        Sessions
      </h1>

      <SessionsTable
        sessions={
          sessions
        }
      />
    </DashboardLayout>
  );
}