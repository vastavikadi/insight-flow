import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { getOverview, getTimeline } from "@/lib/dashboard-api";
import { TimelineChart } from "@/components/dashboard/TimelineChart";
import { resolveRange } from "@/lib/date-range";
import { DateRangeFilter } from "@/components/dashboard/DateFilter";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{
    range?: string;
  }>;
}) {
  const params = await searchParams;
  const { startDate, endDate } = resolveRange(params.range);

  const [overviewResponse, timelineResponse] = await Promise.all([
    getOverview(startDate, endDate),
    getTimeline(startDate, endDate),
  ]);

  const overview = overviewResponse.data;

  const timeline = timelineResponse.data;

  return (
    <DashboardLayout>
      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Analytics Overview
      </h1>

      <DateRangeFilter />

      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        <StatsCard title="Total Sessions" value={overview.totalSessions} />

        <StatsCard title="Total Events" value={overview.totalEvents} />

        <StatsCard
          title="Avg Events / Session"
          value={overview.avgEventsPerSession}
        />

        <StatsCard
          title="Most Visited Page"
          value={overview.mostVisitedPage ?? "-"}
        />
        <StatsCard title="Purchases" value={overview.purchaseCount} />

        <StatsCard title="Cart Adds" value={overview.cartAdds} />
      </div>
      <div className="mt-8">
        <TimelineChart data={timeline} />
      </div>
    </DashboardLayout>
  );
}
