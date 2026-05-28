import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

import "./components/story-map.ts";
import "./components/story-navigation.ts";
import "./components/story-panel.ts";
import { storyPages } from "./pages/index.ts";

@customElement("demo-app")
export class DemoApp extends LitElement {
  @state()
  private selectedPageIndex = 0;

  protected override createRenderRoot() {
    return this;
  }

  private get selectedPage() {
    return storyPages[this.selectedPageIndex];
  }

  private goToPage(pageIndex: number) {
    this.selectedPageIndex = Math.min(Math.max(pageIndex, 0), storyPages.length - 1);
  }

  private handleStoryPageChange = (event: CustomEvent<{ pageIndex: number }>) => {
    this.goToPage(event.detail.pageIndex);
  };

  render() {
    return html`
      <main class="story">
        <section class="story-panel" aria-label="NYPD story">
          <story-panel .page=${this.selectedPage}></story-panel>
          <story-navigation
            .pages=${storyPages}
            .selectedPageIndex=${this.selectedPageIndex}
            @story-page-change=${this.handleStoryPageChange}
          ></story-navigation>
        </section>

        <story-map .page=${this.selectedPage} .pageIndex=${this.selectedPageIndex}></story-map>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-app": DemoApp;
  }
}
