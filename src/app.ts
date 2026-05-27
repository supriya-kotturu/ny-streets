import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-panel";

import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/charts-components/components/arcgis-chart";
import "@arcgis/charts-components/components/arcgis-charts-action-bar";

@customElement("demo-app")
export class DemoApp extends LitElement {
  private readonly mapItemId = "170c461c2973474e80d13c1294cc6669";
  private readonly chartLayerItemId = "65a82f75363d4ab7882bb7301dbeb16a";

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    calcite-shell {
      height: 100%;
    }

    arcgis-chart {
      display: block;
      width: 100%;
      height: 500px;
    }

    .panel-content {
      padding: 1rem;
    }
  `;

  // By default, LitElement uses Shadow DOM, which keeps a component’s styles separate from the rest of the page.
  // But in this case, we don’t want that. We override createRenderRoot so the component renders in the regular DOM (light DOM) instead.

  // This lets the page’s main styles apply to the component, which is required for ArcGIS components to display correctly.
  // If we used Shadow DOM, we’d have to manually include those styles inside it, which is more complicated.
  // So, rendering in the light DOM is the easier fix.

  // NOTE: Without this method override, the <arcgis-chart> component won’t render properly because it won’t get the right styles.
  // The map will still render, but the chart will be broken.

  protected override createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <calcite-shell>
        <calcite-shell-panel slot="panel-start">
          <calcite-panel heading="Map details">
            <div class="panel-content">placeholder for filters, metadata, or controls, etc.</div>
          </calcite-panel>
        </calcite-shell-panel>
        <arcgis-map item-id="${this.mapItemId}"> </arcgis-map>
        <calcite-shell-panel slot="panel-end">
          <calcite-panel heading="Related chart">
            <arcgis-chart layer-item-id="${this.chartLayerItemId}" chart-index="0">
              <arcgis-charts-action-bar slot="action-bar"> </arcgis-charts-action-bar>
            </arcgis-chart>
          </calcite-panel>
        </calcite-shell-panel>
      </calcite-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-app": DemoApp;
  }
}
