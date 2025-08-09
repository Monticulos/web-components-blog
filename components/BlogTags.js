export class BlogTags extends HTMLElement {
    #tags = [];

    set tags(value) {
        this.#tags = value || [];
        if (this.shadowRoot) {
            this.renderTags();
        }
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.renderTags();
    }

    renderTags() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./global.css" />
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