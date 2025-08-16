import { BaseComponent } from "./BaseComponent.js";

export class BlogTags extends BaseComponent {
    #tags = [];

    set tags(value) {
        this.#tags = value || [];
        if (this.shadowRoot) {
            this.renderTags();
        }
    }

    connectedCallback() {
        this.renderTags();
    }

    renderTags() {
        this.shadowRoot.innerHTML = `
            ${this.addGlobalStyles()}
            <style>
                .tags {
                    font-style: italic;
                }
            </style>
            <span class="tags">
            ${this.#tags.join(', ')}
            </span>
        `;
    }
}

customElements.define('blog-tags', BlogTags);