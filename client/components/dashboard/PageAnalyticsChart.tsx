"use client";

import { decodePath } from "@/helper/HandleDecode";
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
  const formatXAxis = (value: string) => {
    const decoded = decodePath(value);

    return decoded.split("/").filter(Boolean).pop() || "/";
  };

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
        <BarChart
          data={data}
          style={{ backgroundColor: "white" }}
        >
          <XAxis
            dataKey="_id"
            angle={-90}
            textAnchor="end"
            height={80}
            tickFormatter={formatXAxis}
          />

          <YAxis />

          <Tooltip/>

          <Bar dataKey="totalEvents" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
