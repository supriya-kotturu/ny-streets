import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@esri/calcite-components/components/calcite-chip";
import "@esri/calcite-components/components/calcite-notice";
import type { StoryPage } from "../types/story-page.ts";

@customElement("story-panel")
export class StoryPanel extends LitElement {
  @property({ attribute: false })
  page?: StoryPage;

  protected override createRenderRoot() {
    return this;
  }

  render() {
    if (!this.page) {
      return html``;
    }

    return html`
      <div class="story-copy">
        <p class="kicker">${this.page.eyebrow}</p>
        <h1>${this.page.title}</h1>
        <p class="description">${this.page.description}</p>
        <calcite-notice class="insight" icon="lightbulb" kind="brand" open scale="s">
          <div slot="message">${this.page.insight}</div>
        </calcite-notice>
        <calcite-chip class="source" icon="map" scale="s" value=${this.page.source}>
          ${this.page.source}
        </calcite-chip>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "story-panel": StoryPanel;
  }
}
