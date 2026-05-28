import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

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
        <p class="insight">${this.page.insight}</p>
        <p class="source">Map source: ${this.page.source}</p>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "story-panel": StoryPanel;
  }
}
