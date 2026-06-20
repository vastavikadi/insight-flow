import Link from "next/link";

import { DashboardLayout }
from "@/components/dashboard/DashboardLayout";

import { getPages }
from "@/lib/dashboard-api";

export default async function HeatmapPage() {
  const response =
    await getPages();

  const pages =
    response.data;

  return (
    <DashboardLayout>
      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Heatmaps
      </h1>

      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >
        {pages.map(
          (page: any) => (
            <Link
              key={page._id}
              href={`/dashboard/heatmap/${encodeURIComponent(
                page._id,
              )}`}
              className="
                p-6

                rounded-3xl

                border
                border-white/10

                bg-white/5

                hover:border-violet-500

                transition
              "
            >
              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                {page._id.length > 20
                  ? `${page._id.slice(0, 20)}...`
                  : page._id}
              </h3>

              <div
                className="
                  mt-4
                  space-y-2
                  text-zinc-400
                "
              >
                <p>
                  Events:
                  {" "}
                  {page.totalEvents}
                </p>

                <p>
                  Page Views:
                  {" "}
                  {page.pageViews}
                </p>

                <p>
                  Clicks:
                  {" "}
                  {page.clicks}
                </p>
              </div>
            </Link>
          ),
        )}
      </div>
    </DashboardLayout>
  );
}