import type { LucideIcon } from "lucide-react";

export type MediaStep = "upload" | "crop" | "edit" | "caption";
export type AspectRatio = "square" | "portrait";

export interface Filter {
  name: string;
  class: string;
}

export interface EditTool {
  id: string;
  label: string;
  icon: LucideIcon; // You might need to import or specific generic type
  min?: number;
  max?: number;
}
