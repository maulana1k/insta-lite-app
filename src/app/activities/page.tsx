'use client';

import { Header } from "@/components/layout/header";
import { ActivitiesContainer } from "@/features/activities";

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <ActivitiesContainer />
    </div>
  );
}
