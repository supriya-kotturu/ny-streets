import type { StoryPage } from "../types/story-page";

export const storyPages: StoryPage[] = [
  {
    id: "sectors",
    eyebrow: "NYPD geography",
    title: "Start with the sectors",
    mapItemId: "2de9da4390944b8f9e4cd4b04dffe70e",
    description:
      "NYPD sectors divide New York City into operational geographies for patrol coverage, response planning, and community-facing service areas.",
    insight:
      "These boundaries are the frame for the rest of the story: every route, closure, and curbside pattern happens inside a sector.",
    source: "NYC Sector Chart web map",
    chart: {
      id: "65a82f75363d4ab7882bb7301dbeb16a",
      slotPosition: "bottom-left",
    },
  },
  {
    id: "bike-routes",
    eyebrow: "City movement",
    title: "Bike routes shape local access",
    mapItemId: "29d07307f68545d58239bf6890e26e25",
    zoom: 15,
    description:
      "Bike lanes show how people move through neighborhoods at street level and where safer cycling connections support daily trips.",
    insight:
      "The cycling network adds a human-scale layer to NYPD sector geography, especially around corridors with dense local activity.",
    source: "NYC Bike Lane web map",
  },
  {
    id: "truck-routes",
    eyebrow: "Freight corridors",
    title: "Truck routes carry city logistics",
    mapItemId: "39d9a96625084dcb9fa5deb9c12ce5d8",
    zoom: 15,
    description:
      "Truck routes highlight the corridors that support deliveries, freight movement, and commercial traffic across the city.",
    insight:
      "Viewing truck movement with NYPD sectors helps compare public-safety geography with the routes that keep the city supplied.",
    source: "NYC web map with NYC Truck Routes layer",
  },
  {
    id: "construction-closures",
    eyebrow: "Temporary disruption",
    title: "Construction closures change the street",
    mapItemId: "01c6c8c30846419c99098ed523c2ab4d",
    zoom: 15,
    description:
      "Street closures due to construction show where normal circulation is interrupted and where travelers may need to reroute.",
    insight:
      "Closures can reshape how bikes, trucks, pedestrians, and emergency responders move through a sector on a given day.",
    source: "NYC web map with Street Closures layer",
  },
  {
    id: "parking-meters",
    eyebrow: "Curbside demand",
    title: "Parking meters reveal active curb space",
    mapItemId: "ce6db921c6f9442eba0eb2b368b2c0c2",
    zoom: 15,
    description:
      "Parking meter locations point to blocks where curb access, short-term parking, and commercial turnover are part of everyday street life.",
    insight:
      "Curbside activity adds context for sector-level operations around congestion, access, loading, and neighborhood demand.",
    source: "NYC web map with Parking Meters layer",
  },
  {
    id: "combined-view",
    eyebrow: "Combined view",
    title: "One city, many operational layers",
    mapItemId: "170c461c2973474e80d13c1294cc6669",
    zoom: 14,
    description:
      "The combined NYC map brings bike routes, truck routes, closures, and parking context into one shared geography.",
    insight:
      "Together, these layers tell a practical NYPD story: public-safety areas are connected to how people, goods, and street activity move.",
    source: "NYC web map",
  },
];
