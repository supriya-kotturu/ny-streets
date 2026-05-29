import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@esri/calcite-components/components/calcite-carousel";
import "@esri/calcite-components/components/calcite-carousel-item";
import "./story-panel.ts";
import type { StoryPage } from "../types/story-page.ts";

@customElement("story-carousel")
export class StoryCarousel extends LitElement {
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

  private handleCarouselChange = (event: Event) => {
    const carousel = event.currentTarget as HTMLCalciteCarouselElement;
    const pageIndex = Number(carousel.selectedItem.dataset.pageIndex);

    if (!Number.isInteger(pageIndex)) {
      throw new Error("Selected carousel item is missing a valid page index.");
    }

    this.requestPage(pageIndex);
  };

  render() {
    return html`
      <calcite-carousel
        label="NYPD story pages"
        arrow-type="inline"
        control-overlay
        @calciteCarouselChange=${this.handleCarouselChange}
      >
        ${this.pages.map(
          (page, index) => html`
            <calcite-carousel-item
              label=${page.title}
              data-page-index=${index}
              ?selected=${index === this.selectedPageIndex}
            >
              <story-panel .page=${page}></story-panel>
            </calcite-carousel-item>
          `
        )}
      </calcite-carousel>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "story-carousel": StoryCarousel;
  }
}
