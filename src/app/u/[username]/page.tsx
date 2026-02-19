import { ProfilePageContent } from "./profile-page-content";

export function generateStaticParams() {
  // TODO: replace with API call: GET /api/v1/users?fields=username to get all usernames
  const usernames = [
    'sarahcodes', 'marcusj', 'elena.dev', 'jakethesnake', 'priya.design',
    'tombuilds', 'ninawrites', 'alexfromtech', 'davidux', 'miathemaker',
    'ryanstartup', 'chloecreates', 'kaidev', 'zaraml', 'liambuilds',
    'budikoding', 'rinadev_', 'agus.backend', 'dinda.ui', 'fajar_ngoding',
    'sitiux', 'andistartupin', 'megacloud',
  ];
  return usernames.map((username) => ({ username }));
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return <ProfilePageContent username={username} />;
}
