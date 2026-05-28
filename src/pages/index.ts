import storyPagesJson from "../data/story-pages.json";
import type { ArcgisMapSlotPosition, StoryPage } from "../types/story-page.ts";

type RawStoryPage = Omit<StoryPage, "chart"> & {
  chart?: {
    id: string;
    slotPosition: string;
  };
};

const arcgisMapSlotPositions = new Set<string>([
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
]);

const rawStoryPages: RawStoryPage[] = storyPagesJson;

function isArcgisMapSlotPosition(value: string): value is ArcgisMapSlotPosition {
  return arcgisMapSlotPositions.has(value);
}

function normalizeChart(chart: RawStoryPage["chart"]): StoryPage["chart"] {
  if (!chart) {
    return undefined;
  }

  if (!isArcgisMapSlotPosition(chart.slotPosition)) {
    throw new Error(`Invalid ArcGIS map slot position: ${chart.slotPosition}`);
  }

  return {
    id: chart.id,
    slotPosition: chart.slotPosition,
  };
}

export const storyPages: StoryPage[] = rawStoryPages.map((page) => ({
  ...page,
  chart: normalizeChart(page.chart),
}));
