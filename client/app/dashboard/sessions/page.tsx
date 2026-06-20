import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

import { SessionsTable } from "@/components/dashboard/SessionsTable";

import { SessionSearch } from "@/components/dashboard/SessionSearch";

import { SessionSort } from "@/components/dashboard/SessionSort";

import { getSessions } from "@/lib/dashboard-api";
import { Pagination } from "@/components/dashboard/Pagination";
import {
  ExportAllSessionsButton,
  ExportSessionsButton,
} from "@/components/dashboard/ExportSessionsButton";
import { SessionStats } from "@/components/dashboard/SessionStats";
import { resolveRange } from "@/lib/date-range";
import { DateRangeFilter } from "@/components/dashboard/DateFilter";

export default async function SessionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    range?: string;
  }>;
}) {
  const params = await searchParams;
  const { startDate, endDate } = resolveRange(params.range);
  const response = await getSessions(
    1,
    20,
    {
      search: params.search,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder as "asc" | "desc",
    },
    startDate,
    endDate,
  );
  const sessions = response.data;
  // console.log("sessions from sessions/page.tsx", sessions);

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">Sessions</h1>
      <DateRangeFilter />
      <div className="flex justify-between items-center mb-8">
        <SessionSearch />
        <SessionSort />
        <ExportSessionsButton sessions={sessions} />
        <ExportAllSessionsButton />
      </div>

      <SessionsTable sessions={sessions} />
      <Pagination
        page={response.pagination.page}
        totalPages={response.pagination.totalPages}
      />
      <SessionStats
        total={response.pagination.total}
        page={response.pagination.page}
        totalPages={response.pagination.totalPages}
      />
    </DashboardLayout>
  );
}
