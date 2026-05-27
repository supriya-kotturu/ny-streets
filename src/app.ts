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
  private readonly instantChartsUrl =
    "https://jsapi.maps.arcgis.com/apps/instant/charts/index.html?appid=9765c187fcf2469894377acefcbfcf61";

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

  protected override createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <calcite-shell>
        <calcite-shell-panel slot="panel-start">
          <calcite-panel heading="Map details">
            <div class="panel-content">add filters, metadata, or controls, etc.</div>
          </calcite-panel>
        </calcite-shell-panel>
        <arcgis-map item-id="170c461c2973474e80d13c1294cc6669">
        </arcgis-map>
        <calcite-shell-panel slot="panel-end">
          <calcite-panel heading="Related chart"> <arcgis-map item-id="170c461c2973474e80d13c1294cc6669">
          <arcgis-chart
            layer-item-id="65a82f75363d4ab7882bb7301dbeb16a"
            chart-index="0"
            slot="popup">
          <arcgis-charts-action-bar slot="action-bar"></arcgis-charts-action-bar>
          </arcgis-chart></calcite-panel>
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
