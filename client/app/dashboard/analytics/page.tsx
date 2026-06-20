import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

import { EventDistributionChart } from "@/components/dashboard/EventDistributionChart";

import { PageAnalyticsChart } from "@/components/dashboard/PageAnalyticsChart";

import { FunnelChart } from "@/components/dashboard/FunnelChart";

import { TopEventsTable } from "@/components/dashboard/TopEventsTable";

import { ProductAnalyticsChart } from "@/components/dashboard/ProductAnalyticsChart";

import { PagesAnalyticsTable } from "@/components/dashboard/PagesAnalyticsTable";
import { ProductAnalyticsTable } from "@/components/dashboard/ProductAnalyticsTable";
import {
  getEventDistribution,
  getPages,
  getFunnel,
  getProductsAnalytics,
  getTopEvents,
} from "@/lib/dashboard-api";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { resolveRange } from "@/lib/date-range";
import { DateRangeFilter } from "@/components/dashboard/DateFilter";

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{
    range?: string;
  }>;
}) {
  const params = await searchParams;
  const { startDate, endDate } = resolveRange(params.range);
  const [
    eventsResponse,
    pagesResponse,
    funnelResponse,
    productsResponse,
    topEventsResponse,
  ] = await Promise.all([
    getEventDistribution(startDate, endDate),
    getPages(startDate, endDate),
    getFunnel(startDate, endDate),
    getProductsAnalytics(startDate, endDate),
    getTopEvents(startDate, endDate),
  ]);

  const pages = pagesResponse.data;

  const totalViews = pages.reduce(
    (sum: number, page: { pageViews: number }) => sum + page.pageViews,
    0,
  );

  const totalClicks = pages.reduce(
    (sum: number, page: { clicks: number }) => sum + page.clicks,
    0,
  );

  const avgCtr =
    totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : "0";

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">Analytics</h1>
      <DateRangeFilter />

      <div className="grid lg:grid-cols-2 gap-6">
        <EventDistributionChart data={eventsResponse.data} />

        <PageAnalyticsChart data={pagesResponse.data} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Page Views" value={totalViews} />

        <StatsCard title="Total Clicks" value={totalClicks} />

        <StatsCard title="Average CTR" value={`${avgCtr}%`} />
      </div>
      <div className="mt-8">
        <PagesAnalyticsTable pages={pagesResponse.data} />
      </div>
      <div className="mt-8">
        <FunnelChart data={funnelResponse.data} />
      </div>
      <div className="mt-8">
        <ProductAnalyticsChart data={productsResponse.data} />
      </div>
      <div className="mt-8">
        <ProductAnalyticsTable products={productsResponse.data} />
      </div>
      <div className="mt-8">
        <TopEventsTable data={topEventsResponse.data} />
      </div>
    </DashboardLayout>
  );
}
