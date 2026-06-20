"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    _id: string;
    count: number;
  }[];
}

export function EventDistributionChart({
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
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="_id"
            outerRadius={120}
          >
            {data.map(
              (_, index) => (
                <Cell
                  key={index}
                />
              ),
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}