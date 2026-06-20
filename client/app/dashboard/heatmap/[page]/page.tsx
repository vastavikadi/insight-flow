import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

import { HeatmapCanvas } from "@/components/dashboard/HeatmapCanvas";

import { getHeatmap } from "@/lib/dashboard-api";

import Link from "next/link";
export default async function HeatmapDetail({
  params,
}: {
  params: Promise<{
    page: string;
  }>;
}) {
  if (!params) {
    return (
      <DashboardLayout>
        <h1
          className="
            text-4xl
            font-bold
            mb-8
          "
        >
          Heatmap
        </h1>
      </DashboardLayout>
    );
  }

  const { page } = await params;

  const pageUrl = decodeURIComponent(page);

  const response = await getHeatmap(pageUrl);

  const clicks = response.data;

  return (
    <DashboardLayout>
      <h1
        className="
          text-4xl
          font-bold
          mb-2
        "
      >
        Heatmap
      </h1>
      <Link
        href="/dashboard/heatmap"
        className="
          mb-4

          text-sm
          text-violet-500
          hover:underline
        "
      >
        &larr; Back to Heatmaps
      </Link>
      <p
        className="
          text-zinc-400
          mb-8
        "
      >
        {pageUrl}
      </p>

      <HeatmapCanvas points={clicks} />
    </DashboardLayout>
  );
}
