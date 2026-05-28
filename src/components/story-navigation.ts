import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import type { StoryPage } from "../types/story-page.ts";

@customElement("story-navigation")
export class StoryNavigation extends LitElement {
  @property({ attribute: false })
  pages: StoryPage[] = [];

  @property({ type: Number })
  selectedPageIndex = 0;

  protected override createRenderRoot() {
    return this;
  }

  private requestPage(pageIndex: number) {
    this.dispatchEvent(
      new CustomEvent<{ pageIndex: number }>("story-page-change", {
        detail: { pageIndex },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const isFirstPage = this.selectedPageIndex === 0;
    const isLastPage = this.selectedPageIndex === this.pages.length - 1;

    return html`
      <nav class="controls" aria-label="Story navigation">
        <div class="buttons">
          <button
            type="button"
            ?disabled=${isFirstPage}
            @click=${() => this.requestPage(this.selectedPageIndex - 1)}
          >
            Previous
          </button>
          <button
            type="button"
            ?disabled=${isLastPage}
            @click=${() => this.requestPage(this.selectedPageIndex + 1)}
          >
            Next
          </button>
        </div>

        <div class="dots" role="list" aria-label="Story pages">
          ${this.pages.map(
            (page, index) => html`
              <button
                class="dot"
                type="button"
                aria-current=${index === this.selectedPageIndex ? "true" : "false"}
                aria-label=${`Go to page ${index + 1}: ${page.title}`}
                title=${page.title}
                @click=${() => this.requestPage(index)}
              ></button>
            `
          )}
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "story-navigation": StoryNavigation;
  }
}
