import { DashboardLayout }
from "@/components/dashboard/DashboardLayout";

import { HeatmapCanvas }
from "@/components/dashboard/HeatmapCanvas";

import { getHeatmap }
from "@/lib/dashboard-api";

export default async function HeatmapDetail({
  params,
}: {
  params: Promise<{
    page: string;
  }>;
}) {

  const { page } =
    await params;

  const pageUrl =
    decodeURIComponent(page);

  const response =
    await getHeatmap(
      pageUrl,
    );

  const clicks =
    response.data;

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

      <p
        className="
          text-zinc-400
          mb-8
        "
      >
        {pageUrl}
      </p>

      <HeatmapCanvas
        points={clicks}
      />
    </DashboardLayout>
  );
}