import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { getOverview, getTimeline } from "@/lib/dashboard-api";
import { TimelineChart } from "@/components/dashboard/TimelineChart";

export default async function Dashboard() {
  const [overviewResponse, timelineResponse] = await Promise.all([
    getOverview(),
    getTimeline(),
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
      <div
        className="mt-8"
      >
        <TimelineChart data={timeline} />
      </div>
    </DashboardLayout>
  );
}
