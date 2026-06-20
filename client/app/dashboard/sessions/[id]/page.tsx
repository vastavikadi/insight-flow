import { DashboardLayout }
from "@/components/dashboard/DashboardLayout";

import { EventTimeline }
from "@/components/dashboard/EventTimeline";

import { getSessionJourney }
from "@/lib/dashboard-api";

export default async function SessionDetail({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  const response =
    await getSessionJourney(id);

  const events = response.data;

  return (
    <DashboardLayout>
      <div>
        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Session Journey
        </h1>

        <p
          className="
            mt-2
            text-zinc-400
          "
        >
          {id}
        </p>

        <EventTimeline
          events={events}
        />
      </div>
    </DashboardLayout>
  );
}