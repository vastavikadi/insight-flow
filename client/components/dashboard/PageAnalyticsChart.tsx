"use client";

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface Props {
  data: any[];
}

export function PageAnalyticsChart({
  data,
}: Props) {
  return (
    <div
      className="
        h-[400px]

        rounded-3xl

        border
        border-white/10

        bg-white/5

        p-6
      "
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
        >
          <XAxis
            dataKey="_id"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="totalEvents"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}