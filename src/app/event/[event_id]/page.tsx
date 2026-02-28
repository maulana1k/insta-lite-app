import { Header } from "@/components/layout/header";
import { EventDetail } from "@/features/event/components/event-detail";

export function generateStaticParams() {
  // TODO: replace with API call: GET /api/v1/events?fields=id to get all event IDs
  const eventIds = [
    "ev1",
    "ev2",
    "ev3",
    "ev4",
    "ev5",
    "ev6",
    "ev7",
    "ev8",
    "ev9",
    "ev10",
    "ev11",
    "ev12",
    "ev13",
    "ev14",
    "ev15",
  ];
  return eventIds.map((event_id) => ({ event_id }));
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ event_id: string }>;
}) {
  const { event_id } = await params;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
        <EventDetail eventId={event_id} />
      </div>
    </div>
  );
}
