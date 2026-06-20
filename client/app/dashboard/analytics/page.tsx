import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

import { EventDistributionChart } from "@/components/dashboard/EventDistributionChart";

import { PageAnalyticsChart } from "@/components/dashboard/PageAnalyticsChart";

import { FunnelChart } from "@/components/dashboard/FunnelChart";

import {
  TopEventsTable,
} from "@/components/dashboard/TopEventsTable";

import {
  ProductAnalyticsChart,
}
from "@/components/dashboard/ProductAnalyticsChart";

import { getEventDistribution, getPages, getFunnel, getProductsAnalytics, getTopEvents } from "@/lib/dashboard-api";

export default async function AnalyticsPage() {
  const [eventsResponse, pagesResponse, funnelResponse, productsResponse, topEventsResponse] = await Promise.all([
    getEventDistribution(),
    getPages(),
    getFunnel(),
    getProductsAnalytics(),
    getTopEvents(),
  ]);

  const totalOpened =
  productsResponse.reduce(
    (sum, p) =>
      sum + p.opened,
    0,
  );

const totalWishlisted =
  productsResponse.reduce(
    (sum, p) =>
      sum + p.wishlisted,
    0,
  );

const totalCarted =
  productsResponse.reduce(
    (sum, p) =>
      sum + p.carted,
    0,
  );

  return (
    <DashboardLayout>
      <h1
        className="
          text-4xl
          font-bold

          mb-8
        "
      >
        Analytics
      </h1>

      <div
        className="
          grid

          lg:grid-cols-2

          gap-6
        "
      >
        <EventDistributionChart data={eventsResponse.data} />

        <PageAnalyticsChart data={pagesResponse.data} />
        
      </div>
      <div className="mt-8">
          <FunnelChart data={funnelResponse.data} />
        </div>
      <div
  className="
    mt-8
  "
>
  <ProductAnalyticsChart
    data={
      productsResponse.data
    }
  />
</div>
      <div
  className="
    grid
    md:grid-cols-3
    gap-6
    mb-8
  "
>
  <StatsCard
    title="Product Opens"
    value={totalOpened}
  />

  <StatsCard
    title="Wishlists"
    value={totalWishlisted}
  />

  <StatsCard
    title="Cart Adds"
    value={totalCarted}
  />
</div>
      <div
  className="
    mt-8
  "
>
  <TopEventsTable
    data={
      topEventsResponse.data
    }
  />
</div>
    </DashboardLayout>
  );
}
