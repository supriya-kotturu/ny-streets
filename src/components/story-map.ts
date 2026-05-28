import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { keyed } from "lit/directives/keyed.js";

import "@arcgis/charts-components/components/arcgis-chart";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-zoom";

import type { StoryPage } from "../types/story-page.ts";

@customElement("story-map")
export class StoryMap extends LitElement {
  @property({ attribute: false })
  page?: StoryPage;

  @property({ type: Number })
  pageIndex = 0;

  private renderChart() {
    const chart = this.page?.chart;

    if (!chart) {
      return html``;
    }

    return html`
      <arcgis-chart
        class="map-chart"
        layer-item-id=${chart.id}
        slot=${chart.slotPosition}
      ></arcgis-chart>
    `;
  }

  protected override createRenderRoot() {
    return this;
  }

  render() {
    if (!this.page) {
      return html``;
    }

    return html`
      <section class="map-card" aria-label=${this.page.source}>
        <div class="map-frame">
          ${keyed(
            `${this.pageIndex}-${this.page.id}-${this.page.mapItemId}`,
            html`
              <arcgis-map item-id=${this.page.mapItemId} zoom=${ifDefined(this.page.zoom)}>
                <arcgis-zoom slot="top-left"></arcgis-zoom>
                <arcgis-legend slot="bottom-right"></arcgis-legend>
                ${this.renderChart()}
              </arcgis-map>
            `
          )}
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "story-map": StoryMap;
  }
}
