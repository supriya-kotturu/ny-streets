import { html, css, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { keyed } from "lit/directives/keyed.js";

import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-zoom";

type StoryPage = {
  eyebrow: string;
  title: string;
  mapItemId: string;
  zoom?: number;
  description: string;
  insight: string;
  source: string;
};

@customElement("demo-app")
export class DemoApp extends LitElement {
  @state()
  private selectedPageIndex = 0;

  private readonly storyPages: StoryPage[] = [
    {
      eyebrow: "NYPD geography",
      title: "Start with the sectors",
      mapItemId: "2de9da4390944b8f9e4cd4b04dffe70e",
      description:
        "NYPD sectors divide New York City into operational geographies for patrol coverage, response planning, and community-facing service areas.",
      insight:
        "These boundaries are the frame for the rest of the story: every route, closure, and curbside pattern happens inside a sector.",
      source: "NYC Sector Chart web map",
    },
    {
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
      eyebrow: "Curbside demand",
      title: "Parking meters reveal active curb space",
      mapItemId: "ce6db921c6f9442eba0eb2b368b2c0c2",
      zoom: 14,
      description:
        "Parking meter locations point to blocks where curb access, short-term parking, and commercial turnover are part of everyday street life.",
      insight:
        "Curbside activity adds context for sector-level operations around congestion, access, loading, and neighborhood demand.",
      source: "NYC web map with Parking Meters layer",
    },
    {
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

  static styles = css`
    :host {
      display: block;
      height: 100%;
      min-height: 100%;
      color: #17202a;
      font-family:
        Inter,
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
    }

    .story {
      display: grid;
      grid-template-columns: minmax(320px, 420px) minmax(0, 1fr);
      height: 100%;
      background: #f7f3ec;
    }

    .story-panel {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      justify-content: space-between;
      padding: clamp(1.25rem, 3vw, 3rem);
      border-right: 1px solid rgb(23 32 42 / 12%);
      background:
        radial-gradient(circle at top left, rgb(0 121 193 / 12%), transparent 28rem), #fbf8f2;
    }

    .story-copy {
      display: grid;
      gap: 1rem;
    }

    .kicker {
      color: #00619b;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.14em;
      margin: 0;
      text-transform: uppercase;
    }

    h1 {
      font-size: clamp(2.25rem, 5vw, 4.75rem);
      letter-spacing: -0.07em;
      line-height: 0.9;
      margin: 0;
      text-wrap: balance;
    }

    .description {
      color: #394957;
      font-size: 1.05rem;
      line-height: 1.55;
      margin: 0;
    }

    .insight {
      border-left: 0.25rem solid #0079c1;
      color: #22313f;
      font-size: 0.95rem;
      line-height: 1.5;
      margin: 0;
      padding-left: 1rem;
    }

    .source {
      color: #5b6975;
      font-size: 0.8rem;
      margin: 0;
    }

    .controls {
      display: grid;
      gap: 1rem;
    }

    .buttons {
      display: flex;
      gap: 0.75rem;
    }

    button {
      border: 1px solid rgb(23 32 42 / 18%);
      border-radius: 999px;
      background: #ffffff;
      color: #17202a;
      cursor: pointer;
      font: inherit;
      font-weight: 700;
      padding: 0.75rem 1rem;
      transition:
        background 160ms ease,
        border-color 160ms ease,
        color 160ms ease,
        transform 160ms ease;
    }

    button:hover:not(:disabled),
    button[aria-current="true"] {
      background: #0079c1;
      border-color: #0079c1;
      color: #ffffff;
    }

    button:hover:not(:disabled) {
      transform: translateY(-1px);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }

    .dots {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .dot {
      height: 0.75rem;
      overflow: hidden;
      padding: 0;
      width: 0.75rem;
    }

    .map-card {
      min-height: 0;
      padding: clamp(0.75rem, 2vw, 1.5rem);
    }

    .map-frame {
      height: 100%;
      overflow: hidden;
      border: 1px solid rgb(23 32 42 / 12%);
      border-radius: 1.5rem;
      background: #d9e5ec;
      box-shadow: 0 1.5rem 4rem rgb(23 32 42 / 18%);
    }

    arcgis-map {
      display: block;
      height: 100%;
      min-height: 420px;
      width: 100%;
    }

    @media (max-width: 860px) {
      .story {
        grid-template-columns: 1fr;
        grid-template-rows: auto minmax(420px, 1fr);
      }

      .story-panel {
        border-bottom: 1px solid rgb(23 32 42 / 12%);
        border-right: 0;
      }

      h1 {
        max-width: 12ch;
      }
    }
  `;

  // ArcGIS web components work best here in light DOM so their global styles apply.
  protected override createRenderRoot() {
    return this;
  }

  private get selectedPage() {
    return this.storyPages[this.selectedPageIndex];
  }

  private goToPage(pageIndex: number) {
    this.selectedPageIndex = Math.min(Math.max(pageIndex, 0), this.storyPages.length - 1);
  }

  private goToPreviousPage() {
    this.goToPage(this.selectedPageIndex - 1);
  }

  private goToNextPage() {
    this.goToPage(this.selectedPageIndex + 1);
  }

  render() {
    const page = this.selectedPage;
    const isFirstPage = this.selectedPageIndex === 0;
    const isLastPage = this.selectedPageIndex === this.storyPages.length - 1;

    return html`
      <main class="story">
        <section class="story-panel" aria-label="NYPD story">
          <div class="story-copy">
            <p class="kicker">${page.eyebrow}</p>
            <h1>${page.title}</h1>
            <p class="description">${page.description}</p>
            <p class="insight">${page.insight}</p>
            <p class="source">Map source: ${page.source}</p>
          </div>

          <nav class="controls" aria-label="Story navigation">
            <div class="buttons">
              <button
                type="button"
                ?disabled=${isFirstPage}
                @click=${() => this.goToPreviousPage()}
              >
                Previous
              </button>
              <button type="button" ?disabled=${isLastPage} @click=${() => this.goToNextPage()}>
                Next
              </button>
            </div>

            <div class="dots" role="list" aria-label="Story pages">
              ${this.storyPages.map(
                (storyPage, index) => html`
                  <button
                    class="dot"
                    type="button"
                    aria-current=${index === this.selectedPageIndex ? "true" : "false"}
                    aria-label=${`Go to page ${index + 1}: ${storyPage.title}`}
                    title=${storyPage.title}
                    @click=${() => this.goToPage(index)}
                  ></button>
                `
              )}
            </div>
          </nav>
        </section>

        <section class="map-card" aria-label=${page.source}>
          <div class="map-frame">
            ${keyed(
              `${this.selectedPageIndex}-${page.mapItemId}`,
              html`
                <arcgis-map item-id=${page.mapItemId} zoom=${ifDefined(page.zoom)}>
                  <arcgis-zoom slot="top-left"></arcgis-zoom>
                  <arcgis-legend slot="bottom-right"></arcgis-legend>
                </arcgis-map>
              `
            )}
          </div>
        </section>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-app": DemoApp;
  }
}
