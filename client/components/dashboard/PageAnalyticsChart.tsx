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

export function PageAnalyticsChart({ data }: Props) {
  function formatXAxis({data}:{
    data: {
      _id: string;
      totalEvents: number;
      pageViews: number;
      clicks: number;
    }
  }) {
    return data._id.split("/").slice(-1)[0];
  }
    
  return (
    <div
      className="
        h-100

        rounded-3xl

        border
        border-white/10

        bg-white/5

        p-6
      "
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} style={{ backgroundColor: "white" }} margin={{ top: 10, right: 10, left: -20, bottom: 50 }}>
          <XAxis dataKey="_id" angle={-45} textAnchor="end" height={80} />

          <YAxis />

          <Tooltip
            formatter={(value) => [value, "Events"]}
            labelFormatter={(label) => `Page: ${label}`}
          />

          <Bar dataKey="totalEvents" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
