"use client";

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { StatsCard } from "./StatsCard";

export function ProductAnalyticsChart({ data }: { data: any[] }) {
  const totalOpened = data.reduce((sum, p) => sum + p.opened, 0);
  const totalWishlisted = data.reduce((sum, p) => sum + p.wishlisted, 0);
  const totalCarted = data.reduce((sum, p) => sum + p.carted, 0);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
      <h2 className="mb-6 text-xl md:text-2xl font-semibold">
        Product Engagement
      </h2>

      <div className="h-75 sm:h-100 md:h-125 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 50,
            }}
            style={{ backgroundColor: "white" }}
          >
            <XAxis
              dataKey="productId"
              angle={-45}
              textAnchor="end"
              height={70}
            />

            <YAxis />

            <Tooltip />

            <Bar dataKey="opened" />
            <Bar dataKey="wishlisted" />
            <Bar dataKey="carted" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <StatsCard title="Product Opens" value={totalOpened} />
        <StatsCard title="Wishlists" value={totalWishlisted} />
        <StatsCard title="Cart Adds" value={totalCarted} />
      </div>
    </div>
  );
}
