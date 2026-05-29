import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

import "@esri/calcite-components/components/calcite-panel";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "./components/story-carousel.ts";
import "./components/story-map.ts";
import { storyPages } from "./pages/index.ts";

@customElement("demo-app")
export class DemoApp extends LitElement {
  @state()
  private selectedPageIndex = 0;

  @state()
  private isNarrowLayout = false;

  private narrowLayoutQuery?: MediaQueryList;

  protected override createRenderRoot() {
    return this;
  }

  override connectedCallback() {
    super.connectedCallback();

    this.narrowLayoutQuery = window.matchMedia("(max-width: 860px)");
    this.updateLayoutMode();
    this.narrowLayoutQuery.addEventListener("change", this.updateLayoutMode);
  }

  override disconnectedCallback() {
    this.narrowLayoutQuery?.removeEventListener("change", this.updateLayoutMode);
    super.disconnectedCallback();
  }

  private get selectedPage() {
    return storyPages[this.selectedPageIndex];
  }

  private goToPage(pageIndex: number) {
    this.selectedPageIndex = Math.min(Math.max(pageIndex, 0), storyPages.length - 1);
  }

  private updateLayoutMode = () => {
    this.isNarrowLayout = this.narrowLayoutQuery?.matches ?? false;
  };

  private handleStoryPageChange = (event: CustomEvent<{ pageIndex: number }>) => {
    this.goToPage(event.detail.pageIndex);
  };

  render() {
    return html`
      <calcite-shell class="story-shell">
        <calcite-shell-panel
          slot=${this.isNarrowLayout ? "panel-top" : "panel-start"}
          width="m"
          height="m"
        >
          <calcite-panel class="story-panel">
            <story-carousel
              .pages=${storyPages}
              .selectedPageIndex=${this.selectedPageIndex}
              @story-page-change=${this.handleStoryPageChange}
            ></story-carousel>
          </calcite-panel>
        </calcite-shell-panel>

        <story-map .page=${this.selectedPage} .pageIndex=${this.selectedPageIndex}></story-map>
      </calcite-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-app": DemoApp;
  }
}
