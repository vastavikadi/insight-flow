import Link from "next/link";
interface PageAnalytics {
  _id: string;

  totalEvents: number;

  pageViews: number;

  clicks: number;
}

export function PagesAnalyticsTable({ pages }: { pages: PageAnalytics[] }) {
  return (
    <div
      className="
        rounded-3xl

        border
        border-white/10

        bg-white/5

        overflow-hidden
      "
    >
      <div
        className="
          px-6
          py-5

          border-b
          border-white/10
        "
      >
        <h2
          className="
            text-2xl
            font-semibold
          "
        >
          Page Analytics
        </h2>
      </div>

      <table className="w-full">
        <thead>
          <tr
            className="
              border-b
              border-white/10
            "
          >
            <th className="p-4 text-left">Page</th>

            <th className="p-4 text-left">Events</th>

            <th className="p-4 text-left">Views</th>

            <th className="p-4 text-left">Clicks</th>

            <th className="p-4 text-left">CTR</th>
          </tr>
        </thead>

        <tbody>
          {pages.map((page) => {
            const ctr =
              page.pageViews > 0
                ? ((page.clicks / page.pageViews) * 100).toFixed(2)
                : "0";

            return (
              <tr
                key={page._id}
                className="
                  border-b
                  border-white/5"
              >
                <td className="p-4">
                  <Link
                    href={`/dashboard/heatmap/${encodeURIComponent(page._id)}`}
                    className="text-violet-400 hover:text-violet-300"
                  >
                    {page._id}
                  </Link>
                </td>

                <td className="p-4">{page.totalEvents}</td>

                <td className="p-4">{page.pageViews}</td>

                <td className="p-4">{page.clicks}</td>

                <td className="p-4">{ctr}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
