export type ArcgisMapSlotPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";

export type StoryPage = {
  id: string;
  eyebrow: string;
  title: string;
  mapItemId: string;
  zoom?: number;
  description: string;
  insight: string;
  source: string;
  chart?: {
    id: string;
    slotPosition: ArcgisMapSlotPosition;
  };
};
