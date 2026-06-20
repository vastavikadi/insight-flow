"use client";

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

export function ProductAnalyticsChart({
  data,
}: {
  data: any[];
}) {
  return (
    <div
      className="
        h-[500px]

        rounded-3xl

        border
        border-white/10

        bg-white/5

        p-6
      "
    >
      <h2
        className="
          text-2xl
          font-semibold

          mb-6
        "
      >
        Product Engagement
      </h2>

      <ResponsiveContainer>
        <BarChart
          data={data}
        >
          <XAxis
            dataKey="_id.productId"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}