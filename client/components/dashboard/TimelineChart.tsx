"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function TimelineChart({
  data,
}: {
  data: any[];
}) {
  return (
    <div
      className="
        rounded-3xl

        border
        border-white/10

        bg-white/5

        p-6

        h-[450px]
      "
    >
      <h2
        className="
          text-2xl
          font-semibold

          mb-6
        "
      >
        Events Over Time
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart
          data={data}
        >
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="_id"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="totalEvents"
          />

          <Line
            type="monotone"
            dataKey="pageViews"
          />

          <Line
            type="monotone"
            dataKey="clicks"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}