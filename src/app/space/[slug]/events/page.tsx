import { SpaceEventsPageContent } from "./space-events-page-content";

export function generateStaticParams() {
  // TODO: replace with API call: GET /api/v1/spaces?fields=slug
  const slugs = [
    "dramaselebriti",
    "jakartavibes",
    "politiksantai",
    "kulinernusantara",
    "devindonesia",
    "startupindonesia",
    "curhatzone",
  ];
  return slugs.map((slug) => ({ slug }));
}

export default async function SpaceEventsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SpaceEventsPageContent slug={slug} />;
}
